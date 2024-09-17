"use client";
import { getAllBlogs } from "@/app/api/actions";
import { useEffect, useMemo, useState } from "react";
import NoDataComponent from "../NoDataComponent";
import BlogItem from "../Blog/BlogItem";
import BlogItemLoader from "../Blog/BlogItemLoader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

const BlogList = ({ query = "" }) => {
  const getBlogList = async ({ pageParam }: { pageParam: number }) => {
    const response = await getAllBlogs({
      query,
      page: pageParam,
      page_size: 20,
    });
    return response?.data?.posts;
  };

  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, status, isFetching } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getBlogList,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage?.length ? pages?.length + 1 : undefined;
      return nextPage;
    },
    staleTime: 120000, //120 seconds
  });

  const loading = status === "pending";

  const blog_list_data = useMemo(() => {
    let list = [];
    data?.pages?.map((page) => {
      list = [...list, ...(page || [])];
    });
    return list;
  }, [JSON.stringify(data)]);

  const renderBlogitems = (blog_list = []) => {
    if (blog_list?.length === 0 && !loading)
      return <NoDataComponent className="mt-24" />;
    return blog_list?.map((item, index) => {
      let is_last = index === blog_list?.length - 1;
      return (
        <BlogItem
          innerRef={is_last ? ref : undefined}
          data={item}
          is_last={index === blog_list?.length - 1}
        />
      );
    });
  };
  console.log("data?.pages", data?.pages);
  
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="w-full max-w-[900px] min-h-screen mx-auto">
      <div className="flex gap-4 mb-4 px-3"></div>
      <div className="mt-4">
        {isFetching && !data?.pages ? <BlogItemLoader /> : renderBlogitems(blog_list_data)}
      </div>
    </div>
  );
};

export default BlogList;

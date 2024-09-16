"use client";
import { getAllBlogs } from "@/app/api/actions";
import { useEffect, useState } from "react";
import NoDataComponent from "../NoDataComponent";
import BlogItem from "../Blog/BlogItem";
import BlogItemLoader from "../Blog/BlogItemLoader";

const BlogList = ({ query = "" }) => {
  const [blog_list, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [is_init, setIsInit] = useState(true);

  useEffect(() => {
    getBlogList();
    setIsInit(false);
  }, []);

  useEffect(() => {
    if(!is_init && query?.length){
        getBlogList();
    }
  }, [query]);

  const getBlogList = async () => {
    setLoading(true);

    const response = (await getAllBlogs({ query })) || [];
    if (response && response?.status === 200) {
      setBlogList(response?.data?.posts || []);
    }
    setLoading(false);
  };

  const renderBlogitems = () => {
    if (blog_list?.length === 0 && !loading)
      return <NoDataComponent className="mt-24" />;
    return blog_list?.map((item, index) => {
      return <BlogItem data={item} is_last={index === blog_list?.length - 1} />;
    });
  };

  return (
    <div className="w-full max-w-[900px] min-h-screen mx-auto">
      <div className="flex gap-4 mb-4 px-3"></div>
      <div className="mt-4">
        {loading ? <BlogItemLoader /> : renderBlogitems()}
      </div>
    </div>
  );
};

export default BlogList;

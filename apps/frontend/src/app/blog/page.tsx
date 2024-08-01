"use client";
import React, { useEffect, useState } from "react";
import BlogItem from "@/components/common/Blog/BlogItem";
import { getAllBlogs } from "@/api/api";
import BlogItemLoader from "@/components/common/Blog/BlogItemLoader";

const page = () => {
  const [blog_list, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBlogList();
  }, []);

  const getBlogList = async () => {
    setLoading(true);
    const response = (await getAllBlogs()) || [];
    if (response && response?.status === 200) {
      setBlogList(response?.data?.posts || []);
    }
    setLoading(false);
  };

  const renderBlogitems = () => {
    return blog_list?.map((item) => {
      return <BlogItem data={item}/>;
    });
  };

  return (
    <div className="w-full max-w-[900px] mt-8 min-h-screen mx-auto">
      {/* <Tabs defaultValue="for-you">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="for-you">For You</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
      </Tabs> */}
      <div className="mt-4">
        {loading ? <BlogItemLoader /> : renderBlogitems()}
      </div>
    </div>
  );
};

export default page;

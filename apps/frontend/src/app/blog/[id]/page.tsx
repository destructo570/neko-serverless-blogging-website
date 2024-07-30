"use client";
import React, { useEffect, useMemo, useState } from "react";
import { getSingleBLog } from "@/api/api";
import BlogEditor from "@/components/common/Editor/BlogEditor";
import BlogPostLoader from "@/components/common/Blog/BlogPostLoader";

const page = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(true);
  const [blog_data, setBlogData] = useState({});

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      const response = await getSingleBLog(`${params?.id}` || "");
      if (response && response?.status === 200) {
        setBlogData(response?.data?.post);
      }
      setLoading(false);
    };

    if (params?.id) {
      fetchBlogData();
    }
  }, [params?.id]);

  return (
    <div className="w-full flex justify-center min-h-screen min-w-[783px]">
      <div className="px-24 py-12 prose lg:prose-2xl min-w-[783px] box-content">
        {loading ? (
          <BlogPostLoader />
        ) : (
          <>
            <h2 className="font-extrabold">{blog_data?.title}</h2>
            {blog_data?.content ? (
              <BlogEditor
                classes="min-h-screen"
                content={JSON.parse(blog_data?.content || "{}")}
                disable_edit={true}
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default page;

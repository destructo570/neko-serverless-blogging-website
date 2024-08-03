"use client";
import React, { useEffect, useMemo, useState } from "react";
import { deleteBlog, getSingleBLog } from "@/api/api";
import BlogEditor from "@/components/common/Editor/BlogEditor";
import BlogPostLoader from "@/components/common/Blog/BlogPostLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog/ConfirmationDialog";
import { useRouter } from "next/navigation";
import useLogin from "@/hooks/useLogin";

const page = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(true);
  const [delete_loading, setDeleteLoading] = useState(false);
  const [blog_data, setBlogData] = useState({});
  const { push } = useRouter();
  const { profile } = useLogin();
    
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

  const onDeletePost = async () => {
    setDeleteLoading(true);
    const response = await deleteBlog(`${params?.id}` || "");
    if (response && response?.status === 200) {
      setBlogData(response?.data?.post);
      push("/blog");
    }
    setDeleteLoading(false);
  };

  const onEditPost = () => {
    push(`/blog/create?post_id=${params?.id}`);
  }

  const author_name = useMemo(() => {
    return `${blog_data?.author?.first_name} ${blog_data?.author?.last_name}`;
  }, [blog_data]);

  return (
    <>
      <div className="w-full flex justify-center min-h-screen min-w-[783px]">
        <div className="px-24 py-12 min-w-[783px] box-content">
          {loading ? (
            <BlogPostLoader />
          ) : (
            <div className="flex flex-col justify-center items-center">
              <div className="min-w-[783px] max-w-[783px]">
                <h2 className="font-extrabold text-5xl">{blog_data?.title}</h2>
                <div className="flex gap-2 justify-between items-center">
                  <div className="flex gap-2 items-center mt-6 mb-10">
                    <Avatar className="h-[64px] w-[64px]">
                      <AvatarImage src="https://picsum.photos/64/64" alt="" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium my-0">{author_name}</p>
                      <p className="text-xs text-zinc-600 my-0">
                        {Dayjs(blog_data?.created).format("MMM DD")}
                      </p>
                    </div>
                  </div>
                  {profile?.id === blog_data?.author?.id ? <div className="flex gap-2 items-center">
                    <ConfirmationDialog
                      heading="Delete post"
                      confirmation_text="Are you sure you want to delete this post?"
                      onConfirmClick={delete_loading ? () => {} : onDeletePost}
                      trigger_component={
                        <Button variant={"destructive"}>Delete post</Button>
                      }
                    />
                      <Button variant={"outline"} onClick={onEditPost}>Edit post</Button>
                  </div>: null}
                </div>
              </div>
              <img
                src="https://picsum.photos/900/500"
                className="my-4 rounded-xl"
                alt=""
                width={900}
                height={500}
              />
              <div className="prose lg:prose-2xl max-w-[783px] min-w-[783px]">
                {blog_data?.content ? (
                  <BlogEditor
                    classes="min-h-screen"
                    content={JSON.parse(blog_data?.content || "{}")}
                    disable_edit={true}
                  />
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;

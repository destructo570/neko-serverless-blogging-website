"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { deleteBlog, getSingleBlog, likeBlog } from "@/api/api";
import BlogEditor from "@/components/common/Editor/BlogEditor";
import BlogPostLoader from "@/components/common/Blog/BlogPostLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog/ConfirmationDialog";
import { useRouter } from "next/navigation";
import useLogin from "@/hooks/useLogin";
import { PostType } from "../../../../../../packages/common/dist";
import { Heart, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Liked from "@/components/common/Icons/Liked";
import { debounce } from "@/lib/utils";

const page = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(true);
  const [liking, setLiking] = useState(false);
  const [delete_loading, setDeleteLoading] = useState(false);
  const [has_liked, setHasLiked] = useState(false);
  const [like_count, setLikeCount] = useState(0);
  const [hit_count, setHitCount] = useState(0);
  const [blog_data, setBlogData] = useState<PostType>();
  const { push } = useRouter();
  const { profile } = useLogin();

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      const response = await getSingleBlog(`${params?.id}` || "");
      if (response && response?.status === 200) {
        setBlogData(response?.data?.post);
      }
      setLoading(false);
    };

    if (params?.id) {
      fetchBlogData();
    }
  }, [params?.id]);
  
  useEffect(() => {
    if (blog_data?.likes?.find((like) => like?.userId === profile?.id)) {
      setHasLiked(true);
    }
    let like_count = 0;
    blog_data?.likes?.forEach(item => like_count = item?.likes_count + like_count);
    setLikeCount(like_count);
  }, [blog_data]);

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
  };

  const onLikePost = useCallback(
    debounce(async (hit_count) => {
      if (!profile?.id) return;
      setLiking(true);
      try {
        // setHasLiked(true);
        // setLikeCount((prev) => prev + hit_count);
        const response = await likeBlog(
          `${params?.id}` || "",
          profile?.id || "",
          hit_count
        );
        if (response && response?.status !== 200) {
          // setHasLiked(false);
          setLikeCount((prev) => prev - hit_count);
        }
      } catch (err) {
        // setHasLiked(false);
        setLikeCount((prev) => prev - hit_count);
      } finally {
        setLiking(false);
        setHitCount(0);
      }
    }),
    [profile]
  );

  const handleLike = () => {
    setHitCount((prev) => prev + 1);
    setLikeCount((prev) => prev + 1);
  };

  useEffect(() => {
    if(hit_count > 0){
      onLikePost(hit_count);
    }
  }, [hit_count]);

  const author_name = useMemo(() => {
    return `${blog_data?.author?.first_name} ${blog_data?.author?.last_name}`;
  }, [blog_data]);

  return (
    <>
      <div className="w-full flex justify-center min-h-screen sm:min-w-[783px]">
        <div className="px-6 sm:px-24 py-12 sm:min-w-[783px] w-full">
          {loading ? (
            <BlogPostLoader />
          ) : (
            <div className="flex flex-col justify-center sm:items-center">
              <div className="sm:min-w-[783px] max-w-[783px] w-full sm:px-8">
                <h2 className="font-extrabold text-5xl">{blog_data?.title}</h2>
                <div className="flex gap-2 justify-between items-center">
                  <div className="flex gap-2 items-center mt-6 mb-10">
                    <Avatar className="h-[64px] w-[64px]">
                      <AvatarImage src="https://picsum.photos/64/64" alt="" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium my-0">{author_name}</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 my-0">
                        {Dayjs(blog_data?.createdAt).format("MMM DD")}
                      </p>
                    </div>
                  </div>
                  {profile?.id === blog_data?.author?.id ? (
                    <div className="flex gap-2 items-center">
                      <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={handleLike}
                      >
                        {has_liked ? (
                          <Liked color="#09090B" size={28} className="like-button"/>
                        ) : (
                          <Liked size={28} className="like-button"/>
                        )}
                        <p className="text-sm">{like_count || 0}</p>
                      </div>
                      <ConfirmationDialog
                        heading="Delete post"
                        confirmation_text="Are you sure you want to delete this post?"
                        onConfirmClick={
                          delete_loading ? () => {} : onDeletePost
                        }
                        trigger_component={
                          <Button variant={"destructive"}>Delete post</Button>
                        }
                      />
                      <Button variant={"outline"} onClick={onEditPost}>
                        Edit post
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
              <img
                src="https://picsum.photos/900/500"
                className="my-4 rounded-xl"
                alt=""
                width={900}
                height={500}
              />
              <div className="prose lg:prose-2xl max-w-[783px] sm:min-w-[783px] sm:px-8">
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

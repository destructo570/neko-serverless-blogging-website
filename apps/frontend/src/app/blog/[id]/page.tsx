"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { deleteBlog, getSingleBlog, likeBlog } from "@/app/api/actions";
import BlogEditor from "@/components/common/Editor/BlogEditor";
import BlogPostLoader from "@/components/common/Blog/BlogPostLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog/ConfirmationDialog";
import { useRouter } from "next/navigation";
import { PostType } from "@repo/common/config";
import { PencilIcon, Trash2 } from "lucide-react";
import Liked from "@/components/common/Icons/Liked";
import { debounce } from "@/lib/utils";
import clsx from "clsx";
import { playfair_display, source_serif_4 } from "@/app/fonts";
import useProfile from "@/hooks/useProfile";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CommentSection from "@/components/common/Comments/CommentSection";

const page = ({ params }: { params: { id: string } }) => {
  const [delete_loading, setDeleteLoading] = useState(false);
  const [has_liked, setHasLiked] = useState(false);
  const [like_count, setLikeCount] = useState(0);
  const [hit_count, setHitCount] = useState(0);
  const [blog_data, setBlogData] = useState<PostType>();
  const { push } = useRouter();
  const { profile } = useProfile();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const fetchBlogData = async () => {
    const response = await getSingleBlog(`${params?.id}` || "");
    return response?.data?.post;
  };

  const { data, isFetching: loading } = useQuery({
    queryKey: ["post"],
    queryFn: fetchBlogData,
  });

  useEffect(() => {
    setBlogData(data);
  }, [data]);

  useEffect(() => {
    if (blog_data?.likes?.find((like) => like?.userId === profile?.id)) {
      setHasLiked(true);
    }
    let like_count = 0;
    blog_data?.likes?.forEach(
      (item) => (like_count = item?.count + like_count)
    );
    setLikeCount(like_count);
  }, [blog_data]);

  const onDeletePost = async () => {
    setDeleteLoading(true);
    await deleteBlog(`${params?.id}` || "");
    setDeleteLoading(false);
  };

  // Mutation to delete a post
  const deletePostMutation = useMutation({
    mutationFn: () => onDeletePost(),
    onSuccess: () => {
      invalidatePostsCache();
      // Navigate back to the posts list after successful deletion
      push("/blog");
    },
  });

  const invalidatePostsCache = () => {
    queryClient.setQueryData(["posts"], () => ({
      pages: [],
      pageParams: 1,
    }));
    queryClient.invalidateQueries({
      queryKey: ["posts"],
      exact: true,
    });
  };

  const onEditPost = () => {
    push(`/blog/create?post_id=${params?.id}`);
  };

  const onLikePost = useCallback(
    debounce(async (hit_count) => {
      if (!profile?.id) return;
      try {
        const response = await likeBlog(
          `${params?.id}` || "",
          profile?.id || "",
          hit_count
        );
        invalidatePostsCache();
        if (response && response?.status !== 200) {
          setLikeCount((prev) => prev - hit_count);
        }
      } catch (err) {
        setLikeCount((prev) => prev - hit_count);
      } finally {
        setHitCount(0);
      }
    }),
    [profile]
  );

  const handleLike = () => {
    setHitCount((prev) => prev + 1);
    setHasLiked(true);
    setLikeCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (hit_count > 0) {
      onLikePost(hit_count);
    }
  }, [hit_count]);

  const author_name = useMemo(() => {
    return `${blog_data?.author?.first_name} ${blog_data?.author?.last_name}`;
  }, [blog_data]);

  return (
    <>
      <div
        className={clsx(
          "w-full flex flex-col items-center min-h-screen sm:min-w-[783px]"
        )}
      >
        <div className="px-6 sm:px-24 py-12 sm:min-w-[783px] w-full">
          {loading ? (
            <BlogPostLoader />
          ) : (
            <div className="flex flex-col justify-center sm:items-center">
              <div className="sm:min-w-[783px] max-w-[783px] w-full sm:px-8">
                <h2
                  className={clsx(
                    "font-semibold text-5xl break-words",
                    playfair_display.className
                  )}
                >
                  {blog_data?.title}
                </h2>
                <div className="flex gap-2 justify-between items-center">
                  <div className="flex gap-2 items-center mt-6 mb-10">
                    <Avatar className="h-[64px] w-[64px]">
                      <AvatarImage src={"/images/fallback_avatar.png"} alt="" />
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium my-0">{author_name}</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 my-0">
                        {Dayjs(blog_data?.createdAt).format("MMM DD")}
                      </p>
                    </div>
                  </div>
                  {session && profile?.id ? (
                    <div className="flex gap-2 items-center">
                      <div className="flex gap-1 items-center">
                        <Button
                          variant={"outline"}
                          onClick={handleLike}
                          size="icon"
                          className="like-button"
                        >
                          {has_liked ? (
                            <Liked color="#EF4444" size={22} />
                          ) : (
                            <Liked size={22} />
                          )}
                          <p className="text-xs min-w-[16px]">
                            {like_count || 0}
                          </p>
                        </Button>
                      </div>
                      {profile?.id === blog_data?.author?.id ? (
                        <>
                          <ConfirmationDialog
                            heading="Delete post"
                            confirmation_text="Are you sure you want to delete this post?"
                            onConfirmClick={
                              delete_loading
                                ? () => {}
                                : deletePostMutation.mutate
                            }
                            trigger_component={
                              <Button variant={"outline"} size="icon">
                                <Trash2 color="#EF4444" size={18} />
                              </Button>
                            }
                          />
                          <Button
                            variant={"outline"}
                            onClick={onEditPost}
                            size="icon"
                          >
                            <PencilIcon color="#27272A" size={18} />
                          </Button>
                        </>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
              <Image
                src={blog_data?.coverImage}
                className="my-4 rounded-xl"
                alt=""
                width={900}
                height={500}
              />
              <div className="prose lg:prose-2xl max-w-[783px] sm:min-w-[783px] sm:px-8">
                {blog_data?.content ? (
                  <BlogEditor
                    classes={clsx("min-h-screen", source_serif_4.className)}
                    content={JSON.parse(blog_data?.content || "{}")}
                    disable_edit={true}
                  />
                ) : null}
              </div>
              {<CommentSection blog_data={blog_data} />}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;

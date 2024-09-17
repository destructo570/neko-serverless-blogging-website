import React, { useEffect, useMemo, useState } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { postComment } from "@/app/api/actions";
import { CreateCommentType, PostType } from "@repo/common/config";
import Dayjs from "dayjs";

interface PropType {
  blog_data: PostType;
}

const CommentSection = ({ blog_data }: PropType) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<CreateCommentType[]>([]);

  useEffect(() => {
    if (!blog_data?.comments) return;
    setComments(blog_data?.comments);
  }, [blog_data?.comments]);

  const commentsByParentId: Record<string, CreateCommentType[]> =
    useMemo(() => {
      const group = {};
      comments?.forEach((comment) => {
        //@ts-ignore
        group[comment?.parentId] ||= [];
        //@ts-ignore
        group[comment?.parentId].push(comment);
      });
      return group;
    }, [comments]);

  const createComment = async (message: string) => {
    const payload = {
      message,
      postId: blog_data?.id,
    };

    setLoading(true);
    const response = await postComment(payload);
    if (response && response?.status === 200) {
      createLocalComment(response?.data?.comment);
    }
    setLoading(false);
  };

  const createLocalComment = (comment: CreateCommentType, action="") => {
    if (action === "update") {
      setComments((prev) => {
        let new_list = [...prev];
        new_list = new_list.map((item) => {
          if (item?.id === comment?.id) {
            item.message = comment.message;
          }
          return item;
        });
        return new_list;
      });
    } else if (action === "delete") {
      setComments((prev) => {
        let new_list = [...prev];
        new_list = new_list.filter((item) => item?.id !== comment?.id);
        return new_list;
      });
    } else {
      setComments((prev) => [comment, ...prev]);
    }
  };

  const root_comments = useMemo(() => {
    const data = commentsByParentId["null"] || [];
    data.sort((a, b) => Dayjs(b.createdAt).valueOf() - Dayjs(a.createdAt).valueOf());
    return data;
  },    [commentsByParentId]);

  const getNestedComments = (parentId: string) => {
    return commentsByParentId[parentId];
  };

  return (
    <div className="w-full mt-16">
      <p className="text-2xl font-semibold">Comments</p>
      <CommentForm loading={loading} onReply={createComment} />
      <section>
        {root_comments && root_comments?.length ? (
          <CommentList
            comments={root_comments}
            getNestedComments={getNestedComments}
            postId={blog_data?.id}
            createLocalComment={createLocalComment}
          />
        ) : null}
      </section>
    </div>
  );
};

export default CommentSection;

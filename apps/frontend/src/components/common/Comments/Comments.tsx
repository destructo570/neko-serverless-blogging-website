import React, { useEffect, useMemo, useState } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { postComment } from "@/app/api/actions";

const Comments = ({ blog_data }) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!blog_data?.comments) return;
    setComments(blog_data?.comments);
  }, [blog_data?.comments]);

  const commentsByParentId = useMemo(() => {
    const group = {};
    comments?.forEach((comment) => {
      group[comment?.parentId] ||= [];
      group[comment?.parentId].push(comment);
    });
    return group;
  }, [comments]);

  const createComment = async (comment) => {
    const payload = {
      message: comment,
      postId: blog_data?.id,
    };

    setLoading(true);
    const response = await postComment(payload);
    if (response && response?.status === 200) {
      createLocalComment(response?.data?.comment);
    }
    setLoading(false);
  };

  const createLocalComment = (comment, action = null) => {
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

  const root_replies = commentsByParentId[null];

  const getReplies = (parentId) => {
    return commentsByParentId[parentId];
  };

  return (
    <div className="w-full mt-16">
      <p className="text-2xl font-semibold">Comments</p>
      <CommentForm loading={loading} onReply={createComment} autoFocus={true} />
      <section>
        {root_replies && root_replies?.length ? (
          <CommentList
            comments={root_replies}
            getReplies={getReplies}
            postId={blog_data?.id}
            createLocalComment={createLocalComment}
          />
        ) : null}
      </section>
    </div>
  );
};

export default Comments;

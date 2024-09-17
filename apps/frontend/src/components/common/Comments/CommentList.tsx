import React from "react";
import Comment from "./Comment";
import { CreateCommentType } from "@repo/common/config";

interface PropType {
  postId: string;
  comments: CreateCommentType[];
  getNestedComments: (parentId: string) => CreateCommentType[];
  createLocalComment: (comment: CreateCommentType, action?: string) => void;
}

const CommentList = (props: PropType) => {
  const { postId, comments, getNestedComments, createLocalComment } = props;
  return (
    <div className="">
      {comments?.map((comment) => (
        <div key={comment?.id}>
          <Comment
            comment={comment}
            getNestedComments={getNestedComments}
            postId={postId}
            createLocalComment={createLocalComment}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentList;

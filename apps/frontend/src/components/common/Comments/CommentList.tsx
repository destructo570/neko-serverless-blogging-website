import React from "react";
import Comment from "./Comment";

const CommentList = ({ postId, comments, getReplies, createLocalComment }) => {
  return (
    <div className="">
      {comments?.map((comment) => (
        <div key={comment?.id}>
          <Comment
            {...comment}
            getReplies={getReplies}
            postId={postId}
            createLocalComment={createLocalComment}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentList;

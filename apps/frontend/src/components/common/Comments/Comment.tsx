import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useProfile from "@/hooks/useProfile";
import Dayjs from "dayjs";
import { PencilIcon, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";
import clsx from "clsx";
import CommentList from "./CommentList";
import { deleteComment, postComment, updateComment } from "@/app/api/actions";
import CommentForm from "./CommentForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Comment = (props) => {
  const {
    id,
    message,
    user,
    createdAt,
    getReplies = () => {},
    postId,
    createLocalComment = () => {},
  } = props;
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [has_liked, setHasLiked] = React.useState(false);
  const [isReplying, setIsReplying] = React.useState(false);
  const [delete_loading, setDeleteLoading] = React.useState(false);
  const [comment_loading, setCommentLoading] = React.useState(false);
  const [like_count, setLikeCount] = React.useState(0);
  const { data: session } = useSession();
  const { profile } = useProfile();

  const author_name = user?.first_name + " " + user?.last_name;

  const handleLike = () => {};

  const onDeleteComment = async () => {
    setDeleteLoading(true);
    const response = await deleteComment(id);
    if (response && response?.status === 200) {
      //Add logic to update comment data
      setDeleteDialogOpen(false);
      createLocalComment(response?.data?.comment, "delete");
    }
    setDeleteLoading(false);
  };

  const createComment = async (comment) => {
    const payload = {
      message: comment,
      postId: postId,
      parentId: id,
    };

    setCommentLoading(true);
    const response = await postComment(payload);
    if (response && response?.status === 200) {
      createLocalComment(response?.data?.comment);
      setIsReplying(false);
    }
    setCommentLoading(false);
  };

  const onUpdateComment = async (comment) => {
    const payload = {
      message: comment,
    };

    setCommentLoading(true);
    const response = await updateComment(id, payload);

    if (response && response?.status === 200) {
      createLocalComment(response?.data?.comment, "update");
      setIsReplying(false);
      setEditDialogOpen(false);
    }
    setCommentLoading(false);
  };

  const onEditPost = () => {};

  const child_comments = getReplies(props?.id);

  const renderActionDialog = () => {
    return (
      <Dialog
        open={editDialogOpen}
        onOpenChange={(val) => setEditDialogOpen(val)}
      >
        <DialogTrigger asChild>
          <Button variant={"ghost"} onClick={onEditPost} size="icon">
            <PencilIcon color="#52525B" size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="margin-top-0">Edit Comment</DialogTitle>
          </DialogHeader>
          <CommentForm
            loading={comment_loading}
            onReply={onUpdateComment}
            autoFocus={true}
            initialValue={message}
            is_update
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderActions = () => {
    return (
      <>
        {session && profile?.id ? (
          <div className="flex gap-2 items-center">
            {/* <div className="flex gap-1 items-center">
              <Button
                variant={"ghost"}
                onClick={handleLike}
                size="icon"
                className="like-button"
              >
                {has_liked ? (
                  <Liked color="#EF4444" size={22} />
                ) : (
                  <Liked size={22} />
                )}
                <p className="text-xs min-w-[16px]">{like_count || 0}</p>
              </Button>
            </div> */}
            {profile?.id === user?.id ? (
              <>
                <ConfirmationDialog
                  open={deleteDialogOpen}
                  onOpenChange={(open) => setDeleteDialogOpen(open)}
                  heading="Delete comment"
                  confirmation_text="Are you sure you want to delete this comment?"
                  onConfirmClick={delete_loading ? () => {} : onDeleteComment}
                  trigger_component={
                    <Button variant={"ghost"} size="icon">
                      <Trash2 color="#52525B" size={18} />
                    </Button>
                  }
                />
                {renderActionDialog()}
              </>
            ) : null}
          </div>
        ) : null}
      </>
    );
  };

  const [areChildrenHidden, setAreChildrenHidden] = useState(false);

  return (
    <>
      <div className="border-b border-zinc-200 w-full">
        <div className="flex gap-2 items-center mt-6 mb-4">
          <Avatar className="h-[64px] w-[64px]">
            <AvatarImage src={"/images/fallback_avatar.png"} alt="" />
            <Image
              src={"/images/fallback_avatar.png"}
              alt="avatar"
              width={24}
              height={24}
            />
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium my-0">{author_name}</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 my-0">
              {Dayjs(createdAt).format("MMM DD YYYY")}
            </p>
          </div>
        </div>
        <div className="mx-3">{message}</div>
        <div className="flex gap-2 justify-between items-center py-4">
          {renderActions()}
          <Button
            variant="outline"
            onClick={() => setIsReplying((prev) => !prev)}
          >
            {isReplying ? "Cancel" : "Reply"}
          </Button>
        </div>
      </div>
      {isReplying ? (
        <div className="mt-1 ml-3">
          <CommentForm
            loading={comment_loading}
            onReply={createComment}
            autoFocus={true}
          />
        </div>
      ) : null}
      {child_comments && child_comments?.length ? (
        <>
          <div className={clsx("flex", { hidden: areChildrenHidden })}>
            <button
              className="collapse-line"
              aria-label="hide-replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="nested-comments">
              <CommentList
                comments={child_comments}
                getReplies={getReplies}
                postId={postId}
                createLocalComment={createLocalComment}
              />
            </div>
          </div>
          <Button
            className={clsx("mt-2", { hidden: !areChildrenHidden })}
            aria-label="show-replies"
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </Button>
        </>
      ) : null}
    </>
  );
};

export default Comment;

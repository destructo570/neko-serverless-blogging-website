import React, { useState } from "react";
import useProfile from "@/hooks/useProfile";
import Dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
Dayjs.extend(localizedFormat);
import clsx from "clsx";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  MessageSquareOff,
  PencilIcon,
  Trash2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";
import { deleteComment, postComment, updateComment } from "@/app/api/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateCommentType } from "@repo/common/config";

interface PropType {
  comment: CreateCommentType;
  getNestedComments: (parentId: string) => CreateCommentType[];
  postId: string;
  createLocalComment: (comment: CreateCommentType, action?: string) => void;
}

const Comment = (props: PropType) => {
  const { comment, getNestedComments, postId, createLocalComment } = props;

  const { id, message, user, createdAt } = comment || {};

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [isReplying, setIsReplying] = React.useState(false);
  const [delete_loading, setDeleteLoading] = React.useState(false);
  const [comment_loading, setCommentLoading] = React.useState(false);
  const { data: session } = useSession();
  const { profile } = useProfile();

  const author_name = user?.first_name + " " + user?.last_name;

  const onDeleteComment = async () => {
    setDeleteLoading(true);
    const response = await deleteComment(id);
    if (response && response?.status === 200) {
      setDeleteDialogOpen(false);
      createLocalComment(response?.data?.comment, "delete");
    }
    setDeleteLoading(false);
  };

  const createComment = async (message: string) => {
    const payload = {
      message,
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

  const onUpdateComment = async (message: string) => {
    const payload = {
      message,
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

  const child_comments = id ? getNestedComments(id) : [];

  const renderEditCommentDialog = () => {
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

  const renderDeleteCommentDialog = () => {
    return (
      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={(open: boolean) => setDeleteDialogOpen(open)}
        heading="Delete comment"
        confirmation_text="Are you sure you want to delete this comment?"
        onConfirmClick={delete_loading ? () => {} : onDeleteComment}
        trigger_component={
          <Button variant={"ghost"} size="icon">
            <Trash2 color="#52525B" size={18} />
          </Button>
        }
      />
    );
  };

  const renderActions = () => {
    return (
      <>
        {session && profile?.id ? (
          <div className="flex gap-2 items-center">
            {profile?.id === user?.id ? (
              <>
                {renderEditCommentDialog()}
                {renderDeleteCommentDialog()}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsReplying((prev) => !prev)}
                  className={clsx("flex items-center gap-2", {"text-red-500 hover:text-red-500": isReplying})}
                >
                  {isReplying ? (
                    <MessageSquareOff color="#EF4444" size={18} />
                  ) : (
                    <MessageSquare color="#52525B" size={18} />
                  )}
                  {isReplying ? "Cancel" : "Reply"}
                </Button>
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
        <div className="flex gap-2 items-center mt-4">
          <Avatar className="h-[32px] w-[32px]">
            <AvatarImage src={"/images/fallback_avatar.png"} alt="" />
          </Avatar>
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium my-0">{author_name}</p>
            <p className="text-zinc-600 dark:text-zinc-300 my-0">•</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 my-0">
              {Dayjs(createdAt).format("lll")}
            </p>
          </div>
        </div>
        <p className="ml-[40px] text-sm">{message}</p>
        <div className="ml-[32px] flex gap-2 justify-between items-center py-2">
          {renderActions()}
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
                getNestedComments={getNestedComments}
                postId={postId}
                createLocalComment={createLocalComment}
              />
            </div>
          </div>
          <Button
            className={clsx("mt-2", { hidden: !areChildrenHidden })}
            aria-label="show-replies"
            size="sm"
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

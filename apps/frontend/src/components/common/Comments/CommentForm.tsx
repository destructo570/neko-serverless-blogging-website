import { Button } from "@/components/ui/button";
import React from "react";
import { AutosizeTextarea } from "../AutoResizeTextArea";
import clsx from "clsx";

const CommentForm = ({
  loading = false,
  onReply = async () => {},
  autoFocus = false,
  initialValue,
  is_update = false,
}) => {
  const [value, setValue] = React.useState(initialValue);

  const onClick = async () => {
    await onReply(value);
    setValue("");
  };

  return (
    <div
      className={clsx("w-full flex gap-4 items-start justify-between mt-4", {
        "flex-col": is_update,
      })}
    >
      <AutosizeTextarea
        placeholder="Type your comment here..."
        className="w-full"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus={autoFocus}
        maxLength={260}
      />
      <div className={clsx("flex", { "justify-end w-full": is_update })}>
        <Button onClick={onClick} disabled={loading}>
          {is_update ? "Update" : "Reply"}
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;

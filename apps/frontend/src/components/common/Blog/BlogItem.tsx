"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";

const BlogItem = (props) => {
  const { data } = props;
  const { push } = useRouter();

  const redirectToBlog = () => {
    push(`/blog/${data?.id}`);
  };

  return (
    <div
      className="grid gap-2 p-4 bg-background border-b cursor-pointer"
      onClick={redirectToBlog}
    >
      <div className="flex gap-2 items-center">
        <Avatar className="h-[20px] w-[20px]">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium">Shadcn</p>
      </div>
      <div className="flex gap-4 items-start justify-between">
        <div className="item-start">
          <h3 className="text-2xl font-bold">{data?.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {data?.description}
          </p>
          <div className="flex gap-4 items-center mt-6">
            <p className="text-xs text-zinc-600">Jun 11</p>
            <div className="flex gap-1 items-center">
              <ThumbsUp fill="#c9c9c9" color="#c9c9c9" size={16} />
              <p className="text-xs text-zinc-600">2k</p>
            </div>
            <div className="flex gap-1 items-center">
              <MessageCircle fill="#c9c9c9" color="#c9c9c9" size={16} />
              <p className="text-xs text-zinc-600">11</p>
            </div>
          </div>
        </div>
        <img src="https://picsum.photos/200/100" className="rounded-sm" />
      </div>
    </div>
  );
};

export default BlogItem;

"use client";
import React, { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import DayJs from "dayjs";
import useDarkTheme from "@/hooks/useDarkTheme";
import clsx from "clsx";

const BlogItem = (props) => {
  const { data, is_last=false } = props;
  const { push } = useRouter();
  const is_dark_theme = useDarkTheme();

  const redirectToBlog = () => {
    push(`/blog/${data?.id}`);
  };

  const author_name = useMemo(() => {
    return `${data?.author?.first_name} ${data?.author?.last_name}`;
  }, [data]);

  const like_count = useMemo(() => {
    let count = 0;
    
    data?.likes?.forEach(like => count = count + (like?.likes_count || 0));
    return count;
  }, [data]);

  return (
    <div
      className={clsx('grid gap-2 p-4 bg-background cursor-pointer', {'border-b': !is_last})}
      onClick={redirectToBlog}
    >
      <div className="flex gap-2 items-center">
        <Avatar className="h-[20px] w-[20px]">
          <AvatarImage src="https://picsum.photos/20/20" alt="" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium">{author_name}</p>
      </div>
      <div className="flex gap-4 items-start justify-between">
        <div className="item-start">
          <h3 className="text-2xl font-bold line-clamp-2 break-words max-w-[650px]">{data?.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 break-words max-w-[650px]">
            {data?.description}
          </p>
          <div className="flex gap-4 items-center mt-6">
            <p className="text-xs text-zinc-600">
              {DayJs(data?.created).format("MMM DD")}
            </p>
            <div className="flex gap-1 items-center">
              <Heart fill={is_dark_theme ? "#52525B" : "#c9c9c9"} color={is_dark_theme ? "#52525B" : "#c9c9c9"} size={16} />
              <p className="text-xs text-zinc-600">{like_count || 0}</p>
            </div>
            <div className="flex gap-1 items-center">
              <MessageCircle fill={is_dark_theme ? "#52525B" : "#c9c9c9"} color={is_dark_theme ? "#52525B" : "#c9c9c9"} size={16} />
              <p className="text-xs text-zinc-600">{data?._count?.comments || 0}</p>
            </div>
          </div>
        </div>
        <img src="https://picsum.photos/200/100" className="rounded-sm" />
      </div>
    </div>
  );
};

export default BlogItem;

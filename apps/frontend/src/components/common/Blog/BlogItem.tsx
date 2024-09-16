"use client";
import React, { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import DayJs from "dayjs";
import useDarkTheme from "@/hooks/useDarkTheme";
import clsx from "clsx";
import Image from "next/image";

const BlogItem = (props) => {
  const { data, is_last = false } = props;
  const { push } = useRouter();
  const is_dark_theme = useDarkTheme();

  const redirectToBlog = () => {
    push(`/blog/${data?.id}`);
  };

  const author_name = useMemo(() => {
    return `${data?.author?.first_name} ${data?.author?.last_name}`;
  }, [data]);

  return (
    <div
      className={clsx("grid gap-2 p-4 bg-background cursor-pointer", {
        "border-b": !is_last,
      })}
      onClick={redirectToBlog}
    >
      <div className="flex gap-2 items-center">
        <Avatar className="h-[20px] w-[20px]">
          <AvatarImage src={"/images/fallback_avatar.png"} alt="" />
          <AvatarFallback>
            <Image
              src={"/images/fallback_avatar.png"}
              alt="avatar"
              width={24}
              height={24}
            />
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium">{author_name}</p>
      </div>
      <div className="flex gap-4 items-start justify-between">
        <div className="item-start">
          <h3 className="text-2xl font-bold line-clamp-2 break-words max-w-[650px]">
            {data?.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 break-words max-w-[650px]">
            {data?.description}
          </p>
          <div className="flex gap-4 items-center mt-6">
            <p className="text-xs text-zinc-600">
              {DayJs(data?.created).format("MMM DD")}
            </p>
            <div className="flex gap-1 items-center">
              <Heart
                fill={is_dark_theme ? "#52525B" : "#c9c9c9"}
                color={is_dark_theme ? "#52525B" : "#c9c9c9"}
                size={16}
              />
              <p className="text-xs text-zinc-600">{data?.likes_count || 0}</p>
            </div>
            <div className="flex gap-1 items-center">
              <MessageCircle
                fill={is_dark_theme ? "#52525B" : "#c9c9c9"}
                color={is_dark_theme ? "#52525B" : "#c9c9c9"}
                size={16}
              />
              <p className="text-xs text-zinc-600">
                {data?._count?.comments || 0}
              </p>
            </div>
          </div>
        </div>
        {data?.coverImage ? <Image src={data?.coverImage} width={200} height={100} className="rounded-sm max-w-[200px] min-w-[200px] h-[100px] object-cover" alt=""/> : null}
      </div>
    </div>
  );
};

export default BlogItem;

import React from "react";
import Skeleton from "react-loading-skeleton";

const BlogPostLoader = () => {
  return (
    <div className="flex flex-col gap-2 w-[783px]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 ml-2">
          <div className="flex flex-col gap-3">
            <Skeleton width={"100%"} height={40} />
            <Skeleton width={"60%"} height={40} />
          </div>
          <div className="flex flex-col mt-10">
            <Skeleton width={"100%"} height={24} />
            <Skeleton width={"90%"} height={24} />
            <Skeleton width={"80%"} height={24} />
            <Skeleton width={"85%"} height={24} />
            <Skeleton width={"80%"} height={24} />
            <Skeleton width={"90%"} height={24} />
            <Skeleton width={"85%"} height={24} />
            <Skeleton width={"95%"} height={24} />
            <Skeleton width={"80%"} height={24} />
            <Skeleton width={"90%"} height={24} />
            <Skeleton width={"80%"} height={24} />
            <Skeleton width={"85%"} height={24} />
            <Skeleton width={"80%"} height={24} />
            <Skeleton width={"90%"} height={24} />
            <Skeleton width={"85%"} height={24} />
            <Skeleton width={"95%"} height={24} />
            <Skeleton width={"80%"} height={24} />
            <Skeleton width={"90%"} height={24} />
            <Skeleton width={"80%"} height={24} />
            <Skeleton width={"85%"} height={24} />
            <Skeleton width={"80%"} height={24} />
            <Skeleton width={"90%"} height={24} />
            <Skeleton width={"85%"} height={24} />
            <Skeleton width={"95%"} height={24} />
            <Skeleton width={"80%"} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostLoader;

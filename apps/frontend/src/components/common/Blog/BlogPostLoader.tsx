import React from "react";
import Skeleton from "react-loading-skeleton";

const BlogPostLoader = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 ml-2 justify-center items-center w-full">
          <div className="min-w-[783px] max-w-[783px]">
            <div className="flex flex-col gap-3">
              <Skeleton width={"100%"} height={40} />
              <Skeleton width={"60%"} height={40} />
            </div>
            <div className="flex gap-2 my-4">
              <Skeleton width={64} height={64} borderRadius={"100%"} />
              <div className="w-full flex flex-col justify-center">
                <Skeleton width={"20%"} height={16} />
                <Skeleton width={"10%"} height={16} />
              </div>
            </div>
          </div>
        </div>
        <Skeleton width={900} height={500} borderRadius={12} />
        <div className="flex justify-center">
          <div className="flex flex-col mt-10 gap-2 w-[783px] ">
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

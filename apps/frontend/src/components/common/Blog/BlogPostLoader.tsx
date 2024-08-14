import React from "react";
import SkeletonLoader from "../Skeleton";

const BlogPostLoader = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 ml-2 justify-center items-center w-full">
          <div className="min-w-[783px] max-w-[783px]">
            <div className="flex flex-col gap-3">
              <SkeletonLoader width={"100%"} height={40} />
              <SkeletonLoader width={"60%"} height={40} />
            </div>
            <div className="flex gap-2 my-4">
              <SkeletonLoader width={64} height={64} borderRadius={"100%"} />
              <div className="w-full flex flex-col justify-center">
                <SkeletonLoader width={"20%"} height={16} />
                <SkeletonLoader width={"10%"} height={16} />
              </div>
            </div>
          </div>
        </div>
        <SkeletonLoader width={900} height={500} borderRadius={12} />
        <div className="flex justify-center">
          <div className="flex flex-col mt-10 gap-2 w-[783px] ">
            <SkeletonLoader width={"100%"} height={24} />
            <SkeletonLoader width={"90%"} height={24} />
            <SkeletonLoader width={"80%"} height={24} />
            <SkeletonLoader width={"85%"} height={24} />
            <SkeletonLoader width={"80%"} height={24} />
            <SkeletonLoader width={"90%"} height={24} />
            <SkeletonLoader width={"85%"} height={24} />
            <SkeletonLoader width={"95%"} height={24} />
            <SkeletonLoader width={"80%"} height={24} />
            <SkeletonLoader width={"90%"} height={24} />
            <SkeletonLoader width={"80%"} height={24} />
            <SkeletonLoader width={"85%"} height={24} />
            <SkeletonLoader width={"80%"} height={24} />
            <SkeletonLoader width={"90%"} height={24} />
            <SkeletonLoader width={"85%"} height={24} />
            <SkeletonLoader width={"95%"} height={24} />
            <SkeletonLoader width={"80%"} height={24} />
            <SkeletonLoader width={"90%"} height={24} />
            <SkeletonLoader width={"80%"} height={24} />
            <SkeletonLoader width={"85%"} height={24} />
            <SkeletonLoader width={"80%"} height={24} />
            <SkeletonLoader width={"90%"} height={24} />
            <SkeletonLoader width={"85%"} height={24} />
            <SkeletonLoader width={"95%"} height={24} />
            <SkeletonLoader width={"80%"} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostLoader;

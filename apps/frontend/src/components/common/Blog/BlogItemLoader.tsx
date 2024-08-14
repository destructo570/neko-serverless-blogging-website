import React from "react";
import SkeletonLoader from "../Skeleton";

const BlogItemLoader = () => {
  const renderItems = () => {
    let elements = [];
    for (let index = 0; index < 8; index++) {
      elements.push(
        <div className="flex flex-col gap-3  max-w-[900px]">
          <div className="flex gap-8 items-center w-full">
            <div className="flex flex-col gap-3 ml-2 w-full">
              <SkeletonLoader width={140} height={24} />
              <SkeletonLoader width={"100%"} height={24} />
              <SkeletonLoader width={"100%"} height={24} />
              <div className="flex gap-3">
                <SkeletonLoader width={40} height={24} />
                <SkeletonLoader width={40} height={24} />
                <SkeletonLoader width={40} height={24} />
              </div>
            </div>
            <SkeletonLoader width={200} height={100} />
          </div>
          <div className="border-b"></div>
        </div>
      );
    }
    return elements;
  };
  return <div className="flex flex-col gap-2">{renderItems()}</div>;
};

export default BlogItemLoader;

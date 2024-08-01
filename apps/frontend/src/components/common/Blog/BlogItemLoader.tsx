import React from "react";
import Skeleton from "react-loading-skeleton";

const BlogItemLoader = () => {
  const renderItems = () => {
    let elements = [];
    for (let index = 0; index < 8; index++) {
      elements.push(
        <div className="flex flex-col gap-3">
          <div className="flex gap-8">
            <div className="flex flex-col gap-3 ml-2">
              <Skeleton width={140} height={24} />
              <Skeleton width={640} height={24} />
              <Skeleton width={640} height={24} />
            </div>
            <Skeleton width={200} height={100} />
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

"use client";
import useDarkTheme from "@/hooks/useDarkTheme";
import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLoader = (props) => {
  const is_dark_theme = useDarkTheme();

  return (
    <Skeleton
      {...props}
      baseColor={is_dark_theme ? "#202020" : "#ebebeb"}
      highlightColor={is_dark_theme ? "#2d2d2d" : "#f5f5f5"}
    />
  );
};

export default SkeletonLoader;

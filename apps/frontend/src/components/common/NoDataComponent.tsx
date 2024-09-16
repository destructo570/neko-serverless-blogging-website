import clsx from "clsx";
import Image from "next/image";
import React from "react";

const NoDataComponent = ({
  image = "/images/file_cabinet.svg",
  width = 128,
  height = 128,
  className = "",
  title = "No Data Found",
  description = "Please try again with a different query",
}) => {
  return (
    <div className={clsx("grid gap-1 text-center", className)}>
      <div className="flex flex-col items-center gap-2">
        <Image src={image} width={width} height={height} alt="" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default NoDataComponent;

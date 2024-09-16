"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import BlogList from "@/components/common/BlogList/BlogList";
import NoDataComponent from "@/components/common/NoDataComponent";
import { Input } from "@/components/ui/input";

const page = () => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState((searchParams.get("q") || "")?.trim());
  const [value, setValue] = useState("");

  const onSearchQueryChange = (e: any) => {
    setValue(e?.target?.value);
  };

  const handleEnterKeyPress = (e: any) => {
    if (e.key === "Enter") {
      setQuery(value);
    }
  };

  return (
    <div className="w-full mt-8 min-h-screen mx-auto">
      <div className="w-full px-3">
        <Input
          placeholder="Search..."
          onChange={onSearchQueryChange}
          onKeyDown={handleEnterKeyPress}
          value={value}
          className="sm:hidden w-full shadow-none border-0 bg-zinc-100 rounded-full mb-4"
        />
      </div>
      {query?.length ? (
        <>
          <div className="flex gap-2 max-w-[650px] px-4">
            <span className="text-3xl font-bold break-words text-muted-foreground">
              Results for:
            </span>
            <span className="text-3xl font-bold break-words">{query}</span>
          </div>
          <BlogList query={query} />
        </>
      ) : (
        <NoDataComponent className="mt-40" title="No Search Results Found" />
      )}
    </div>
  );
};

export default page;

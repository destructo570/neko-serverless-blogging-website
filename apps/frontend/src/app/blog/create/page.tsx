"use client";
import React, { useState } from "react";
import BlogEditor from "@/components/common/Editor/BlogEditor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { publishBlog } from "@/api/api";
import { JSONContent } from "novel";
import { useRouter } from "next/navigation";

const page = (props) => {
  const [article_title, setArticleTitle] = useState("");
  const [value, setValue] = useState<JSONContent>({});
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const onPusblishArticle = async () => {
    setLoading(true);
    const response = await publishBlog({
      title: article_title,
      content: JSON.stringify(value || ""),
      description: description || "",
    });

    if (response?.status === 200) {
      push("/blog");
    }
    setLoading(false);
  };

  const updateDescription = (text="") => {
    let final_text = text?.trim()?.substring(0, 200);
    setDescription(final_text);
  }
  
  return (
    <div className="w-full">
      <div className="flex justify-end p-4">
        <Button onClick={onPusblishArticle} disabled={loading} type="button">
          Publish
        </Button>
      </div>
      <div className="px-24 py-12">
        <Input
          className={
            "no-style-input h-24 text-2xl font-medium placeholder:text-slate-400"
          }
          placeholder="Article title"
          value={article_title}
          onChange={(e) => {
            setArticleTitle(e?.target?.value);
          }}
        />
        <BlogEditor
          classes="min-h-screen"
          content={value}
          setContent={setValue}
          setDescription={updateDescription}
        />
      </div>
    </div>
  );
};

page.propTypes = {};

export default page;

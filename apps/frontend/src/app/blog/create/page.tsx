"use client";
import React, { useState } from "react";

import BlogEditor from "@/components/common/Editor/BlogEditor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { publishArticle } from "@/api/api";

const page = (props) => {
  const [article_title, setArticleTitle] = useState("");
  const [body, setBody] = useState(null);
  const [loading, setLoading] = useState(false);

  const onPusblishArticle = async () => {
    // if(article_title ) return;
    console.log("body", body);
    
    setLoading(true);
    const response  = await publishArticle({title: article_title, content: "Test articvle",  "authorId" : "d32925ac-4e85-4cac-8940-baf0d352fa69"});
    console.log("response", response);
    
    if(response?.status === 200){
      
    }
    setLoading(false);
  }

  return (
    <div className="w-full">
      <div className="flex justify-end p-4">
        <Button onClick={onPusblishArticle}>Publish</Button>
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
          content={body}
          setContent={setBody}
        />
      </div>
    </div>
  );
};

page.propTypes = {};

export default page;

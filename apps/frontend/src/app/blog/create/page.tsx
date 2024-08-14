"use client";
import React, { useEffect, useMemo, useState } from "react";
import BlogEditor from "@/components/common/Editor/BlogEditor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSingleBlog, publishBlog } from "@/api/api";
import { JSONContent } from "novel";
import { useRouter, useSearchParams } from "next/navigation";
import BlogEditLoader from "@/components/common/Blog/BlogEditLoader";

const page = (props) => {
  const [article_title, setArticleTitle] = useState("");
  const [loading_post, setLoadingPost] = useState<boolean>(false);
  const [value, setValue] = useState<JSONContent>({});
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const [authorId, setAuthorId] = useState("");
  const post_id = searchParams.get("post_id");

  const is_edit_mode = useMemo(() => {
    return post_id ? true : false;
  }, [post_id]);

  useEffect(() => {
    if (is_edit_mode && post_id) {
      const getEditArticle = async () => {
        setLoadingPost(true);
        const response = await getSingleBlog(`${post_id}` || "");
        if (response && response?.status === 200) {
          setArticleTitle(response?.data?.post?.title);
          setAuthorId(response?.data?.post?.author?.id);
          setValue(JSON.parse(response?.data?.post?.content || "{}"));
          setDescription(response?.data?.post?.description);
        }
        setLoadingPost(false);
      };
      getEditArticle();
    }
  }, [is_edit_mode, post_id]);

  const onPusblishArticle = async () => {
    setLoading(true);
    const response = await publishBlog(
      {
        title: article_title,
        content: JSON.stringify(value || ""),
        description: description || "",
        authorId: authorId,
      },
      post_id,
      is_edit_mode
    );

    if (response?.status === 200) {
      push("/blog");
    }
    setLoading(false);
  };

  const updateDescription = (text = "") => {
    let final_text = text?.trim()?.substring(0, 200);
    setDescription(final_text);
  };

  return (
    <div className="w-full mt-16">
      <div className="flex justify-end p-4 gap-4">
        <Button
          onClick={() => push("/blog")}
          disabled={loading}
          type="button"
          variant={"outline"}
        >
          Cancel
        </Button>
        <Button onClick={onPusblishArticle} disabled={loading} type="button">
          {is_edit_mode ? "Update Post" : "Publish"}
        </Button>
      </div>
      <div className="px-24 py-12">
        {loading_post ? (
          <BlogEditLoader />
        ) : (
          <>
            <Input
              className={
                "no-style-input h-24 font-extrabold text-5xl placeholder:text-zinc-400"
              }
              placeholder="Article title"
              value={article_title}
              maxLength={60}
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
          </>
        )}
      </div>
    </div>
  );
};

page.propTypes = {};

export default page;

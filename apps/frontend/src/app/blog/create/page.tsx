"use client";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import BlogEditor from "@/components/common/Editor/BlogEditor";
import { Button } from "@/components/ui/button";
import { JSONContent } from "novel";
import { useRouter, useSearchParams } from "next/navigation";
import BlogEditLoader from "@/components/common/Blog/BlogEditLoader";
import { getSingleBlog, publishBlog } from "@/app/api/actions";
import { Textarea } from "@/components/ui/textarea";
import CoverImageInput from "./CoverImageInput";
import clsx from "clsx";
import { playfair_display, source_serif_4 } from "@/app/fonts";
import { AutosizeTextarea } from "@/components/common/AutoResizeTextArea";

const page = (props) => {
  const [article_title, setArticleTitle] = useState("");
  const [loading_post, setLoadingPost] = useState<boolean>(false);
  const [value, setValue] = useState<JSONContent>({});
  const [description, setDescription] = useState<string>("");
  const [coverImage, setCoverImage] = useState(null); // To store the file
  const [loading, setLoading] = useState(false);
  const [coverImageError, setCoverImageError] = useState("");
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
          setAuthorId(response?.data?.post?.author?.id || "");
          setValue(JSON.parse(response?.data?.post?.content || "{}"));
          setDescription(response?.data?.post?.description);
          setCoverImage(response?.data?.post?.coverImage || null);
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
        title: article_title?.trim(),
        content: JSON.stringify(value || ""),
        description: description || "",
        authorId: authorId,
        coverImage,
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
    <Suspense>
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
          <Button
            onClick={onPusblishArticle}
            disabled={loading || coverImageError?.length > 0 || !coverImage || article_title?.trim()?.length === 0}
            type="button"
          >
            {is_edit_mode ? "Update Post" : "Publish"}
          </Button>
        </div>
        <div className="px-8 md:px-24 py-6 md:py-12 flex flex-col items-center">
          {loading_post ? (
            <BlogEditLoader />
          ) : (
            <>
              <AutosizeTextarea
                className={clsx(
                  "no-style-input h-24 font-semibold text-5xl placeholder:text-zinc-400 max-w-[783px] sm:min-w-[783px] mb-4 resize-none",
                  playfair_display.className
                )}
                placeholder="Article title"
                value={article_title}
                maxLength={80}
                onChange={(e) => {
                  setArticleTitle(e?.target?.value);
                }}
              />
              <CoverImageInput
                setCoverImage={setCoverImage}
                coverImage={coverImage}
                setCoverImageError={setCoverImageError}
                coverImageError={coverImageError}
              />
              <div className="prose lg:prose-2xl max-w-[783px] sm:min-w-[783px] sm:px-8">
              <BlogEditor
                classes={clsx("min-h-screen", source_serif_4.className)}
                content={value}
                setContent={setValue}
                setDescription={updateDescription}
              />
              </div>
            </>
          )}
        </div>
      </div>
    </Suspense>
  );
};

page.propTypes = {};

export default page;

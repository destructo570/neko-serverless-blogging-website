"use client";
import React, { useMemo, useState } from "react";
import { defaultExtensions } from "../../../lib/extensions";
import { slashCommand } from "../../../lib/slashCommand";

const extensions = [...defaultExtensions, slashCommand];

import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
} from "novel";
import { NodeSelector } from "./NodeSelector";
import { LinkSelector } from "./LinkSelector";
import { TextButtons } from "./TextButtons";
import { ColorSelector } from "./ColorSelector";
import clsx from "clsx";

const BlogEditor = (props) => {
  const { no_extensions, classes, content, setContent} = props;
  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  const handleCommandNavigation = () => {};

  const suggestionItems = useMemo(() => {
    let items = [];
    if (typeof slashCommand?.options?.suggestion?.items === "function") {
      items = slashCommand?.options?.suggestion?.items();
    }

    return items;
  }, [slashCommand]);
  
  return (
    <EditorRoot>
      <EditorContent
        extensions={extensions}
        initialContent={{}}
        onUpdate={({ editor }) => {
          const json = editor.getJSON();
          setContent(json);
        }}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: clsx([`prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`, classes]),
          },
        }}
      >
        {no_extensions ? null : (
          <>
            <EditorCommand className="z-50 h-auto max-h-[330px]  w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
              <EditorCommandEmpty className="px-2 text-muted-foreground">
                No results
              </EditorCommandEmpty>
              <EditorCommandList>
                {suggestionItems?.map((item) => (
                  <EditorCommandItem
                    value={item.title}
                    onCommand={(val) => item.command(val)}
                    className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                    key={item.title}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </EditorCommandItem>
                ))}
              </EditorCommandList>
            </EditorCommand>
            <EditorBubble
              tippyOptions={{
                placement: "top",
              }}
              className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl"
            >
              <NodeSelector open={openNode} onOpenChange={setOpenNode} />
              <LinkSelector open={openLink} onOpenChange={setOpenLink} />
              <TextButtons />
              <ColorSelector open={openColor} onOpenChange={setOpenColor} />
            </EditorBubble>
          </>
        )}
      </EditorContent>
    </EditorRoot>
  );
};

BlogEditor.propTypes = {};

BlogEditor.defaultProps = {
  no_extensions: false,
  classes: "",
};

export default BlogEditor;

import {
  TiptapImage,
  TiptapLink,
  TaskList,
  TaskItem,
  HorizontalRule,
  StarterKit,
  Placeholder,
  CodeBlockLowlight,
} from "novel/extensions";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import sql from "highlight.js/lib/languages/sql";
import scss from "highlight.js/lib/languages/scss";
import shell from "highlight.js/lib/languages/shell";
import powershell from "highlight.js/lib/languages/powershell";
import cpp from "highlight.js/lib/languages/cpp";
import php from "highlight.js/lib/languages/php";
import xml from "highlight.js/lib/languages/xml";
import rust from "highlight.js/lib/languages/rust";
import go from "highlight.js/lib/languages/go";
import kotlin from "highlight.js/lib/languages/kotlin";
import { all, createLowlight } from "lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { cx } from "class-variance-authority";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";
import AutoJoiner from "tiptap-extension-auto-joiner";
import CodeBlockComponent from "@/components/common/Editor/CodeBlockComponent";
import { UploadImagesPlugin } from "novel/plugins";

// create a lowlight instance
const lowlight = createLowlight(all);

// you can also register individual languages
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);
lowlight.register("python", python);
lowlight.register("java", java);
lowlight.register("sql", sql);
lowlight.register("scss", scss);
lowlight.register("shell", shell);
lowlight.register("powershell", powershell);
lowlight.register("cpp", cpp);
lowlight.register("php", php);
lowlight.register("xml", xml);
lowlight.register("rust", rust);
lowlight.register("go", go);
lowlight.register("kotlin", kotlin);

// You can overwrite the placeholder with your own configuration
const placeholder = Placeholder.configure({
  placeholder: 'Type "/" for commands',
});

const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cx(
      "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer"
    ),
  },
});

const codeBlockLowlight = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
}).configure({ lowlight });

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx(""),
  },
});
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx("flex items-start my-2"),
  },
  nested: true,
});

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx("mt-4 mb-6 border-t border-muted-foreground"),
  },
});

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
      return [
          UploadImagesPlugin({
              imageClass: cx("opacity-40 rounded-lg border border-stone-200"),
          }),
      ];
  },
  }).configure({
  allowBase64: true,
  HTMLAttributes: {
      class: cx("rounded-lg border border-muted"),
  },
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cx("list-disc list-outside leading-3 -mt-1"),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cx("list-decimal list-outside leading-3 -mt-1"),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cx("leading-normal -mb-2"),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cx("border-l-4 border-primary"),
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: cx("rounded-sm bg-muted border p-5 font-mono font-medium"),
      spellcheck: "false",
    },
  },
  code: {
    HTMLAttributes: {
      class: cx("rounded-md px-2 font-mono font-medium bg-muted"),
      spellcheck: "false",
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
  gapcursor: false,
});

const globalDragHandle = GlobalDragHandle.configure({
  dragHandleWidth: 20, // default

  // The scrollTreshold specifies how close the user must drag an element to the edge of the lower/upper screen for automatic
  // scrolling to take place. For example, scrollTreshold = 100 means that scrolling starts automatically when the user drags an
  // element to a position that is max. 99px away from the edge of the screen
  // You can set this to 0 to prevent auto scrolling caused by this extension
  scrollTreshold: 100, // default
});

const autoJoiner = AutoJoiner.configure({
  elementsToJoin: ["bulletList", "orderedList"], // default
});

export const defaultExtensions = [
  starterKit,
  placeholder,
  taskList,
  taskItem,
  horizontalRule,
  globalDragHandle,
  autoJoiner,
  codeBlockLowlight,
  tiptapLink,
  tiptapImage
];

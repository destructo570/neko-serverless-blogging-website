import {
  TiptapImage,
  TiptapLink,
  TaskList,
  TaskItem,
  HorizontalRule,
  StarterKit,
  Placeholder,
} from "novel/extensions";

import { cx } from "class-variance-authority";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";
import AutoJoiner from "tiptap-extension-auto-joiner";

// TODO I am using cx here to get tailwind autocomplete working, idk if someone else can write a regex to just capture the class key in objects

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
    },
  },
  code: {
    HTMLAttributes: {
      class: cx("rounded-md bg-muted  px-1.5 py-1 font-mono font-medium"),
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
  TiptapLink,
  TiptapImage,
  taskList,
  taskItem,
  horizontalRule,
  globalDragHandle,
  autoJoiner,
];

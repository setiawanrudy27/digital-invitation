"use client";

import { useState, useRef, useEffect } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Strikethrough, List, ListOrdered, Undo, Redo, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

function ToolbarButton({ editor, onClick, isActive, children }: {
  editor: Editor;
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-all duration-150",
        isActive
          ? "bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

const EMOJIS = [
  "😊", "😂", "🥰", "😍", "🤗", "😘", "😭", "😅", "😁", "👍",
  "🙏", "❤️", "✨", "🎉", "🎊", "🥳", "🤝", "💪", "🔥", "⭐",
  "👋", "💖", "😇", "🤩", "😎", "🥺", "😢", "🤔", "😌", "😴",
  "🎂", "💐", "🌹", "🌸", "🌺", "🕊️", "💍", "💒", "🎵", "🎶",
];

const EMOJIS_PER_ROW = 10;

export default function RichEditor({ value, onChange, placeholder, className }: RichEditorProps) {
  const [emojiOpen, setEmojiOpen] = useState(false);
  const emojiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setEmojiOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const insertEmoji = (emoji: string) => {
    editor?.chain().focus().insertContent(emoji).run();
    setEmojiOpen(false);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder ?? "Tulis pesan di sini...",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[160px] px-4 py-3 focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-input bg-background/80", className)}>
      <div className="flex items-center gap-0.5 border-b border-border px-2 py-1.5">
        <ToolbarButton
          editor={editor}
          isActive={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          editor={editor}
          isActive={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          editor={editor}
          isActive={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-border" />

        <ToolbarButton
          editor={editor}
          isActive={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          editor={editor}
          isActive={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-border" />

        <ToolbarButton
          editor={editor}
          isActive={false}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          editor={editor}
          isActive={false}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-border" />

        <div ref={emojiRef} className="relative">
          <ToolbarButton
            editor={editor}
            isActive={emojiOpen}
            onClick={() => setEmojiOpen(!emojiOpen)}
          >
            <Smile className="h-4 w-4" />
          </ToolbarButton>

          {emojiOpen && (
            <div className="absolute top-full right-0 z-50 mt-1 w-[320px] rounded-xl border border-border bg-popover p-2 shadow-lg">
              {Array.from({ length: Math.ceil(EMOJIS.length / EMOJIS_PER_ROW) }, (_, row) => (
                <div key={row} className="flex">
                  {EMOJIS.slice(row * EMOJIS_PER_ROW, row * EMOJIS_PER_ROW + EMOJIS_PER_ROW).map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => insertEmoji(emoji)}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-lg hover:bg-accent"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}

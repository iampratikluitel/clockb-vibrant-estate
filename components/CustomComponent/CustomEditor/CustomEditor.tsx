"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import MenuBar from "./MenuBar";
import TableMenu from "./TableMenu";
import BubbleMenu from "./BubbleMenu";
import { defaultExtensions } from "./extensions";

interface CustomEditorProps {
  name: string;
  label?: string;
  placeholder?: string;
  characterLimit?: number;
  className?: string;
  onUpdate?: (html: string) => void;
}

const CustomEditor: React.FC<CustomEditorProps> = ({
  name,
  label,
  placeholder = "Start writing...",
  characterLimit,
  className = "",
  onUpdate,
}) => {
  const { control, setValue, watch } = useFormContext();

  const values = watch();

  const editor = useEditor({
    extensions: defaultExtensions,
    content: values[name] || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm focus:outline-none max-w-none min-h-[150px] px-3 py-2",
        spellcheck: "false",
      },
      handleDOMEvents: {
        keydown: (_, event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === "z") {
            editor?.commands.undo();
            return true;
          }
          if ((event.metaKey || event.ctrlKey) && event.key === "y") {
            editor?.commands.redo();
            return true;
          }
          return false;
        },
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue(name, html, {
        shouldValidate: true,
      });
      onUpdate?.(html);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        .ProseMirror {
          > * + * {
            margin-top: 0.5em;
          }

          &:focus {
            outline: none;
          }

          ul,
          ol {
            padding: 0 1rem;
            margin: 0.5em 0;
            font-size: 0.875rem;
          }

          ol {
            list-style-type: decimal;
          }

          ul {
            list-style-type: disc;
          }

          p {
            font-size: 0.875rem;
            line-height: 1.5;
            margin: 0.5em 0;
          }

          h1 {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 1rem 0 0.5rem;
            line-height: 1.3;
          }

          h2 {
            font-size: 1.125rem;
            font-weight: 600;
            margin: 1rem 0 0.5rem;
            line-height: 1.3;
          }

          h3 {
            font-size: 1rem;
            font-weight: 600;
            margin: 0.75rem 0 0.5rem;
            line-height: 1.3;
          }

          h4 {
            font-size: 0.925rem;
            font-weight: 600;
            margin: 0.75rem 0 0.5rem;
            line-height: 1.3;
          }

          h5 {
            font-size: 0.875rem;
            font-weight: 600;
            margin: 0.75rem 0 0.5rem;
            line-height: 1.3;
          }

          h6 {
            font-size: 0.85rem;
            font-weight: 600;
            margin: 0.75rem 0 0.5rem;
            line-height: 1.3;
          }

          img {
            display: block;
            max-width: 500px;
            margin: 1rem auto;
            height: auto;
            border-radius: 0.375rem;
          }

          blockquote {
            padding-left: 1rem;
            border-left: 2px solid #e2e8f0;
            color: #64748b;
            font-style: italic;
            margin: 0.75rem 0;
            font-size: 0.875rem;
          }

          pre {
            background-color: #1e293b;
            color: #e2e8f0;
            padding: 0.75rem 1rem;
            border-radius: 0.375rem;
            overflow-x: auto;
            margin: 0.75rem 0;
            font-size: 0.8125rem;

            code {
              color: inherit;
              padding: 0;
              background: none;
              font-size: 0.8125rem;
            }
          }

          code {
            background-color: #f1f5f9;
            color: #0f172a;
            padding: 0.2em 0.4em;
            border-radius: 0.25rem;
            font-size: 0.8125rem;
          }

          a {
            color: #2563eb;
            text-decoration: underline;
            cursor: pointer;
            font-size: 0.875rem;

            &:hover {
              color: #1d4ed8;
            }
          }

          ul[data-type="taskList"] {
            list-style: none;
            padding: 0;

            li {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              font-size: 0.875rem;

              label {
                margin: 0;
                user-select: none;
              }

              input[type="checkbox"] {
                margin: 0;
                cursor: pointer;
              }
            }
          }

          table {
            border-collapse: collapse;
            width: 100%;
            margin: 0.75rem 0;
            font-size: 0.875rem;
            position: relative;
          }

          tr {
            border-bottom: 1px solid #e2e8f0;
          }

          th {
            background-color: #f8fafc;
            font-weight: 600;
            text-align: left;
            font-size: 0.875rem;
          }

          td,
          th {
            padding: 0.5rem;
            border: 1px solid #e2e8f0;
            vertical-align: top;
            min-width: 100px;
            font-size: 0.875rem;
            position: relative;
          }

          .tableWrapper {
            overflow-x: auto;
            max-width: 100%;
            margin: 0.75rem 0;
          }

          .selected-cell {
            position: relative;

            &::after {
              content: "";
              position: absolute;
              inset: 0;
              pointer-events: none;
              background: rgba(35, 131, 226, 0.07);
            }
          }

          .selectedCell {
            &::after {
              z-index: 2;
              position: absolute;
              content: "";
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              background: rgba(35, 131, 226, 0.07);
              pointer-events: none;
            }
          }

          .is-empty::before {
            content: attr(data-placeholder);
            float: left;
            color: #94a3b8;
            pointer-events: none;
            height: 0;
            font-size: 0.875rem;
          }

          .resize-cursor {
            cursor: col-resize;
          }
        }

        .table-menu-container {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 50;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div className="flex flex-col gap-2">
        {label && <Label className="text-sm">{label}</Label>}
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <div
                className={`border rounded-lg overflow-hidden bg-background shadow-sm ${className}`}
              >
                <div className="border-b bg-muted/50">
                  <MenuBar editor={editor} />
                </div>

                {editor && <BubbleMenu editor={editor} />}

                <div className="relative">
                  <EditorContent editor={editor} />
                  {editor.isActive("table") && (
                    <div className="absolute right-2 top-0">
                      <TableMenu editor={editor} />
                    </div>
                  )}
                </div>

                {/* {characterLimit && (
                  <div className="border-t px-3 py-1">
                    <CharacterCount editor={editor} limit={characterLimit} />
                  </div>
                )} */}
              </div>
              {error && <FormMessage>{error?.message}</FormMessage>}
            </>
          )}
        />
      </div>
    </>
  );
};

export default CustomEditor;

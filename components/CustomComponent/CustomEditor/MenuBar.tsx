import React from 'react';
import { Editor } from '@tiptap/react';
import { Level } from '@tiptap/extension-heading';
import {
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  List, 
  ListOrdered, 
  Image as ImageIcon, 
  Link as LinkIcon,
  Quote, 
  Code,
  FileCode,
  ListChecks,
  ChevronDown,
  Table2,
  Superscript,
  Subscript,
  Highlighter,
  Palette
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { MINIOURL } from "@/lib/constants";
import { uploadToMinIO } from "@/lib/helper";
import { toast } from "sonner";
import { Button } from '@/components/ui/button';

interface MenuBarProps {
  editor: Editor;
}

const HeadingLevels: { level: Level; label: string; size: string }[] = [
  { level: 1, label: 'Heading 1', size: 'text-2xl font-bold' },
  { level: 2, label: 'Heading 2', size: 'text-xl font-bold' },
  { level: 3, label: 'Heading 3', size: 'text-lg font-bold' },
  { level: 4, label: 'Heading 4', size: 'text-base font-bold' },
  { level: 5, label: 'Heading 5', size: 'text-sm font-bold' },
  { level: 6, label: 'Heading 6', size: 'text-xs font-bold' },
];

const TextColors = [
  { name: 'Default', color: '#000000' },
  { name: 'Gray', color: '#64748b' },
  { name: 'Red', color: '#ef4444' },
  { name: 'Orange', color: '#f97316' },
  { name: 'Green', color: '#22c55e' },
  { name: 'Blue', color: '#3b82f6' },
  { name: 'Purple', color: '#a855f7' },
  { name: 'Pink', color: '#ec4899' },
];

const HighlightColors = [
  { name: 'Yellow', color: '#fef08a' },
  { name: 'Lime', color: '#d9f99d' },
  { name: 'Cyan', color: '#cffafe' },
  { name: 'Pink', color: '#fce7f3' },
  { name: 'Orange', color: '#fed7aa' },
];

const MenuBar = ({ editor }: MenuBarProps) => {
  const addImage = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          const uploadedUrl = await uploadToMinIO(file, "blog-content");
          editor.chain().focus().setImage({ 
            src: `${MINIOURL}${uploadedUrl}`,
            alt: file.name,
          }).run();
          
          // Apply classes after image is inserted
          const images = document.querySelectorAll('.ProseMirror img');
          const lastImage = images[images.length - 1];
          if (lastImage) {
            lastImage.className = 'mx-auto max-w-lg h-auto';
          }
        } catch (error) {
          toast.error("Failed to upload image");
        }
      }
    };
  };

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  if (!editor) return null;

  return (
    <div className="p-1 flex flex-wrap gap-1">
      {/* Text Formatting */}
      <div className="flex gap-1 items-center border-r pr-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`h-7 w-7 p-0 ${editor.isActive('bold') ? 'bg-muted' : ''}`}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`h-7 w-7 p-0 ${editor.isActive('italic') ? 'bg-muted' : ''}`}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`h-7 w-7 p-0 ${editor.isActive('underline') ? 'bg-muted' : ''}`}
          title="Underline (Ctrl+U)"
        >
          <Underline className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`h-7 w-7 p-0 ${editor.isActive('strike') ? 'bg-muted' : ''}`}
          title="Strikethrough"
        >
          <Strikethrough className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={`h-7 w-7 p-0 ${editor.isActive('superscript') ? 'bg-muted' : ''}`}
          title="Superscript"
        >
          <Superscript className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={`h-7 w-7 p-0 ${editor.isActive('subscript') ? 'bg-muted' : ''}`}
          title="Subscript"
        >
          <Subscript className="h-3 w-3" />
        </Button>
      </div>

      {/* Text Colors and Highlight */}
      <div className="flex gap-1 items-center border-r pr-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Palette className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center">
                Text Color
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <div className="grid grid-cols-4 gap-1 p-1">
                  {TextColors.map((color) => (
                    <button
                      key={color.color}
                      className="w-6 h-6 rounded border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color.color }}
                      onClick={() => editor.chain().focus().setColor(color.color).run()}
                      title={color.name}
                    />
                  ))}
                </div>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center">
                Highlight Color
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <div className="grid grid-cols-3 gap-1 p-1">
                  {HighlightColors.map((color) => (
                    <button
                      key={color.color}
                      className="w-6 h-6 rounded border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color.color }}
                      onClick={() => editor.chain().focus().toggleHighlight({ color: color.color }).run()}
                      title={color.name}
                    />
                  ))}
                </div>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`h-7 w-7 p-0 ${editor.isActive('highlight') ? 'bg-muted' : ''}`}
          title="Highlight"
        >
          <Highlighter className="h-3 w-3" />
        </Button>
      </div>

      {/* Headings Dropdown */}
      <div className="flex gap-1 items-center border-r pr-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 px-2">
              <span className="text-xs">Heading</span>
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {HeadingLevels.map(({ level, label, size }) => (
              <DropdownMenuItem
                key={level}
                onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                className={`${size} ${editor.isActive('heading', { level }) ? 'bg-muted' : ''}`}
              >
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Lists */}
      <div className="flex gap-1 items-center border-r pr-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`h-7 w-7 p-0 ${editor.isActive('bulletList') ? 'bg-muted' : ''}`}
          title="Bullet List"
        >
          <List className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`h-7 w-7 p-0 ${editor.isActive('orderedList') ? 'bg-muted' : ''}`}
          title="Numbered List"
        >
          <ListOrdered className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={`h-7 w-7 p-0 ${editor.isActive('taskList') ? 'bg-muted' : ''}`}
          title="Task List"
        >
          <ListChecks className="h-3 w-3" />
        </Button>
      </div>

      {/* Alignment */}
      <div className="flex gap-1 items-center border-r pr-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`h-7 w-7 p-0 ${editor.isActive({ textAlign: 'left' }) ? 'bg-muted' : ''}`}
          title="Align Left"
        >
          <AlignLeft className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`h-7 w-7 p-0 ${editor.isActive({ textAlign: 'center' }) ? 'bg-muted' : ''}`}
          title="Align Center"
        >
          <AlignCenter className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`h-7 w-7 p-0 ${editor.isActive({ textAlign: 'right' }) ? 'bg-muted' : ''}`}
          title="Align Right"
        >
          <AlignRight className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`h-7 w-7 p-0 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-muted' : ''}`}
          title="Justify"
        >
          <AlignJustify className="h-3 w-3" />
        </Button>
      </div>

      {/* Special Blocks */}
      <div className="flex gap-1 items-center border-r pr-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`h-7 w-7 p-0 ${editor.isActive('blockquote') ? 'bg-muted' : ''}`}
          title="Quote"
        >
          <Quote className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`h-7 w-7 p-0 ${editor.isActive('code') ? 'bg-muted' : ''}`}
          title="Inline Code"
        >
          <Code className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`h-7 w-7 p-0 ${editor.isActive('codeBlock') ? 'bg-muted' : ''}`}
          title="Code Block"
        >
          <FileCode className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().insertTable({ 
            rows: 3, 
            cols: 3, 
            withHeaderRow: true 
          }).run()}
          className="h-7 w-7 p-0"
          title="Insert Table"
        >
          <Table2 className="h-3 w-3" />
        </Button>
      </div>

      {/* Insert Options */}
      <div className="flex gap-1 items-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addImage}
          className="h-7 w-7 p-0"
          title="Insert Image"
        >
          <ImageIcon className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addLink}
          className={`h-7 w-7 p-0 ${editor.isActive('link') ? 'bg-muted' : ''}`}
          title="Insert Link"
        >
          <LinkIcon className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default MenuBar;
import React from 'react';
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Table,
  ArrowDownToLine,
  ArrowRightToLine,
  Rows,
  Columns,
  Trash2,
  Delete,
  Settings,
  Combine,
  Split,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  Palette,
} from 'lucide-react';

interface BubbleMenuProps {
  editor: Editor;
}

const BubbleMenu = ({ editor }: BubbleMenuProps) => {
  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const isTableSelected = editor.isActive('table');
  const canMergeCells = editor.can().mergeCells();
  const canSplitCell = editor.can().splitCell();

  const setTableWidth = (width: string) => {
    editor
      .chain()
      .focus()
      .updateAttributes('table', { width })
      .run();
  };

  const setCellAttributes = (attrs: Record<string, any>) => {
    editor
      .chain()
      .focus()
      .updateAttributes('tableCell', attrs)
      .run();
  };

  const predefinedColors = [
    '#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6',
    '#ced4da', '#adb5bd', '#6c757d', '#495057'
  ];

  return (
    <TiptapBubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 100,
        placement: 'top',
      }}
      className="flex bg-popover text-popover-foreground shadow-md rounded-lg border overflow-hidden"
    >
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
        size="sm"
        className="h-8 w-8 p-0"
      >
        <Bold className="h-4 w-4" />
      </Button>
      
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
        size="sm"
        className="h-8 w-8 p-0"
      >
        <Italic className="h-4 w-4" />
      </Button>
      
      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        variant={editor.isActive('underline') ? 'secondary' : 'ghost'}
        size="sm"
        className="h-8 w-8 p-0"
      >
        <Underline className="h-4 w-4" />
      </Button>
      
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        variant={editor.isActive('strike') ? 'secondary' : 'ghost'}
        size="sm"
        className="h-8 w-8 p-0"
      >
        <Strikethrough className="h-4 w-4" />
      </Button>

      <div className="w-px bg-border" />

      <Button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        variant={editor.isActive({ textAlign: 'left' }) ? 'secondary' : 'ghost'}
        size="sm"
        className="h-8 w-8 p-0"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      
      <Button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        variant={editor.isActive({ textAlign: 'center' }) ? 'secondary' : 'ghost'}
        size="sm"
        className="h-8 w-8 p-0"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      
      <Button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        variant={editor.isActive({ textAlign: 'right' }) ? 'secondary' : 'ghost'}
        size="sm"
        className="h-8 w-8 p-0"
      >
        <AlignRight className="h-4 w-4" />
      </Button>

      <div className="w-px bg-border" />

      <Button
        onClick={setLink}
        variant={editor.isActive('link') ? 'secondary' : 'ghost'}
        size="sm"
        className="h-8 w-8 p-0"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>

      {isTableSelected && (
        <>
          <div className="w-px bg-border" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Table className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Table Options</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Row Operations */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center">
                  <Rows className="h-4 w-4 mr-2" />
                  <span>Row Options</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => editor.chain().focus().addRowBefore().run()}>
                    <ArrowDownToLine className="h-4 w-4 mr-2 rotate-180" />
                    <span>Add Row Before</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => editor.chain().focus().addRowAfter().run()}>
                    <ArrowDownToLine className="h-4 w-4 mr-2" />
                    <span>Add Row After</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => editor.chain().focus().deleteRow().run()}>
                    <Delete className="h-4 w-4 mr-2" />
                    <span>Delete Row</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              {/* Column Operations */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center">
                  <Columns className="h-4 w-4 mr-2" />
                  <span>Column Options</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => editor.chain().focus().addColumnBefore().run()}>
                    <ArrowRightToLine className="h-4 w-4 mr-2 rotate-180" />
                    <span>Add Column Before</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => editor.chain().focus().addColumnAfter().run()}>
                    <ArrowRightToLine className="h-4 w-4 mr-2" />
                    <span>Add Column After</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => editor.chain().focus().deleteColumn().run()}>
                    <Delete className="h-4 w-4 mr-2" />
                    <span>Delete Column</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              {/* Cell Alignment */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center">
                  <AlignLeft className="h-4 w-4 mr-2" />
                  <span>Cell Alignment</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setCellAttributes({ textAlign: 'left' })}>
                    <AlignLeft className="h-4 w-4 mr-2" />
                    <span>Align Left</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCellAttributes({ textAlign: 'center' })}>
                    <AlignCenter className="h-4 w-4 mr-2" />
                    <span>Align Center</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCellAttributes({ textAlign: 'right' })}>
                    <AlignRight className="h-4 w-4 mr-2" />
                    <span>Align Right</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setCellAttributes({ verticalAlign: 'top' })}>
                    <AlignVerticalJustifyStart className="h-4 w-4 mr-2" />
                    <span>Align Top</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCellAttributes({ verticalAlign: 'middle' })}>
                    <AlignVerticalJustifyCenter className="h-4 w-4 mr-2" />
                    <span>Align Middle</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCellAttributes({ verticalAlign: 'bottom' })}>
                    <AlignVerticalJustifyEnd className="h-4 w-4 mr-2" />
                    <span>Align Bottom</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              {/* Table Width */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Table Width</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTableWidth('100%')}>
                    Full Width
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTableWidth('75%')}>
                    75%
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTableWidth('50%')}>
                    50%
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTableWidth('25%')}>
                    25%
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              {/* Background Color */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center">
                  <Palette className="h-4 w-4 mr-2" />
                  <span>Background Color</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <div className="p-2">
                    <div className="grid grid-cols-4 gap-1">
                      {predefinedColors.map((color) => (
                        <button
                          key={color}
                          className="w-6 h-6 rounded border hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => setCellAttributes({ backgroundColor: color })}
                        />
                      ))}
                    </div>
                  </div>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />

              {/* Merge/Split Operations */}
              {canMergeCells && (
                <DropdownMenuItem onClick={() => editor.chain().focus().mergeCells().run()}>
                  <Combine className="h-4 w-4 mr-2" />
                  <span>Merge Cells</span>
                </DropdownMenuItem>
              )}
              {canSplitCell && (
                <DropdownMenuItem onClick={() => editor.chain().focus().splitCell().run()}>
                  <Split className="h-4 w-4 mr-2" />
                  <span>Split Cell</span>
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              {/* Delete Table */}
              <DropdownMenuItem 
                onClick={() => editor.chain().focus().deleteTable().run()}
                className="text-red-600 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                <span>Delete Table</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </TiptapBubbleMenu>
  );
};

export default BubbleMenu;
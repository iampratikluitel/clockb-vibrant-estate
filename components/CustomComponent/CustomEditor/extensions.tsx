// extensions.tsx
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import Highlight from '@tiptap/extension-highlight'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
import js from 'highlight.js/lib/languages/javascript'
import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'


// Register commonly used languages
lowlight.registerLanguage('javascript', js)
lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('typescript', typescript)
lowlight.registerLanguage('python', python)

export const defaultExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
    },
  }),
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Superscript,
  SubScript,
  Highlight.configure({
    multicolor: true,
  }),
  TextStyle,
  Color,
  Typography,
  Placeholder.configure({
    placeholder: 'Write something...',
  }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: 'plaintext',
  }),
  Table.configure({
    resizable: true,
    allowTableNodeSelection: true,
    HTMLAttributes: {
      class: 'tiptap-table',
    },
  }),
  TableRow.configure({
    HTMLAttributes: {
      class: 'tiptap-table-row',
    },
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: 'tiptap-table-header',
    },
  }),
  TableCell.configure({
    HTMLAttributes: {
      class: 'tiptap-table-cell',
    },
  }),
  Image.configure({
    allowBase64: true,
    inline: true,
    HTMLAttributes: {
      class: 'tiptap-image',
    },
  }),
  Link.configure({
    openOnClick: false,
    linkOnPaste: true,
    validate: (url: string) => /^https?:\/\//.test(url),
    HTMLAttributes: {
      class: 'tiptap-link',
      rel: 'noopener noreferrer nofollow',
      target: '_blank',
    },
  }),
]
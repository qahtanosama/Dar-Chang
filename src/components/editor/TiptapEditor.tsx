'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Heading } from '@tiptap/extension-heading'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold, Italic, Strikethrough, List, ListOrdered,
  Quote, Code2, Minus, Table2 as TableIcon, ImageIcon,
  Undo2, Redo2, Heading2, Heading3, Link2, X as XIcon,
} from 'lucide-react'
import * as Popover from '@radix-ui/react-popover'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { ImageAltDialog } from './ImageAltDialog'
import { TableToolbar } from './TableToolbar'

interface TiptapEditorProps {
  value: string
  onChange: (html: string) => void
  dir?: 'ltr' | 'rtl'
  placeholder?: string
  minHeight?: number
}

// ── Inline Link Popover (doesn't need editor prop at top level) ───────────────
function InlineLinkPopover({ editor }: { editor: ReturnType<typeof useEditor> }) {
  const [url, setUrl] = useState('')
  const [nofollow, setNofollow] = useState(false)
  const [open, setOpen] = useState(false)

  if (!editor) return null
  const isActive = editor.isActive('link')

  const handleOpen = (v: boolean) => {
    if (v && isActive) {
      const attrs = editor.getAttributes('link')
      setUrl(attrs.href ?? '')
      setNofollow((attrs.rel ?? '').includes('nofollow'))
    } else if (v) {
      setUrl(''); setNofollow(false)
    }
    setOpen(v)
  }

  const apply = () => {
    if (!url.trim()) { editor.chain().focus().unsetLink().run(); setOpen(false); return }
    const rel = ['noopener', 'noreferrer', ...(nofollow ? ['nofollow'] : [])].join(' ')
    editor.chain().focus().setLink({ href: url.trim(), rel }).run()
    setOpen(false)
  }

  return (
    <Popover.Root open={open} onOpenChange={handleOpen}>
      <Popover.Trigger asChild>
        <button type="button" title="Link"
          className={`p-1.5 rounded transition-colors ${isActive ? 'bg-white text-slate-900' : 'text-slate-200 hover:bg-white/20 hover:text-white'}`}>
          <Link2 className="w-3.5 h-3.5" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="z-[200] w-80 bg-white border border-slate-200 rounded-lg shadow-xl p-4" sideOffset={8}>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">URL</label>
              <input type="url" value={url} onChange={e => setUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && apply()}
                placeholder="https://example.com"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black bg-[#FAFAFA]"
                autoFocus />
            </div>
            <p className="text-[11px] text-slate-400">
              <code className="bg-slate-100 px-1 rounded">rel="noopener noreferrer"</code> applied automatically
            </p>
            <div className="flex items-center gap-2">
              <Checkbox.Root id="nofollow-bm" checked={nofollow} onCheckedChange={v => setNofollow(!!v)}
                className="w-4 h-4 border border-slate-300 rounded flex items-center justify-center data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900 transition-colors">
                <Checkbox.Indicator><Check className="w-3 h-3 text-white" /></Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor="nofollow-bm" className="text-xs text-slate-600 cursor-pointer">
                Add <code className="bg-slate-100 px-1 rounded">rel="nofollow"</code>
              </label>
            </div>
            <div className="flex gap-2">
              {isActive && (
                <button type="button" onClick={() => { editor.chain().focus().unsetLink().run(); setOpen(false) }}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors">
                  <XIcon className="w-3 h-3" /> Remove
                </button>
              )}
              <button type="button" onClick={apply}
                className="flex-1 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-md hover:bg-slate-700 transition-colors font-medium">
                {isActive ? 'Update' : 'Insert Link'}
              </button>
            </div>
          </div>
          <Popover.Arrow className="fill-white drop-shadow-sm" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

// ── Custom Bubble Menu via floating div ───────────────────────────────────────
function CustomBubbleMenu({ editor }: { editor: ReturnType<typeof useEditor> }) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const wrapperRef = useRef<HTMLDivElement>(null)

  const updateMenu = useCallback(() => {
    if (!editor) return
    const { from, to, empty } = editor.state.selection
    if (empty) { setVisible(false); return }

    const start = editor.view.coordsAtPos(from)
    const end = editor.view.coordsAtPos(to)

    const wrapper = wrapperRef.current?.closest('.tiptap-wrapper-outer') as HTMLElement
    if (!wrapper) { setVisible(false); return }

    const wRect = wrapper.getBoundingClientRect()
    const midX = (start.left + end.right) / 2 - wRect.left
    const topY = start.top - wRect.top - 52 // 52 = toolbar height

    setPos({ top: topY, left: midX })
    setVisible(true)
  }, [editor])

  useEffect(() => {
    if (!editor) return
    editor.on('selectionUpdate', updateMenu)
    editor.on('blur', () => setVisible(false))
    return () => {
      editor.off('selectionUpdate', updateMenu)
      editor.off('blur', () => setVisible(false))
    }
  }, [editor, updateMenu])

  if (!editor || !visible) return null

  const btnCls = (active: boolean) =>
    `p-1.5 rounded transition-colors ${active ? 'bg-white text-slate-900' : 'text-slate-200 hover:bg-white/20 hover:text-white'}`

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'absolute', top: pos.top, left: pos.left, transform: 'translateX(-50%)', zIndex: 50 }}
      onMouseDown={e => e.preventDefault()}
    >
      <div className="flex items-center gap-0.5 bg-slate-900 rounded-lg px-2 py-1.5 shadow-xl border border-slate-700">
        <button type="button" title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} className={btnCls(editor.isActive('bold'))}>
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button type="button" title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnCls(editor.isActive('italic'))}>
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button type="button" title="Strike" onClick={() => editor.chain().focus().toggleStrike().run()} className={btnCls(editor.isActive('strike'))}>
          <Strikethrough className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-4 bg-slate-700 mx-1" />
        <button type="button" title="H2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnCls(editor.isActive('heading', { level: 2 }))}>
          <Heading2 className="w-3.5 h-3.5" />
        </button>
        <button type="button" title="H3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnCls(editor.isActive('heading', { level: 3 }))}>
          <Heading3 className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-4 bg-slate-700 mx-1" />
        <InlineLinkPopover editor={editor} />
      </div>
    </div>
  )
}

/**
 * TiptapEditor — premium WYSIWYG editor for the Dar Chang CMS.
 *
 * Features:
 * - H2/H3 headings only (H1 reserved for page title — SEO compliant)
 * - Floating bubble menu on text selection (Bold, Italic, Strike, H2, H3, Link)
 * - Link with rel="noopener noreferrer" + nofollow option (Radix Popover)
 * - Table with visual add/delete toolbar (Radix Popover)
 * - Image with required alt-text dialog + file upload (/api/admin/upload)
 * - RTL support via dir prop (Arabic)
 * - HTML input/output — clean storage in SQLite
 */
export function TiptapEditor({
  value,
  onChange,
  dir = 'ltr',
  placeholder = 'Start writing your content...',
  minHeight = 320,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [2, 3] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', class: 'tiptap-link' },
      }),
      Image.configure({ HTMLAttributes: { class: 'tiptap-image' }, allowBase64: false }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({ placeholder }),
    ],
    content: value || '',
    editorProps: {
      attributes: { class: 'tiptap-editor', dir, spellcheck: 'true' },
    },
    immediatelyRender: false,
    onUpdate({ editor }) { onChange(editor.getHTML()) },
  })

  // Sync value when switching tabs or loading existing record
  useEffect(() => {
    if (!editor) return
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || '')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor])

  if (!editor) return null

  const iconSz = 'w-4 h-4'

  const toolbarBtn = (
    onClick: () => void,
    title: string,
    icon: React.ReactNode,
    active = false,
    disabled = false,
  ) => (
    <button
      key={title}
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`p-1.5 rounded transition-colors ${
        active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      } disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      {icon}
    </button>
  )

  return (
    <div className="tiptap-wrapper-outer relative border border-slate-200 rounded-md overflow-visible bg-[#FAFAFA] focus-within:ring-1 focus-within:ring-black transition-shadow">
      {/* Static toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-white border-b border-slate-200 rounded-t-md">
        {toolbarBtn(() => editor.chain().focus().undo().run(), 'Undo', <Undo2 className={iconSz} />, false, !editor.can().undo())}
        {toolbarBtn(() => editor.chain().focus().redo().run(), 'Redo', <Redo2 className={iconSz} />, false, !editor.can().redo())}
        <div className="w-px h-5 bg-slate-200 mx-1" />

        {toolbarBtn(() => editor.chain().focus().toggleHeading({ level: 2 }).run(), 'Heading 2', <Heading2 className={iconSz} />, editor.isActive('heading', { level: 2 }))}
        {toolbarBtn(() => editor.chain().focus().toggleHeading({ level: 3 }).run(), 'Heading 3', <Heading3 className={iconSz} />, editor.isActive('heading', { level: 3 }))}
        <div className="w-px h-5 bg-slate-200 mx-1" />

        {toolbarBtn(() => editor.chain().focus().toggleBold().run(), 'Bold', <Bold className={iconSz} />, editor.isActive('bold'))}
        {toolbarBtn(() => editor.chain().focus().toggleItalic().run(), 'Italic', <Italic className={iconSz} />, editor.isActive('italic'))}
        {toolbarBtn(() => editor.chain().focus().toggleStrike().run(), 'Strikethrough', <Strikethrough className={iconSz} />, editor.isActive('strike'))}
        {toolbarBtn(() => editor.chain().focus().toggleCode().run(), 'Inline Code', <Code2 className={iconSz} />, editor.isActive('code'))}
        <div className="w-px h-5 bg-slate-200 mx-1" />

        {toolbarBtn(() => editor.chain().focus().toggleBulletList().run(), 'Bullet List', <List className={iconSz} />, editor.isActive('bulletList'))}
        {toolbarBtn(() => editor.chain().focus().toggleOrderedList().run(), 'Ordered List', <ListOrdered className={iconSz} />, editor.isActive('orderedList'))}
        {toolbarBtn(() => editor.chain().focus().toggleBlockquote().run(), 'Blockquote', <Quote className={iconSz} />, editor.isActive('blockquote'))}
        {toolbarBtn(() => editor.chain().focus().setHorizontalRule().run(), 'Divider', <Minus className={iconSz} />)}
        <div className="w-px h-5 bg-slate-200 mx-1" />

        {toolbarBtn(
          () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
          'Insert Table', <TableIcon className={iconSz} />,
        )}
        <TableToolbar editor={editor} />
        <div className="w-px h-5 bg-slate-200 mx-1" />

        <ImageAltDialog editor={editor}>
          <button type="button" title="Insert Image"
            className="p-1.5 rounded transition-colors text-slate-600 hover:bg-slate-100 hover:text-slate-900">
            <ImageIcon className={iconSz} />
          </button>
        </ImageAltDialog>
      </div>

      {/* Floating bubble menu */}
      <CustomBubbleMenu editor={editor} />

      {/* Editor canvas */}
      <EditorContent editor={editor} style={{ minHeight }} className="bg-[#FAFAFA] rounded-b-md overflow-hidden" />
    </div>
  )
}

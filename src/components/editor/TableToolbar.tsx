'use client'

import * as Popover from '@radix-ui/react-popover'
import {
  Rows3,
  Columns3,
  RowsIcon,
  ColumnsIcon,
  Trash2,
  Plus,
  Table2,
} from 'lucide-react'
import type { Editor } from '@tiptap/react'

interface TableToolbarProps {
  editor: Editor
}

/**
 * TableToolbar — Radix Popover with visual controls for managing Tiptap tables.
 * Only renders the trigger button; content appears in a Popover overlay.
 */
export function TableToolbar({ editor }: TableToolbarProps) {
  const isInTable = editor.isActive('table')

  const btn = (onClick: () => void, title: string, icon: React.ReactNode, danger = false) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`flex items-center gap-2 w-full px-3 py-2 text-xs rounded-md text-left transition-colors ${
        danger
          ? 'text-red-600 hover:bg-red-50'
          : 'text-slate-700 hover:bg-slate-100'
      }`}
    >
      {icon}
      {title}
    </button>
  )

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          title="Table Options"
          disabled={!isInTable}
          className={`p-1.5 rounded transition-colors ${
            isInTable
              ? 'text-slate-700 hover:bg-slate-100'
              : 'text-slate-300 cursor-not-allowed'
          }`}
        >
          <Table2 className="w-4 h-4" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-[200] w-52 bg-white border border-slate-200 rounded-lg shadow-xl p-2"
          sideOffset={6}
          align="start"
        >
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">Rows</p>
          {btn(() => editor.chain().focus().addRowBefore().run(), 'Add Row Above', <Plus className="w-3.5 h-3.5" />)}
          {btn(() => editor.chain().focus().addRowAfter().run(), 'Add Row Below', <Rows3 className="w-3.5 h-3.5" />)}
          {btn(() => editor.chain().focus().deleteRow().run(), 'Delete Row', <RowsIcon className="w-3.5 h-3.5" />, true)}

          <div className="my-1.5 border-t border-slate-100" />
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">Columns</p>
          {btn(() => editor.chain().focus().addColumnBefore().run(), 'Add Column Left', <Plus className="w-3.5 h-3.5" />)}
          {btn(() => editor.chain().focus().addColumnAfter().run(), 'Add Column Right', <Columns3 className="w-3.5 h-3.5" />)}
          {btn(() => editor.chain().focus().deleteColumn().run(), 'Delete Column', <ColumnsIcon className="w-3.5 h-3.5" />, true)}

          <div className="my-1.5 border-t border-slate-100" />
          {btn(() => editor.chain().focus().deleteTable().run(), 'Delete Table', <Trash2 className="w-3.5 h-3.5" />, true)}

          <Popover.Arrow className="fill-white drop-shadow-sm" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

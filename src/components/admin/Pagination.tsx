'use client'

interface Props {
  page: number
  totalPages: number
  onPageChange: (p: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-white">
      <p className="text-xs text-slate-500">Page {page} of {totalPages}</p>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1.5 text-xs border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1.5 text-xs border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}

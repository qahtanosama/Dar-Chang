'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Plus, Pencil, Trash2, Star, StarOff, ChevronUp, ChevronDown, Loader2 } from 'lucide-react'
import { Pagination } from '@/components/admin/Pagination'

type PortfolioItem = {
  id: string
  slug: string
  titleEn: string
  titleAr: string
  category: string
  imageUrl: string
  featured: boolean
  order: number
  tags: string
}

export default function PortfolioAdminPage() {
  const params = useParams()
  const locale = (params.locale as string) ?? 'en'
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const LIMIT = 20

  const fetchItems = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/portfolio?page=${page}&limit=${LIMIT}`)
    const data = await res.json()
    if (Array.isArray(data)) {
      setItems(data)
    } else {
      setItems(data.items ?? [])
      setTotalPages(data.totalPages ?? 1)
    }
    setLoading(false)
  }, [page])

  useEffect(() => { fetchItems() }, [fetchItems])

  const toggleFeatured = async (item: PortfolioItem) => {
    await fetch(`/api/admin/portfolio/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: !item.featured }),
    })
    fetchItems()
  }

  const reorder = async (idx: number, dir: -1 | 1) => {
    const newItems = [...items]
    const target = newItems[idx + dir]
    const current = newItems[idx]
    ;[newItems[idx], newItems[idx + dir]] = [target, current]
    setItems(newItems)
    await Promise.all([
      fetch(`/api/admin/portfolio/${current.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: idx + dir }),
      }),
      fetch(`/api/admin/portfolio/${target.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: idx }),
      }),
    ])
  }

  const deleteItem = async (id: string) => {
    setDeletingId(id)
    await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' })
    setDeletingId(null)
    setConfirmDelete(null)
    fetchItems()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Portfolio Items</h2>
          <p className="text-sm text-slate-500">{items.length} items • drag to reorder</p>
        </div>
        <Link
          href={`/${locale}/admin/portfolio/new`}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Item
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
          <p className="text-slate-500 mb-3">No portfolio items yet</p>
          <Link href={`/${locale}/admin/portfolio/new`} className="text-sm text-blue-600 hover:underline">
            + Add your first item
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 font-medium text-slate-600 w-8">#</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Title (EN)</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden sm:table-cell">Featured</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Status</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <button disabled={idx === 0} onClick={() => reorder(idx, -1)}
                        className="text-slate-300 hover:text-slate-600 disabled:opacity-20 disabled:cursor-not-allowed">
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button disabled={idx === items.length - 1} onClick={() => reorder(idx, 1)}
                        className="text-slate-300 hover:text-slate-600 disabled:opacity-20 disabled:cursor-not-allowed">
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{item.titleEn}</div>
                    <div className="text-xs text-slate-400" dir="rtl">{item.titleAr}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">{item.category}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <button onClick={() => toggleFeatured(item)} className="transition-colors">
                      {item.featured
                        ? <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        : <StarOff className="w-4 h-4 text-slate-300 hover:text-amber-400" />}
                    </button>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      (item as any).status === 'published' ? 'bg-emerald-100 text-emerald-700' :
                      (item as any).status === 'archived' ? 'bg-red-100 text-red-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>{(item as any).status ?? 'published'}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/${locale}/admin/portfolio/${item.id}`}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button onClick={() => setConfirmDelete(item.id)}
                        className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4 shadow-xl">
            <h3 className="text-base font-semibold text-slate-800 mb-2">Delete Item?</h3>
            <p className="text-sm text-slate-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)}
                className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={() => deleteItem(confirmDelete)}
                disabled={deletingId === confirmDelete}
                className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                {deletingId === confirmDelete && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

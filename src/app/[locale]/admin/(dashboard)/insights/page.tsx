'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Plus, Pencil, Trash2, Loader2, CheckCircle, Clock } from 'lucide-react'
import { Pagination } from '@/components/admin/Pagination'

type Insight = {
  id: string
  slug: string
  titleEn: string
  titleAr: string
  category: string
  published: boolean
  publishedAt: string | null
  createdAt: string
  summaryEn: string
}

export default function InsightsAdminPage() {
  const params = useParams()
  const locale = (params.locale as string) ?? 'en'
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const LIMIT = 20

  const fetchInsights = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/insights?page=${page}&limit=${LIMIT}`)
    const data = await res.json()
    if (Array.isArray(data)) {
      setInsights(data)
    } else {
      setInsights(data.insights ?? data.items ?? [])
      setTotalPages(data.totalPages ?? 1)
    }
    setLoading(false)
  }, [page])

  useEffect(() => { fetchInsights() }, [fetchInsights])

  const deleteInsight = async (id: string) => {
    setDeletingId(id)
    const res = await fetch(`/api/admin/insights/${id}`, { method: 'DELETE' })
    setDeletingId(null)
    setConfirmDelete(null)
    if (res.ok) {
      fetchInsights()
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Insights</h2>
          <p className="text-sm text-slate-500">{insights.filter((i) => i.published).length} published · {insights.length} total</p>
        </div>
        <Link href={`/${locale}/admin/insights/new`}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors">
          <Plus className="w-4 h-4" /> New Insight
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
      ) : insights.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
          <p className="text-slate-500 mb-3">No insights yet</p>
          <Link href={`/${locale}/admin/insights/new`} className="text-sm text-blue-600 hover:underline">+ Write your first insight</Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Title (EN)</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden sm:table-cell">Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Date</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {insights.map((insight) => (
                <tr key={insight.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800 leading-tight">{insight.titleEn}</div>
                    <div className="text-xs text-slate-400 mt-0.5 font-mono">/insights/{insight.slug}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600">{insight.category}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {insight.published
                      ? <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium"><CheckCircle className="w-3.5 h-3.5" />Published</span>
                      : <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium"><Clock className="w-3.5 h-3.5" />Draft</span>}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-slate-400">
                    {new Date(insight.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/${locale}/admin/insights/${insight.id}`}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button onClick={() => setConfirmDelete(insight.id)}
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

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4 shadow-xl">
            <h3 className="text-base font-semibold text-slate-800 mb-2">Delete Insight?</h3>
            <p className="text-sm text-slate-500 mb-5">This will permanently remove the insight and its public URL.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)}
                className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={() => deleteInsight(confirmDelete)} disabled={deletingId === confirmDelete}
                className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2">
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

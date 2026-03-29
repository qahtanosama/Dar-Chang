'use client'

import { useState, useEffect, useCallback } from 'react'
import { Loader2, Mail, MailOpen, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Pagination } from '@/components/admin/Pagination'

type Submission = {
  id: string
  type: string
  email: string
  category: string
  message: string
  data: string
  read: boolean
  createdAt: string
}

type ApiResponse = {
  submissions: Submission[]
  total: number
  unreadCount: number
  page: number
  totalPages: number
}

export default function SubmissionsPage() {
  const params = useParams()
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [unreadOnly, setUnreadOnly] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/submissions?page=${page}&limit=20&unreadOnly=${unreadOnly}`)
    const json = await res.json()
    setData(json)
    setLoading(false)
  }, [page, unreadOnly])

  useEffect(() => { fetchData() }, [fetchData])

  const markRead = async (id: string, read: boolean) => {
    await fetch(`/api/admin/submissions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read }),
    })
    setData(prev => prev ? {
      ...prev,
      submissions: prev.submissions.map(s => s.id === id ? { ...s, read } : s),
      unreadCount: prev.unreadCount + (read ? -1 : 1),
    } : prev)
  }

  const deleteSubmission = async (id: string) => {
    setDeletingId(id)
    const res = await fetch(`/api/admin/submissions/${id}`, { method: 'DELETE' })
    setDeletingId(null)
    if (res.ok) fetchData()
  }

  const handleExpand = (id: string) => {
    if (expandedId !== id) {
      setExpandedId(id)
      const sub = data?.submissions.find(s => s.id === id)
      if (sub && !sub.read) markRead(id, true)
    } else {
      setExpandedId(null)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Form Submissions</h2>
          <p className="text-sm text-slate-500">
            {data?.unreadCount ?? 0} unread · {data?.total ?? 0} total
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
          <input type="checkbox" checked={unreadOnly} onChange={e => { setUnreadOnly(e.target.checked); setPage(1) }}
            className="w-4 h-4 rounded accent-slate-900" />
          Unread only
        </label>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
      ) : !data || data.submissions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
          <p className="text-slate-500">No submissions yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {data.submissions.map(sub => (
              <div key={sub.id} className={`transition-colors ${!sub.read ? 'bg-blue-50/30' : ''}`}>
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50"
                  onClick={() => handleExpand(sub.id)}
                >
                  <div className="shrink-0 text-slate-400">
                    {sub.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4 text-blue-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-medium text-sm ${sub.read ? 'text-slate-700' : 'text-slate-900 font-semibold'}`}>
                        {sub.email}
                      </span>
                      {sub.category && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">{sub.category}</span>
                      )}
                      {!sub.read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                    </div>
                    {sub.message && <p className="text-xs text-slate-400 truncate mt-0.5">{sub.message}</p>}
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-xs text-slate-400 hidden sm:block">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </span>
                    {expandedId === sub.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {expandedId === sub.id && (
                  <div className="px-4 py-4 border-t border-slate-100 bg-white space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div><span className="text-xs text-slate-400 block">Email</span><span className="font-medium text-slate-800">{sub.email}</span></div>
                      {sub.category && <div><span className="text-xs text-slate-400 block">Category</span><span className="font-medium text-slate-800">{sub.category}</span></div>}
                      <div><span className="text-xs text-slate-400 block">Date</span><span className="font-medium text-slate-800">{new Date(sub.createdAt).toLocaleString()}</span></div>
                    </div>
                    {sub.message && (
                      <div>
                        <span className="text-xs text-slate-400 block mb-1">Message</span>
                        <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3 leading-relaxed">{sub.message}</p>
                      </div>
                    )}
                    {sub.data && sub.data !== '{}' && (
                      <div>
                        <span className="text-xs text-slate-400 block mb-1">Additional Details</span>
                        <pre className="text-xs text-slate-600 bg-slate-50 rounded-lg p-3 overflow-x-auto">{JSON.stringify(JSON.parse(sub.data), null, 2)}</pre>
                      </div>
                    )}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); markRead(sub.id, !sub.read) }}
                        className="text-xs px-3 py-1.5 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-600 transition-colors"
                      >
                        {sub.read ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteSubmission(sub.id) }}
                        disabled={deletingId === sub.id}
                        className="text-xs px-3 py-1.5 border border-red-200 rounded-md hover:bg-red-50 text-red-600 transition-colors flex items-center gap-1"
                      >
                        {deletingId === sub.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Pagination page={page} totalPages={data.totalPages} onPageChange={p => setPage(p)} />
        </div>
      )}
    </div>
  )
}

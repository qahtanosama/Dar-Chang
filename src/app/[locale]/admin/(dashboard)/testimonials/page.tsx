'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'

type Testimonial = {
  id: string
  clientNameEn: string
  clientNameAr: string
  companyEn: string
  companyAr: string
  quoteEn: string
  rating: number
  published: boolean
  order: number
  createdAt: string
}

export default function TestimonialsAdminPage() {
  const params = useParams()
  const locale = (params.locale as string) ?? 'en'
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchTestimonials = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/testimonials')
    const data = await res.json()
    setTestimonials(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchTestimonials() }, [fetchTestimonials])

  const deleteTestimonial = async (id: string) => {
    setDeletingId(id)
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
    setDeletingId(null)
    setConfirmDelete(null)
    if (res.ok) fetchTestimonials()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Testimonials</h2>
          <p className="text-sm text-slate-500">{testimonials.filter(t => t.published).length} published · {testimonials.length} total</p>
        </div>
        <Link href={`/${locale}/admin/testimonials/new`}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors">
          <Plus className="w-4 h-4" /> Add Testimonial
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
          <p className="text-slate-500 mb-3">No testimonials yet</p>
          <Link href={`/${locale}/admin/testimonials/new`} className="text-sm text-blue-600 hover:underline">+ Add your first testimonial</Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Client Name</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Company</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden sm:table-cell">Rating</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden sm:table-cell">Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Created</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{t.clientNameEn}</div>
                    <div className="text-xs text-slate-400" dir="rtl">{t.clientNameAr}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-600 text-xs">{t.companyEn}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-amber-500 text-sm leading-none">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${t.published ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {t.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-slate-400">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/${locale}/admin/testimonials/${t.id}`}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button onClick={() => setConfirmDelete(t.id)}
                        className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4 shadow-xl">
            <h3 className="text-base font-semibold text-slate-800 mb-2">Delete Testimonial?</h3>
            <p className="text-sm text-slate-500 mb-5">This will permanently remove this testimonial.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)}
                className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
              <button onClick={() => deleteTestimonial(confirmDelete)} disabled={deletingId === confirmDelete}
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

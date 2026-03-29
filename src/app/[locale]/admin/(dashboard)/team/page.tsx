'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'

type Member = {
  id: string
  nameEn: string
  nameAr: string
  roleEn: string
  roleAr: string
  photoUrl: string
  active: boolean
  order: number
  createdAt: string
}

export default function TeamAdminPage() {
  const params = useParams()
  const locale = (params.locale as string) ?? 'en'
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchMembers = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/team')
    const data = await res.json()
    setMembers(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchMembers() }, [fetchMembers])

  const deleteMember = async (id: string) => {
    setDeletingId(id)
    const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' })
    setDeletingId(null)
    setConfirmDelete(null)
    if (res.ok) fetchMembers()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Team Members</h2>
          <p className="text-sm text-slate-500">{members.filter(m => m.active).length} active · {members.length} total</p>
        </div>
        <Link href={`/${locale}/admin/team/new`}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors">
          <Plus className="w-4 h-4" /> Add Member
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
      ) : members.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
          <p className="text-slate-500 mb-3">No team members yet</p>
          <Link href={`/${locale}/admin/team/new`} className="text-sm text-blue-600 hover:underline">+ Add your first team member</Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Role</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden sm:table-cell">Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Added</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {member.photoUrl ? (
                        <img src={member.photoUrl} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 text-xs font-bold text-slate-500">
                          {member.nameEn.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-slate-800">{member.nameEn}</div>
                        <div className="text-xs text-slate-400" dir="rtl">{member.nameAr}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-600 text-xs">{member.roleEn}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${member.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {member.active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-slate-400">
                    {new Date(member.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/${locale}/admin/team/${member.id}`}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button onClick={() => setConfirmDelete(member.id)}
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
            <h3 className="text-base font-semibold text-slate-800 mb-2">Remove Team Member?</h3>
            <p className="text-sm text-slate-500 mb-5">This will permanently remove this team member.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)}
                className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
              <button onClick={() => deleteMember(confirmDelete)} disabled={deletingId === confirmDelete}
                className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2">
                {deletingId === confirmDelete && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

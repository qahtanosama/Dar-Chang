'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Plus, Pencil, Trash2, Loader2, X, Check, Eye, EyeOff,
  ExternalLink, Upload, FileText,
  Building2, Scale, ShieldCheck, Anchor, FileCheck, ScrollText,
  BadgeCheck, Box, Globe, Search, Package, Layers,
  Truck, Settings, Wrench, Zap, Factory, Star, Cpu, Cog,
} from 'lucide-react'

// ── Icon registry ──────────────────────────────────────────────────────────
const ICON_OPTIONS: { name: string; icon: React.ReactNode }[] = [
  { name: 'Building2', icon: <Building2 className="w-5 h-5" /> },
  { name: 'Scale', icon: <Scale className="w-5 h-5" /> },
  { name: 'FileCheck', icon: <FileCheck className="w-5 h-5" /> },
  { name: 'Anchor', icon: <Anchor className="w-5 h-5" /> },
  { name: 'ShieldCheck', icon: <ShieldCheck className="w-5 h-5" /> },
  { name: 'ScrollText', icon: <ScrollText className="w-5 h-5" /> },
  { name: 'BadgeCheck', icon: <BadgeCheck className="w-5 h-5" /> },
  { name: 'Box', icon: <Box className="w-5 h-5" /> },
  { name: 'Globe', icon: <Globe className="w-5 h-5" /> },
  { name: 'Search', icon: <Search className="w-5 h-5" /> },
  { name: 'Package', icon: <Package className="w-5 h-5" /> },
  { name: 'Layers', icon: <Layers className="w-5 h-5" /> },
  { name: 'Truck', icon: <Truck className="w-5 h-5" /> },
  { name: 'Settings', icon: <Settings className="w-5 h-5" /> },
  { name: 'Wrench', icon: <Wrench className="w-5 h-5" /> },
  { name: 'Zap', icon: <Zap className="w-5 h-5" /> },
  { name: 'Factory', icon: <Factory className="w-5 h-5" /> },
  { name: 'Star', icon: <Star className="w-5 h-5" /> },
  { name: 'Cpu', icon: <Cpu className="w-5 h-5" /> },
  { name: 'Cog', icon: <Cog className="w-5 h-5" /> },
  { name: 'FileText', icon: <FileText className="w-5 h-5" /> },
]

export const ICON_MAP: Record<string, React.ReactNode> = Object.fromEntries(
  ICON_OPTIONS.map((o) => [o.name, o.icon]),
)

const STATUS_OPTIONS = ['Verified', 'Active', 'Expired'] as const
type Status = (typeof STATUS_OPTIONS)[number]

const STATUS_STYLES: Record<Status, string> = {
  Verified: 'bg-emerald-100 text-emerald-700',
  Active: 'bg-blue-100 text-blue-700',
  Expired: 'bg-red-100 text-red-600',
}

type VaultDoc = {
  id: string
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  categoryEn: string
  categoryAr: string
  icon: string
  status: Status
  validUntil: string
  documentUrl: string
  displayOrder: number
  active: boolean
}

type FormState = Omit<VaultDoc, 'id' | 'displayOrder'>

const EMPTY_FORM: FormState = {
  titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '',
  categoryEn: '', categoryAr: '', icon: '', status: 'Active',
  validUntil: '', documentUrl: '', active: true,
}

const inputCls = 'w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900'

export default function VaultAdminPage() {
  const [docs, setDocs] = useState<VaultDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [activeTab, setActiveTab] = useState<'en' | 'ar'>('en')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchDocs = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/vault')
    if (res.ok) setDocs(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { fetchDocs() }, [fetchDocs])

  const openNew = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setActiveTab('en')
    setError('')
    setModalOpen(true)
  }

  const openEdit = (doc: VaultDoc) => {
    setEditingId(doc.id)
    setForm({
      titleEn: doc.titleEn, titleAr: doc.titleAr,
      descriptionEn: doc.descriptionEn, descriptionAr: doc.descriptionAr,
      categoryEn: doc.categoryEn, categoryAr: doc.categoryAr,
      icon: doc.icon, status: doc.status, validUntil: doc.validUntil,
      documentUrl: doc.documentUrl, active: doc.active,
    })
    setActiveTab('en')
    setError('')
    setModalOpen(true)
  }

  const closeModal = () => { setModalOpen(false); setEditingId(null); setForm(EMPTY_FORM) }

  const setField = (key: keyof FormState, val: string | boolean) =>
    setForm(prev => ({ ...prev, [key]: val }))

  const uploadPdf = async (file: File) => {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    setUploading(false)
    if (data.url) setField('documentUrl', data.url)
    else setError(data.error || 'Upload failed')
  }

  const handleSave = async () => {
    if (!form.titleEn.trim() || !form.titleAr.trim()) {
      setError('Both English and Arabic titles are required.')
      return
    }
    setSaving(true)
    setError('')
    const url = editingId ? `/api/admin/vault/${editingId}` : '/api/admin/vault'
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) {
      setSuccess(editingId ? 'Document updated.' : 'Document created.')
      setTimeout(() => setSuccess(''), 2000)
      closeModal()
      fetchDocs()
    } else {
      const data = await res.json()
      setError(data.error || 'Save failed')
    }
  }

  const toggleActive = async (doc: VaultDoc) => {
    await fetch(`/api/admin/vault/${doc.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !doc.active }),
    })
    fetchDocs()
  }

  const deleteDoc = async (id: string) => {
    setDeletingId(id)
    await fetch(`/api/admin/vault/${id}`, { method: 'DELETE' })
    setDeletingId(null)
    setConfirmDelete(null)
    fetchDocs()
  }

  // Group by categoryEn for display
  const grouped: Record<string, VaultDoc[]> = {}
  for (const doc of docs) {
    const key = doc.categoryEn || 'Uncategorized'
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(doc)
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Digital Vault</h2>
          <p className="text-sm text-slate-500">{docs.filter(d => d.active).length} active · {docs.length} total</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Document
        </button>
      </div>

      {success && <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">{success}</p>}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      ) : docs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
          <p className="text-slate-500 mb-3">No vault documents yet</p>
          <button onClick={openNew} className="text-sm text-blue-600 hover:underline">+ Add your first document</button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700">{category}</h3>
                <p className="text-xs text-slate-400">{items[0]?.categoryAr}</p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left px-4 py-2.5 font-medium text-slate-600">Title (EN)</th>
                    <th className="text-left px-4 py-2.5 font-medium text-slate-600 hidden md:table-cell">Status</th>
                    <th className="text-left px-4 py-2.5 font-medium text-slate-600 hidden sm:table-cell">Valid Until</th>
                    <th className="text-left px-4 py-2.5 font-medium text-slate-600 hidden lg:table-cell">Document</th>
                    <th className="text-left px-4 py-2.5 font-medium text-slate-600 hidden sm:table-cell">Active</th>
                    <th className="text-right px-4 py-2.5 font-medium text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {doc.icon && <span className="text-slate-400 shrink-0">{ICON_MAP[doc.icon]}</span>}
                          <div>
                            <div className="font-medium text-slate-800">{doc.titleEn}</div>
                            <div className="text-xs text-slate-400" dir="rtl">{doc.titleAr}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[doc.status as Status] ?? 'bg-slate-100 text-slate-600'}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell text-xs text-slate-500">{doc.validUntil || '—'}</td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {doc.documentUrl ? (
                          <a
                            href={doc.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View PDF
                          </a>
                        ) : (
                          <span className="text-xs text-slate-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <button onClick={() => toggleActive(doc)}>
                          {doc.active
                            ? <Eye className="w-4 h-4 text-emerald-500" />
                            : <EyeOff className="w-4 h-4 text-slate-300 hover:text-slate-500" />}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(doc)}
                            className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setConfirmDelete(doc.id)}
                            className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto py-8 px-4">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h3 className="text-base font-semibold text-slate-800">
                {editingId ? 'Edit Document' : 'New Document'}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Language tabs */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="flex border-b border-slate-200">
                  {(['en', 'ar'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveTab(lang)}
                      className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                        activeTab === lang ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {lang === 'en' ? '🇺🇸 English' : '🇸🇦 Arabic'}
                    </button>
                  ))}
                </div>
                <div className="p-4 space-y-4">
                  {activeTab === 'en' ? (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Title (English) *</label>
                        <input className={inputCls} value={form.titleEn} onChange={e => setField('titleEn', e.target.value)} placeholder="e.g. Shanghai Business Registration" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Description (English)</label>
                        <input className={inputCls} value={form.descriptionEn} onChange={e => setField('descriptionEn', e.target.value)} placeholder="e.g. Official Entity Status & Operating License" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Category (English)</label>
                        <input className={inputCls} value={form.categoryEn} onChange={e => setField('categoryEn', e.target.value)} placeholder="e.g. Trade & Legal Compliance" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Title (Arabic) *</label>
                        <input className={inputCls} dir="rtl" value={form.titleAr} onChange={e => setField('titleAr', e.target.value)} placeholder="مثال: تسجيل الأعمال في شنغهاي" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Description (Arabic)</label>
                        <input className={inputCls} dir="rtl" value={form.descriptionAr} onChange={e => setField('descriptionAr', e.target.value)} placeholder="مثال: حالة الكيان الرسمي وتصريح التشغيل" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Category (Arabic)</label>
                        <input className={inputCls} dir="rtl" value={form.categoryAr} onChange={e => setField('categoryAr', e.target.value)} placeholder="مثال: الامتثال التجاري والقانوني" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Status + Valid Until */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
                  <select
                    className={inputCls}
                    value={form.status}
                    onChange={e => setField('status', e.target.value)}
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Valid Until</label>
                  <input className={inputCls} value={form.validUntil} onChange={e => setField('validUntil', e.target.value)} placeholder="e.g. 2026-2030 or Q1 2026" />
                </div>
              </div>

              {/* Icon picker */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">Icon</label>
                <div className="grid grid-cols-10 gap-1.5">
                  {ICON_OPTIONS.map(opt => (
                    <button
                      key={opt.name}
                      type="button"
                      title={opt.name}
                      onClick={() => setField('icon', opt.name === form.icon ? '' : opt.name)}
                      className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                        form.icon === opt.name ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {opt.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* PDF Upload + URL */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">Document (PDF)</label>
                <div className="flex gap-2 items-start flex-wrap">
                  <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors shrink-0">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> : <Upload className="w-4 h-4 text-slate-400" />}
                    <span className="text-sm text-slate-500">{uploading ? 'Uploading…' : 'Upload PDF'}</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={e => e.target.files?.[0] && uploadPdf(e.target.files[0])}
                    />
                  </label>
                  <input
                    className={inputCls + ' flex-1'}
                    value={form.documentUrl}
                    onChange={e => setField('documentUrl', e.target.value)}
                    placeholder="Or paste PDF URL…"
                  />
                </div>
                {form.documentUrl && (
                  <a href={form.documentUrl} target="_blank" rel="noopener noreferrer" className="mt-1.5 flex items-center gap-1 text-xs text-blue-600 hover:underline">
                    <ExternalLink className="w-3 h-3" /> View uploaded document
                  </a>
                )}
              </div>

              {/* Active toggle */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setField('active', !form.active)}
                  className={`w-9 h-5 rounded-full transition-colors relative ${form.active ? 'bg-emerald-500' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.active ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
                <span className="text-sm text-slate-700">{form.active ? 'Active (visible on site)' : 'Hidden'}</span>
              </div>

              {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-slate-200">
              <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
              <button type="button" onClick={handleSave} disabled={saving}
                className="flex-1 px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {editingId ? 'Save Changes' : 'Create Document'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4 shadow-xl">
            <h3 className="text-base font-semibold text-slate-800 mb-2">Delete Document?</h3>
            <p className="text-sm text-slate-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={() => deleteDoc(confirmDelete)} disabled={deletingId === confirmDelete}
                className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
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

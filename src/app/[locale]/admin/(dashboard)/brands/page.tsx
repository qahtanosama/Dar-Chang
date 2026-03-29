'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Plus, Pencil, Trash2, Loader2, X, Check, Eye, EyeOff,
  ChevronUp, ChevronDown, Upload,
} from 'lucide-react'

type Brand = {
  id: string
  name: string
  logoUrl: string
  websiteUrl: string
  displayOrder: number
  active: boolean
}

type FormState = Omit<Brand, 'id' | 'displayOrder'>

const EMPTY_FORM: FormState = { name: '', logoUrl: '', websiteUrl: '', active: true }

const inputCls = 'w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900'

export default function BrandsAdminPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchBrands = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/brands')
    if (res.ok) setBrands(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { fetchBrands() }, [fetchBrands])

  const openNew = () => { setEditingId(null); setForm(EMPTY_FORM); setError(''); setModalOpen(true) }

  const openEdit = (b: Brand) => {
    setEditingId(b.id)
    setForm({ name: b.name, logoUrl: b.logoUrl, websiteUrl: b.websiteUrl, active: b.active })
    setError('')
    setModalOpen(true)
  }

  const closeModal = () => { setModalOpen(false); setEditingId(null); setForm(EMPTY_FORM) }

  const setField = (key: keyof FormState, val: string | boolean) =>
    setForm(prev => ({ ...prev, [key]: val }))

  const uploadLogo = async (file: File) => {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    setUploading(false)
    if (data.url) setField('logoUrl', data.url)
    else setError(data.error || 'Upload failed')
  }

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Brand name is required.'); return }
    setSaving(true)
    setError('')
    const url = editingId ? `/api/admin/brands/${editingId}` : '/api/admin/brands'
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) {
      setSuccess(editingId ? 'Brand updated.' : 'Brand created.')
      setTimeout(() => setSuccess(''), 2000)
      closeModal()
      fetchBrands()
    } else {
      const data = await res.json()
      setError(data.error || 'Save failed')
    }
  }

  const toggleActive = async (b: Brand) => {
    await fetch(`/api/admin/brands/${b.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !b.active }),
    })
    fetchBrands()
  }

  const reorder = async (idx: number, dir: -1 | 1) => {
    const next = [...brands]
    ;[next[idx], next[idx + dir]] = [next[idx + dir], next[idx]]
    setBrands(next)
    await Promise.all([
      fetch(`/api/admin/brands/${next[idx].id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ displayOrder: idx }) }),
      fetch(`/api/admin/brands/${next[idx + dir].id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ displayOrder: idx + dir }) }),
    ])
  }

  const deleteBrand = async (id: string) => {
    setDeletingId(id)
    await fetch(`/api/admin/brands/${id}`, { method: 'DELETE' })
    setDeletingId(null)
    setConfirmDelete(null)
    fetchBrands()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Brand Ticker</h2>
          <p className="text-sm text-slate-500">{brands.filter(b => b.active).length} active · {brands.length} total</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors">
          <Plus className="w-4 h-4" /> Add Brand
        </button>
      </div>

      {success && <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">{success}</p>}

      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
      ) : brands.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
          <p className="text-slate-500 mb-3">No brands yet</p>
          <button onClick={openNew} className="text-sm text-blue-600 hover:underline">+ Add your first brand</button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 font-medium text-slate-600 w-8">#</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Brand</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Logo</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden sm:table-cell">Active</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {brands.map((b, idx) => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <button disabled={idx === 0} onClick={() => reorder(idx, -1)} className="text-slate-300 hover:text-slate-600 disabled:opacity-20 disabled:cursor-not-allowed">
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button disabled={idx === brands.length - 1} onClick={() => reorder(idx, 1)} className="text-slate-300 hover:text-slate-600 disabled:opacity-20 disabled:cursor-not-allowed">
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-800 tracking-wide">{b.name}</div>
                    {b.websiteUrl && <div className="text-xs text-slate-400 truncate max-w-xs">{b.websiteUrl}</div>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {b.logoUrl ? (
                      <img src={b.logoUrl.replace(/\.svg$/, '.webp')} onError={(e) => { e.currentTarget.src = b.logoUrl }} alt={b.name} className="h-8 max-w-[80px] object-contain" />
                    ) : (
                      <span className="text-xs text-slate-300">Text only</span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <button onClick={() => toggleActive(b)}>
                      {b.active ? <Eye className="w-4 h-4 text-emerald-500" /> : <EyeOff className="w-4 h-4 text-slate-300 hover:text-slate-500" />}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(b)} className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => setConfirmDelete(b.id)} className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors">
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

      {/* Edit/Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h3 className="text-base font-semibold text-slate-800">{editingId ? 'Edit Brand' : 'New Brand'}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Brand Name *</label>
                <input className={inputCls} value={form.name} onChange={e => setField('name', e.target.value)} placeholder="e.g. CATERPILLAR" />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Website URL (optional)</label>
                <input className={inputCls} value={form.websiteUrl} onChange={e => setField('websiteUrl', e.target.value)} placeholder="https://caterpillar.com" />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">Logo (optional — falls back to text)</label>
                <div className="flex gap-2 items-center flex-wrap">
                  <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors shrink-0">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> : <Upload className="w-4 h-4 text-slate-400" />}
                    <span className="text-sm text-slate-500">{uploading ? 'Uploading…' : 'Upload Logo'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadLogo(e.target.files[0])} />
                  </label>
                  <input className={inputCls + ' flex-1'} value={form.logoUrl} onChange={e => setField('logoUrl', e.target.value)} placeholder="Or paste image URL (e.g. /brands/cat-logo.svg)" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 italic">Recommended: SVG or WebP, max 200x80px, transparent background.</p>
                {form.logoUrl && <img src={form.logoUrl.replace(/\.svg$/, '.webp')} onError={(e) => { e.currentTarget.src = form.logoUrl }} alt="Preview" className="mt-3 h-12 object-contain border rounded p-2 bg-slate-50" />}
              </div>

              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setField('active', !form.active)}
                  className={`w-9 h-5 rounded-full transition-colors relative ${form.active ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.active ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
                <span className="text-sm text-slate-700">{form.active ? 'Visible in ticker' : 'Hidden'}</span>
              </div>

              {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-slate-200">
              <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
              <button type="button" onClick={handleSave} disabled={saving}
                className="flex-1 px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {editingId ? 'Save Changes' : 'Create Brand'}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4 shadow-xl">
            <h3 className="text-base font-semibold text-slate-800 mb-2">Delete Brand?</h3>
            <p className="text-sm text-slate-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={() => deleteBrand(confirmDelete)} disabled={deletingId === confirmDelete}
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

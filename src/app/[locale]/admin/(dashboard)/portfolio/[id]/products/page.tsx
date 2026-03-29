'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  Plus, Pencil, Trash2, Loader2, ChevronUp, ChevronDown,
  ChevronLeft, X, Check, Eye, EyeOff,
  Truck, Settings, Wrench, Zap, Package, Factory,
  Shield, Star, Globe, Search, Layers, Box,
  Cpu, Hammer, Cog, Gauge, FlaskConical, Forklift,
} from 'lucide-react'

// ── Icon registry ──────────────────────────────────────────────────────────
const ICON_OPTIONS: { name: string; icon: React.ReactNode }[] = [
  { name: 'Truck', icon: <Truck className="w-5 h-5" /> },
  { name: 'Settings', icon: <Settings className="w-5 h-5" /> },
  { name: 'Wrench', icon: <Wrench className="w-5 h-5" /> },
  { name: 'Zap', icon: <Zap className="w-5 h-5" /> },
  { name: 'Package', icon: <Package className="w-5 h-5" /> },
  { name: 'Factory', icon: <Factory className="w-5 h-5" /> },
  { name: 'Shield', icon: <Shield className="w-5 h-5" /> },
  { name: 'Star', icon: <Star className="w-5 h-5" /> },
  { name: 'Globe', icon: <Globe className="w-5 h-5" /> },
  { name: 'Search', icon: <Search className="w-5 h-5" /> },
  { name: 'Layers', icon: <Layers className="w-5 h-5" /> },
  { name: 'Box', icon: <Box className="w-5 h-5" /> },
  { name: 'Cpu', icon: <Cpu className="w-5 h-5" /> },
  { name: 'Hammer', icon: <Hammer className="w-5 h-5" /> },
  { name: 'Cog', icon: <Cog className="w-5 h-5" /> },
  { name: 'Gauge', icon: <Gauge className="w-5 h-5" /> },
  { name: 'FlaskConical', icon: <FlaskConical className="w-5 h-5" /> },
  { name: 'Forklift', icon: <Forklift className="w-5 h-5" /> },
]

export const ICON_MAP: Record<string, React.ReactNode> = Object.fromEntries(
  ICON_OPTIONS.map((o) => [o.name, o.icon]),
)

// ── Types ─────────────────────────────────────────────────────────────────
type SpecEntry = { key: string; value: string }

type Product = {
  id: string
  nameEn: string
  nameAr: string
  descriptionEn: string
  descriptionAr: string
  icon: string
  imageUrl: string
  specs: string // JSON string
  displayOrder: number
  active: boolean
}

type FormState = Omit<Product, 'id' | 'displayOrder' | 'active'> & {
  active: boolean
  specEntries: SpecEntry[]
}

const EMPTY_FORM: FormState = {
  nameEn: '', nameAr: '', descriptionEn: '', descriptionAr: '',
  icon: '', imageUrl: '', specs: '{}', active: true,
  specEntries: [],
}

function specsToEntries(specs: string): SpecEntry[] {
  try {
    const obj = JSON.parse(specs)
    return Object.entries(obj).map(([key, value]) => ({ key, value: String(value) }))
  } catch {
    return []
  }
}

function entriesToSpecs(entries: SpecEntry[]): string {
  const obj: Record<string, string> = {}
  entries.forEach(({ key, value }) => { if (key.trim()) obj[key.trim()] = value })
  return JSON.stringify(obj)
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function ProductsAdminPage() {
  const params = useParams()
  const locale = (params.locale as string) ?? 'en'
  const portfolioId = params.id as string

  const [parentTitle, setParentTitle] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [activeTab, setActiveTab] = useState<'en' | 'ar'>('en')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/portfolio/${portfolioId}/products`)
    if (res.ok) setProducts(await res.json())
    setLoading(false)
  }, [portfolioId])

  // Fetch parent title once
  useEffect(() => {
    fetch(`/api/admin/portfolio`).then(r => r.json()).then((all: any[]) => {
      const item = all.find((i: any) => i.id === portfolioId)
      if (item) setParentTitle(item.titleEn)
    }).catch(() => {})
    fetchProducts()
  }, [portfolioId, fetchProducts])

  const openNew = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setActiveTab('en')
    setError('')
    setModalOpen(true)
  }

  const openEdit = (p: Product) => {
    setEditingId(p.id)
    setForm({
      nameEn: p.nameEn, nameAr: p.nameAr,
      descriptionEn: p.descriptionEn, descriptionAr: p.descriptionAr,
      icon: p.icon, imageUrl: p.imageUrl, specs: p.specs,
      active: p.active,
      specEntries: specsToEntries(p.specs),
    })
    setActiveTab('en')
    setError('')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  const setField = (key: keyof FormState, val: string | boolean) =>
    setForm(prev => ({ ...prev, [key]: val }))

  const setSpec = (idx: number, field: 'key' | 'value', val: string) =>
    setForm(prev => {
      const entries = [...prev.specEntries]
      entries[idx] = { ...entries[idx], [field]: val }
      return { ...prev, specEntries: entries }
    })

  const addSpec = () =>
    setForm(prev => ({ ...prev, specEntries: [...prev.specEntries, { key: '', value: '' }] }))

  const removeSpec = (idx: number) =>
    setForm(prev => ({ ...prev, specEntries: prev.specEntries.filter((_, i) => i !== idx) }))

  const handleSave = async () => {
    if (!form.nameEn.trim() || !form.nameAr.trim()) {
      setError('Both English and Arabic names are required.')
      return
    }
    setSaving(true)
    setError('')
    const payload = {
      nameEn: form.nameEn, nameAr: form.nameAr,
      descriptionEn: form.descriptionEn, descriptionAr: form.descriptionAr,
      icon: form.icon, imageUrl: form.imageUrl,
      specs: entriesToSpecs(form.specEntries),
      active: form.active,
    }
    const url = editingId
      ? `/api/admin/portfolio/${portfolioId}/products/${editingId}`
      : `/api/admin/portfolio/${portfolioId}/products`
    const method = editingId ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setSaving(false)
    if (res.ok) {
      setSuccess(editingId ? 'Product updated.' : 'Product created.')
      setTimeout(() => setSuccess(''), 2000)
      closeModal()
      fetchProducts()
    } else {
      const data = await res.json()
      setError(data.error || 'Save failed')
    }
  }

  const toggleActive = async (p: Product) => {
    await fetch(`/api/admin/portfolio/${portfolioId}/products/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !p.active }),
    })
    fetchProducts()
  }

  const reorder = async (idx: number, dir: -1 | 1) => {
    const next = [...products]
    const a = next[idx]
    const b = next[idx + dir]
    ;[next[idx], next[idx + dir]] = [b, a]
    setProducts(next)
    await fetch(`/api/admin/portfolio/${portfolioId}/products/reorder`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order: next.map((p, i) => ({ id: p.id, displayOrder: i })),
      }),
    })
  }

  const deleteProduct = async (id: string) => {
    setDeletingId(id)
    await fetch(`/api/admin/portfolio/${portfolioId}/products/${id}`, { method: 'DELETE' })
    setDeletingId(null)
    setConfirmDelete(null)
    fetchProducts()
  }

  const inputCls = 'w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900'

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href={`/${locale}/admin/portfolio/${portfolioId}`}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Products</h2>
          {parentTitle && (
            <p className="text-sm text-slate-500">{parentTitle}</p>
          )}
        </div>
        <div className="ml-auto">
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      {success && (
        <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">{success}</p>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
          <p className="text-slate-500 mb-3">No products yet</p>
          <button onClick={openNew} className="text-sm text-blue-600 hover:underline">
            + Add your first product
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 font-medium text-slate-600 w-8">#</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Name (EN)</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Icon</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden sm:table-cell">Active</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p, idx) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <button
                        disabled={idx === 0}
                        onClick={() => reorder(idx, -1)}
                        className="text-slate-300 hover:text-slate-600 disabled:opacity-20 disabled:cursor-not-allowed"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        disabled={idx === products.length - 1}
                        onClick={() => reorder(idx, 1)}
                        className="text-slate-300 hover:text-slate-600 disabled:opacity-20 disabled:cursor-not-allowed"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{p.nameEn}</div>
                    <div className="text-xs text-slate-400" dir="rtl">{p.nameAr}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {p.icon ? (
                      <span className="text-slate-500">{ICON_MAP[p.icon] ?? p.icon}</span>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <button onClick={() => toggleActive(p)} className="transition-colors">
                      {p.active
                        ? <Eye className="w-4 h-4 text-emerald-500" />
                        : <EyeOff className="w-4 h-4 text-slate-300 hover:text-slate-500" />}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(p.id)}
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
      )}

      {/* Edit / Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto py-8 px-4">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h3 className="text-base font-semibold text-slate-800">
                {editingId ? 'Edit Product' : 'New Product'}
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
                        activeTab === lang
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-500 hover:bg-slate-50'
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
                        <label className="block text-xs font-medium text-slate-600 mb-1">Name (English) *</label>
                        <input
                          className={inputCls}
                          value={form.nameEn}
                          onChange={(e) => setField('nameEn', e.target.value)}
                          placeholder="e.g. Caterpillar"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Description (English)</label>
                        <textarea
                          className={inputCls}
                          rows={2}
                          value={form.descriptionEn}
                          onChange={(e) => setField('descriptionEn', e.target.value)}
                          placeholder="Short description…"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Name (Arabic) *</label>
                        <input
                          className={inputCls}
                          dir="rtl"
                          value={form.nameAr}
                          onChange={(e) => setField('nameAr', e.target.value)}
                          placeholder="مثال: كاتربيلر"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Description (Arabic)</label>
                        <textarea
                          className={inputCls}
                          rows={2}
                          dir="rtl"
                          value={form.descriptionAr}
                          onChange={(e) => setField('descriptionAr', e.target.value)}
                          placeholder="وصف مختصر…"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Image URL</label>
                <input
                  className={inputCls}
                  value={form.imageUrl}
                  onChange={(e) => setField('imageUrl', e.target.value)}
                  placeholder="/portfolio/machinery/excavators/cat.png"
                />
              </div>

              {/* Icon picker */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">Icon</label>
                <div className="grid grid-cols-9 gap-1.5">
                  {ICON_OPTIONS.map((opt) => (
                    <button
                      key={opt.name}
                      type="button"
                      title={opt.name}
                      onClick={() => setField('icon', opt.name === form.icon ? '' : opt.name)}
                      className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                        form.icon === opt.name
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {opt.icon}
                    </button>
                  ))}
                </div>
                {form.icon && (
                  <p className="text-xs text-slate-400 mt-1">Selected: {form.icon}</p>
                )}
              </div>

              {/* Specs editor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-slate-600">Specs (key / value)</label>
                  <button
                    type="button"
                    onClick={addSpec}
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add row
                  </button>
                </div>
                <div className="space-y-2">
                  {form.specEntries.map((entry, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        className={inputCls + ' flex-1'}
                        placeholder="Key (e.g. Available Models)"
                        value={entry.key}
                        onChange={(e) => setSpec(i, 'key', e.target.value)}
                      />
                      <input
                        className={inputCls + ' flex-1'}
                        placeholder="Value"
                        value={entry.value}
                        onChange={(e) => setSpec(i, 'value', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeSpec(i)}
                        className="text-slate-300 hover:text-red-500 shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {form.specEntries.length === 0 && (
                    <p className="text-xs text-slate-400">No specs yet — click &quot;Add row&quot; above.</p>
                  )}
                </div>
              </div>

              {/* Active toggle */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setField('active', !form.active)}
                  className={`w-9 h-5 rounded-full transition-colors relative ${
                    form.active ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      form.active ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                  />
                </button>
                <span className="text-sm text-slate-700">{form.active ? 'Active' : 'Hidden'}</span>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
              )}
            </div>

            {/* Modal footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-slate-200">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex-1 px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                {editingId ? 'Save Changes' : 'Create Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4 shadow-xl">
            <h3 className="text-base font-semibold text-slate-800 mb-2">Delete Product?</h3>
            <p className="text-sm text-slate-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteProduct(confirmDelete)}
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

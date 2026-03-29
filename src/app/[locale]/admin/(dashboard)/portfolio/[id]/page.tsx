'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Loader2, Upload, X, ChevronLeft, LayoutList } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { AiButton, TranslateButton } from '@/components/admin/AiButton'

type PortfolioItem = {
  id?: string
  slug: string
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  category: string
  imageUrl: string
  tags: string
  featured: boolean
  imageAltEn: string
  imageCaptionEn: string
  imageAltAr: string
  imageCaptionAr: string
  order: number
}

const EMPTY: PortfolioItem = {
  slug: '', titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '',
  category: '', imageUrl: '', tags: '', featured: false, order: 0,
  imageAltEn: '', imageCaptionEn: '', imageAltAr: '', imageCaptionAr: '',
}

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '').replace(/--+/g, '-').replace(/^-|-$/g, '')
}

export default function PortfolioEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const routeParams = useParams()
  const locale = (routeParams.locale as string) ?? 'en'
  const [id, setId] = useState<string>('')
  const [form, setForm] = useState<PortfolioItem>(EMPTY)
  const [activeTab, setActiveTab] = useState<'en' | 'ar'>('en')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    params.then(async (p) => {
      setId(p.id)
      if (p.id !== 'new') {
        const res = await fetch(`/api/admin/portfolio`)
        const all = await res.json()
        const item = all.find((i: PortfolioItem) => i.id === p.id)
        if (item) setForm(item)
      }
    })
  }, [params])

  const set = useCallback((key: keyof PortfolioItem, val: string | boolean | number) => {
    setForm((prev) => {
      const next = { ...prev, [key]: val }
      if (key === 'titleEn') next.slug = slugify(val as string)
      return next
    })
  }, [])

  const uploadImage = async (file: File) => {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    setUploading(false)
    if (data.url) set('imageUrl', data.url)
    else setError(data.error || 'Upload failed')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const isNew = id === 'new'
    const url = isNew ? '/api/admin/portfolio' : `/api/admin/portfolio/${id}`
    const method = isNew ? 'POST' : 'PUT'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) {
      setSuccess('Saved successfully!')
      setTimeout(() => router.push(`/${locale}/admin/portfolio`), 1000)
    } else {
      const data = await res.json()
      setError(data.error || 'Save failed')
    }
  }

  const callAI = async (
    endpoint: string,
    body: object,
    onResult: (result: any) => void
  ) => {
    try {
      const res = await fetch(`/api/admin/ai/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "AI request failed");
      onResult(data.result);
      setSuccess("Generated — review before saving");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "AI generation failed");
      setTimeout(() => setError(""), 3000);
    }
  };

  const inputCls = 'w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent'

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Link href={`/${locale}/admin/portfolio`} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-lg font-semibold text-slate-800">
          {id === 'new' ? 'New Portfolio Item' : 'Edit Portfolio Item'}
        </h2>
        {id !== 'new' && (
          <Link
            href={`/${locale}/admin/portfolio/${id}/products`}
            className="ml-auto flex items-center gap-2 px-3 py-1.5 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors"
          >
            <LayoutList className="w-4 h-4" />
            Manage Products
          </Link>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Bilingual Tabs */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-200">
            {(['en', 'ar'] as const).map((lang) => (
              <button key={lang} type="button"
                onClick={() => setActiveTab(lang)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === lang
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}>
                {lang === 'en' ? '🇺🇸 English' : '🇸🇦 Arabic'}
              </button>
            ))}
          </div>

          <div className="p-5 space-y-4">
            {activeTab === 'en' ? (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <label className="text-xs font-medium text-slate-600">Title (English) *</label>
                    <AiButton
                      onClick={() => callAI("write-content",
                        { field: "title", locale: "en", context: form.category, existingContent: form.titleEn },
                        (r) => set('titleEn', r)
                      )}
                    />
                    <TranslateButton
                      from="en" to="ar"
                      onClick={() => callAI("translate",
                        { text: form.titleEn, from: "en", to: "ar", fieldType: "title" },
                        (r) => set('titleAr', r)
                      )}
                    />
                  </div>
                  <input className={inputCls} value={form.titleEn} required
                    onChange={(e) => set('titleEn', e.target.value)} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <label className="text-xs font-medium text-slate-600">Description (English) *</label>
                    <AiButton
                      onClick={() => callAI("write-content",
                        { field: "description", locale: "en", context: form.titleEn, existingContent: form.descriptionEn },
                        (r) => set('descriptionEn', r)
                      )}
                    />
                    <TranslateButton
                      from="en" to="ar"
                      onClick={() => callAI("translate",
                        { text: form.descriptionEn, from: "en", to: "ar", fieldType: "description" },
                        (r) => set('descriptionAr', r)
                      )}
                    />
                  </div>
                  <textarea className={inputCls} rows={4} value={form.descriptionEn} required
                    onChange={(e) => set('descriptionEn', e.target.value)} />
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <label className="text-xs font-medium text-slate-600">Title (Arabic) *</label>
                    <AiButton
                      onClick={() => callAI("write-content",
                        { field: "title", locale: "ar", context: form.category, existingContent: form.titleAr },
                        (r) => set('titleAr', r)
                      )}
                    />
                    <TranslateButton
                      from="ar" to="en"
                      onClick={() => callAI("translate",
                        { text: form.titleAr, from: "ar", to: "en", fieldType: "title" },
                        (r) => set('titleEn', r)
                      )}
                    />
                  </div>
                  <input className={inputCls} value={form.titleAr} required dir="rtl"
                    onChange={(e) => set('titleAr', e.target.value)} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <label className="text-xs font-medium text-slate-600">Description (Arabic) *</label>
                    <AiButton
                      onClick={() => callAI("write-content",
                        { field: "description", locale: "ar", context: form.titleAr, existingContent: form.descriptionAr },
                        (r) => set('descriptionAr', r)
                      )}
                    />
                    <TranslateButton
                      from="ar" to="en"
                      onClick={() => callAI("translate",
                        { text: form.descriptionAr, from: "ar", to: "en", fieldType: "description" },
                        (r) => set('descriptionEn', r)
                      )}
                    />
                  </div>
                  <textarea className={inputCls} rows={4} value={form.descriptionAr} required dir="rtl"
                    onChange={(e) => set('descriptionAr', e.target.value)} />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Meta Fields */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Slug *</label>
              <input className={inputCls} value={form.slug} required
                onChange={(e) => set('slug', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Category *</label>
              <input className={inputCls} value={form.category} required
                onChange={(e) => set('category', e.target.value)}
                placeholder="e.g. Machinery" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Tags (comma-separated)</label>
            <input className={inputCls} value={form.tags} 
              onChange={(e) => set('tags', e.target.value)}
              placeholder="e.g. heavy machinery, excavator, China" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="featured" checked={form.featured}
              onChange={(e) => set('featured', e.target.checked)}
              className="w-4 h-4 rounded border-slate-300" />
            <label htmlFor="featured" className="text-sm text-slate-700">Mark as Featured</label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center justify-between pointer-events-auto">
            <h3 className="text-sm font-semibold text-slate-700">Cover Image & Metadata</h3>
            <AiButton
              label="Generate alt text & caption"
              disabled={!form.imageUrl}
              onClick={async () => {
                try {
                  const [enRes, arRes] = await Promise.all([
                    fetch("/api/admin/ai/image-meta", { method:"POST", headers:{"Content-Type":"application/json"},
                      body: JSON.stringify({ imageUrl: form.imageUrl, context: `portfolio — ${form.titleEn}`, locale: "en" }) }).then(r=>r.json()),
                    fetch("/api/admin/ai/image-meta", { method:"POST", headers:{"Content-Type":"application/json"},
                      body: JSON.stringify({ imageUrl: form.imageUrl, context: `portfolio — ${form.titleEn}`, locale: "ar" }) }).then(r=>r.json()),
                  ]);
                  setForm(f => ({
                    ...f,
                    imageAltEn: enRes.result?.altText || "",
                    imageCaptionEn: enRes.result?.caption || "",
                    imageAltAr: arRes.result?.altText || "",
                    imageCaptionAr: arRes.result?.caption || "",
                  }));
                  setSuccess("Alt text & captions generated");
                  setTimeout(() => setSuccess(""), 3000);
                } catch (err: any) {
                  setError("Failed to generate image metadata");
                  setTimeout(() => setError(""), 3000);
                }
              }}
            />
          </div>
          {form.imageUrl && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-200 block">
              <Image src={form.imageUrl} alt="Preview" fill className="object-cover" unoptimized />
              <button type="button" onClick={() => set('imageUrl', '')}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow text-slate-500 hover:text-red-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors shrink-0">
              {uploading
                ? <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                : <Upload className="w-4 h-4 text-slate-400" />}
              <span className="text-sm text-slate-500">{uploading ? 'Uploading...' : 'Upload Image'}</span>
              <input type="file" accept="image/*" className="hidden"
                onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />
            </label>
            <div className="flex-1">
              <input className={inputCls} value={form.imageUrl}
                onChange={(e) => set('imageUrl', e.target.value)}
                placeholder="Or paste image URL https://..." />
            </div>
          </div>

          {form.imageUrl && (
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 mt-4">
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">English Metadata</h4>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Alt Text</label>
                  <input className={inputCls} value={form.imageAltEn} onChange={e => set('imageAltEn', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Caption</label>
                  <input className={inputCls} value={form.imageCaptionEn} onChange={e => set('imageCaptionEn', e.target.value)} />
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Arabic Metadata</h4>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1 text-right">Alt Text</label>
                  <input className={inputCls} value={form.imageAltAr} dir="rtl" onChange={e => set('imageAltAr', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1 text-right">Caption</label>
                  <input className={inputCls} value={form.imageCaptionAr} dir="rtl" onChange={e => set('imageCaptionAr', e.target.value)} />
                </div>
              </div>
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
        {success && <p className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">{success}</p>}

        <div className="flex gap-3">
          <Link href={`/${locale}/admin/portfolio`}
            className="flex-1 text-center px-4 py-2.5 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors">
            Cancel
          </Link>
          <button type="submit" disabled={saving}
            className="flex-1 px-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {id === 'new' ? 'Create Item' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

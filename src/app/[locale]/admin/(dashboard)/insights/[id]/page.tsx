'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Loader2, Upload, X, Lock, Unlock, Eye } from 'lucide-react'
import { useLocalStorageDraft } from '@/hooks/useLocalStorageDraft'
import Image from 'next/image'
import { TiptapEditor } from '@/components/editor/TiptapEditor'
import { SeoCharCounter } from '@/components/editor/SeoCharCounter'
import { useAutoSlug } from '@/hooks/useAutoSlug'
import { AiButton, TranslateButton } from '@/components/admin/AiButton'

type Insight = {
  id?: string
  slug: string
  titleEn: string
  titleAr: string
  summaryEn: string
  summaryAr: string
  bodyEn: string
  bodyAr: string
  coverImage: string
  category: string
  published: boolean
  publishedAt: string | null
  status: string
  canonicalUrl: string
}

const EMPTY: Insight = {
  slug: '', titleEn: '', titleAr: '', summaryEn: '', summaryAr: '',
  bodyEn: '', bodyAr: '', coverImage: '', category: 'General',
  published: false, publishedAt: null, status: 'draft', canonicalUrl: '',
}

const CATEGORIES = ['General', 'Sourcing', 'Logistics', 'Quality', 'Industry News', 'Case Study']

// ── Shared input style tokens (Dar Chang design system) ───────────────────
const inputCls = [
  'w-full px-3 py-2 text-sm border border-slate-200 rounded-md',
  'bg-[#FAFAFA] text-slate-800 placeholder:text-slate-400',
  'focus:outline-none focus:ring-1 focus:ring-black',
  'transition-shadow',
].join(' ')

export default function InsightEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const routeParams = useParams()
  const locale = (routeParams.locale as string) ?? 'en'
  const [id, setId] = useState('')
  const [form, setForm] = useState<Insight>(EMPTY)
  const [activeTab, setActiveTab] = useState<'en' | 'ar'>('en')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { onTitleChange, onSlugManualEdit, isManual, resetManual } = useAutoSlug()
  const draftKey = `insight-draft-${id}`
  const { hasDraft, restoreDraft, clearDraft } = useLocalStorageDraft(draftKey, form)

  // Load record
  useEffect(() => {
    params.then(async (p) => {
      setId(p.id)
      resetManual()
      if (p.id !== 'new') {
        const res = await fetch(`/api/admin/insights/${p.id}`)
        const data = await res.json()
        setForm(data)
        // If editing existing, treat slug as manual (don't auto-overwrite)
        isManual.current = true
      }
    })
  }, [params]) // eslint-disable-line react-hooks/exhaustive-deps

  // Generic field setter
  const set = useCallback(<K extends keyof Insight>(key: K, val: Insight[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: val }
      if (key === 'published') {
        next.publishedAt = val ? new Date().toISOString() : null
        next.status = val ? 'published' : 'draft'
      }
      if (key === 'status') {
        next.published = val === 'published'
        if (val === 'published' && !prev.publishedAt) next.publishedAt = new Date().toISOString()
      }
      return next
    })
  }, [])

  // Title → slug auto-sync
  const handleTitleChange = useCallback((val: string) => {
    set('titleEn', val)
    onTitleChange(val, (slug) => setForm((p) => ({ ...p, slug })))
  }, [set, onTitleChange])

  // Manual slug edit
  const handleSlugChange = useCallback((val: string) => {
    onSlugManualEdit()
    set('slug', val)
  }, [set, onSlugManualEdit])

  // Cover image upload
  const uploadImage = async (file: File) => {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    setUploading(false)
    if (data.url) set('coverImage', data.url)
    else setError(data.error || 'Upload failed')
  }

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setError('')
    const isNew = id === 'new'
    const url = isNew ? '/api/admin/insights' : `/api/admin/insights/${id}`
    const res = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) {
      clearDraft()
      setSuccess('Saved successfully!')
      setTimeout(() => router.push(`/${locale}/admin/insights`), 1200)
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

  const slugIsManual = isManual.current && id !== 'new'

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href={`/${locale}/admin/insights`} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-lg font-semibold text-slate-800 flex-1">
          {id === 'new' ? 'New Insight' : 'Edit Insight'}
        </h2>
        {form.slug && (
          <a
            href={`/${locale}/insights/${form.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </a>
        )}
      </div>

      {id !== 'new' && hasDraft() && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          <span className="flex-1">You have an unsaved draft.</span>
          <button onClick={() => { const d = restoreDraft(); if (d) setForm(d) }} className="font-medium underline">Restore</button>
          <button onClick={clearDraft} className="text-amber-600 hover:text-amber-800">Dismiss</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ── Bilingual Content Tabs ──────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {/* Tab switcher */}
          <div className="flex border-b border-slate-200">
            {(['en', 'ar'] as const).map((lang) => (
              <button key={lang} type="button" onClick={() => setActiveTab(lang)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === lang ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'
                }`}>
                {lang === 'en' ? '🇺🇸 English' : '🇸🇦 Arabic'}
              </button>
            ))}
          </div>

          <div className="p-5 space-y-4">

            {/* ── English Tab ─────────────────────────── */}
            {activeTab === 'en' && (
              <>
                {/* Title EN */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <label className="text-xs font-medium text-slate-600">
                      Title (English) <span className="text-red-400">*</span>
                    </label>
                    <AiButton
                      onClick={() => callAI("write-content",
                        { field: "title", locale: "en", context: form.titleEn || form.category || "logistics and sourcing article", existingContent: form.titleEn },
                        (r) => handleTitleChange(r)
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
                  <input
                    className={inputCls}
                    value={form.titleEn}
                    required
                    placeholder="e.g. How China's Sourcing Landscape Changed in 2025"
                    onChange={(e) => handleTitleChange(e.target.value)}
                  />
                  <SeoCharCounter value={form.titleEn} max={60} />
                </div>

                {/* Summary EN */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <label className="text-xs font-medium text-slate-600">
                      Summary (English) <span className="text-red-400">*</span>
                      <span className="text-slate-400 font-normal ml-1">— shown in cards &amp; meta description</span>
                    </label>
                    <AiButton
                      onClick={() => callAI("write-content",
                        { field: "summary", locale: "en", context: form.titleEn || "logistics insight", existingContent: form.summaryEn },
                        (r) => set('summaryEn', r)
                      )}
                    />
                    <TranslateButton
                      from="en" to="ar"
                      onClick={() => callAI("translate",
                        { text: form.summaryEn, from: "en", to: "ar", fieldType: "description" },
                        (r) => set('summaryAr', r)
                      )}
                    />
                  </div>
                  <textarea
                    className={inputCls + ' resize-y'}
                    rows={2}
                    value={form.summaryEn}
                    required
                    placeholder="A concise 1–2 sentence description of this insight..."
                    onChange={(e) => set('summaryEn', e.target.value)}
                  />
                  <SeoCharCounter value={form.summaryEn} max={160} />
                </div>

                {/* Body EN */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="text-xs font-medium text-slate-600">
                      Body (English) <span className="text-red-400">*</span>
                    </label>
                    <AiButton
                      label="✨ Write full post"
                      onClick={() => callAI("write-content",
                        { field: "body", locale: "en", context: [form.titleEn, form.summaryEn].filter(Boolean).join(" — ") },
                        (r) => set('bodyEn', r.includes("<p>") ? r : r.split("\\n").filter((p: string) => p.trim()).map((p: string) => `<p>${p}</p>`).join(""))
                      )}
                    />
                    <TranslateButton
                      from="en" to="ar"
                      onClick={() => callAI("translate",
                        { text: form.bodyEn, from: "en", to: "ar", fieldType: "body" },
                        (r) => set('bodyAr', r.includes("<p>") ? r : r.split("\\n").filter((p: string) => p.trim()).map((p: string) => `<p>${p}</p>`).join(""))
                      )}
                    />
                  </div>
                  <TiptapEditor
                    value={form.bodyEn}
                    onChange={(html) => set('bodyEn', html)}
                    dir="ltr"
                    placeholder="Start writing your insight content... Select text to see formatting options."
                    minHeight={340}
                  />
                </div>
              </>
            )}

            {/* ── Arabic Tab ──────────────────────────── */}
            {activeTab === 'ar' && (
              <>
                {/* Title AR */}
                <div>
                  <div className="flex items-center gap-2 mb-1 justify-end flex-row-reverse">
                    <label className="text-xs font-medium text-slate-600 text-right">
                      Title (Arabic) <span className="text-red-400">*</span>
                    </label>
                    <AiButton
                      onClick={() => callAI("write-content",
                        { field: "title", locale: "ar", context: form.titleAr || form.category || "logistics and sourcing article", existingContent: form.titleAr },
                        (r) => set('titleAr', r)
                      )}
                    />
                    <TranslateButton
                      from="ar" to="en"
                      onClick={() => callAI("translate",
                        { text: form.titleAr, from: "ar", to: "en", fieldType: "title" },
                        (r) => handleTitleChange(r)
                      )}
                    />
                  </div>
                  <input
                    className={inputCls}
                    value={form.titleAr}
                    required
                    dir="rtl"
                    placeholder="عنوان المقالة بالعربية"
                    onChange={(e) => set('titleAr', e.target.value)}
                  />
                  <SeoCharCounter value={form.titleAr} max={60} />
                </div>

                {/* Summary AR */}
                <div>
                  <div className="flex items-center gap-2 mb-1 justify-end flex-row-reverse">
                    <label className="text-xs font-medium text-slate-600 text-right">
                      Summary (Arabic) <span className="text-red-400">*</span>
                    </label>
                    <AiButton
                      onClick={() => callAI("write-content",
                        { field: "summary", locale: "ar", context: form.titleAr || "logistics insight", existingContent: form.summaryAr },
                        (r) => set('summaryAr', r)
                      )}
                    />
                    <TranslateButton
                      from="ar" to="en"
                      onClick={() => callAI("translate",
                        { text: form.summaryAr, from: "ar", to: "en", fieldType: "description" },
                        (r) => set('summaryEn', r)
                      )}
                    />
                  </div>
                  <textarea
                    className={inputCls + ' resize-y'}
                    rows={2}
                    value={form.summaryAr}
                    required
                    dir="rtl"
                    placeholder="ملخص المقالة بالعربية..."
                    onChange={(e) => set('summaryAr', e.target.value)}
                  />
                  <SeoCharCounter value={form.summaryAr} max={160} />
                </div>

                {/* Body AR */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5 justify-end flex-row-reverse">
                    <label className="text-xs font-medium text-slate-600 text-right">
                      Body (Arabic) <span className="text-red-400">*</span>
                    </label>
                    <TranslateButton
                      from="ar" to="en"
                      onClick={() => callAI("translate",
                        { text: form.bodyAr, from: "ar", to: "en", fieldType: "body" },
                        (r) => set('bodyEn', r.includes("<p>") ? r : r.split("\\n").filter((p: string) => p.trim()).map((p: string) => `<p>${p}</p>`).join(""))
                      )}
                    />
                  </div>
                  <TiptapEditor
                    value={form.bodyAr}
                    onChange={(html) => set('bodyAr', html)}
                    dir="rtl"
                    placeholder="ابدأ الكتابة هنا... حدد النص لظهور خيارات التنسيق"
                    minHeight={340}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Settings ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Settings &amp; SEO</h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Slug */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1.5">
                URL Slug <span className="text-red-400">*</span>
                {slugIsManual
                  ? <span title="Slug is manually locked"><Lock className="w-3 h-3 text-amber-500" aria-label="Slug is manually locked" /></span>
                  : <span title="Slug auto-syncs from title"><Unlock className="w-3 h-3 text-slate-400" aria-label="Slug auto-syncs from title" /></span>
                }
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 select-none">/insights/</span>
                <input
                  className={inputCls + ' pl-[4.5rem]'}
                  value={form.slug}
                  required
                  placeholder="my-article-slug"
                  onChange={(e) => handleSlugChange(e.target.value)}
                />
              </div>
              {!slugIsManual && (
                <p className="text-[11px] text-slate-400 mt-1">Auto-generated from title. Edit to lock.</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Category</label>
              <select className={inputCls} value={form.category} onChange={(e) => set('category', e.target.value)}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Status select */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
            <select
              className={inputCls}
              value={form.status}
              onChange={(e) => set('status', e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Canonical URL */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Canonical URL <span className="text-slate-400 font-normal">(optional override)</span></label>
            <input
              className={inputCls}
              value={form.canonicalUrl}
              onChange={(e) => set('canonicalUrl', e.target.value)}
              placeholder="https://darchangglobal.com/en/insights/my-article"
            />
          </div>
        </div>

        {/* ── Cover Image ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">Cover Image</h3>

          {form.coverImage && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-200">
              <Image src={form.coverImage} alt="Cover preview" fill className="object-cover" unoptimized />
              <button type="button" onClick={() => set('coverImage', '')}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow text-slate-500 hover:text-red-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <label className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-slate-300 rounded-md cursor-pointer hover:bg-slate-50 transition-colors w-fit">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> : <Upload className="w-4 h-4 text-slate-400" />}
            <span className="text-sm text-slate-500">{uploading ? 'Uploading...' : 'Upload Cover Image'}</span>
            <input type="file" accept="image/*" className="hidden"
              onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />
          </label>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Or paste image URL</label>
            <input className={inputCls} value={form.coverImage}
              onChange={(e) => set('coverImage', e.target.value)} placeholder="https://..." />
          </div>
        </div>

        {/* Status messages */}
        {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md">{error}</p>}
        {success && <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-md">{success}</p>}

        {/* Actions */}
        <div className="flex gap-3">
          <Link href={`/${locale}/admin/insights`}
            className="flex-1 text-center px-4 py-2.5 border border-slate-200 rounded-md text-sm hover:bg-slate-50 transition-colors">
            Cancel
          </Link>
          <button type="submit" disabled={saving}
            className="flex-1 px-4 py-2.5 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {id === 'new' ? 'Publish Insight' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

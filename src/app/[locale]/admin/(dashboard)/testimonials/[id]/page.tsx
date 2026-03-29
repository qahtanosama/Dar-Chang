'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Loader2, Upload, X } from 'lucide-react'
import Image from 'next/image'
import { useLocalStorageDraft } from '@/hooks/useLocalStorageDraft'

type Testimonial = {
  clientNameEn: string; clientNameAr: string
  companyEn: string; companyAr: string
  quoteEn: string; quoteAr: string
  rating: number; photoUrl: string
  order: number; published: boolean
}

const EMPTY: Testimonial = {
  clientNameEn: '', clientNameAr: '',
  companyEn: '', companyAr: '',
  quoteEn: '', quoteAr: '',
  rating: 5, photoUrl: '',
  order: 0, published: false,
}

const inputCls = 'w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-[#FAFAFA] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-black'

const STAR_OPTIONS = [1, 2, 3, 4, 5]

export default function TestimonialEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const routeParams = useParams()
  const locale = (routeParams.locale as string) ?? 'en'
  const [id, setId] = useState('')
  const [form, setForm] = useState<Testimonial>(EMPTY)
  const [activeTab, setActiveTab] = useState<'en' | 'ar'>('en')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showRestore, setShowRestore] = useState(false)

  const draftKey = id ? `dc_testimonial_draft_${id}` : 'dc_testimonial_draft_new'
  const { hasDraft, restoreDraft, clearDraft } = useLocalStorageDraft(draftKey, form)

  useEffect(() => {
    params.then(async (p) => {
      setId(p.id)
      if (p.id !== 'new') {
        const res = await fetch(`/api/admin/testimonials/${p.id}`)
        const data = await res.json()
        setForm(data)
      } else {
        if (hasDraft()) setShowRestore(true)
      }
    })
  }, [params]) // eslint-disable-line react-hooks/exhaustive-deps

  const set = useCallback(<K extends keyof Testimonial>(key: K, val: Testimonial[K]) => {
    setForm(prev => ({ ...prev, [key]: val }))
  }, [])

  const uploadPhoto = async (file: File) => {
    setUploading(true)
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    setUploading(false)
    if (data.url) set('photoUrl', data.url)
    else setError(data.error || 'Upload failed')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setError('')
    const isNew = id === 'new'
    const url = isNew ? '/api/admin/testimonials' : `/api/admin/testimonials/${id}`
    const res = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) {
      clearDraft()
      setSuccess('Saved!')
      setTimeout(() => router.push(`/${locale}/admin/testimonials`), 1200)
    } else {
      const data = await res.json()
      setError(data.error || 'Save failed')
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Link href={`/${locale}/admin/testimonials`} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-lg font-semibold text-slate-800">{id === 'new' ? 'New Testimonial' : 'Edit Testimonial'}</h2>
      </div>

      {showRestore && (
        <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <p className="text-sm text-amber-800">You have an unsaved draft. Restore it?</p>
          <div className="flex gap-2">
            <button onClick={() => { const d = restoreDraft(); if (d) setForm(d); setShowRestore(false) }}
              className="text-xs px-3 py-1 bg-amber-600 text-white rounded-md">Restore</button>
            <button onClick={() => { clearDraft(); setShowRestore(false) }}
              className="text-xs px-3 py-1 border border-amber-300 text-amber-700 rounded-md">Discard</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Bilingual content tabs */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-200">
            {(['en', 'ar'] as const).map(lang => (
              <button key={lang} type="button" onClick={() => setActiveTab(lang)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === lang ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                {lang === 'en' ? '🇺🇸 English' : '🇸🇦 Arabic'}
              </button>
            ))}
          </div>
          <div className="p-5 space-y-4">
            {activeTab === 'en' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Client Name (English) <span className="text-red-400">*</span></label>
                  <input className={inputCls} value={form.clientNameEn} required placeholder="e.g. Mohammed Al-Farsi" onChange={e => set('clientNameEn', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Company (English)</label>
                  <input className={inputCls} value={form.companyEn} placeholder="e.g. Al-Farsi Hospitality Group" onChange={e => set('companyEn', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Quote (English) <span className="text-red-400">*</span></label>
                  <textarea className={inputCls + ' resize-y'} rows={4} value={form.quoteEn} required
                    placeholder="What did the client say about working with Dar Chang?"
                    onChange={e => set('quoteEn', e.target.value)} />
                </div>
              </>
            )}
            {activeTab === 'ar' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1 text-right">اسم العميل (عربي) <span className="text-red-400">*</span></label>
                  <input className={inputCls} value={form.clientNameAr} required dir="rtl" placeholder="مثال: محمد الفارسي" onChange={e => set('clientNameAr', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1 text-right">الشركة (عربي)</label>
                  <input className={inputCls} value={form.companyAr} dir="rtl" placeholder="مثال: مجموعة الفارسي للضيافة" onChange={e => set('companyAr', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1 text-right">الاقتباس (عربي) <span className="text-red-400">*</span></label>
                  <textarea className={inputCls + ' resize-y'} rows={4} value={form.quoteAr} required dir="rtl"
                    placeholder="ماذا قال العميل عن تجربته مع دار تشانغ؟"
                    onChange={e => set('quoteAr', e.target.value)} />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Settings section */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Settings</h3>

          {/* Star rating picker */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2">Rating</label>
            <div className="flex items-center gap-1">
              {STAR_OPTIONS.map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => set('rating', star)}
                  className={`text-2xl leading-none transition-colors focus:outline-none ${star <= form.rating ? 'text-amber-400' : 'text-slate-200 hover:text-amber-300'}`}
                  aria-label={`${star} star${star !== 1 ? 's' : ''}`}
                >
                  ★
                </button>
              ))}
              <span className="ml-2 text-xs text-slate-500">{form.rating} / 5</span>
            </div>
          </div>

          {/* Photo upload */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2">Client Photo</label>
            {form.photoUrl && (
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 mb-3">
                <Image src={form.photoUrl} alt="Photo" fill className="object-cover" unoptimized />
                <button type="button" onClick={() => set('photoUrl', '')}
                  className="absolute top-1 right-1 p-0.5 bg-white rounded-full shadow text-slate-500 hover:text-red-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <label className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-slate-300 rounded-md cursor-pointer hover:bg-slate-50 w-fit">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> : <Upload className="w-4 h-4 text-slate-400" />}
              <span className="text-sm text-slate-500">{uploading ? 'Uploading...' : 'Upload Photo'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadPhoto(e.target.files[0])} />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Display Order</label>
              <input type="number" className={inputCls} value={form.order} min={0} onChange={e => set('order', parseInt(e.target.value) || 0)} />
            </div>
          </div>

          <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50">
            <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} className="w-4 h-4 rounded accent-slate-900" />
            <div>
              <span className="text-sm font-medium text-slate-700 block">Published</span>
              <span className="text-xs text-slate-400">Show this testimonial on the public site</span>
            </div>
          </label>
        </div>

        {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md">{error}</p>}
        {success && <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-md">{success}</p>}

        <div className="flex gap-3">
          <Link href={`/${locale}/admin/testimonials`} className="flex-1 text-center px-4 py-2.5 border border-slate-200 rounded-md text-sm hover:bg-slate-50">Cancel</Link>
          <button type="submit" disabled={saving}
            className="flex-1 px-4 py-2.5 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-700 disabled:opacity-50 flex items-center justify-center gap-2">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {id === 'new' ? 'Add Testimonial' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { Loader2, ChevronRight, X, Save } from 'lucide-react'
import { AiButton } from '@/components/admin/AiButton'

type SeoConfig = {
  id?: string
  pageKey: string
  locale: string
  metaTitle: string
  metaDescription: string
  ogTitle: string
  ogDescription: string
  ogImageUrl: string
  canonical: string | null
}

const PAGES = ['home', 'portfolio', 'services', 'insights', 'about', 'contact']
const LOCALES = ['en', 'ar']

export default function SeoAdminPage() {
  const [configs, setConfigs] = useState<SeoConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [editRow, setEditRow] = useState<SeoConfig | null>(null)
  const [saving, setSaving] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const showToast = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 3000) }

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
      showToast("Generated — review before saving");
    } catch (err: any) {
      showToast(err.message || "AI generation failed");
    }
  };

  const fetchConfigs = useCallback(async () => {
    setLoading(true)
    const results: SeoConfig[] = []
    await Promise.all(
      PAGES.flatMap((pageKey) =>
        LOCALES.map(async (locale) => {
          const res = await fetch(`/api/admin/seo/${pageKey}/${locale}`)
          const data = await res.json()
          results.push(data ?? {
            pageKey, locale,
            metaTitle: '', metaDescription: '', ogTitle: '', ogDescription: '', ogImageUrl: '', canonical: null,
          })
        })
      )
    )
    // Sort by pageKey then locale
    results.sort((a, b) => a.pageKey.localeCompare(b.pageKey) || a.locale.localeCompare(b.locale))
    setConfigs(results)
    setLoading(false)
  }, [])

  useEffect(() => { fetchConfigs() }, [fetchConfigs])

  const saveConfig = async () => {
    if (!editRow) return
    setSaving(true)
    const res = await fetch(`/api/admin/seo/${editRow.pageKey}/${editRow.locale}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editRow),
    })
    setSaving(false)
    if (res.ok) {
      showToast('SEO config saved!')
      setEditRow(null)
      fetchConfigs()
    }
  }

  const set = (key: keyof SeoConfig, val: string) => {
    if (!editRow) return
    setEditRow({ ...editRow, [key]: val })
  }

  const inputCls = 'w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900'

  const warn = (text: string, max: number) => text.length > max
    ? `text-red-600 bg-red-50`
    : text.length > max * 0.9 ? `text-amber-600` : `text-slate-400`

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">SEO Manager</h2>
        <p className="text-sm text-slate-500">Click a row to edit meta tags for each page × locale</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Page</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Locale</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Meta Title</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {configs.map((config) => (
                <tr
                  key={`${config.pageKey}-${config.locale}`}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => setEditRow({ ...config })}
                >
                  <td className="px-4 py-3 font-medium text-slate-800 capitalize">{config.pageKey}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.locale === 'ar' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                      {config.locale.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-500 truncate max-w-xs">
                    {config.metaTitle || <span className="italic text-slate-300">Not set</span>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ChevronRight className="w-4 h-4 text-slate-300 ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Drawer */}
      {editRow && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30" onClick={() => setEditRow(null)} />
          <div className="w-full max-w-lg bg-white shadow-2xl flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col gap-3 px-5 py-4 border-b border-slate-200 shrink-0 bg-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800 capitalize">
                    {editRow.pageKey} — {editRow.locale.toUpperCase()}
                  </h3>
                  <p className="text-xs text-slate-400">Edit SEO metadata</p>
                </div>
                <button onClick={() => setEditRow(null)} className="p-1.5 rounded hover:bg-slate-200 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <AiButton
                label="✨ Auto-generate all SEO fields"
                className="w-full"
                onClick={() => callAI("seo", { pageKey: editRow.pageKey, locale: editRow.locale },
                  (r) => {
                    setEditRow(prev => prev ? {
                      ...prev,
                      metaTitle: r.metaTitle || prev.metaTitle,
                      metaDescription: r.metaDescription || prev.metaDescription,
                      ogTitle: r.ogTitle || prev.ogTitle,
                      ogDescription: r.ogDescription || prev.ogDescription,
                    } : null)
                  }
                )}
              />
            </div>

            {/* Form */}
            <div className="flex-1 p-5 space-y-5" dir={editRow.locale === 'ar' ? 'rtl' : 'ltr'}>
              {/* SERP Preview */}
              <div className="p-4 bg-white border border-slate-200 rounded-xl text-sm">
                <p className="text-xs text-slate-400 mb-2 font-medium">Google Preview</p>
                <div className="text-blue-600 font-medium text-base line-clamp-1">{editRow.metaTitle || 'Page Title'}</div>
                <div className="text-green-700 text-xs my-0.5">darchang.com › {editRow.pageKey}</div>
                <div className="text-slate-600 text-sm line-clamp-2">{editRow.metaDescription || 'Meta description will appear here.'}</div>
              </div>

              {/* Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-slate-600">Meta Title</label>
                    <AiButton size="xs" onClick={() => callAI("write-content", { field: "SEO Meta Title", locale: editRow.locale, context: `SEO Meta Title for page ${editRow.pageKey}`, existingContent: editRow.metaTitle }, r => set('metaTitle', r))} />
                  </div>
                  <span className={`text-xs ${warn(editRow.metaTitle, 60)}`}>{editRow.metaTitle.length}/60</span>
                </div>
                <input className={inputCls} value={editRow.metaTitle} onChange={(e) => set('metaTitle', e.target.value)} maxLength={80} />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-slate-600">Meta Description</label>
                    <AiButton size="xs" onClick={() => callAI("write-content", { field: "SEO Meta Description", locale: editRow.locale, context: `SEO Meta Description for page ${editRow.pageKey}`, existingContent: editRow.metaDescription }, r => set('metaDescription', r))} />
                  </div>
                  <span className={`text-xs ${warn(editRow.metaDescription, 160)}`}>{editRow.metaDescription.length}/160</span>
                </div>
                <textarea className={inputCls} rows={3} value={editRow.metaDescription}
                  onChange={(e) => set('metaDescription', e.target.value)} maxLength={200} />
              </div>

              {/* OG Title */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">OG Title</label>
                <input className={inputCls} value={editRow.ogTitle} onChange={(e) => set('ogTitle', e.target.value)} />
              </div>

              {/* OG Description */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">OG Description</label>
                <textarea className={inputCls} rows={2} value={editRow.ogDescription}
                  onChange={(e) => set('ogDescription', e.target.value)} />
              </div>

              {/* OG Image */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">OG Image URL</label>
                <input className={inputCls} value={editRow.ogImageUrl} onChange={(e) => set('ogImageUrl', e.target.value)} placeholder="https://..." />
              </div>

              {/* Canonical */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Canonical URL (optional)</label>
                <input className={inputCls} value={editRow.canonical ?? ''} onChange={(e) => set('canonical', e.target.value)} placeholder="https://darchang.com/..." />
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 px-5 py-4 border-t border-slate-200 flex gap-3">
              <button onClick={() => setEditRow(null)}
                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={saveConfig} disabled={saving}
                className="flex-1 px-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg">✓ {toastMsg}</div>
      )}
    </div>
  )
}

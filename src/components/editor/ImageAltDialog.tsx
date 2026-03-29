'use client'

import { useState, useRef } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ImageIcon, Upload, Link2, X, Loader2 } from 'lucide-react'
import type { Editor } from '@tiptap/react'

interface ImageAltDialogProps {
  editor: Editor
  /** trigger button content */
  children: React.ReactNode
}

type Tab = 'upload' | 'url'

/**
 * ImageAltDialog — Radix Dialog for inserting images with required alt text.
 * Supports both file upload (POST /api/admin/upload) and external URL.
 */
export function ImageAltDialog({ editor, children }: ImageAltDialogProps) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('upload')
  const [alt, setAlt] = useState('')
  const [url, setUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const reset = () => {
    setAlt('')
    setUrl('')
    setUploadedUrl('')
    setError('')
    setUploading(false)
    setTab('upload')
  }

  const handleFile = async (file: File) => {
    setError('')
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) {
        setUploadedUrl(data.url)
      } else {
        setError(data.error ?? 'Upload failed')
      }
    } catch {
      setError('Network error during upload')
    } finally {
      setUploading(false)
    }
  }

  const insertImage = () => {
    const src = tab === 'upload' ? uploadedUrl : url.trim()
    if (!src) { setError('Please provide an image source.'); return }
    if (!alt.trim()) { setError('Alt text is required for accessibility and SEO.'); return }

    editor.chain().focus().setImage({ src, alt: alt.trim() }).run()
    setOpen(false)
    reset()
  }

  return (
    <Dialog.Root open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset() }}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[301] w-full max-w-md -translate-x-1/2 -translate-y-1/2
            bg-white rounded-xl shadow-2xl border border-slate-200 p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <Dialog.Title className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-slate-500" />
              Insert Image
            </Dialog.Title>
            <Dialog.Close className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          {/* Tabs */}
          <div className="flex rounded-lg border border-slate-200 overflow-hidden mb-4">
            {(['upload', 'url'] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setTab(t); setError('') }}
                className={`flex-1 py-2 text-xs font-medium transition-colors ${
                  tab === t ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {t === 'upload' ? '⬆ Upload File' : '🔗 External URL'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {tab === 'upload' ? (
              <div>
                {uploadedUrl ? (
                  <div className="relative">
                    {/* Preview */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={uploadedUrl} alt="preview" className="w-full h-40 object-cover rounded-lg border border-slate-200" />
                    <button
                      type="button"
                      onClick={() => { setUploadedUrl(''); if (fileRef.current) fileRef.current.value = '' }}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow text-slate-500 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label
                    className={`flex flex-col items-center gap-2 p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      uploading ? 'border-slate-300 bg-slate-50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {uploading
                      ? <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                      : <Upload className="w-8 h-8 text-slate-400" />
                    }
                    <span className="text-sm text-slate-500">{uploading ? 'Uploading...' : 'Click or drag image here'}</span>
                    <span className="text-xs text-slate-400">JPG, PNG, WebP · max 5MB</span>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    />
                  </label>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Image URL</label>
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-md bg-[#FAFAFA]
                      focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
            )}

            {/* Alt Text — always required */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Alt Text <span className="text-red-500">*</span>
                <span className="text-slate-400 font-normal ml-1">(required for SEO &amp; accessibility)</span>
              </label>
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Describe the image for screen readers and search engines"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-[#FAFAFA]
                  focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-md">{error}</p>
            )}

            <button
              type="button"
              onClick={insertImage}
              disabled={uploading}
              className="w-full py-2.5 bg-slate-900 text-white text-sm font-medium rounded-md
                hover:bg-slate-700 disabled:opacity-50 transition-colors"
            >
              Insert Image
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

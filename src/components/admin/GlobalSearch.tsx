'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Search, Loader2, X } from 'lucide-react'
import { useParams } from 'next/navigation'

type Result = { type: string; id: string; title: string; subtitle: string; href: string }

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const locale = (params.locale as string) ?? 'en'
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
        setTimeout(() => inputRef.current?.focus(), 50)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Click outside to close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      // Rewrite hrefs to use current locale
      setResults(data.map((r: Result) => ({
        ...r,
        href: r.href.replace('/en/admin', `/${locale}/admin`),
      })))
    } catch {}
    setLoading(false)
  }, [locale])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => search(query), 300)
  }, [query, search])

  const groupedResults = results.reduce<Record<string, Result[]>>((acc, r) => {
    acc[r.type] = acc[r.type] ?? []
    acc[r.type].push(r)
    return acc
  }, {})

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50) }}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 border border-slate-200 rounded-lg hover:border-slate-300 bg-white transition-colors min-w-[160px]"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="text-[10px] px-1 py-0.5 bg-slate-100 rounded font-mono">⌘K</kbd>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-100">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search content..."
              className="flex-1 text-sm outline-none text-slate-800 placeholder:text-slate-400"
            />
            {loading && <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin shrink-0" />}
            {!loading && query && <button onClick={() => { setQuery(''); setResults([]) }}><X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" /></button>}
          </div>
          <div className="max-h-72 overflow-y-auto">
            {query.length < 2 && (
              <p className="text-xs text-slate-400 px-4 py-3">Type at least 2 characters to search</p>
            )}
            {query.length >= 2 && !loading && results.length === 0 && (
              <p className="text-xs text-slate-400 px-4 py-3">No results for &quot;{query}&quot;</p>
            )}
            {Object.entries(groupedResults).map(([type, items]) => (
              <div key={type}>
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide bg-slate-50 border-b border-slate-100">{type}</div>
                {items.map(item => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex flex-col px-4 py-2.5 hover:bg-slate-50 transition-colors border-b border-slate-50"
                  >
                    <span className="text-sm font-medium text-slate-800 truncate">{item.title}</span>
                    {item.subtitle && <span className="text-xs text-slate-400 truncate">{item.subtitle}</span>}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

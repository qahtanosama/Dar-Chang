import { useEffect, useRef, useCallback } from 'react'

export function useLocalStorageDraft<T>(key: string, value: T, delay = 1500) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return }
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (typeof window !== 'undefined') {
        try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
      }
    }, delay)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [key, value, delay])

  const hasDraft = useCallback((): boolean => {
    if (typeof window === 'undefined') return false
    try { return localStorage.getItem(key) !== null } catch { return false }
  }, [key])

  const restoreDraft = useCallback((): T | null => {
    if (typeof window === 'undefined') return null
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : null
    } catch { return null }
  }, [key])

  const clearDraft = useCallback(() => {
    if (typeof window === 'undefined') return
    try { localStorage.removeItem(key) } catch {}
  }, [key])

  return { hasDraft, restoreDraft, clearDraft }
}

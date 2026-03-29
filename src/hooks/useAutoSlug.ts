import { useRef, useCallback } from 'react'

/**
 * Transforms a title string into a clean URL slug.
 * - Lowercases
 * - Replaces spaces with hyphens
 * - Strips non-ASCII and special characters
 * - Collapses consecutive hyphens
 * - Trims leading/trailing hyphens
 */
function autoSlugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .replace(/[^\w\s-]/g, '')         // remove non-word chars (keeps spaces + hyphens)
    .replace(/\s+/g, '-')             // spaces → hyphens
    .replace(/--+/g, '-')             // collapse multiple hyphens
    .replace(/^-|-$/g, '')            // trim leading/trailing hyphens
}

interface UseAutoSlugReturn {
  /** Call this when titleEn changes to auto-sync the slug */
  onTitleChange: (title: string, setSlug: (slug: string) => void) => void
  /** Call this when the user manually edits the slug field */
  onSlugManualEdit: () => void
  /** Whether the slug has been manually overridden */
  isManual: React.MutableRefObject<boolean>
  /** Reset the manual override (e.g. when loading a new record) */
  resetManual: () => void
}

/**
 * useAutoSlug — auto-generates URL slugs from title, with manual override detection.
 *
 * Usage:
 *   const { onTitleChange, onSlugManualEdit, isManual } = useAutoSlug()
 *
 *   onTitleChange(newTitle, (slug) => setForm(f => ({ ...f, slug })))
 *   onSlugManualEdit() // call from slug input's onChange before updating state
 */
export function useAutoSlug(): UseAutoSlugReturn {
  const isManual = useRef(false)

  const onTitleChange = useCallback(
    (title: string, setSlug: (slug: string) => void) => {
      if (!isManual.current) {
        setSlug(autoSlugify(title))
      }
    },
    []
  )

  const onSlugManualEdit = useCallback(() => {
    isManual.current = true
  }, [])

  const resetManual = useCallback(() => {
    isManual.current = false
  }, [])

  return { onTitleChange, onSlugManualEdit, isManual, resetManual }
}

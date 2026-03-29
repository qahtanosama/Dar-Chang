import { revalidatePath } from 'next/cache'

/**
 * Call this after any CMS write (POST/PUT/PATCH/DELETE) to invalidate
 * the Next.js Router Cache for all public pages.
 * This ensures navigating back to the site always fetches fresh data.
 */
export function revalidatePublic() {
  revalidatePath('/', 'layout')
}

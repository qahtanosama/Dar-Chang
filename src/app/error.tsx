'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0a1628', color: '#ffffff', fontFamily: 'sans-serif' }}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: '#C9A84C', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Something went wrong
          </p>
          <h1 style={{ fontSize: '5rem', fontWeight: 800, color: '#C9A84C', margin: 0 }}>500</h1>
          <p style={{ color: '#9ca3af', fontSize: '1.125rem', margin: '1rem 0 2rem' }}>
            An unexpected error occurred. Our team has been notified.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={reset}
              style={{ background: '#C9A84C', color: '#0a1628', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
              Try Again
            </button>
            <Link
              href="/en"
              style={{ background: 'transparent', color: '#C9A84C', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 700, border: '1px solid #C9A84C', textDecoration: 'none' }}
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}

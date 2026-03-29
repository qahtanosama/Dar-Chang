import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#0A0F1E', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '6rem', fontWeight: 900, color: '#C9A84C', lineHeight: 1, marginBottom: '1rem' }}>404</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>Page Not Found</h1>
          <p style={{ color: '#9ca3af', marginBottom: '2rem', maxWidth: '400px' }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/en"
            style={{
              display: 'inline-block',
              background: '#C5A059',
              color: '#fff',
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Back to Home
          </Link>
        </div>
      </body>
    </html>
  )
}

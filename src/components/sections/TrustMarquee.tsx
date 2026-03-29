// Server component — fetches brands from DB, falls back to hardcoded list
import { prisma } from '@/lib/prisma'
import { TrustMarqueeClient } from './TrustMarqueeClient'

const FALLBACK_BRANDS = [
  'Caterpillar', 'Komatsu', 'SANY', 'Volvo', 'SDLG',
  'Shantui', 'JCB', 'CASE', 'Maersk', 'DHL',
]

export async function TrustMarquee() {
  let brands: { id: string; name: string; logoUrl: string }[] = []

  try {
    const rows = await prisma.brandLogo.findMany({
      where: { active: true },
      orderBy: { displayOrder: 'asc' },
      select: { id: true, name: true, logoUrl: true },
    })
    brands = rows
  } catch {}

  if (brands.length === 0) {
    brands = FALLBACK_BRANDS.map((name, i) => ({ id: String(i), name, logoUrl: '' }))
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dar Chang Global",
    "partner": brands.map(brand => ({
      "@type": "Organization",
      "name": brand.name,
      // Fallback domain extraction logic or default for validation
      "url": `https://www.${brand.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrustMarqueeClient brands={brands} />
    </>
  )
}

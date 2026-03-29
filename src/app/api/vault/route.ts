import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const docs = await prisma.vaultDocument.findMany({
    where: { active: true },
    orderBy: { displayOrder: 'asc' },
  })

  // Group by categoryEn
  const grouped: Record<string, { categoryAr: string; docs: typeof docs }> = {}
  for (const doc of docs) {
    const key = doc.categoryEn || 'General'
    if (!grouped[key]) grouped[key] = { categoryAr: doc.categoryAr, docs: [] }
    grouped[key].docs.push(doc)
  }

  return NextResponse.json(grouped)
}

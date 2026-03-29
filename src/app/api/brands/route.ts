import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const brands = await prisma.brandLogo.findMany({
    where: { active: true },
    orderBy: { displayOrder: 'asc' },
  })
  return NextResponse.json(brands)
}

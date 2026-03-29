import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'
import { revalidatePublic } from '@/lib/revalidatePublic'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const brands = await prisma.brandLogo.findMany({ orderBy: { displayOrder: 'asc' } })
  return NextResponse.json(brands)
}

export async function POST(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const body = await req.json()
  const maxOrder = await prisma.brandLogo.aggregate({ _max: { displayOrder: true } })
  const brand = await prisma.brandLogo.create({
    data: { ...body, displayOrder: body.displayOrder ?? (maxOrder._max.displayOrder ?? -1) + 1 },
  })
  revalidatePublic()
  return NextResponse.json(brand, { status: 201 })
}

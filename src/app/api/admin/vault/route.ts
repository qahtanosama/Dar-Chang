import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'
import { revalidatePublic } from '@/lib/revalidatePublic'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const docs = await prisma.vaultDocument.findMany({ orderBy: { displayOrder: 'asc' } })
  return NextResponse.json(docs)
}

export async function POST(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const body = await req.json()
  const maxOrder = await prisma.vaultDocument.aggregate({ _max: { displayOrder: true } })
  const doc = await prisma.vaultDocument.create({
    data: { ...body, displayOrder: body.displayOrder ?? (maxOrder._max.displayOrder ?? -1) + 1 },
  })
  revalidatePublic()
  return NextResponse.json(doc, { status: 201 })
}

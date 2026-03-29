import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'

// PATCH body: { order: [ { id: string, displayOrder: number }, ... ] }
export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const body = await req.json()
  const updates: { id: string; displayOrder: number }[] = body.order ?? []

  await Promise.all(
    updates.map(({ id, displayOrder }) =>
      prisma.portfolioProduct.update({ where: { id }, data: { displayOrder } }),
    ),
  )
  return NextResponse.json({ success: true })
}

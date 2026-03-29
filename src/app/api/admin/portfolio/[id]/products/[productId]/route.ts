import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'

export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ id: string; productId: string }> },
) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const { productId } = await props.params
  const body = await req.json()
  // Prevent overriding the FK
  delete body.portfolioItemId
  const product = await prisma.portfolioProduct.update({
    where: { id: productId },
    data: body,
  })
  return NextResponse.json(product)
}

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string; productId: string }> },
) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const { productId } = await props.params
  await prisma.portfolioProduct.delete({ where: { id: productId } })
  return NextResponse.json({ success: true })
}

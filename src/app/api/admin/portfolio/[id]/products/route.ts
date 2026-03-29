import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const { id } = await props.params
  const products = await prisma.portfolioProduct.findMany({
    where: { portfolioItemId: id },
    orderBy: { displayOrder: 'asc' },
  })
  return NextResponse.json(products)
}

export async function POST(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const { id } = await props.params
  const body = await req.json()

  // Assign next displayOrder
  const maxOrder = await prisma.portfolioProduct.aggregate({
    where: { portfolioItemId: id },
    _max: { displayOrder: true },
  })
  const nextOrder = (maxOrder._max.displayOrder ?? -1) + 1

  const product = await prisma.portfolioProduct.create({
    data: {
      ...body,
      portfolioItemId: id,
      displayOrder: body.displayOrder ?? nextOrder,
    },
  })
  return NextResponse.json(product, { status: 201 })
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const { id } = await props.params
  const products = await prisma.portfolioProduct.findMany({
    where: { portfolioItemId: id, active: true },
    orderBy: { displayOrder: 'asc' },
  })
  return NextResponse.json(products)
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'
import { revalidatePublic } from '@/lib/revalidatePublic'

export async function GET(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(testimonials)
}

export async function POST(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError
  const body = await req.json()
  if (body.id === 'new') delete body.id
  const testimonial = await prisma.testimonial.create({ data: body })
  revalidatePublic()
  return NextResponse.json(testimonial, { status: 201 })
}

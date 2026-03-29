import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authError = await validateAdmin(req)
  if (authError) return authError
  const { id } = await props.params
  const item = await prisma.formSubmission.findUnique({ where: { id } })
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authError = await validateAdmin(req)
  if (authError) return authError
  const { id } = await props.params
  const body = await req.json()
  const item = await prisma.formSubmission.update({ where: { id }, data: { read: body.read ?? true } })
  return NextResponse.json(item)
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authError = await validateAdmin(req)
  if (authError) return authError
  const { id } = await props.params
  await prisma.formSubmission.delete({ where: { id } })
  return NextResponse.json({ success: true })
}

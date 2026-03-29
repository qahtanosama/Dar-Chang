import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdmin } from '@/lib/validateAdminSession'
import { fireWebhook } from '@/lib/fireWebhook'
import { revalidatePublic } from '@/lib/revalidatePublic'

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const { id } = await props.params
  const insight = await prisma.insight.findUnique({ where: { id } })
  if (!insight) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(insight)
}

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const { id } = await props.params
  const body = await req.json()

  const existing = await prisma.insight.findUnique({ where: { id }, select: { publishedAt: true } })

  const updateData = { ...body }
  if (body.status === 'published') { updateData.published = true; if (!existing?.publishedAt) updateData.publishedAt = new Date() }
  else if (body.status === 'draft' || body.status === 'archived') { updateData.published = false }

  const insight = await prisma.insight.update({ where: { id }, data: updateData })

  if (body.status === 'published' || body.published === true) {
    fireWebhook({ event: 'insight.published', source: 'cms', insight }).catch(() => {})
  }

  revalidatePublic()
  return NextResponse.json(insight)
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const { id } = await props.params
  await prisma.insight.delete({ where: { id } })
  revalidatePublic()
  return NextResponse.json({ success: true })
}

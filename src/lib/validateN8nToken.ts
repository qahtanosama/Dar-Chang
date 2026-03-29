import { NextRequest, NextResponse } from 'next/server'

export function validateN8nToken(req: NextRequest): NextResponse | null {
  const authHeader = req.headers.get('authorization') ?? ''
  const secret = process.env.N8N_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'N8N_SECRET not configured' }, { status: 500 })
  }
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}

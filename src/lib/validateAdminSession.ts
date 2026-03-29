import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/auth'

export async function validateAdmin(req: NextRequest): Promise<NextResponse | null> {
  const session = req.cookies.get('admin_session')?.value
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const parsed = await decrypt(session)
  if (!parsed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing from environment variables");
}
const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: import('jose').JWTPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(key)
}

export async function decrypt(input: string): Promise<import('jose').JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ['HS256'],
        })
        return payload
    } catch {
        return null
    }
}

export async function getSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')?.value
    if (!session) return null
    return await decrypt(session)
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get('admin_session')?.value
    if (!session) return

    const parsed = await decrypt(session)
    if (!parsed) return

    parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const res = NextResponse.next()
    res.cookies.set({
        name: 'admin_session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires as Date,
    })
    return res
}

'use server'

import { cookies } from 'next/headers'
import { encrypt } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function login(prevState: unknown, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Please enter both email and password.' }
    }

    // Find user by email
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        return { error: 'Invalid credentials.' }
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        return { error: 'Invalid credentials.' }
    }

    // Generate JWT & set cookie
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
    const sessionToken = await encrypt({ id: user.id, email: user.email, expires })

    const cookieStore = await cookies()
    cookieStore.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires
    })

    return { success: true }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')
}

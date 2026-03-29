'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { login } from './actions'
import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--color-primary-navy)] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent-gold)] ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {pending ? 'Signing in...' : 'Sign in'}
        </button>
    )
}

export default function LoginPage() {
    const [state, formAction] = useFormState(login, null)
    const router = useRouter()
    const params = useParams()
    const locale = (params.locale as string) ?? 'en'

    useEffect(() => {
        if (state?.success) {
            window.location.href = `/${locale}/admin` // Force full reload to update middleware
        }
    }, [state, router, locale])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--color-primary-navy)]">
                        Dar Chang Admin
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Secure Shopify-style Dashboard
                    </p>
                </div>

                <form className="mt-8 space-y-6" action={formAction}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email-address">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[var(--color-accent-gold)] focus:border-[var(--color-accent-gold)] focus:z-10 sm:text-sm"
                                placeholder="admin@darchang.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[var(--color-accent-gold)] focus:border-[var(--color-accent-gold)] focus:z-10 sm:text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {state?.error && (
                        <div className="text-red-500 text-sm font-medium flex items-center justify-center bg-red-50 py-2 rounded">
                            {state.error}
                        </div>
                    )}

                    <div>
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    )
}

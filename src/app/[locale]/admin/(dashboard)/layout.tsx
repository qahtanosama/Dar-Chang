import { ReactNode } from 'react'
import { logout } from '../login/actions'
import Link from 'next/link'
import { LogOut, LayoutDashboard, FileText, Image as ImageIcon } from 'lucide-react'

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-50 text-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <span className="text-xl font-bold text-[var(--color-primary-navy)]">Dar Chang</span>
                    <span className="ml-2 px-2 py-0.5 rounded text-xs font-semibold bg-[var(--color-accent-gold)] text-white">ADMIN</span>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link href="/admin" className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-[var(--color-primary-navy)] bg-blue-50">
                        <LayoutDashboard className="mr-3 h-5 w-5 text-blue-500" />
                        Overview
                    </Link>
                    <Link href="/admin/articles" className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                        <FileText className="mr-3 h-5 w-5 text-gray-400" />
                        Articles
                    </Link>
                    <Link href="/admin/portfolio" className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                        <ImageIcon className="mr-3 h-5 w-5 text-gray-400" />
                        Portfolio
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <form action={logout}>
                        <button type="submit" className="flex w-full items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50">
                            <LogOut className="mr-3 h-5 w-5 text-red-500" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}

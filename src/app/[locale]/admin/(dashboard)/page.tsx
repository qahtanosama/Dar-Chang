import { getSession } from "@/lib/auth"

export default async function AdminOverview() {
    const session = await getSession()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
                <div className="text-sm text-gray-500">
                    Logged in as <span className="font-medium text-gray-900">{String(session?.email)}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center h-32">
                    <span className="text-3xl font-bold text-[var(--color-primary-navy)]">0</span>
                    <span className="text-sm text-gray-500 mt-2">Active Articles</span>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center h-32">
                    <span className="text-3xl font-bold text-[var(--color-primary-navy)]">0</span>
                    <span className="text-sm text-gray-500 mt-2">Portfolio Machines</span>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center h-32">
                    <span className="text-3xl font-bold text-green-600">Online</span>
                    <span className="text-sm text-gray-500 mt-2">System Status</span>
                </div>
            </div>
        </div>
    )
}

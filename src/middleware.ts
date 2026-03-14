import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const isAuthRoute = pathname.includes('/admin/login');
    const isAdminRoute = pathname.includes('/admin') && !isAuthRoute;

    // Protect Admin Dashboard
    if (isAdminRoute) {
        const session = req.cookies.get('admin_session')?.value;
        const parsed = session ? await decrypt(session) : null;

        if (!parsed) {
            const locale = pathname.split('/')[1] || 'en';
            return NextResponse.redirect(new URL(`/${locale}/admin/login`, req.url));
        }
    }

    // Prevent logged-in users from seeing the login screen
    if (isAuthRoute) {
        const session = req.cookies.get('admin_session')?.value;
        const parsed = session ? await decrypt(session) : null;
        if (parsed) {
            const locale = pathname.split('/')[1] || 'en';
            return NextResponse.redirect(new URL(`/${locale}/admin`, req.url));
        }
    }

    return intlMiddleware(req);
}

export const config = {
    // Match only internationalized pathnames
    matcher: ["/", "/(ar|en)/:path*"],
};

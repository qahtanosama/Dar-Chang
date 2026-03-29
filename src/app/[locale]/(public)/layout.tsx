// Force dynamic rendering so site-settings (logo, footer, social links) always
// come from the DB, never from a cached render.
export const dynamic = 'force-dynamic'

import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { prisma } from "@/lib/prisma";
import { SplashScreen } from "@/components/SplashScreen";

export default async function PublicLayout({ children }: { children: ReactNode }) {
    const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
    return (
        <SmoothScrollProvider>
            <SplashScreen splashImageUrl={settings?.splashImageUrl} />
            <AnimatedBackground />
            <Navbar logoUrl={settings?.logoUrl} />
            <main className="flex-grow relative z-10">{children}</main>
            <TrustMarquee />
            <Footer
              footerLogoUrl={settings?.footerLogoUrl}
              footerText={settings?.footerText}
              googleMyBusinessUrl={settings?.googleMyBusinessUrl}
              socialLinkedIn={settings?.socialLinkedIn}
              socialTwitter={settings?.socialTwitter}
              socialFacebook={settings?.socialFacebook}
              socialInstagram={settings?.socialInstagram}
              socialWhatsApp={settings?.socialWhatsApp}
              socialYoutube={settings?.socialYoutube}
            />
        </SmoothScrollProvider>
    );
}

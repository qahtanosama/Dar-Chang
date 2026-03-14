import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <SmoothScrollProvider>
            <AnimatedBackground />
            <Navbar />
            <main className="flex-grow relative z-10">{children}</main>
            <TrustMarquee />
            <Footer />
        </SmoothScrollProvider>
    );
}

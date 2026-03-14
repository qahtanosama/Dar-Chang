"use client";

import { Link } from "@/i18n/routing";
import { ArrowLeft, Home } from "lucide-react";
import { useGsapDirection } from "@/hooks/useGsapDirection";

export default function NotFoundPage() {
    const { isRtl } = useGsapDirection();

    return (
        <main className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white/5 border border-white/10 p-12 rounded-3xl max-w-lg w-full relative overflow-hidden backdrop-blur-md hover:border-accent-gold/30 transition-colors">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-accent-gold/5 blur-[100px] pointer-events-none" />

                <h1 className="text-8xl md:text-9xl font-black text-white/20 mb-2 tracking-tighter relative z-10">404</h1>

                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        {isRtl ? "لم يتم العثور على الصفحة" : "Page Not Found"}
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-xs mx-auto text-sm md:text-base">
                        {isRtl
                            ? "عذراً، الرابط الذي تحاول الوصول إليه غير موجود أو تم نقله."
                            : "Sorry, the link you are trying to access does not exist or has been moved."}
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 bg-accent-gold hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg active:scale-95"
                    >
                        {isRtl ? <ArrowLeft className="w-5 h-5" /> : <Home className="w-5 h-5" />}
                        {isRtl ? "العودة للرئيسية" : "Return to Home"}
                    </Link>
                </div>
            </div>
        </main>
    );
}

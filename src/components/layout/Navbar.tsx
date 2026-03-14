"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Menu, X, Globe, Phone, Home, Info, Wrench, Briefcase, FileText, ShieldCheck, MessageSquarePlus } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGsapDirection } from "@/hooks/useGsapDirection";

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
    const t = useTranslations("Navigation");
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const [prevPathname, setPrevPathname] = useState(pathname);
    const { isRtl } = useGsapDirection();
    const navRef = useRef<HTMLElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Close menu on route change (Derived State)
    if (pathname !== prevPathname) {
        setIsOpen(false);
        setPrevPathname(pathname);
    }

    // Handle Desktop Navbar scroll hiding (Smart Nav)
    useGSAP(() => {
        const showAnim = gsap.from(navRef.current, { 
            yPercent: -100, 
            paused: true, 
            duration: 0.3,
            ease: "power2.out" 
        }).progress(1);

        ScrollTrigger.create({
            start: "top top",
            onUpdate: (self) => {
                // Toggle visibility based on scroll direction
                if (self.direction === -1) {
                    showAnim.play();
                } else {
                    showAnim.reverse();
                }
            }
        });
    }, { scope: navRef });

    const navLinks = [
        { href: "/", label: t("home"), icon: <Home className="w-5 h-5" /> },
        { href: "/about", label: t("about"), icon: <Info className="w-5 h-5" /> },
        { href: "/services", label: t("services"), icon: <Wrench className="w-5 h-5" /> },
        { href: "/insights", label: t("insights"), icon: <FileText className="w-5 h-5" /> },
        { href: "/portfolio", label: t("portfolio"), icon: <Briefcase className="w-5 h-5" /> },
        { href: "/contact", label: t("contact_page"), icon: <Phone className="w-5 h-5" /> },
    ];

    // Derive the alternate language path
    const currentLocale = isRtl ? "ar" : "en";
    const alternateLocale = isRtl ? "en" : "ar";
    // Strip the current locale from pathname to get the clean route
    const cleanPathname = pathname.replace(`/${currentLocale}`, "") || "/";

    return (
        <>
            {/* Desktop Navigation (Hidden on mobile) */}
            <nav ref={navRef} className="desktop-nav fixed top-0 w-full z-50 hidden md:block glass-nav">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="relative flex items-center h-12 w-48 group">
                        <Image
                            src="/logo.svg"
                            alt="Dar Chang Logo - دار تشانغ"
                            fill
                            priority
                            className={`object-contain ${isRtl ? 'object-right' : 'object-left'}`}
                        />
                    </Link>

                    <div className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium hover:text-accent-gold transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Language Switcher */}
                        <Link
                            href={cleanPathname}
                            locale={alternateLocale}
                            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            <Globe className="w-4 h-4" />
                            {isRtl ? "English" : "العربية"}
                        </Link>

                        {/* Quote CTA */}
                        <Link
                            href="/quote"
                            className="bg-white text-primary-navy hover:bg-gray-200 transition-colors px-6 py-2 rounded-full text-sm font-bold"
                        >
                            {t("contact")}
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Top Navigation (Glassmorphism) */}
            <nav
                className="fixed top-0 inset-s-0 w-full z-50 md:hidden px-5 flex items-center justify-between"
                style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    height: '72px'
                }}
            >
                {/* Brand Logo */}
                <Link href="/" className="relative flex items-center h-10 w-36">
                    <Image
                        src="/logo.svg"
                        alt="Dar Chang Logo"
                        fill
                        className={`object-contain ${isRtl ? 'object-right' : 'object-left'}`}
                        priority
                    />
                </Link>

                {/* Right side Actions */}
                <div className="flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="w-11 h-11 flex items-center justify-center bg-transparent border border-white/20 rounded-[14px] text-white active:bg-white/40 active:scale-95 transition-all shadow-sm"
                        aria-label="Menu"
                    >
                        {isOpen ? <X className="w-[24px] h-[24px]" /> : <Menu className="w-[24px] h-[24px]" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Bottom CTA Navigation (Circular Icons as per image) */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden flex items-center justify-center gap-4 bg-white/80 backdrop-blur-xl border border-gray-200/50 p-3 rounded-full shadow-xl">
                <Link
                    href="https://wa.me/8618721160270"
                    className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200/50 rounded-full text-gray-900 active:scale-95 transition-transform shadow-sm"
                    aria-label="WhatsApp"
                >
                    <Phone className="w-5 h-5 fill-current" />
                </Link>

                <Link
                    href="/quote"
                    className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200/50 rounded-full text-gray-900 active:scale-95 transition-transform shadow-sm"
                    aria-label="Get a Quote"
                >
                    <MessageSquarePlus className="w-5 h-5" />
                </Link>

                <Link
                    href="/contact"
                    className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200/50 rounded-full text-gray-900 active:scale-95 transition-transform shadow-sm"
                    aria-label="Contact Us"
                >
                    <Globe className="w-5 h-5" />
                </Link>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-60 md:hidden">
                    {/* Scrim */}
                    <div
                        className="absolute inset-0 bg-[#0A0A1A]/70 backdrop-blur-md animate-in fade-in"
                        onClick={toggleMenu}
                    />

                    {/* Modal Side Menu (75% width) - natively handles LTR/RTL with 'inset-s-0' */}
                    <div className="absolute inset-y-0 inset-s-0 w-[75%] max-w-[320px] bg-primary-navy shadow-[0_0_40px_rgba(0,0,0,0.5)] border-e border-white/5 flex flex-col overflow-y-auto animate-in slide-in-from-start-full duration-300">

                        {/* Header */}
                        <div className="flex flex-col items-center justify-center pt-12 pb-8 px-6 border-b border-white/5 shrink-0">
                            <div className="relative w-40 h-10 mb-4">
                                <Image
                                    src="/logo.svg"
                                    alt="Dar Chang Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-accent-gold text-xs tracking-[0.2em] uppercase font-medium text-center">
                                {isRtl ? "مكتبك في الصين" : "Your Office in China"}
                            </span>
                        </div>

                        {/* Navigation Items (Middle Thumb-Zone) */}
                        <div className="flex-1 px-6 py-8 flex flex-col justify-center gap-2">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || pathname === `/${currentLocale}${link.href}` || (link.href !== "/" && pathname.includes(link.href));
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`flex items-center gap-4 h-12 px-4 rounded-xl transition-all duration-300 group
                                            ${isActive ? "bg-accent-gold/10 text-accent-gold" : "text-gray-300 hover:bg-white/5 hover:text-white"}
                                        `}
                                    >
                                        <div className={`shrink-0 transition-colors ${isActive ? "text-accent-gold" : "text-gray-500 group-hover:text-accent-gold"}`}>
                                            {link.icon}
                                        </div>
                                        <span className={`text-base font-semibold ${isActive ? "" : ""}`}>{link.label}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="px-6 pb-12 pt-6 border-t border-white/5 mt-auto flex flex-col gap-2 shrink-0">
                            <Link
                                href="/compliance"
                                className="flex items-center gap-4 h-12 px-4 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group"
                            >
                                <div className="shrink-0 text-gray-500 group-hover:text-accent-gold transition-colors">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-semibold">{isRtl ? "ضمان المصداقية" : "Standards & Certifications"}</span>
                            </Link>

                            <Link
                                href={cleanPathname}
                                locale={alternateLocale}
                                className="flex items-center gap-4 h-12 px-4 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group"
                            >
                                <div className="shrink-0 text-gray-500 group-hover:text-accent-gold transition-colors">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-semibold">{isRtl ? "Switch to English" : "التبديل للعربية"}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

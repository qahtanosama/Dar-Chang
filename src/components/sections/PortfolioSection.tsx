"use client";

import { useLocale } from "next-intl";
import { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Tractor, Zap, Factory, Armchair, Puzzle, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
    {
        title_en: "Heavy Machinery",
        title_ar: "المعدات الثقيلة",
        desc_en: "Excavators, Wheel Loaders, Bulldozers & Graders from top global brands — sourced direct from Chinese OEMs.",
        desc_ar: "حفارات، شيولات، بلدوزرات، ومسطحات — مباشرةً من كبرى المصانع الصينية.",
        icon: <Tractor className="w-9 h-9 text-accent-gold" />,
        href: "/portfolio/machinery",
        bgImage: "/portfolio/machinery_bg.jpg",
    },
    {
        title_en: "VHS NEMA Motors",
        title_ar: "محركات VHS / NEMA",
        desc_en: "Vertical Hollow Shaft motors, VFD control panels, and full industrial drive integrations.",
        desc_ar: "محركات VHS وفقًا للمعيار NEMA، ولوحات التحكم VFD والتكاملات الصناعية.",
        icon: <Zap className="w-9 h-9 text-accent-gold" />,
        href: "/portfolio/vhs-nema-industrial-motors",
        bgImage: "/portfolio/vhs-motor-industrial.jpg",
    },
    {
        title_en: "Production Lines",
        title_ar: "خطوط الإنتاج",
        desc_en: "Fully automated manufacturing systems for packaging, food processing, and industrial output.",
        desc_ar: "أنظمة تصنيع آلية متكاملة للتعبئة، وتجهيز الغذاء، والإنتاج الصناعي.",
        icon: <Factory className="w-9 h-9 text-accent-gold" />,
        href: "/portfolio/production-line",
        bgImage: "/portfolio/production_bg.png",
    },
    {
        title_en: "Hospitality FF&E",
        title_ar: "أثاث ومعدات فندقية",
        desc_en: "Turnkey sourcing of Furniture, Fixtures & Equipment for hotels and hospitality projects.",
        desc_ar: "توريد شامل للأثاث والتجهيزات والمعدات لمشاريع الفنادق والضيافة.",
        icon: <Armchair className="w-9 h-9 text-accent-gold" />,
        href: "/portfolio/hotel-furniture-procurement",
        bgImage: "/portfolio/hospitality_bg.jpg",
    },
    {
        title_en: "Custom Sourcing",
        title_ar: "طلبات التوريد المخصصة",
        desc_en: "Niche industrial parts, bespoke commercial goods, and verified alternative suppliers.",
        desc_ar: "قطع صناعية نادرة، منتجات تجارية مخصصة، والبحث عن موردين بديلين معتمدين.",
        icon: <Puzzle className="w-9 h-9 text-accent-gold" />,
        href: "/portfolio/custom",
        bgImage: "/portfolio/custom_bg.png",
    },
];

export function PortfolioSection() {
    const locale = useLocale();
    const isRtl = locale === "ar";
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".portfolio-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 40,
                opacity: 0,
                duration: 0.7,
                stagger: 0.09,
                ease: "power3.out",
                clearProps: "all",
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="bg-bg-neutral py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 highlight-border">
                    <div className="max-w-xl">
                        <p className="text-accent-gold text-sm font-bold tracking-[0.2em] uppercase mb-3">
                            {isRtl ? "محفظة مشاريعنا" : "Our Portfolio"}
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold text-primary-navy leading-tight">
                            {isRtl
                                ? "خبرة ميدانية في كل قطاع"
                                : "Expertise Across Every Sector"}
                        </h2>
                        <p className="text-text-main text-lg mt-4 leading-relaxed">
                            {isRtl
                                ? "من المعدات الثقيلة إلى توريد الأثاث الفندقي — نغطي احتياجاتك التجارية مباشرةً من الصين."
                                : "From heavy machinery to hospitality FF&E — we cover your sourcing needs directly from China."}
                        </p>
                    </div>

                    <Link
                        href="/portfolio"
                        className="group inline-flex items-center gap-2 text-primary-navy font-bold border-b-2 border-accent-gold pb-1 hover:text-accent-gold transition-colors self-start md:self-auto shrink-0"
                    >
                        {isRtl ? "عرض كامل المحفظة" : "View Full Portfolio"}
                        <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    </Link>
                </div>

                {/* 5-Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                    {pillars.map((pillar, idx) => (
                        <Link
                            key={idx}
                            href={pillar.href}
                            className={`portfolio-card group relative bg-transparent lg:bg-white rounded-2xl p-7 border border-white/20 lg:border-border-subtle hover:border-accent-gold transition-all duration-500 shadow-xl lg:shadow-sm hover:shadow-md flex flex-col gap-5 overflow-hidden group`}
                        >
                            {/* Background Image Reveal - 100% Opacity */}
                            <div className="absolute inset-0 z-0 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none">
                                <Image
                                    src={pillar.bgImage}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                                    className="object-cover scale-100 lg:scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-black/60 lg:bg-black/40" />
                            </div>

                            <div className="absolute inset-0 bg-transparent lg:bg-white z-0 hidden lg:block group-hover:opacity-0 transition-opacity duration-500" />

                            {/* Icon */}
                            <div className="relative z-10 w-14 h-14 rounded-xl bg-white/10 lg:bg-bg-neutral backdrop-blur-md lg:backdrop-blur-none border border-white/10 lg:border-transparent flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md lg:shadow-sm">
                                {pillar.icon}
                            </div>

                            {/* Text */}
                            <div className="relative z-10 flex flex-col gap-2 flex-1">
                                <h3 className="text-base font-bold text-white lg:text-primary-navy group-hover:text-white transition-colors leading-snug drop-shadow-md lg:drop-shadow-none">
                                    {isRtl ? pillar.title_ar : pillar.title_en}
                                </h3>
                                <p className="text-gray-200 lg:text-text-main text-sm leading-relaxed group-hover:text-gray-100 transition-colors drop-shadow-md lg:drop-shadow-none">
                                    {isRtl ? pillar.desc_ar : pillar.desc_en}
                                </p>
                            </div>

                            {/* Animated arrow link hint */}
                            <div className="relative z-10 flex items-center gap-1 text-accent-gold text-xs font-bold opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md lg:drop-shadow-none">
                                {isRtl ? "استكشف" : "Explore"}
                                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}


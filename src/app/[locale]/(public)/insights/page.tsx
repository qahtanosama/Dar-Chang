"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useGsapDirection } from "@/hooks/useGsapDirection";

const ARTICLES = [
    {
        id: 1,
        title: "Navigating the New Export Regulations for Fresh Produce in 2026",
        titleAr: "فهم لوائح التصدير الجديدة للمنتجات الطازجة في عام 2026",
        category: "Fresh Produce",
        categoryAr: "المنتجات الطازجة",
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2670&auto=format&fit=crop",
        date: "March 15, 2026",
        slug: "navigating-export-regulations-fresh-produce",
    },
    {
        id: 2,
        title: "Understanding Efficiency Classes in NEMA Standard Industrial Motors",
        titleAr: "فهم فئات الكفاءة في المحركات الصناعية القياسية NEMA",
        category: "Industrial Motors",
        categoryAr: "المحركات الصناعية",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
        date: "February 28, 2026",
        slug: "efficiency-classes-nema-motors",
    },
    {
        id: 3,
        title: "Cold Chain Logistics: Maintaining Quality from Vietnam to the GCC",
        titleAr: "لوجستيات سلسلة التبريد: الحفاظ على الجودة من فيتنام إلى دول الخليج",
        category: "Fresh Produce",
        categoryAr: "المنتجات الطازجة",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop",
        date: "February 10, 2026",
        slug: "cold-chain-logistics-vietnam-gcc",
    },
    {
        id: 4,
        title: "The Future of VFD Control Panels in Heavy Machinery Operations",
        titleAr: "مستقبل لوحات التحكم VFD في عمليات المعدات الثقيلة",
        category: "Industrial Motors",
        categoryAr: "المحركات الصناعية",
        image: "https://images.unsplash.com/photo-1565514020179-026b92b2d698?q=80&w=2693&auto=format&fit=crop",
        date: "January 22, 2026",
        slug: "future-vfd-control-panels",
    },
];

export default function InsightsPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const { isRtl } = useGsapDirection();

    const filteredArticles =
        activeFilter === "All"
            ? ARTICLES
            : ARTICLES.filter((article) => article.category === activeFilter);

    return (
        <div className="pt-32 pb-24 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="mb-16 md:mb-24 text-center md:text-start">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        {isRtl ? "رؤى " : "Global"}<span className="text-accent-gold">{isRtl ? "عالمية" : " Insights"}</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        {isRtl
                            ? "تحليلات الخبراء، واتجاهات الصناعة، والذكاء الاستراتيجي عبر التوريد العالمي، والمعدات الثقيلة، وسلاسل التوريد الدولية."
                            : "Expert analysis, industry trends, and strategic intelligence across global sourcing, heavy machinery, and international supply chains."}
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-12">
                    {["All", "Fresh Produce", "Industrial Motors"].map((filter) => {
                        const filterLabel = isRtl
                            ? (filter === "All" ? "الكل" : filter === "Fresh Produce" ? "المنتجات الطازجة" : "المحركات الصناعية")
                            : (filter === "All" ? "All Insights" : filter);

                        return (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === filter
                                    ? "bg-accent-gold text-white shadow-lg"
                                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                                    }`}
                            >
                                {filterLabel}
                            </button>
                        );
                    })}
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
                    {filteredArticles.map((article) => (
                        <article
                            key={article.id}
                            className="group cursor-pointer flex flex-col"
                        >
                            {/* Image Container */}
                            <div className="relative w-full aspect-[16/9] mb-6 overflow-hidden rounded-2xl bg-white/5 border border-white/10">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute top-4 left-4 bg-primary-navy/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-medium text-accent-gold border border-white/10">
                                    {isRtl ? article.categoryAr : article.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-grow flex flex-col">
                                <time className="text-sm text-gray-500 mb-3 block">
                                    {article.date}
                                </time>
                                <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-accent-gold transition-colors">
                                    {isRtl ? article.titleAr : article.title}
                                </h3>

                                {/* Read More Link */}
                                <div className="mt-auto flex items-center text-accent-gold font-bold text-sm tracking-wide group-hover:underline underline-offset-4 pt-2">
                                    {isRtl ? "اقرأ المقال" : "Read Article"}
                                    {isRtl ? (
                                        <ArrowLeft className="ml-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                    ) : (
                                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {filteredArticles.length === 0 && (
                    <div className="py-24 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
                        {isRtl ? "لم يتم العثور على مقالات لهذه الفئة." : "No articles found for this category."}
                    </div>
                )}
            </div>
        </div>
    );
}

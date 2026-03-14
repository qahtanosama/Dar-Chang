"use client";

import { useLocale } from "next-intl";
import { Send, Upload } from "lucide-react";

export default function QuotePage() {
    const locale = useLocale();
    const isRtl = locale === "ar";

    return (
        <main className="min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16 border-b border-white/10 pb-8">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        {isRtl ? "طلب عرض سعر مرجعي" : "Request a "}<span className="text-accent-gold">{isRtl ? "" : "Quote"}</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        {isRtl
                            ? "يرجى تعبئة النموذج أدناه بتفاصيل طلبك، وسيقوم فريق التوريد في شنغهاي بالتواصل معك قريباً."
                            : "Please fill out the form below with your RFQ details. Our Shanghai sourcing team will get back to you with an expert assessment."}
                    </p>
                </div>

                {/* Full-Width Quote Request Form */}
                <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
                    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-300">
                                    {isRtl ? "فئة المنتج" : "Product Category"}
                                </label>
                                <select defaultValue="" className="w-full bg-primary-dark/50 border border-white/20 rounded-xl px-4 py-3.5 text-white focus:border-accent-gold focus:ring-1 focus:ring-accent-gold outline-none transition-all appearance-none cursor-pointer">
                                    <option value="" disabled>{isRtl ? "اختر الفئة..." : "Select Category..."}</option>
                                    <option value="heavy_machinery">{isRtl ? "المعدات الثقيلة" : "Heavy Machinery"}</option>
                                    <option value="motors">{isRtl ? "المحركات الصناعية" : "Industrial Motors"}</option>
                                    <option value="custom">{isRtl ? "تصنيع مخصص / أخرى" : "Custom Manufacturing / Other"}</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-300">
                                    {isRtl ? "الكمية المطلوبة (العدد المقدر)" : "Target Quantity"}
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. 5 Units, 120 Motors"
                                    className="w-full bg-primary-dark/50 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-300">
                                    {isRtl ? "ميناء الوصول (الوجهة)" : "Destination Port"}
                                </label>
                                <input
                                    type="text"
                                    placeholder={isRtl ? "مثال: ميناء جبل علي، دبي" : "e.g. Jebel Ali Port, Dubai"}
                                    className="w-full bg-primary-dark/50 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-300">
                                    {isRtl ? "البريد الإلكتروني للشركة" : "Corporate Email Address"}
                                </label>
                                <input
                                    type="email"
                                    className="w-full bg-primary-dark/50 border border-white/20 rounded-xl px-4 py-3.5 text-white focus:border-accent-gold focus:ring-1 focus:ring-accent-gold outline-none transition-all"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-300">
                                {isRtl
                                    ? "المتطلبات الخاصة (المواصفات)"
                                    : "Special Requirements & Specifications"}
                            </label>
                            <textarea
                                rows={5}
                                placeholder={isRtl ? "يرجى تفصيل المواصفات المطلوبة..." : "Please detail your exact technical requirements..."}
                                className="w-full bg-primary-dark/50 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold outline-none transition-all resize-none"
                            ></textarea>
                        </div>

                        <div className="pt-2 drop-zone cursor-pointer border-2 border-dashed border-white/20 hover:border-accent-gold/50 rounded-xl p-8 text-center transition-colors bg-white/5">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                            <p className="text-sm text-gray-300">
                                {isRtl
                                    ? "قم بإرفاق ملفات CAD أو PDF الرسمية (الحد الأقصى 20MB)"
                                    : "Upload CAD drawings or official OEM PDF spec sheets (Max 20MB)"}
                            </p>
                        </div>

                        <div className="pt-6 flex justify-center md:justify-end border-t border-white/10">
                            {/* Note: This strictly mimics the Header CTA button class logic as requested */}
                            <button className="bg-white flex items-center gap-2 text-primary-navy hover:bg-gray-200 transition-colors px-10 py-4 rounded-full text-lg font-bold">
                                {isRtl ? "إرسال طلب التسعير" : "Submit Quote Request"}
                                <Send className="w-5 h-5 rtl:rotate-180 ml-2 border-l border-primary-navy/20 pl-2" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

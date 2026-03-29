"use client";

import { useLocale } from "next-intl";
import { Send, Upload } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function QuoteFormInner({ isRtl }: { isRtl: boolean }) {
    const searchParams = useSearchParams();
    const typeParam = searchParams.get("type");
    
    // Form state
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form inputs state
    const [category, setCategory] = useState(() => {
        if (typeParam === "machinery") return "heavy_machinery";
        if (typeParam === "hotel") return "hotel_furniture";
        if (typeParam === "production_line") return "production_line";
        return "";
    });
    
    const [formData, setFormData] = useState({
        quantity: "",
        email: "",
        port: "",
        message: "",
        scale: "",
        deliveryDate: "",
        brands: "",
        condition: "any",
        capacity: "",
        area: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch('/api/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category, ...formData })
            });

            if (!res.ok) throw new Error("Submission Failed");
            
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            setSuccess(true);
            setFormData({ quantity: "", email: "", port: "", message: "", scale: "", deliveryDate: "", brands: "", condition: "any", capacity: "", area: "" });
        } catch (err: any) {
            setError(err.message || "An error occurred submitting your quote.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-8" onSubmit={handleSubmit} dir={isRtl ? "rtl" : "ltr"}>
            {success && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-6 rounded-xl text-center">
                    <h3 className="font-bold text-lg mb-2">{isRtl ? "تم إرسال الطب بنجاح!" : "Request Submitted Successfully!"}</h3>
                    <p className="text-sm">{isRtl ? "سنقوم بالرد عليك خلال 24 ساعة عبر البريد." : "Our team will contact you within 24 hours at the provided email address."}</p>
                </div>
            )}
            
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label htmlFor="category" className="text-sm font-medium text-gray-300 text-start block">
                        {isRtl ? "فئة المنتج" : "Product Category"}
                    </label>
                    <select 
                        id="category"
                        name="category"
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="w-full bg-primary-dark/50 border border-white/20 rounded-xl px-4 py-3.5 text-white focus:border-accent-gold focus:ring-1 focus:ring-accent-gold outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="" disabled>{isRtl ? "اختر الفئة..." : "Select Category..."}</option>
                        <option value="heavy_machinery">{isRtl ? "المعدات الثقيلة" : "Heavy Machinery"}</option>
                        <option value="hotel_furniture">{isRtl ? "تأثيث الفنادق" : "Hotel Furniture"}</option>
                        <option value="production_line">{isRtl ? "خطوط الإنتاج" : "Production Lines"}</option>
                        <option value="motors">{isRtl ? "المحركات الصناعية" : "Industrial Motors"}</option>
                        <option value="custom">{isRtl ? "تصنيع مخصص / أخرى" : "Custom Manufacturing / Other"}</option>
                    </select>
                </div>

                <div className="space-y-3">
                    <label htmlFor="quantity" className="text-sm font-medium text-gray-300 text-start block">
                        {isRtl ? "الكمية المطلوبة (العدد المقدر)" : "Target Quantity"}
                    </label>
                    <input
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="e.g. 5 Units, 150 Rooms"
                        className="w-full bg-primary-dark/50 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold outline-none transition-all"
                    />
                </div>
            </div>

            {/* Contextual Fields */}
            {category === "hotel_furniture" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                    <div className="space-y-3">
                        <label htmlFor="scale" className="text-sm font-medium text-accent-gold block text-start">
                            {isRtl ? "حجم المشروع (عدد الغرف)" : "Project Scale (Number of Rooms)"}
                        </label>
                        <input id="scale" name="scale" value={formData.scale} onChange={handleChange} type="text" placeholder="e.g. 150 Rooms" className="w-full bg-primary-dark/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-accent-gold outline-none transition-all" />
                    </div>
                    <div className="space-y-3">
                        <label htmlFor="deliveryDate" className="text-sm font-medium text-accent-gold block text-start">
                            {isRtl ? "موعد التسليم المستهدف" : "Target Delivery Date"}
                        </label>
                        <input id="deliveryDate" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} type="text" placeholder="e.g. Q4 2026" className="w-full bg-primary-dark/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-accent-gold outline-none transition-all" />
                    </div>
                </div>
            )}

            {category === "heavy_machinery" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                    <div className="space-y-3">
                        <label htmlFor="brands" className="text-sm font-medium text-accent-gold block text-start">
                            {isRtl ? "العلامات التجارية المفضلة" : "Desired Brands"}
                        </label>
                        <input id="brands" name="brands" value={formData.brands} onChange={handleChange} type="text" placeholder="e.g. Caterpillar, SANY" className="w-full bg-primary-dark/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-accent-gold outline-none transition-all" />
                    </div>
                    <div className="space-y-3">
                        <label htmlFor="condition" className="text-sm font-medium text-accent-gold block text-start">
                            {isRtl ? "حالة المعدات المطلوبة" : "Equipment Condition"}
                        </label>
                        <select id="condition" name="condition" value={formData.condition} onChange={handleChange} className="w-full bg-primary-dark/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-accent-gold outline-none transition-all appearance-none cursor-pointer">
                            <option value="new">{isRtl ? "جديدة" : "New"}</option>
                            <option value="used">{isRtl ? "مستعملة مفحوصة" : "Used (Inspected)"}</option>
                            <option value="any">{isRtl ? "أي حالة" : "Any"}</option>
                        </select>
                    </div>
                </div>
            )}

            {category === "production_line" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                    <div className="space-y-3">
                        <label htmlFor="capacity" className="text-sm font-medium text-accent-gold block text-start">
                            {isRtl ? "القدرة الإنتاجية المطلوبة" : "Required Production Capacity"}
                        </label>
                        <input id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} type="text" placeholder="e.g. 5 Tons/Hour" className="w-full bg-primary-dark/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-accent-gold outline-none transition-all" />
                    </div>
                    <div className="space-y-3">
                        <label htmlFor="area" className="text-sm font-medium text-accent-gold block text-start">
                            {isRtl ? "حجم المساحة المتوفرة" : "Available Factory Area"}
                        </label>
                        <input id="area" name="area" value={formData.area} onChange={handleChange} type="text" placeholder="e.g. 2000 sqm" className="w-full bg-primary-dark/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-accent-gold outline-none transition-all" />
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label htmlFor="port" className="text-sm font-medium text-gray-300 text-start block">
                        {isRtl ? "ميناء الوصول (الوجهة)" : "Destination Port"}
                    </label>
                    <input
                        id="port"
                        name="port"
                        value={formData.port}
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder={isRtl ? "مثال: ميناء جبل علي، دبي" : "e.g. Jebel Ali Port, Dubai"}
                        className="w-full bg-primary-dark/50 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold outline-none transition-all"
                    />
                </div>
                <div className="space-y-3">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300 text-start block">
                        {isRtl ? "البريد الإلكتروني للشركة" : "Corporate Email Address"}
                    </label>
                    <input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        type="email"
                        className="w-full bg-primary-dark/50 border border-white/20 rounded-xl px-4 py-3.5 text-white focus:border-accent-gold focus:ring-1 focus:ring-accent-gold outline-none transition-all text-start"
                        dir="ltr"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <label htmlFor="message" className="text-sm font-medium text-gray-300 text-start block">
                    {isRtl
                        ? "المتطلبات الخاصة (المواصفات)"
                        : "Special Requirements & Specifications"}
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={isRtl ? "يرجى تفصيل المواصفات المطلوبة..." : "Please detail your exact technical requirements..."}
                    className="w-full bg-primary-dark/50 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold outline-none transition-all resize-none text-start block"
                ></textarea>
            </div>

            <div className="pt-2 drop-zone cursor-pointer border-2 border-dashed border-white/20 hover:border-accent-gold/50 rounded-xl p-8 text-center transition-colors bg-white/5 relative overflow-hidden group">
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4 group-hover:text-accent-gold transition-colors" />
                <p className="text-sm text-gray-300">
                    {isRtl
                        ? "قم بإرفاق ملفات CAD أو PDF الرسمية (الحد الأقصى 20MB)"
                        : "Upload CAD drawings or official OEM PDF spec sheets (Max 20MB)"}
                </p>
            </div>

            <div className="pt-6 flex justify-center md:justify-end border-t border-white/10">
                <button 
                  disabled={loading}
                  type="submit"
                  className="bg-white flex items-center justify-center gap-2 text-primary-navy hover:bg-gray-200 disabled:opacity-50 transition-colors px-10 py-4 rounded-full text-lg font-bold min-w-[300px]"
                >
                    {loading ? (isRtl ? "جاري الإرسال..." : "Sending...") : (isRtl ? "إرسال طلب التسعير" : "Submit Quote Request")}
                    {!loading && <Send className="w-5 h-5 rtl:rotate-180 ml-2 border-l border-primary-navy/20 pl-2" />}
                </button>
            </div>
        </form>
    );
}

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
                    <Suspense fallback={<div className="text-center text-accent-gold p-10 font-bold animate-pulse">Loading Form...</div>}>
                        <QuoteFormInner isRtl={isRtl} />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}

import { Metadata } from "next";
import { Puzzle, PenTool, Sprout, Search, RefreshCw, Layers, Upload } from "lucide-react";
import { Link } from "@/i18n/routing";

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale;

  if (locale === "ar") {
    return {
      title: "طلبات التوريد الخاصة والمخصصة | توريد صيني مخصص لشركتك",
      description: "نعمل كمكتب توريد مخصص لك في شنغهاي لأي قطاع صناعي أو تجاري. توريد القطع النادرة، المنتجات التجارية المخصصة، وإيجاد بدائل موثوقة للموردين.",
      keywords: ["توريد مخصص الصين", "توريد بضائع من شنغهاي", "قطع صناعية نادرة", "البحث عن موردين بدائل", "منتجات تجارية مخصصة", "التوريد حسب الطلب"],
    };
  }

  return {
    title: "Custom Procurement & Special Requests | Bespoke China Sourcing",
    description: "If it is manufactured in China, we source, audit, and deliver it. Niche industrial sourcing, bespoke commercial goods, and verified alternative suppliers.",
    keywords: ["Custom Sourcing Shanghai", "Bespoke China Procurement", "niche industrial sourcing", "verified alternative suppliers", "China procurement arm", "specialized sourcing"],
  };
}

export default async function CustomSourcingPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale;
  const isRtl = locale === 'ar';

  return (
    <main className="min-h-screen pt-32 pb-24 bg-bg-neutral">
      <div className="max-w-7xl mx-auto px-6">

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6" dir={isRtl ? "rtl" : "ltr"}>
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-border-subtle">
              <Puzzle className="w-8 h-8 text-accent-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy">
              {isRtl ? "طلبات التوريد الخاصة والمخصصة" : "Custom Procurement & Special Requests"}
            </h1>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-accent-gold mb-6" dir={isRtl ? "rtl" : "ltr"}>
            {isRtl ? "إذا كان المنتج يُصنع في الصين، فنحن قادرون على توريده وفحصه وتسليمه." : "If it is manufactured in China, we can source, audit, and deliver it."}
          </h2>
          <p className="text-lg md:text-xl text-text-main leading-relaxed max-w-4xl" dir={isRtl ? "rtl" : "ltr"}>
            {isRtl ?
              "إلى جانب مجالات خبرتنا الأساسية، يمنحنا تواجدنا في قلب شنغهاي القدرة على العمل كمكتب توريد مخصص لك في أي قطاع صناعي أو تجاري. نحن نتولى التعقيدات الفنية واللوجستية للطلبات الخاصة لضمان وصولها بالمواصفات المطلوبة." :
              "Beyond our core expertise in machinery and produce, our presence in the heart of Shanghai allows us to act as your dedicated procurement arm for any industry. We handle the technical complexity of niche sourcing so you can focus on your business."}
          </p>
          <p className="text-lg text-primary-navy font-semibold mt-4 italic" dir={isRtl ? "rtl" : "ltr"}>
            {isRtl ?
              "نحن متخصصون في إيجاد العناصر بـ «المستحيلة» التي تتجاهلها مواقع التوريد العامة والطرق التقليدية." :
              "We specialize in finding the 'impossible' items that generic sourcing websites overlook."}
          </p>
        </div>

        {/* English Content */}
        {!isRtl && (
          <div className="space-y-16">
            <section className="bg-white p-8 md:p-12 rounded-3xl border border-border-subtle shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-bg-neutral rounded-2xl border border-border-subtle hover:border-accent-gold transition-colors flex flex-col group">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <PenTool className="w-6 h-6 text-primary-navy group-hover:text-accent-gold transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-navy mb-4 group-hover:text-accent-gold transition-colors">
                    Niche Industrial Sourcing
                  </h3>
                  <p className="text-text-main leading-relaxed">
                    From specialized automotive components to precision-engineered parts tailored strictly to your technical drawings and tolerances.
                  </p>
                </div>

                <div className="p-8 bg-bg-neutral rounded-2xl border border-border-subtle hover:border-accent-gold transition-colors flex flex-col group">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <Layers className="w-6 h-6 text-primary-navy group-hover:text-accent-gold transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-navy mb-4 group-hover:text-accent-gold transition-colors">
                    Bespoke Commercial Goods
                  </h3>
                  <p className="text-text-main leading-relaxed">
                    Sourcing and intensive quality control for custom furniture, specialized office supplies, and modern lifestyle products tailored to uniquely fit your brand.
                  </p>
                </div>

                <div className="p-8 bg-bg-neutral rounded-2xl border border-border-subtle hover:border-accent-gold transition-colors flex flex-col group">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <RefreshCw className="w-6 h-6 text-primary-navy group-hover:text-accent-gold transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-navy mb-4 group-hover:text-accent-gold transition-colors">
                    Verified Alternative Suppliers
                  </h3>
                  <p className="text-text-main leading-relaxed">
                    If your current supplier fails, we use our local network to find a highly reliable, vetted alternative within days, not weeks to keep your business moving.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Arabic Content */}
        {isRtl && (
          <div className="space-y-16" dir="rtl">
            <section className="bg-white p-8 md:p-12 rounded-3xl border border-border-subtle shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-bg-neutral rounded-2xl border border-border-subtle hover:border-accent-gold transition-colors flex flex-col group">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <PenTool className="w-6 h-6 text-primary-navy group-hover:text-accent-gold transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-navy mb-4 group-hover:text-accent-gold transition-colors">
                    توريد القطع الصناعية النادرة
                  </h3>
                  <p className="text-text-main leading-relaxed">
                    بدءاً من قطع غيار السيارات التخصصية وصولاً إلى المكونات الهندسية الدقيقة المصنعة والمخصصة تماماً وفقاً لمخططاتك الفنية.
                  </p>
                </div>

                <div className="p-8 bg-bg-neutral rounded-2xl border border-border-subtle hover:border-accent-gold transition-colors flex flex-col group">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <Layers className="w-6 h-6 text-primary-navy group-hover:text-accent-gold transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-navy mb-4 group-hover:text-accent-gold transition-colors">
                    المنتجات التجارية المخصصة
                  </h3>
                  <p className="text-text-main leading-relaxed">
                    خدمات البحث والرقابة الصارمة على الجودة للأثاث، المستلزمات المكتبية، والمنتجات العصرية المصممة خصيصاً لتواكب هوية مشروعك الخاص.
                  </p>
                </div>

                <div className="p-8 bg-bg-neutral rounded-2xl border border-border-subtle hover:border-accent-gold transition-colors flex flex-col group">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <RefreshCw className="w-6 h-6 text-primary-navy group-hover:text-accent-gold transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-navy mb-4 group-hover:text-accent-gold transition-colors">
                    البحث عن بدائل معتمدة
                  </h3>
                  <p className="text-text-main leading-relaxed">
                    في حال تعثر موردك الحالي، نستخدم شبكتنا المحلية لإيجاد وتجهيز بديل موثوق ومعتمد خلال أيام قليلة لضمان استمرارية عملك بلا مفاجآت.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Sourcing Inquiry Form */}
        <div className="mt-24 max-w-4xl mx-auto">
          <section className="bg-primary-navy text-white p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden ring-1 ring-white/10">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl -mr-32 -mt-32" />

            <div className="relative z-10 text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                {isRtl ? "نموذج طلبات التوريد الخاصة والمخصصة" : "Custom Sourcing & Special Inquiry Form"}
              </h3>
              <p className="text-white/80 text-lg">
                {isRtl ? "«إذا كان المنتج يُصنع في الصين، فنحن قادرون على توريده وفحصه وتسليمه.»" : "“If it is manufactured in China, we can find, audit, and deliver it.”"}
              </p>
            </div>

            <form className="space-y-6 max-w-3xl mx-auto" dir={isRtl ? "rtl" : "ltr"}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-start">
                  <label className="block text-sm font-bold text-accent-gold mb-2">
                    {isRtl ? "القطاع / الفئة" : "Industry / Category"}
                  </label>
                  <input
                    type="text"
                    placeholder={isRtl ? "مثال: السيارات، التجهيزات الفندقية، الإنشاءات" : "e.g., Automotive, Hospitality, Niche Industrial, Construction"}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-accent-gold/30 focus:border-accent-gold transition-all"
                  />
                </div>
                <div className="text-start">
                  <label className="block text-sm font-bold text-accent-gold mb-2">
                    {isRtl ? "مستوى الاستعجال" : "Urgency Level"}
                  </label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-gold/30 focus:border-accent-gold transition-all appearance-none cursor-pointer">
                    <option className="bg-primary-navy" value="standard">{isRtl ? "بحث وتوريد قياسي" : "Standard Sourcing"}</option>
                    <option className="bg-primary-navy" value="emergency">{isRtl ? "بحث طارئ عن مورد بديل" : "Emergency Alternative Search"}</option>
                  </select>
                </div>
              </div>

              <div className="text-start">
                <label className="block text-sm font-bold text-accent-gold mb-2">
                  {isRtl ? "مواصفات المنتج" : "Product Specification"}
                </label>
                <textarea
                  rows={4}
                  placeholder={isRtl ? "وصف دقيق للمنتج أو أرقام الموديلات المطلوبة" : "Detailed description or specific model numbers required"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-accent-gold/30 focus:border-accent-gold transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-start">
                  <label className="block text-sm font-bold text-accent-gold mb-2">
                    {isRtl ? "حجم الطلب التقديري" : "Estimated Volume"}
                  </label>
                  <input
                    type="text"
                    placeholder={isRtl ? "نموذج أولي، دفعة تجريبية، أو إنتاج كامل" : "Prototype, Trial Batch, or Full-Scale Production"}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-accent-gold/30 focus:border-accent-gold transition-all"
                  />
                </div>
                <div className="text-start">
                  <label className="block text-sm font-bold text-accent-gold mb-2">
                    {isRtl ? "معايير المطابقة" : "Compliance Standards"}
                  </label>
                  <input
                    type="text"
                    placeholder={isRtl ? "مثال: SASO، CE، UL، أو مواصفات ISO" : "e.g., CE, SASO, UL, or ISO requirements"}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-accent-gold/30 focus:border-accent-gold transition-all"
                  />
                </div>
              </div>

              <div className="text-start">
                <label className="block text-sm font-bold text-accent-gold mb-2">
                  {isRtl ? "المرفقات الفنية" : "Technical Attachments"}
                </label>
                <div className="w-full border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-accent-gold/30 transition-all cursor-pointer group hover:bg-white/5">
                  <Upload className="w-8 h-8 text-white/30 group-hover:text-accent-gold transition-colors mb-4" />
                  <p className="text-white/70 text-sm mb-1 text-center font-semibold">
                    {isRtl ? "تحميل المخططات الهندسية (CAD/PDF)" : "Upload Technical Drawings (CAD/PDF)"}
                  </p>
                  <p className="text-white/40 text-xs text-center">
                    {isRtl ? "مواصفات المواد، أو أدلة الهوية البصرية" : "Material Specs, or Brand Guidelines"}
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  className="w-full bg-accent-gold text-primary-navy font-bold py-5 rounded-2xl hover:bg-white transition-all transform hover:scale-[1.01] shadow-xl text-lg flex items-center justify-center active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5" />
                    <span>{isRtl ? "إرسال طلب التوريد المخصص" : "Submit Custom Sourcing Inquiry"}</span>
                  </div>
                </button>
              </div>
            </form>
          </section>
        </div>

      </div>
    </main>
  );
}

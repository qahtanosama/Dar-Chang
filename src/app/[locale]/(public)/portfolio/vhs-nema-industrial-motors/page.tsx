import Image from 'next/image';
import { Metadata } from "next";
import { CheckCircle2, Zap } from "lucide-react";

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale;
  if (locale === "ar") {
    return {
      title: "محركات VHS الصناعية NEMA | خدمات التوريد والمعدات الصناعية",
      description: "محركات VHS الصناعية العمودية بمعيار NEMA – مثالية لتطبيقات الضخ الثقيلة. بجهد 380/660 فولت، عزل فئة C، وتبريد مزدوج. قدرات من 150 إلى 500 حصان. ضمان 18 شهراً.",
      keywords: ["محركات VHS", "محركات كهربائية صناعية", "NEMA", "محركات ضخ", "محركات عمود مجوف", "محركات ثلاثي الأوجه", "1750 RPM", "تبريد زيت مزدوج", "محركات 150 حصان", "محركات 500 حصان"],
    };
  }

  return {
    title: "Industrial NEMA Standard VHS Motors | Dar Chang",
    description: "High-performance Vertical Hollow Shaft (VHS) pumping solutions built to NEMA standards. Discover our custom double-oil cooled industrial motors with Class C insulation.",
    keywords: ["NEMA motors", "VHS motors", "Vertical Hollow Shaft", "industrial motors", "pumping solutions", "Class C insulation", "Shanghai sourcing", "heavy duty motor"],
  };
}

export default function MotorsPage() {

  return (
    <main className="min-h-screen pt-32 pb-24 bg-bg-neutral">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary-navy highlight-border">
          <span className="block rtl:hidden">Electrical & Motors</span>
          <span className="hidden rtl:block">الكهرباء والمحركات</span>
        </h1>
        <div className="prose lg:prose-xl mb-16 max-w-3xl text-text-main">
          <p>
            <span className="block rtl:hidden">
              Specializing in industrial-grade electrical components and NEMA standard motors.
            </span>
            <span className="hidden rtl:block">
              متخصصون في المكونات الكهربائية الصناعية ومحركات NEMA القياسية.
            </span>
          </p>
        </div>

        {/* English Detailed Content */}
        <div className="block rtl:hidden space-y-16">
          <section className="bg-white p-8 md:p-12 rounded-3xl border border-border-subtle shadow-sm">
            <h2 className="text-3xl font-bold text-primary-navy mb-6">
              Industrial NEMA Standard Vertical Hollow Shaft (VHS) Motors
            </h2>
            <p className="text-lg text-text-main mb-8 leading-relaxed">
              <strong>High-Performance Pumping Solutions | Robust Construction | Custom Cooling</strong><br /><br />
              These high-performance industrial motors are specifically engineered for demanding pumping applications. Built to NEMA standards, our VHS motors feature a robust architecture and specialized double-oil cooling systems to ensure maximum uptime in high-ambient environments.
            </p>

            <h3 className="text-2xl font-bold text-primary-navy mb-6">Core Technical Specifications</h3>
            <div className="overflow-hidden mb-12 rounded-xl border border-border-subtle shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary-navy text-white">
                    <th className="p-4 font-bold border-b border-primary-navy/20">Feature</th>
                    <th className="p-4 font-bold border-b border-primary-navy/20">Details</th>
                  </tr>
                </thead>
                <tbody className="text-text-main bg-white">
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Voltage</td>
                    <td className="p-4">380/660V</td>
                  </tr>
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Frequency / Phase</td>
                    <td className="p-4">60Hz / 3-Phase</td>
                  </tr>
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Operational Speed</td>
                    <td className="p-4">1750 RPM</td>
                  </tr>
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Enclosure Type</td>
                    <td className="p-4">IP23 (WP1)</td>
                  </tr>
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Insulation Class</td>
                    <td className="p-4"><span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-bold">Class C</span> (High-temp resistant)</td>
                  </tr>
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Service Factor</td>
                    <td className="p-4">1.15</td>
                  </tr>
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Cooling System</td>
                    <td className="p-4">Integrated Double Oil Cooler</td>
                  </tr>
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Bearing Config.</td>
                    <td className="p-4">3 Bearings (Premium TMB Brand)</td>
                  </tr>
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Ambient Rating</td>
                    <td className="p-4">Rated for extreme heat up to 50&deg;C</td>
                  </tr>
                  <tr className="hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">Finish</td>
                    <td className="p-4">Standard Blue (RAL5002) or customized</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-primary-navy mb-4">Model Selection & Industrial Frame Sizes</h3>
                <p className="text-text-main mb-6">
                  We offer a versatile range of power outputs to meet diverse industrial and agricultural requirements:
                </p>
                <div className="space-y-4 text-text-main mt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-bg-neutral border border-border-subtle hover:border-accent-gold transition-colors">
                    <span className="bg-primary-navy text-white px-4 py-3 rounded-lg font-bold w-full sm:w-auto text-center shrink-0">150 HP</span>
                    <span className="font-medium">Frame Series 444TP - 449TP</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-bg-neutral border border-border-subtle hover:border-accent-gold transition-colors">
                    <span className="bg-primary-navy text-white px-4 py-3 rounded-lg font-bold w-full sm:w-auto text-center shrink-0">250 HP</span>
                    <span className="font-medium">Frame 445TP</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-bg-neutral border border-border-subtle hover:border-accent-gold transition-colors">
                    <span className="bg-primary-navy text-white px-4 py-3 rounded-lg font-bold w-full sm:w-auto text-center shrink-0">300-350 HP</span>
                    <span className="font-medium">Frame 5006P</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-bg-neutral border border-border-subtle hover:border-accent-gold transition-colors">
                    <span className="bg-primary-navy text-white px-4 py-3 rounded-lg font-bold w-full sm:w-auto text-center shrink-0">400-500 HP</span>
                    <span className="font-medium">Frame Series 5006P - 5008P</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary-navy mb-4">Superior Thermal Endurance</h3>
                <p className="text-text-main leading-relaxed">
                  While standard industrial guidelines typically reference Class H insulation, our units are specifically engineered with <strong>Class C insulation</strong>. This provides superior durability and performance stability in high-heat environments compared to standard Class A, B, or F ratings.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-border-subtle">
              <h3 className="text-2xl font-bold text-primary-navy mb-6">Sourcing & Logistics Excellence</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle hover:border-accent-gold transition-colors">
                  <h4 className="font-bold text-primary-navy mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    Proven Origin
                  </h4>
                  <p className="text-text-main text-sm leading-relaxed">Direct sourcing from Shanghai, China, ensuring competitive lead times.</p>
                </div>
                <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle hover:border-accent-gold transition-colors">
                  <h4 className="font-bold text-primary-navy mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    Heavy-Duty Packaging
                  </h4>
                  <p className="text-text-main text-sm leading-relaxed">All units are shipped in secure wooden crates to prevent transit damage.</p>
                </div>
                <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle hover:border-accent-gold transition-colors">
                  <h4 className="font-bold text-primary-navy mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    Extended Protection
                  </h4>
                  <p className="text-text-main text-sm leading-relaxed">Each motor is backed by an 18-month warranty from the date of delivery.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Arabic Detailed Content */}
        <div className="hidden rtl:block space-y-16">
          <section className="bg-white p-8 md:p-12 rounded-3xl border border-border-subtle shadow-sm">
            <h2 className="text-3xl font-bold text-primary-navy mb-6">
              محركات VHS الصناعية العمودية ذات العمود المجوف – معيار NEMA
            </h2>
            <p className="text-lg text-text-main mb-8 leading-relaxed">
              <strong>حلول ضخ عالية الأداء | بنية متينة | تبريد مخصص</strong><br /><br />
              صُمِّمت هذه المحركات الصناعية عالية الأداء خصيصاً للتطبيقات المتطلبة في مجال الضخ. مبنية وفق معايير NEMA، وتتميز محركات VHS لدينا بهيكل متين وأنظمة تبريد بزيت مزدوج لضمان أقصى وقت تشغيل في البيئات ذات الحرارة العالية.
            </p>

            <h3 className="text-2xl font-bold text-primary-navy mb-6">المواصفات التقنية الأساسية</h3>
            <div className="overflow-hidden mb-12 rounded-xl border border-border-subtle shadow-sm">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-primary-navy text-white">
                    <th className="p-4 font-bold border-b border-primary-navy/20">المواصفة</th>
                    <th className="p-4 font-bold border-b border-primary-navy/20">التفاصيل</th>
                  </tr>
                </thead>
                <tbody className="text-text-main bg-white">
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">الجهد الكهربائي</td>
                    <td className="p-4">380/660 فولت</td>
                  </tr>
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">التردد / الأوجه</td>
                    <td className="p-4">60 هرتز / ثلاثي الأوجه</td>
                  </tr>
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">سرعة التشغيل</td>
                    <td className="p-4">1750 دورة في الدقيقة</td>
                  </tr>
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">نوع الحماية</td>
                    <td className="p-4">IP23 (WP1)</td>
                  </tr>
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">فئة العزل</td>
                    <td className="p-4"><span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-bold">الفئة C</span> (مقاومة للحرارة العالية)</td>
                  </tr>
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">معامل الخدمة</td>
                    <td className="p-4">1.15</td>
                  </tr>
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">نظام التبريد</td>
                    <td className="p-4">مبرد زيت مزدوج متكامل</td>
                  </tr>
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">تكوين المحامل</td>
                    <td className="p-4">3 محامل (ماركة TMB Premium)</td>
                  </tr>
                  <tr className="border-b border-border-subtle hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">التقييم البيئي</td>
                    <td className="p-4">مصنّف للحرارة الشديدة حتى 50 درجة مئوية</td>
                  </tr>
                  <tr className="hover:bg-bg-neutral transition-colors">
                    <td className="p-4 font-bold text-primary-navy bg-bg-neutral/50">اللون</td>
                    <td className="p-4">أزرق قياسي (RAL5002) أو مخصص بالكامل</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-primary-navy mb-4">اختيار الموديل وأحجام الإطار الصناعي</h3>
                <p className="text-text-main mb-6">
                  نقدم مجموعة متنوعة من قدرات الطاقة لتلبية المتطلبات الصناعية والزراعية المتنوعة:
                </p>
                <div className="space-y-4 text-text-main mt-4" dir="rtl">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-bg-neutral border border-border-subtle hover:border-accent-gold transition-colors">
                    <span className="bg-primary-navy text-white px-4 py-3 rounded-lg font-bold w-full sm:w-auto text-center shrink-0">150 حصان</span>
                    <span className="font-medium">سلسلة الإطار 444TP – 449TP</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-bg-neutral border border-border-subtle hover:border-accent-gold transition-colors">
                    <span className="bg-primary-navy text-white px-4 py-3 rounded-lg font-bold w-full sm:w-auto text-center shrink-0">250 حصان</span>
                    <span className="font-medium">الإطار 445TP</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-bg-neutral border border-border-subtle hover:border-accent-gold transition-colors">
                    <span className="bg-primary-navy text-white px-4 py-3 rounded-lg font-bold w-full sm:w-auto text-center shrink-0">300-350 حصان</span>
                    <span className="font-medium">الإطار 5006P</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-bg-neutral border border-border-subtle hover:border-accent-gold transition-colors">
                    <span className="bg-primary-navy text-white px-4 py-3 rounded-lg font-bold w-full sm:w-auto text-center shrink-0">400-500 حصان</span>
                    <span className="font-medium">سلسلة الإطار 5006P – 5008P</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary-navy mb-4">تحمّل حراري متفوق</h3>
                <p className="text-text-main leading-relaxed">
                  بينما تستخدم المعايير الصناعية القياسية عادةً عزل الفئة H، فإن وحداتنا مصممة خصيصاً بـ <strong>عزل الفئة C</strong>، مما يوفر متانة أعلى وثباتاً في الأداء في البيئات شديدة الحرارة مقارنةً بتصنيفات الفئات A أو B أو F القياسية.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-border-subtle">
              <h3 className="text-2xl font-bold text-primary-navy mb-6">التوريد والتميز اللوجستي</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle hover:border-accent-gold transition-colors">
                  <h4 className="font-bold text-primary-navy mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    مصدر موثوق
                  </h4>
                  <p className="text-text-main text-sm leading-relaxed">توريد مباشر من شنغهاي، الصين، مما يضمن مواعيد تسليم تنافسية.</p>
                </div>
                <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle hover:border-accent-gold transition-colors">
                  <h4 className="font-bold text-primary-navy mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    تغليف متين
                  </h4>
                  <p className="text-text-main text-sm leading-relaxed">يتم شحن جميع الوحدات في صناديق خشبية مقاومة لمنع التلف أثناء النقل.</p>
                </div>
                <div className="p-6 bg-bg-neutral rounded-xl border border-border-subtle hover:border-accent-gold transition-colors">
                  <h4 className="font-bold text-primary-navy mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    حماية ممتدة
                  </h4>
                  <p className="text-text-main text-sm leading-relaxed">كل محرك مشمول بضمان 18 شهراً من تاريخ التسليم.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

import Image from 'next/image';
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Tractor, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const locale = (await props.params).locale;
  if (locale === 'ar') {
    return {
      title: "توريد المعدات الثقيلة | حفارات وشيولات وبلدوزرات | دار تشانغ",
      description: "نورد ونفحص أفضل معدات الحفروالبناء من Caterpillar وKomatsu وSANY و غيرها. تحقق شامل وعقود توريد معتمدة.",
      keywords: ["توريد معدات ثقيلة", "حفارات", "بلدوزرات", "شيولات", "صينية"],
    };
  }
  return {
    title: "Heavy Machinery Sourcing | Excavators, Bulldozers & Loaders | Dar Chang",
    description: "We source and inspect top-brand heavy machinery from Caterpillar, Komatsu, SANY and more. Full pre-shipment verification and signed sourcing contracts.",
    keywords: ["heavy machinery China", "excavator sourcing", "bulldozer supplier", "wheel loader", "Caterpillar China", "Komatsu sourcing"],
  };
}

export default function MachineryPage() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <main className="min-h-screen pt-32 pb-24 bg-bg-neutral">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-text-main hover:text-accent-gold transition-colors text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            {isRtl ? "العودة إلى المنتجات" : "Back to Products"}
          </Link>
        </div>

        {!isRtl ? (
          // Rich English Content Layout
          <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 border border-border-subtle shadow-sm">
            <div className="flex flex-col items-center md:items-start text-center md:text-left mb-12">
              <div className="w-20 h-20 bg-bg-neutral rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                <Tractor className="w-10 h-10 text-accent-gold" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-4 leading-tight">
                Heavy Machinery Procurement
              </h1>
              <h2 className="text-xl md:text-2xl text-accent-gold font-semibold mb-6">
                Earthmoving | Excavation | Road Construction | Tier-1 Global Brands
              </h2>
              <p className="text-lg text-text-main leading-relaxed max-w-4xl text-left">
                We provide a specialized sourcing and operational bridge for heavy equipment, offering both factory-new units and pre-owned machinery vetted for quality. Our process is designed to allow your engineers full access for inspection, ensuring every piece of equipment meets your project's technical and safety standards.
              </p>
            </div>



            <div className="mt-12 mb-16">
              <h3 className="text-2xl font-bold text-primary-navy mb-8">Equipment Portfolio</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    href: '/portfolio/machinery/excavators',
                    title: 'Excavators',
                    desc: 'High-performance units for extreme conditions.'
                  },
                  {
                    href: '/portfolio/machinery/wheel-loaders',
                    title: 'Wheel Loaders',
                    desc: 'Robust loaders for large-scale logistics.'
                  },
                  {
                    href: '/portfolio/machinery/bulldozers',
                    title: 'Bulldozers',
                    desc: 'Heavy-duty pushing power for land clearing.'
                  },
                  {
                    href: '/portfolio/machinery/motor-graders',
                    title: 'Motor Graders',
                    desc: 'Precision equipment for road construction.'
                  },
                  {
                    href: '/portfolio/machinery/backhoe-loaders',
                    title: 'Backhoe Loaders',
                    desc: 'Multi-functional units for urban projects.'
                  }
                ].map((item, index) => (
                  <Link key={index} href={item.href} className="group flex flex-col items-center bg-white rounded-3xl border border-border-subtle p-8 hover:shadow-lg transition-all hover:border-accent-gold cursor-pointer h-full">
                    <div className="w-20 h-20 bg-bg-neutral rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Tractor className="w-10 h-10 text-primary-navy group-hover:text-accent-gold transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-navy mb-4 group-hover:text-accent-gold transition-colors text-center">{item.title}</h3>
                    <p className="text-text-main text-base text-center flex-grow mb-8 leading-relaxed max-w-xs">{item.desc}</p>
                    <div className="mt-auto flex items-center justify-center text-accent-gold font-bold text-sm gap-2">
                      View Details
                      <ArrowLeft className="w-4 h-4 rtl:rotate-180 rotate-180" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-border-subtle pt-12 grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
              {/* Column 1: New Equipment Sourcing */}
              <div>
                <h3 className="text-2xl font-bold text-primary-navy mb-6">New Equipment Sourcing</h3>
                <p className="text-text-main mb-6">We ensure a seamless direct procurement experience:</p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-text-main"><strong>Direct Procurement:</strong> Factory-direct sourcing from Tier-1 global brands.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-text-main"><strong>Full Documentation:</strong> Registration, warranties, and regional compliance guaranteed before shipping.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-text-main"><strong>Custom Modifications:</strong> Factory-level attachments and specialized technical configurations.</span>
                  </li>
                </ul>
              </div>

              {/* Column 2: Used Equipment Engineering Inspection */}
              <div>
                <h3 className="text-2xl font-bold text-primary-navy mb-6 text-accent-gold">On-Ground Engineering Audit</h3>
                <p className="text-text-main leading-relaxed mb-6">
                  Buying used equipment from China is a gamble without boots on the ground; we remove the uncertainty and protect your capital.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-text-main"><strong>Hybrid Expert Team:</strong> Our Chinese and international engineers bridge the gap between local market secrets and your global quality standards.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-text-main"><strong>Beyond the Surface:</strong> We don’t just look at the paint; we verify real engine hours and trace hidden maintenance history to find defects before you pay.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-text-main"><strong>Zero-Risk Policy:</strong> We act as your final filter; if the machine isn't field-ready, we reject the deal to ensure you don't get stuck with a "lemon".</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-20 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-text-main font-semibold">Ready to source heavy machinery for your next project?</p>
              <Link
                href="/quote"
                className="btn-primary"
              >
                Request a Machinery Quote
              </Link>
            </div>
          </div>
        ) : (
          // Rich Arabic Content Layout
          <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 border border-border-subtle shadow-sm" dir="rtl">
            <div className="flex flex-col items-center md:items-start text-center md:text-right mb-12">
              <div className="w-20 h-20 bg-bg-neutral rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                <Tractor className="w-10 h-10 text-accent-gold" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy mb-4 leading-tight">
                خدمات توريد وفحص المعدات الثقيلة
              </h1>
              <h2 className="text-xl md:text-2xl text-accent-gold font-semibold mb-6">
                أجهزة الحفر | الحفريات | إنشاء الطرق | العلامات التجارية العالمية من الدرجة الأولى
              </h2>
              <p className="text-lg text-text-main leading-relaxed max-w-4xl text-right">
                نقدم جسراً متخصصاً للتوريد والتشغيل للمعدات الثقيلة، ونوفر وحدات جديدة من المصنع ومعدات مستعملة خضعت لفحص الجودة. تتيح عمليتنا لمهندسيكم الوصول الكامل لإجراء الفحوصات، مما يضمن أن كل قطعة تستوفي المعايير التقنية ومتطلبات السلامة لمشروعكم.
              </p>
            </div>

            <div className="mt-12 mb-16">
              <h3 className="text-2xl font-bold text-primary-navy mb-8">محفظة المعدات</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Array of Arabic Machinery Categories */}
                {[
                  {
                    href: '/portfolio/machinery/excavators',
                    title: 'الحفارات',
                    desc: 'حفارات عالية الأداء مختارة للموثوقية في الظروف القاسية.'
                  },
                  {
                    href: '/portfolio/machinery/wheel-loaders',
                    title: 'الشيولات',
                    desc: 'لوادر متينة للوجستيات الضخمة وتجهيز المواقع.'
                  },
                  {
                    href: '/portfolio/machinery/bulldozers',
                    title: 'البلدوزرات',
                    desc: 'معدات دقيقة للتسوية والدفع الثقيل لتنظيف الأراضي.'
                  },
                  {
                    href: '/portfolio/machinery/motor-graders',
                    title: 'الجريدرات',
                    desc: 'معدات دقيقة للتسوية وإنشاء الطرق.'
                  },
                  {
                    href: '/portfolio/machinery/backhoe-loaders',
                    title: 'اللوادر الحفارة',
                    desc: 'وحدات متعددة الوظائف للمشاريع الحضرية.'
                  }
                ].map((item, index) => (
                  <Link key={index} href={item.href} className="group flex flex-col items-center bg-white rounded-3xl border border-border-subtle p-8 hover:shadow-lg transition-all hover:border-accent-gold cursor-pointer h-full">
                    <div className="w-20 h-20 bg-bg-neutral rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Tractor className="w-10 h-10 text-primary-navy group-hover:text-accent-gold transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-navy mb-4 group-hover:text-accent-gold transition-colors text-center">{item.title}</h3>
                    <p className="text-text-main text-base text-center flex-grow mb-8 leading-relaxed max-w-xs">{item.desc}</p>
                    <div className="mt-auto flex items-center justify-center text-accent-gold font-bold text-sm gap-2">
                      <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                      عرض المزيد
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-border-subtle pt-12 grid grid-cols-1 md:grid-cols-2 gap-12 text-right">
              {/* Column 1: New Equipment */}
              <div>
                <h3 className="text-2xl font-bold text-primary-navy mb-6">توريد المعدات الجديدة</h3>
                <p className="text-text-main mb-6">ندير عملية شراء مباشرة تتسم بالسلاسة:</p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-text-main"><strong>الشراء المباشر:</strong> التوريد المباشر من المصانع لأفضل العلامات التجارية العالمية.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-text-main"><strong>توثيق كامل:</strong> ضمان استيفاء شروط التسجيل والامتثال قبل الشحن.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-text-main"><strong>تعديلات مخصصة:</strong> مرفقات المصنع والتهيئات التقنية المتخصصة.</span>
                  </li>
                </ul>
              </div>

              {/* Column 2: Used Equipment */}
              <div>
                <h3 className="text-2xl font-bold text-primary-navy mb-6 text-accent-gold">الفحص الهندسي الميداني</h3>
                <p className="text-text-main leading-relaxed mb-6">
                  شراء المعدات المستعملة من الصين "مخاطرة" إذا لم تكن هناك؛ نحن ننهي هذه المخاطرة ونضمن لك الحصول على القيمة التي تدفع مقابلها.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-text-main"><strong>فريق هجين (صيني وأجنبي):</strong> مهندسون محليون يعرفون خفايا السوق الصيني، ومهندسون دوليون يفهمون معايير الجودة التي تطلبها بلغتكم الخاصة.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-text-main"><strong>كشف "المستور" تقنياً:</strong> لا نكتفي بالشكل الخارجي؛ نفحص عدادات الساعات الحقيقية، وندقق في سجلات الصيانة المخفية للتأكد من أن المعدة لم يتم التلاعب بها.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-text-main"><strong>قرارنا يحمي مالك:</strong> نحن نلعب دور "الفلتر"؛ إذا كانت المعدة غير صالحة للعمل، نخبرك بالرفض فوراً لنتجنب معاً صفقة خاسرة ترهق ميزانيتك.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-20 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-text-main font-semibold">جاهز لتوريد المعدات الثقيلة لمشروعك القادم؟</p>
              <Link
                href="/quote"
                className="btn-primary"
              >
                طلب عرض سعر
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

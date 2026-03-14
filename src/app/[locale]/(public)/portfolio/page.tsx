import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Zap, Tractor, Factory, Armchair, Puzzle } from "lucide-react";
import Head from "next/head";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const locale = (await props.params).locale;
  if (locale === 'ar') {
    return {
      title: "محفظتنا | دار تشانغ — معدات ثقيلة، خطوط إنتاج، وأكثر",
      description: "استكشف محفظتنا: معدات ثقيلة، محركات VHS، خطوط إنتاج، وتوريد أثاث فندقي — مدعوم بحضور ميداني في شنغهاي.",
      keywords: ["محفظة دار تشانغ", "معدات ثقيلة", "خطوط الإنتاج", "محركات VHS", "توريد أثاث فندقي"],
      openGraph: { title: "محفظتنا | دار تشانغ", description: "معدات ثقيلة، محركات VHS، خطوط إنتاج، وأثاث فندقي.", url: "https://www.darchang.com/ar/portfolio", locale: "ar_AE", type: "website", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "دار تشانغ — محفظة المنتجاتالصناعية" }] },
      twitter: { card: "summary_large_image", title: "محفظتنا | دار تشانغ", images: ["/og-image.png"] },
    };
  }
  return {
    title: "Our Portfolio | Dar Chang — Heavy Machinery, Production Lines & More",
    description: "Explore Dar Chang's portfolio: heavy machinery, VHS NEMA motors, industrial production lines, and hospitality FF&E sourcing — backed by on-the-ground expertise in Shanghai.",
    keywords: ["Dar Chang portfolio", "heavy machinery sourcing", "production lines", "VHS motors", "FF&E sourcing"],
    openGraph: { title: "Our Portfolio | Dar Chang", description: "Heavy machinery, VHS motors, production lines & FF&E from Shanghai.", url: "https://www.darchang.com/en/portfolio", locale: "en_US", type: "website", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Dar Chang — Industrial Portfolio" }] },
    twitter: { card: "summary_large_image", title: "Our Portfolio | Dar Chang", images: ["/og-image.png"] },
  };
}

export default function PortfolioHubPage() {
  const t = useTranslations("Navigation");

  const pillars = [
    {
      title: "Heavy Machine",
      title_ar: "المعدات الثقيلة",
      desc: "Excavators, Wheel Loaders, Bulldozers, and Graders from top global brands.",
      desc_ar: "الحفارات، الشيولات، البلدوزرات، ومعدات الرفع الثقيلة.",
      icon: <Tractor className="w-12 h-12 text-accent-gold" />,
      href: "/portfolio/machinery",
      bgImage: "/portfolio/machinery_bg.jpg",
    },
    {
      title: "Vertical Hollow Shaft (VHS) Motors",
      title_ar: "محركات المجوفة العمودية (VHS)",
      desc: "VHS Motors NEMA Standard, VFD Control Panels, and industrial integrations.",
      desc_ar: "محركات VHS القياسية المعتمدة ولوحات التحكم المتقدمة.",
      icon: <Zap className="w-12 h-12 text-accent-gold" />,
      href: "/portfolio/vhs-nema-industrial-motors",
      bgImage: "/portfolio/vhs-motor-industrial.jpg",
    },
    {
      title: "Production Line",
      title_ar: "خطوط الإنتاج",
      desc: "Comprehensive automated manufacturing systems tailored for efficiency.",
      desc_ar: "أنظمة تصنيع آلية شاملة مصممة لرفع الكفاءة والإنتاجية.",
      icon: <Factory className="w-12 h-12 text-accent-gold" />,
      href: "/portfolio/production-line",
      bgImage: "/portfolio/production_bg.png",
    },
    {
      title: "Turnkey Hospitality FF&E Sourcing",
      title_ar: "توريد الأثاث والمعدات الفندقية",
      desc: "Full-scale sourcing of Furniture, Fixtures & Equipment for hospitality projects.",
      desc_ar: "توريد شامل للأثاث والتجهيزات والمعدات لمشاريع الضيافة.",
      icon: <Armchair className="w-12 h-12 text-accent-gold" />,
      href: "/portfolio/hotel-furniture-procurement",
      bgImage: "/portfolio/hospitality_bg.jpg",
    },
    {
      title: "Custom Procurement & Special Requests",
      title_ar: "طلبات التوريد الخاصة والمخصصة",
      desc: "Niche industrial sourcing, bespoke commercial goods, and verified alternative suppliers.",
      desc_ar: "القطع الصناعية النادرة، المنتجات التجارية المخصصة، والبحث عن بدائل معتمدة.",
      icon: <Puzzle className="w-12 h-12 text-accent-gold" />,
      href: "/portfolio/custom",
      bgImage: "/portfolio/custom_bg.png",
    },
  ];

  // AEO: Injecting Structured Data directly into the Head for the Products Page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Dar Chang Product Categories",
    "description": "Our core sourcing domains: Heavy Machinery, VHS Motors, Production Lines, and FF&E.",
    "itemListElement": pillars.map((pillar, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": pillar.title,
        "description": pillar.desc,
        "url": `https://www.darchang.com${pillar.href}`
      }
    }))
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <main className="min-h-screen pt-32 pb-24 bg-bg-neutral">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto highlight-border">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-navy mb-6">
              {t("portfolio")}
            </h1>
            <p className="text-text-main text-lg">
              <span className="block rtl:hidden">
                Explore our domains of expertise. Each pillar represents hundreds of
                successful audits, rigorous quality control processes, and seamless
                logistics deliveries worldwide.
              </span>
              <span className="hidden rtl:block">
                استكشف مجالات خبرتنا. يمثل كل قسم مئات عمليات التدقيق الناجحة، وعمليات مراقبة الجودة الصارمة، وعمليات التسليم اللوجستية السلسة في جميع أنحاء العالم.
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {pillars.map((pillar, idx) => (
              <Link
                key={idx}
                href={pillar.href}
                className="group relative bg-transparent lg:bg-white rounded-2xl p-8 border border-white/20 lg:border-border-subtle hover:border-accent-gold transition-all duration-500 overflow-hidden shadow-md lg:shadow-sm flex flex-col items-center text-center"
              >
                {/* Background Image Reveal - Visible on Mobile, Hover on Desktop */}
                <div className="absolute inset-0 z-0 overflow-hidden opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
                  <Image
                    src={pillar.bgImage}
                    alt={pillar.title}
                    fill
                    priority={idx < 2}
                    loading={idx < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover scale-100 lg:scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/60 lg:bg-white/20 group-hover:bg-black/60 transition-colors duration-700" />
                </div>

                <div className="content-reveal-overlay absolute inset-0 bg-transparent lg:bg-white z-10 hidden lg:block group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-20 flex flex-col items-center">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-500 bg-white/10 lg:bg-transparent p-3 lg:p-0 rounded-2xl backdrop-blur-md lg:backdrop-blur-none border border-white/10 lg:border-transparent inline-flex items-center justify-center shadow-lg lg:shadow-none">{pillar.icon}</div>
                  <h2 className="text-xl font-bold text-white lg:text-primary-navy mb-3 group-hover:text-white transition-colors duration-500 leading-snug drop-shadow-md lg:drop-shadow-none">
                    <span className="block rtl:hidden">{pillar.title}</span>
                    <span className="hidden rtl:block">{pillar.title_ar}</span>
                  </h2>
                  <p className="text-gray-200 lg:text-text-main text-sm leading-relaxed max-w-xs group-hover:text-gray-100 transition-colors duration-500 drop-shadow-md lg:drop-shadow-none">
                    <span className="block rtl:hidden">{pillar.desc}</span>
                    <span className="hidden rtl:block">{pillar.desc_ar}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}


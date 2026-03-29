export const revalidate = 60;

import { HeroBanner } from "@/components/sections/HeroBanner";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ProcessWorkflow } from "@/components/sections/ProcessWorkflow";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const locale = (await props.params).locale;
  const BASE = 'https://www.darchangglobal.com'
  if (locale === 'ar') {
    return {
      title: "دار تشانغ | شريكك الموثوق للتوريد والتصنيع من الصين",
      description: "نربط المشترين الدوليين بأفضل المصانع الصينية. نختص في المعدات الثقيلة، خطوط الإنتاج، المحركات الصناعية، وتوريد الأثاث الفندقي — بحضور ميداني في شنغهاي.",
      keywords: ["توريد من الصين", "معدات ثقيلة", "خطوط إنتاج", "شنغهاي", "دار تشانغ"],
      openGraph: {
        title: "دار تشانغ | شريكك الموثوق للتوريد والتصنيع من الصين",
        description: "نربط المشترين الدوليين بأفضل المصانع الصينية. بحضور ميداني في شنغهاي.",
        url: `${BASE}/ar`,
        siteName: "دار تشانغ العالمية",
        locale: 'ar_SA',
        type: 'website',
        images: [{ url: `${BASE}/hero-poster.png`, width: 1200, height: 630, alt: 'دار تشانغ — توريد من الصين' }],
      },
      twitter: { card: 'summary_large_image', title: "دار تشانغ | التوريد من الصين", images: [`${BASE}/hero-poster.png`] },
    };
  }
  return {
    title: "Dar Chang | Your Trusted China Sourcing & Manufacturing Partner",
    description: "We bridge international buyers with top-tier Chinese factories. Specializing in heavy machinery, production lines, VHS motors, and FF&E — with boots on the ground in Shanghai.",
    keywords: ["China sourcing", "heavy machinery", "production lines", "Shanghai procurement", "Dar Chang"],
    openGraph: {
      title: "Dar Chang | Your Trusted China Sourcing & Manufacturing Partner",
      description: "We bridge international buyers with top-tier Chinese factories — boots on the ground in Shanghai.",
      url: `${BASE}/en`,
      siteName: "Dar Chang Global",
      locale: 'en_US',
      type: 'website',
      images: [{ url: `${BASE}/hero-poster.png`, width: 1200, height: 630, alt: 'Dar Chang — China Sourcing Partner' }],
    },
    twitter: { card: 'summary_large_image', title: "Dar Chang | China Sourcing Partner", images: [`${BASE}/hero-poster.png`] },
  };
}

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
  const locale = (await props.params).locale ?? 'en'
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" }});

  // AEO: Injecting Structured Data directly into the Head for the Home Page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dar Chang | دار تشانغ",
    url: "https://www.darchangglobal.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.darchangglobal.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Dar Chang Consulting Management Co., Ltd.",
      alternateName: "达尔畅咨询管理有限公司",
      logo: "https://www.darchangglobal.com/logo.png",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* LCP Optimization: Preload the hero video/image */}
      <link
        rel="preload"
        as="image"
        href="/hero-poster.png"
        fetchPriority="high"
      />
      <main className="relative block min-h-screen">
        <HeroBanner heroVideoUrl={settings?.heroVideoUrl} />
        <ServicesOverview />
        <PortfolioSection />
        <ProcessWorkflow />
        <ImpactStats />
        <TestimonialsSection locale={locale} />
      </main>
    </>
  );
}

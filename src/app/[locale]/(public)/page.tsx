import { HeroBanner } from "@/components/sections/HeroBanner";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ProcessWorkflow } from "@/components/sections/ProcessWorkflow";
import Head from "next/head";
import { Metadata } from "next";

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const locale = (await props.params).locale;
  if (locale === 'ar') {
    return {
      title: "دار تشانغ | شريكك الموثوق للتوريد والتصنيع من الصين",
      description: "نربط المشترين الدوليين بأفضل المصانع الصينية. نختص في المعدات الثقيلة، خطوط الإنتاج، المحركات الصناعية، وتوريد الأثاث الفندقي — بحضور ميداني في شنغهاي.",
      keywords: ["توريد من الصين", "معدات ثقيلة", "خطوط إنتاج", "شنغهاي", "دار تشانغ"],
    };
  }
  return {
    title: "Dar Chang | Your Trusted China Sourcing & Manufacturing Partner",
    description: "We bridge international buyers with top-tier Chinese factories. Specializing in heavy machinery, production lines, VHS motors, and FF&E — with boots on the ground in Shanghai.",
    keywords: ["China sourcing", "heavy machinery", "production lines", "Shanghai procurement", "Dar Chang"],
  };
}

export default function HomePage() {

  // AEO: Injecting Structured Data directly into the Head for the Home Page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dar Chang | دار تشانغ",
    url: "https://www.darchang.com", // Replace with actual domain
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.darchang.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Dar Chang Consulting Management Co., Ltd.",
      alternateName: "达尔畅咨询管理有限公司",
      logo: "https://www.darchang.com/logo.png",
    },
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* LCP Optimization: Preload the hero video/image */}
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1586528116311-ad8ed7c663ba?q=80&w=2070&auto=format&fit=crop"
        />
      </Head>
      <main className="relative block min-h-screen">
        <HeroBanner />
        <ServicesOverview />
        <PortfolioSection />
        <ProcessWorkflow />
      </main>
    </>
  );
}

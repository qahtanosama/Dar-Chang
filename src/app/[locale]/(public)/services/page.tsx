export const revalidate = 60;

import { useTranslations } from "next-intl";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { Metadata } from "next";

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const locale = (await props.params).locale;
  if (locale === 'ar') {
    return {
      title: "خدماتنا | دار تشانغ — التوريد، الفحص، واللوجستيات",
      description: "نقدم خدمات توريد استراتيجية، فحص مصانع، رقابة جودة، وإدارة لوجستيات شاملة من شنغهاي.",
      keywords: ["خدمات توريد", "فحص المصانع", "رقابة الجودة", "لوجستيات شنغهاي"],
      openGraph: { title: "خدماتنا | دار تشانغ", description: "توريد، فحص، رقابة جودة، ولوجستيات متكاملة.", url: "https://www.darchangglobal.com/ar/services", locale: "ar_AE", type: "website", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "دار تشانغ — خدمات التوريد" }] },
      twitter: { card: "summary_large_image", title: "خدماتنا | دار تشانغ", images: ["/og-image.png"] },
    };
  }
  return {
    title: "Our Services | Dar Chang — Sourcing, Inspection & Logistics",
    description: "We provide strategic sourcing, factory inspection, quality control, and end-to-end logistics management from Shanghai.",
    keywords: ["sourcing services", "factory inspection", "quality control", "Shanghai logistics", "China procurement"],
    openGraph: { title: "Our Services | Dar Chang", description: "Strategic sourcing, factory inspection, quality control & logistics from Shanghai.", url: "https://www.darchangglobal.com/en/services", locale: "en_US", type: "website", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Dar Chang — Sourcing & Logistics Services" }] },
    twitter: { card: "summary_large_image", title: "Our Services | Dar Chang", images: ["/og-image.png"] },
  };
}

export default function ServicesPage() {
  const t = useTranslations("Navigation");

  return (
    <main className="min-h-screen pt-32 pb-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          {t("services")}
        </h1>
      </div>
      <ServicesOverview />
    </main>
  );
}

import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";

import "@fontsource/cairo/400.css";
import "@fontsource/cairo/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@/styles/globals.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });

  const siteUrl = "https://www.darchangglobal.com";
  const title = locale === "ar" ? "دار تشانغ جلوبال | مكتبك في الصين" : "Dar Chang Global | Your Office in China";
  const desc = t("HomePage.subtitle") || "Sourcing Without Worry, Results Without Borders. Leading industrial equipment and custom manufacturing procurement in China.";

  return {
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    title: {
      template: "%s | Dar Chang Global | دار تشانغ جلوبال",
      default: title,
    },
    description: desc,
    keywords: [
      "Sourcing China", "Dar Chang", "Heavy Machinery", "Industrial Motors", "GCC Import",
      "استيراد من الصين", "معدات ثقيلة", "دار تشانغ", "توريد من الصين", "B2B China Trading"
    ],
    authors: [{ name: "Dar Chang Global" }],
    creator: "Dar Chang Global",
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_AE" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_AE",
      url: siteUrl,
      title: title,
      description: desc,
      siteName: "Dar Chang Global | دار تشانغ جلوبال",
      images: settings?.ogImageUrl ? [
        {
          url: settings.ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Dar Chang — Industrial Sourcing & Procurement Partner from Shanghai",
        },
      ] : [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Dar Chang — Industrial Sourcing & Procurement Partner from Shanghai",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@DarChangCo",
      title: title,
      description: desc,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: settings?.faviconUrl
        ? [{ url: settings.faviconUrl }]
        : [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
          ],
      apple: '/apple-touch-icon.png',
      shortcut: settings?.faviconUrl || '/favicon.ico',
    }
  };
}

import AnalyticsAndConsent from "@/components/AnalyticsAndConsent";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const siteSettings = await prisma.siteSettings.findUnique({ where: { id: "global" } });

  // Providing all messages to the client side
  const messages = await getMessages();

  // Define layout direction
  const dir = locale === "ar" ? "rtl" : "ltr";
  // Use specialized font classes for tailwind depending on the locale
  const fontClass = locale === "ar" ? "font-arabic" : "font-english";

  // Sitewide Organization + LocalBusiness JSON-LD (injected on every page)
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "Dar Chang Consulting Management Co., Ltd.",
    alternateName: ["达尔畅咋讯管理有限公司", "دار تشانغ"],
    url: "https://www.darchangglobal.com",
    logo: "https://www.darchangglobal.com/logo.svg",
    image: "https://www.darchangglobal.com/og-image.png",
    description: "Shanghai-based industrial sourcing and procurement agency specializing in heavy machinery, production lines, NEMA motors, and FF&E for Gulf and Middle East markets.",
    foundingDate: "2018",
    areaServed: ["SA", "AE", "QA", "KW", "BH", "OM", "EG", "Worldwide"],
    serviceType: ["Industrial Procurement", "Factory Audit", "Heavy Machinery Sourcing", "Quality Inspection", "Logistics Management"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Room 515, Building 5, No. 2388 Chenxing Road",
      addressLocality: "Minhang District, Shanghai",
      addressRegion: "Shanghai",
      addressCountry: "CN"
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+86-187-2116-0270",
        contactType: "customer service",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Arabic", "Chinese"]
      },
      {
        "@type": "ContactPoint",
        telephone: "+966-538-291-355",
        contactType: "sales",
        areaServed: "SA",
        availableLanguage: ["Arabic", "English"]
      },
      {
        "@type": "ContactPoint",
        telephone: "+971-502-707-167",
        contactType: "sales",
        areaServed: "AE",
        availableLanguage: ["Arabic", "English"]
      }
    ],
    sameAs: [
      "https://www.linkedin.com/company/darchang"
    ]
  };

  return (
    <html lang={locale} dir={dir}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        {/* LCP Optimisation: preload the video poster so it's available the moment
            the browser renders the <video> element on the homepage. */}
        <link
          rel="preload"
          as="image"
          href="/hero-poster.png"
          fetchPriority="high"
        />
        {/* Sitewide JSON-LD: Organization + LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={`antialiased bg-primary-dark text-white ${fontClass}`}>
        {siteSettings?.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${siteSettings.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        )}
        <AnalyticsScripts
          ga4Id={siteSettings?.ga4Id}
          gtmId={siteSettings?.gtmId}
          metaPixelId={siteSettings?.metaPixelId}
          clarityId={siteSettings?.clarityId}
          hotjarId={siteSettings?.hotjarId}
          snapchatPixelId={siteSettings?.snapchatPixelId}
          tiktokPixelId={siteSettings?.tiktokPixelId}
          yandexMetricaId={siteSettings?.yandexMetricaId}
          gscVerificationCode={siteSettings?.gscVerificationCode}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
          <AnalyticsAndConsent />
          <ToastProvider />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

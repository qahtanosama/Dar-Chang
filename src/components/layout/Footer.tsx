"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { MapPin, Phone, Clock, ChevronDown, Linkedin, Twitter, Facebook, Instagram, ShieldCheck, Globe, MessageSquarePlus } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const MobileAccordion = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 md:border-none py-5 md:py-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between md:cursor-auto group"
      >
        <h4 className="font-bold text-white text-xl md:text-base tracking-wide md:mb-6">{title}</h4>
        <ChevronDown
          className={`w-6 h-6 text-accent-gold transition-transform duration-300 md:hidden ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 md:!max-h-none md:!opacity-100 md:!mt-0 md:!block ${isOpen ? "max-h-96 opacity-100 mt-6 block" : "max-h-0 opacity-0 hidden"}`}
      >
        {children}
      </div>
    </div>
  );
};

export function Footer() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-navy pt-20 pb-44 md:pb-12 relative z-10 mt-24 border-t-4 border-accent-gold">
      <div className="max-w-7xl mx-auto px-6">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-y-2 gap-x-12 mb-16">

          {/* Brand Intro (Top on mobile, left on desktop) */}
          <div className="col-span-1 md:col-span-4 lg:col-span-2 mb-8 md:mb-0 pb-10 md:pb-0 border-b border-white/10 md:border-none flex flex-col items-center md:items-start text-center md:text-start">
            <Link href="/" className="relative flex items-center justify-center md:justify-start h-20 w-64 mb-8">
              <Image
                src="/logo.svg"
                alt="Dar Chang Logo - دار تشانغ"
                fill
                priority
                className={`object-contain ${isRtl ? 'md:object-right' : 'md:object-left'} object-center`}
              />
            </Link>
            <p className="text-base text-gray-300 mb-8 max-w-sm leading-relaxed">
              <span className="block mb-2 font-bold text-accent-gold tracking-wide">{isRtl ? "مكتبك في الصين" : "Your Office in China"}</span>
              {isRtl
                ? "توريد بلا قلق، نتائج بلا حدود. نحن نوفر أحدث المعدات الثقيلة وعمليات التصنيع المخصصة."
                : "Sourcing Without Worry, Results Without Borders. Leading industrial equipment and custom manufacturing procurement."}
            </p>

            {/* SEO Optimized Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-6 w-full mb-4 md:mb-0">
              <a href="https://linkedin.com/company/darchang" target="_blank" rel="noopener noreferrer" aria-label="Dar Chang LinkedIn Professional Profile" className="text-white/80 hover:text-accent-gold transition-colors p-2.5 hover:bg-white/10 rounded-full bg-white/5">
                <Linkedin className="w-5 h-5 fill-current" />
              </a>
              <a href="https://twitter.com/darchang" target="_blank" rel="noopener noreferrer" aria-label="Dar Chang X Twitter Corporate Updates" className="text-white/80 hover:text-accent-gold transition-colors p-2.5 hover:bg-white/10 rounded-full bg-white/5">
                <Twitter className="w-5 h-5 fill-current" />
              </a>
              <a href="https://facebook.com/darchang.consulting" target="_blank" rel="noopener noreferrer" aria-label="Dar Chang Facebook Global Community" className="text-white/80 hover:text-accent-gold transition-colors p-2.5 hover:bg-white/10 rounded-full bg-white/5">
                <Facebook className="w-5 h-5 fill-current" />
              </a>
              <a href="https://instagram.com/darchang.global" target="_blank" rel="noopener noreferrer" aria-label="Dar Chang Instagram Logistics Visuals" className="text-white/80 hover:text-accent-gold transition-colors p-2.5 hover:bg-white/10 rounded-full bg-white/5">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Accordion */}
          <div className="col-span-1">
            <MobileAccordion title={isRtl ? "روابط سريعة" : "Quick Links"}>
              <ul className="space-y-4 md:space-y-3">
                <li><Link href="/about" className="text-gray-400 hover:text-accent-gold text-base font-medium transition-colors block">{t("about")}</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-accent-gold text-base font-medium transition-colors block">{t("faq")}</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-accent-gold text-base font-medium transition-colors block">{t("services")}</Link></li>
                <li><Link href="/insights" className="text-gray-400 hover:text-accent-gold text-base font-medium transition-colors block">{t("insights")}</Link></li>
                <li><Link href="/portfolio" className="text-gray-400 hover:text-accent-gold text-base font-medium transition-colors block">{t("portfolio")}</Link></li>
                <li><Link href="/compliance" className="text-gray-400 hover:text-accent-gold text-base font-medium transition-colors block">{isRtl ? "الامتثال" : "Compliance"}</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-accent-gold text-base font-medium transition-colors block">{isRtl ? "سياسة الخصوصية" : "Privacy Policy"}</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-accent-gold text-base font-medium transition-colors block">{isRtl ? "اتصل بنا" : "Contact Us"}</Link></li>

              </ul>
            </MobileAccordion>
          </div>

          {/* Legal & Trust Accordion */}
          <div className="col-span-1">
            <MobileAccordion title={isRtl ? "الالتزام والمعايير" : "Quality & Compliance"}>
              <ul className="space-y-4 md:space-y-3">
                <li><Link href="/compliance" className="text-gray-400 hover:text-accent-gold text-base font-medium transition-colors block">{isRtl ? "ضمان المصداقية" : "Standards & Certifications"}</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-accent-gold text-base font-medium transition-colors block">{isRtl ? "عن دار تشانغ" : "About Dar Chang"}</Link></li>
                <li><Link href="/quote" className="text-gray-400 hover:text-accent-gold text-base font-medium transition-colors block">{isRtl ? "طلب تسعير" : "Request RFQ"}</Link></li>
              </ul>
            </MobileAccordion>
          </div>

          {/* Contact Accordion */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <MobileAccordion title={isRtl ? "المقر الرئيسي" : "Headquarters"}>
              <ul className="space-y-5 md:space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent-gold shrink-0 mt-1" />
                  <span className="text-base text-gray-400 leading-relaxed">
                    {isRtl
                      ? "شنغهاي، منطقة مينهانغ، شارع تشينشينغ 2388، مبنى 5، غرفة 515"
                      : "Shanghai, Minhang District, Chenxing Road 2388, Building 5, Room 515"}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent-gold shrink-0" />
                  <a href="tel:+8618721160270" className="text-base text-gray-400 hover:text-white transition-colors tracking-wider font-bold" dir="ltr">
                    +86 18721160270
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-accent-gold shrink-0 mt-1" />
                  <span className="text-base text-gray-400 leading-relaxed">
                    {isRtl ? "الإثنين - الجمعة: 9ص - 6م (بتوقيت الصين)" : "Mon - Fri: 9AM - 6PM (CST)"}
                  </span>
                </li>
              </ul>
            </MobileAccordion>
          </div>
        </div>

        {/* SEO & Trust Strategy Snippet */}
        <div className="mb-12">
          <div className="bg-transparent rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center border border-white/10 max-w-4xl mx-auto">
            <div className="text-center mb-8" dir={isRtl ? "rtl" : "ltr"}>
              <h4 className="text-accent-gold text-lg md:text-xl font-bold mb-4 flex items-center justify-center gap-3">
                <ShieldCheck className="w-6 h-6" />
                {isRtl ? "ضمان أمان التجارة" : "Trade Security Guarantee"}
              </h4>
              <p className="text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
                {isRtl
                  ? "أسراركم التجارية وبيانات التعاقد في أيدٍ أمينة؛ نحمي خصوصيتكم بمعايير عالمية ومن خلال إشراف فريقنا الدولي الميداني في شنغهاي."
                  : "Your trade secrets and contract data are in safe hands; we protect your privacy with global standards and through the oversight of our multinational on-ground team in Shanghai."}
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-md">
              <div className="flex items-center justify-start sm:justify-center gap-4 px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-colors">
                <MapPin className="w-5 h-5 text-accent-gold shrink-0" />
                <span className="text-sm font-bold text-gray-200">
                  {isRtl ? "مكتب موثق في شنغهاي" : "Shanghai Verified Office"}
                </span>
              </div>
              <div className="flex items-center justify-start sm:justify-center gap-4 px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-colors">
                <ShieldCheck className="w-5 h-5 text-accent-gold shrink-0" />
                <span className="text-sm font-bold text-gray-200">
                  {isRtl ? "متوافق مع GDPR" : "GDPR Data Compliant"}
                </span>
              </div>
              <div className="flex items-center justify-start sm:justify-center gap-4 px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-colors">
                <Globe className="w-5 h-5 text-accent-gold shrink-0" />
                <span className="text-sm font-bold text-gray-200">
                  {isRtl ? "إشراف تقني متعدد الجنسيات" : "Multinational Technical Oversight"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar Segment (Centered Style as per image) */}
        <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-6">
          <p className="text-sm text-gray-500 text-center" dir={isRtl ? "rtl" : "ltr"}>
            &copy; {currentYear} {isRtl ? "دار تشانغ لإدارة الاستشارات المحدودة. جميع الحقوق محفوظة." : "Dar Chang Consulting Management Co., Ltd. All rights reserved."}
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <a href="https://wa.me/8618721160270" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-11 h-11 flex items-center justify-center bg-white border border-gray-200/50 rounded-full text-gray-900 hover:bg-gray-50 transition-colors shadow-sm">
              <Phone className="w-5 h-5 fill-current" />
            </a>
            <a href="https://facebook.com/darchang.consulting" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-11 h-11 flex items-center justify-center bg-white border border-gray-200/50 rounded-full text-gray-900 hover:bg-gray-50 transition-colors shadow-sm">
              <Facebook className="w-5 h-5 fill-current" />
            </a>
            <a href="https://instagram.com/darchang.global" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-11 h-11 flex items-center justify-center bg-white border border-gray-200/50 rounded-full text-gray-900 hover:bg-gray-50 transition-colors shadow-sm">
              <Instagram className="w-5 h-5" />
            </a>
            <Link href="/quote" aria-label="Get a Quote" className="w-11 h-11 flex items-center justify-center bg-white border border-gray-200/50 rounded-full text-gray-900 hover:bg-gray-50 transition-colors shadow-sm">
              <MessageSquarePlus className="w-5 h-5" />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 opacity-60">
            <Link href="/compliance" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">{isRtl ? "الامتثال" : "Compliance"}</Link>
            <Link href="/privacy" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">{isRtl ? "سياسة الخصوصية" : "Privacy Policy"}</Link>
            <Link href="/contact" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">{isRtl ? "اتصل بنا" : "Contact Us"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

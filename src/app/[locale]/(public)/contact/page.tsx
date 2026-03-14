import { Metadata } from 'next';
import { useLocale } from 'next-intl';
import { MapPin, Phone, Clock, ExternalLink, Globe, Target, Building2 } from 'lucide-react';
import { Link } from '@/i18n/routing';

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale;

  if (locale === 'ar') {
    return {
      title: 'اتصل بنا - التوريد والتمثيل التجاري العالمي | دار تشانغ',
      description: 'نحن نوفر جسراً مهنياً يربط بين الطلب العالمي ومراكز التصنيع الصينية من خلال تواجدنا الميداني في أكثر المراكز التجارية استراتيجية في العالم.',
      openGraph: {
        title: 'اتصل بنا - التوريد والتمثيل التجاري العالمي | دار تشانغ',
        description: 'نحن نوفر جسراً مهنياً يربط بين الطلب العالمي ومراكز التصنيع الصينية، مع مكاتب إقليمية في شنغهاي، مكة المكرمة، ودبي.',
        url: 'https://www.darchang.com/ar/contact',
        siteName: 'Dar Chang | دار تشانغ',
        locale: 'ar_AE',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'دار تشانغ — شريك التوريد العالمي' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'اتصل بنا | دار تشانغ',
        description: 'مكاتب إقليمية في شنغهاي، مكة المكرمة، ودبي.',
        images: ['/og-image.png'],
      },
    };
  }

  return {
    title: 'Contact Us - Global Trade & Sourcing | Dar Chang',
    description: 'We provide a professional bridge between global demand and Chinese manufacturing through our physical presence in the world’s most strategic trade hubs.',
    openGraph: {
      title: 'Contact Us - Global Trade & Sourcing | Dar Chang',
      description: 'We provide a professional bridge between global demand and Chinese manufacturing, with regional hubs in Shanghai, Makkah, and Dubai.',
      url: 'https://www.darchang.com/en/contact',
      siteName: 'Dar Chang | دار تشانغ',
      locale: 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Dar Chang — Global Sourcing & Trade Partner' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact Us | Dar Chang',
      description: 'Regional hubs in Shanghai, Makkah, and Dubai. Your boots on the ground in China.',
      images: ['/og-image.png'],
    },
  };
}

export default function ContactPage() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  // Json-Ld Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: isRtl ? 'دار تشانغ' : 'Dar Chang',
    url: 'https://darchang.global',
    logo: 'https://darchang.global/logo.svg',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+86 18721160270',
        contactType: 'customer service',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Arabic', 'Chinese']
      },
      {
        '@type': 'ContactPoint',
        telephone: '+966 538291355',
        contactType: 'regional sales',
        areaServed: 'SA',
        availableLanguage: ['Arabic', 'English']
      },
      {
        '@type': 'ContactPoint',
        telephone: '+971 502707167',
        contactType: 'regional sales',
        areaServed: 'AE',
        availableLanguage: ['Arabic', 'English']
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Room 515, Building 5, No. 2388 Chenxing Road',
      addressLocality: 'Minhang District, Shanghai',
      addressCountry: 'CN'
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-bg-neutral relative overflow-hidden">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background aesthetics */}
      <div className="absolute top-0 left-0 w-full h-96 bg-primary-navy/5"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className={`text-center mb-20 ${isRtl ? 'rtl' : 'ltr'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-sm mb-6 border border-border-subtle">
            <Globe className="w-10 h-10 text-accent-gold" />
          </div>
          <h2 className="text-xl md:text-2xl text-accent-gold font-bold mb-4">
            {isRtl ? "التوريد والتمثيل التجاري العالمي" : "Global Trade & Sourcing"}
          </h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-navy mb-6 tracking-tight">
            {isRtl ? "تواصل مع فريقنا الدولي" : "Contact Our Global Team"}
          </h1>
          <p className="text-lg md:text-xl text-text-main leading-relaxed max-w-3xl mx-auto font-medium">
            {isRtl
              ? "نحن نوفر جسراً مهنياً يربط بين الطلب العالمي ومراكز التصنيع الصينية من خلال تواجدنا الميداني في أكثر المراكز التجارية استراتيجية في العالم."
              : "We provide a professional bridge between global demand and Chinese manufacturing through our physical presence in the world’s most strategic trade hubs."}
          </p>
        </div>

        {/* Global Locations Grid */}
        <div className={`space-y-12 ${isRtl ? 'rtl' : 'ltr'}`}>

          {/* Main Hub: Shanghai */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border-2 border-accent-gold/20 shadow-xl relative overflow-hidden">
            <div className={`absolute top-0 w-3 h-full bg-accent-gold ${isRtl ? 'right-0' : 'left-0'}`}></div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-7 pl-6 rtl:pl-0 rtl:pr-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-gold text-white font-bold text-lg">1</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-primary-navy leading-tight">
                    {isRtl ? "المقر الرئيسي: شنغهاي، الصين" : "Global Headquarters: Shanghai, China"}
                  </h2>
                </div>
                <h3 className="text-lg sm:text-xl text-accent-gold font-bold mb-8 italic">
                  {isRtl ? "قلب عمليات التوريد والخدمات الفنية" : "The Core of Your Supply Chain"}
                </h3>

                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-accent-gold shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-primary-navy mb-1">{isRtl ? "العنوان:" : "Address:"}</p>
                      <p className="text-text-main leading-relaxed">
                        {isRtl ? "شنغهاي، منطقة مينهانغ، شارع تشينشينغ 2388، مبنى 5، غرفة 515." : "Room 515, Building 5, No. 2388 Chenxing Road, Minhang District, Shanghai."}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <Building2 className="w-6 h-6 text-accent-gold shrink-0 mt-1" />
                    <div className="w-full">
                      <p className="font-bold text-primary-navy mb-2">{isRtl ? "نسخة لشركات الشحن المحلية (بالصينية):" : "Copy for Local Logistics (Chinese):"}</p>
                      <div className={`bg-bg-neutral p-3 rounded-xl border border-border-subtle flex items-center justify-between gap-4 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
                        <span className="font-medium text-text-main text-sm" dir="ltr">上海市闵行区陈行路2388号5号楼515室</span>
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-accent-gold shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-primary-navy mb-1">{isRtl ? "الهاتف:" : "Phone:"}</p>
                      <a href="tel:+8618721160270" className="text-accent-gold hover:text-primary-navy font-bold transition-colors" dir="ltr">
                        +86 18721160270
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-accent-gold shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-primary-navy mb-1">{isRtl ? "ساعات العمل:" : "Operating Hours:"}</p>
                      <p className="text-text-main">
                        {isRtl ? "الإثنين - الجمعة | ٩ صباحاً - ٦ مساءً (بتوقيت الصين)." : "Mon – Fri | 09:00 – 18:00 (China Time)."}
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="flex flex-wrap gap-4 mt-8">
                  <a href="https://maps.apple.com/?address=上海市闵行区陈行路2388号" target="_blank" rel="noopener noreferrer" className="btn-secondary px-6 rounded-full text-sm font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {isRtl ? "افتح في خرائط أبل" : "Open in Apple Maps"}
                  </a>
                  <a href="https://maps.google.com/?q=上海市闵行区陈行路2388号" target="_blank" rel="noopener noreferrer" className="btn-secondary px-6 rounded-full text-sm font-semibold flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    {isRtl ? "افتح في خرائط جوجل" : "Open in Google Maps"}
                  </a>
                </div>
              </div>
              <div className="md:col-span-5 hidden md:flex items-center justify-center p-8 bg-primary-navy/5 rounded-3xl h-full border border-white">
                <div className="text-center">
                  <Target className="w-24 h-24 text-accent-gold/20 mx-auto mb-6" />
                  <p className="text-primary-navy font-black text-xl mb-2">HQ Hub</p>
                  <p className="text-sm font-bold text-text-main tracking-widest uppercase">Shanghai</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Regional Hub 1: Saudi Arabia */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-border-subtle hover:border-accent-gold/50 transition-colors shadow-sm relative overflow-hidden flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-navy text-white font-bold">2</span>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-navy">
                  {isRtl ? "المكتب الإقليمي: مكة المكرمة، السعودية" : "Regional Hub: Makkah, Saudi Arabia"}
                </h2>
              </div>
              <h3 className="text-base sm:text-lg text-text-main font-semibold mb-8 min-h-[3rem]">
                {isRtl ? "شركة السلام بلس — شريككم الاستراتيجي في المملكة" : "Alsalam Plus Company — Your Strategic Partner in the Kingdom"}
              </h3>

              <ul className="space-y-5 mt-auto">
                <li className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary-navy shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-primary-navy mb-1">{isRtl ? "الموقع:" : "Location:"}</p>
                    <p className="text-text-main">
                      {isRtl ? "مكة المكرمة، العزيزية." : "Makkah, Alazizyah."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary-navy shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-primary-navy mb-1">{isRtl ? "واتساب وهاتف:" : "WhatsApp & Phone:"}</p>
                    <a href="https://wa.me/966538291355" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:text-primary-navy font-bold transition-colors" dir="ltr">
                      +966 538291355
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Regional Hub 2: Dubai */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-border-subtle hover:border-accent-gold/50 transition-colors shadow-sm relative overflow-hidden flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-navy text-white font-bold">3</span>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-navy">
                  {isRtl ? "المكتب الإقليمي: دبي، الإمارات" : "Regional Hub: Dubai, UAE"}
                </h2>
              </div>
              <h3 className="text-base sm:text-lg text-text-main font-semibold mb-8 min-h-[3rem]">
                {isRtl ? "شركة حزم المجد للتجارة ذ.م.م — البوابة اللوجستية العالمية" : "Hazem Almajd Traders L.L.C. — The Global Logistics Gateway"}
              </h3>

              <ul className="space-y-5 mt-auto">
                <li className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary-navy shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-primary-navy mb-1">{isRtl ? "الموقع:" : "Location:"}</p>
                    <p className="text-text-main">
                      {isRtl ? "دبي، الإمارات العربية المتحدة." : "Dubai, United Arab Emirates."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary-navy shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-primary-navy mb-1">{isRtl ? "واتساب وهاتف:" : "WhatsApp & Phone:"}</p>
                    <a href="https://wa.me/971502707167" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:text-primary-navy font-bold transition-colors" dir="ltr">
                      +971 502707167
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Action Section */}
          <div className="mt-16 bg-primary-navy text-white rounded-[2.5rem] p-10 md:p-12 text-center relative overflow-hidden border border-accent-gold/30 shadow-2xl">
            {/* Decorative background shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/10 rounded-bl-full translate-x-1/4 -translate-y-1/4 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-gold/10 rounded-tr-full -translate-x-1/4 translate-y-1/4 blur-2xl"></div>

            <div className="relative z-10 flex flex-col items-center justify-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white max-w-2xl leading-tight">
                {isRtl ? "هل أنتم مستعدون للارتقاء بعمليات التوريد؟" : "Ready to elevate your supply chain?"}
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg md:text-xl font-light">
                {isRtl ? "فريقنا الدولي مستعد للإجابة على جميع استفساراتكم وتوفير الاحتياجات التجارية الخاصة بكم بسلاسة عبر مكاتبنا في شنغهاي والشرق الأوسط." : "Our global teams are ready to answer your inquiries and provide seamless trade solutions tailored to your needs across our Shanghai and Middle East hubs."}
              </p>
              <Link href="/quote" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-primary-navy bg-accent-gold rounded-full hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                {isRtl ? "طلب عرض سعر مخصص (RFQ)" : "Request a Custom RFQ"}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Metadata } from 'next';

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const locale = (await props.params).locale;
  if (locale === 'ar') {
    return {
      title: "من نحن | دار تشانغ — وكالة توريد صناعية في شنغهاي",
      description: "دار تشانغ هي شركة توريد صناعية مقرها شنغهاي. 250+ مصنع معتمد، حضور ميداني، وأكثر من 15 مليون دولار حجم صادرات.",
      keywords: ["دار تشانغ", "توريد الصين", "فحص المصانع", "شنغهاي", "وكالة استيراد"],
      openGraph: {
        title: "من نحن | دار تشانغ",
        description: "250+ مصنع معتمد، حضور ميداني، وقدرات تصدير متحققة.",
        url: "https://www.darchang.com/ar/about",
        siteName: "Dar Chang | دار تشانغ",
        locale: "ar_AE",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "دار تشانغ — وكالة توريد صناعية في شنغهاي" }],
      },
      twitter: { card: "summary_large_image", title: "من نحن | دار تشانغ", images: ["/og-image.png"] },
    };
  }
  return {
    title: "About Us | Dar Chang — Industrial Sourcing Agency in Shanghai",
    description: "Dar Chang is a Shanghai-based industrial sourcing agency. 250+ audited factories, on-the-ground field teams, and $15M+ in verified export volume.",
    keywords: ["Dar Chang", "China sourcing agency", "factory audit", "Shanghai", "industrial procurement"],
    openGraph: {
      title: "About Us | Dar Chang",
      description: "250+ audited factories, on-the-ground field teams, and $15M+ verified export volume.",
      url: "https://www.darchang.com/en/about",
      siteName: "Dar Chang | دار تشانغ",
      locale: "en_US",
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Dar Chang — Industrial Sourcing Agency in Shanghai" }],
    },
    twitter: { card: "summary_large_image", title: "About Us | Dar Chang", images: ["/og-image.png"] },
  };
}

export default function AboutPage() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <main className="min-h-screen pt-32 pb-24 bg-bg-neutral relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-primary-navy highlight-border">{t('about')}</h1>
        {/* Content would be expanded via CMS or translations later */}
        {/* ── Our Story ─────────────────────────────────────────── */}
        <section className="mb-20 space-y-6" aria-labelledby="our-story-heading">
          <h2
            id="our-story-heading"
            className="text-3xl font-bold text-primary-navy border-b border-border-subtle pb-4"
          >
            {isRtl ? 'عن دار تشانغ' : 'About Dar Chang'}
          </h2>
          <p className="text-text-main leading-relaxed text-lg">
            {isRtl
              ? 'تأسست "دار تشانغ" في عام 2023 برؤية واضحة: أن تكون الجسر المتين الذي يربط بين طموحات التجارة العالمية وبين القوة الصناعية الصينية. من قلب شنغهاي النابض، انطلقنا لنعيد تعريف مفهوم الشريك اللوجستي الموثوق.'
              : 'Established in 2023, Dar Chang was founded on a singular premise: the bridge between global ambition and Chinese manufacturing should be seamless. Headquartered in the industrial heart of Shanghai, we began with a mission to redefine what it means to be a reliable supply chain partner.'}
          </p>
          <p className="text-text-main leading-relaxed text-lg">
            {isRtl
              ? 'أدركنا أن تعقيدات السوق الصيني لا تمثل مجرد تحدٍ لوجستي، بل هي عائق حقيقي أمام نمو الشركات. لذا، أنشأنا "دار تشانغ" لتكون بوابتك الاحترافية لتوريد المنتجات من كافة أنحاء آسيا، معتمدين على الدقة، النزاهة، والخبرة الميدانية.'
              : 'We recognized that for many international businesses, the complexity of the Chinese market wasn\'t just a logistical challenge—it was a barrier to growth. We built Dar Chang to break that barrier, starting a journey to become the premier gateway for professional product outsourcing across Asia.'}
          </p>
        </section>

        {/* ── The Solution ──────────────────────────────────────── */}
        <section className="mb-20 space-y-6" aria-labelledby="solution-heading">
          <h2
            id="solution-heading"
            className="text-3xl font-bold text-primary-navy border-b border-border-subtle pb-4"
          >
            {isRtl
              ? 'لماذا نحن؟ وداعاً لعناء الاستيراد'
              : 'The Solution to Your Procurement "Headache"'}
          </h2>
          <p className="text-text-main leading-relaxed text-lg">
            {isRtl
              ? 'تعتبر عمليات الشراء والتوريد بالنسبة للكثير من الشركات "صداعاً" مستمراً؛ ما بين البحث عن المصانع الموثوقة، فحص الجودة، ومتابعة العقود والخدمات اللوجستية المعقدة. هنا يأتي دورنا كحل متكامل يغنيك عن قسم المشتريات بالكامل.'
              : 'Most companies view sourcing as a necessary burden. Between navigating cultural nuances, auditing factories, and managing complex logistics, the "headache" of global trade can derail even the most established firms.'}
          </p>
          <p className="text-text-main leading-relaxed text-lg">
            {isRtl
              ? 'نحن في "دار تشانغ" لا نبحث لك عن مورد فحسب، بل نتحمل المسؤولية كاملة كأننا مكتبك الخاص في الصين. نتولى كافة المهام نيابة عنك، بدءاً من التفاوض والتدقيق في المصانع، وصولاً إلى فحص الجودة بنسبة 100% والشحن.'
              : 'At Dar Chang, we offer comprehensive purchasing department solutions. We don\'t just find suppliers; we act as your dedicated external office on the ground. We take over the entire workload—from the initial negotiation and contract vetting to 100% quality inspections and final delivery.'}
          </p>

          {/* Pull-quote */}
          <blockquote className="border-l-4 border-accent-gold pl-6 py-2 my-8 bg-primary-navy/5 rounded-r-lg">
            <p className="text-text-main leading-relaxed text-lg italic">
              {isRtl
                ? '"نحن نشيل هم العميل بكل ما تعنيه الكلمة. عندما أقول لك: لا تشيل هم، فأنا أعني أنني سأتولى كل التفاصيل المرهقة لأمنحك راحة البال والنتائج التي تتوقعها."'
                : '"I carry the burden for my clients. When I say \'Don\'t worry,\' I mean it. Our goal is to give you back your time so you can focus on scaling your business, while we ensure your supply chain remains flawless and stress-free."'}
            </p>
          </blockquote>
        </section>

        {/* ── Mission & Vision ──────────────────────────────────── */}
        <section className="mb-20 space-y-6" aria-labelledby="mission-heading">
          <h2
            id="mission-heading"
            className="text-3xl font-bold text-primary-navy border-b border-border-subtle pb-4"
          >
            {isRtl ? 'مهمتنا ورؤيتنا' : 'Our Mission & Vision'}
          </h2>
          <p className="text-text-main leading-relaxed text-lg">
            {isRtl
              ? 'منذ انطلاقتنا في 2023، لم يكن هدفنا مجرد تقديم خدمات توريد، بل أن نصبح القوة الرائدة في حلول الشراء الخارجية على مستوى آسيا بالكامل. نلتزم بتقديم أعلى معايير الجودة في الخدمة التي تضمن حماية مصالح عملائنا وبناء سلاسل توريد مستدامة وقوية.'
              : 'Since our founding in 2023, our vision has been clear: to evolve from a Shanghai-based partner into a dominant force for global product outsourcing throughout all of Asia. We are committed to setting the gold standard for transparency and professional excellence.'}
          </p>
          <p className="text-text-main leading-relaxed text-lg">
            {isRtl
              ? 'رؤيتنا هي التوسع والانتشار لنكون الشريك الأول لكل تاجر ومستثمر يبحث عن الاحترافية والصدق في التعامل.'
              : 'As we expand our influence, our core mission remains the same: to provide the peace of mind that comes from knowing your interests are protected by the best in the business.'}
          </p>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-y border-border-subtle py-12">
          <div className="text-center">
            <AnimatedNumber value={250} prefix="+" className="text-4xl md:text-5xl font-bold text-accent-gold mb-2 block" />
            <span className="text-sm text-gray-400">{isRtl ? 'مصنع معتمد' : 'Audited Factories'}</span>
          </div>
          <div className="text-center">
            <AnimatedNumber value={15} suffix="M+" className="text-4xl md:text-5xl font-bold text-accent-gold mb-2 block" />
            <span className="text-sm text-gray-400">{isRtl ? 'حجم الصادرات (دولار)' : 'Export Volume (USD)'}</span>
          </div>
          <div className="text-center">
            <AnimatedNumber value={100} suffix="%" className="text-4xl md:text-5xl font-bold text-accent-gold mb-2 block" />
            <span className="text-sm text-gray-400">{isRtl ? 'فحص الجودة' : 'Quality Inspection'}</span>
          </div>
          <div className="text-center">
            <AnimatedNumber value={24} suffix="/7" className="text-4xl md:text-5xl font-bold text-accent-gold mb-2 block" />
            <span className="text-sm text-gray-400">{isRtl ? 'دعم لوجستي' : 'Logistics Support'}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-primary-navy mb-8 border-b border-border-subtle pb-4">
            {isRtl ? 'الأسئلة الشائعة (FAQ)' : 'Frequently Asked Questions'}
          </h2>
          <FAQAccordion
            question={isRtl ? 'هل توفرون ضمانات على المعدات الثقيلة؟' : 'Do you provide warranties on heavy machinery?'}
            answer={isRtl ? 'نعم، يتم توثيق كافة المعايير الهندسية في عقود السمسرة القانونية الخاصة بنا مع المصانع الصينية.' : 'Yes, all engineering standards are structurally documented within our Sourcing Agent Contracts directly with the Chinese factories.'}
            variant="light"
          />
          <FAQAccordion
            question={isRtl ? 'كيف يتم التعامل مع فحص الجودة؟' : 'How is Quality Control (QC) handled?'}
            answer={isRtl ? 'يقوم فريقنا بزيارات ميدانية أثناء الإنتاج وقبل الشحن لضمان مطابقة معايير NEMA واللجنة الكهروتقنية الدولية.' : 'Our field team conducts both mid-production and pre-shipment inspections to verify identical matching with NEMA and IEC tolerances.'}
            variant="light"
          />
        </div>
      </div>
    </main>
  );
}

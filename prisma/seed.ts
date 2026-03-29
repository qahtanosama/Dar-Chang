import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@darchangglobal.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'DarChang2024!'

  // --- Seed Admin User ---
  const hashedPassword = await bcrypt.hash(adminPassword, 12)
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Dar Chang Admin',
    },
  })
  console.log(`✅ Admin user ready: ${adminEmail}`)

  // --- Seed Services ---
  const servicesCount = await prisma.service.count()
  if (servicesCount === 0) {
    await prisma.service.createMany({
      data: [
        {
          slug: 'direct-source-procurement',
          titleEn: 'Direct Source Procurement',
          titleAr: 'البحث والربط المباشر مع المصادر',
          descriptionEn: 'Direct access to specialized manufacturers for your product. We eliminate middlemen to secure the most competitive source pricing for your operations.',
          descriptionAr: 'نختصر عليك المسافة ونصلك بأفضل المصانع المتخصصة في منتجك، لنضمن لك الحصول على السعر من المصدر مباشرة مع مطابقة أدق التفاصيل الفنية.',
          icon: 'Search',
          order: 0,
          active: true,
        },
        {
          slug: 'on-ground-verification',
          titleEn: 'On-Ground Verification',
          titleAr: 'التحقق الميداني والاعتماد',
          descriptionEn: 'Rigorous on-site audits of production capacity and legal compliance. Secure your investment with professional "boots on the ground" before signing any contract.',
          descriptionAr: 'لا تكتفِ بالصور؛ نحن نزور المصنع على أرض الواقع وندقق في سجلاته القانونية وقدرته الإنتاجية، لنعطيك الضوء الأخضر قبل أن تدفع ريالاً واحداً.',
          icon: 'ShieldCheck',
          order: 1,
          active: true,
        },
        {
          slug: 'strict-quality-management',
          titleEn: 'Strict Quality Management',
          titleAr: 'الرقابة الصارمة على الجودة',
          descriptionEn: 'Technical inspections tailored to your specific product requirements. We ensure every shipment meets international standards before leaving the source.',
          descriptionAr: 'فحص هندسي دقيق لكل قطعة قبل التعبئة. نضمن أن ما طلبته في العقد هو تماماً ما سيصل إلى مخازنك، دون مفاجآت أو عيوب تصنيعية.',
          icon: 'Settings',
          order: 2,
          active: true,
        },
        {
          slug: 'integrated-supply-chain',
          titleEn: 'Integrated Supply Chain',
          titleAr: 'إدارة الشحن والخدمات اللوجستية',
          descriptionEn: 'Managing complex shipping and documentation for your international cargo. Reliable, efficient delivery to any destination worldwide.',
          descriptionAr: 'نتولى عنك تعقيدات الشحن الدولي، من التعاقد وحتى وصول الشحنة. نركز على التوقيت الدقيق وسلامة البضائع لتصلك جاهزة للبيع أو التشغيل.',
          icon: 'Ship',
          order: 3,
          active: true,
        },
        {
          slug: 'legal-financial-safeguard',
          titleEn: 'Legal & Financial Safeguard',
          titleAr: 'شريككم التجاري المعتمد في الصين',
          descriptionEn: 'Your official representative on the ground in China. We protect your interests and mitigate cross-border trade risks across your business.',
          descriptionAr: 'نُمثلك رسمياً أمام الجهات الصينية ونحمي حقوقك القانونية والمالية. نوفر لك الحضور الفعلي في السوق الصيني دون الحاجة لمغادرة مكتبك.',
          icon: 'FileText',
          order: 4,
          active: true,
        },
      ],
    })
    console.log('✅ Services seeded (5 records)')
  } else {
    console.log(`ℹ  Services already exist (${servicesCount} records)`)
  }

  // --- Seed Portfolio Items (Featured Pillars) ---
  const portfolioCount = await prisma.portfolioItem.count()
  if (portfolioCount === 0) {
    await prisma.portfolioItem.createMany({
      data: [
        {
          slug: 'machinery', titleEn: 'Heavy Machinery', titleAr: 'المعدات الثقيلة', category: 'Heavy Machinery',
          descriptionEn: 'Excavators, Wheel Loaders, Bulldozers & Graders from top global brands — sourced direct from Chinese OEMs.',
          descriptionAr: 'حفارات، شيولات، بلدوزرات، ومسطحات — مباشرةً من كبرى المصانع الصينية.',
          imageUrl: '/portfolio/machinery_bg.jpg', tags: 'machinery, OEM, bulldozers', featured: true, order: 0
        },
        {
          slug: 'vhs-nema-industrial-motors', titleEn: 'VHS NEMA Motors', titleAr: 'محركات VHS / NEMA', category: 'Industrial Motors',
          descriptionEn: 'Vertical Hollow Shaft motors, VFD control panels, and full industrial drive integrations.',
          descriptionAr: 'محركات VHS وفقًا للمعيار NEMA، ولوحات التحكم VFD والتكاملات الصناعية.',
          imageUrl: '/portfolio/vhs-motor-industrial.jpg', tags: 'VHS, NEMA, motors', featured: true, order: 1
        },
        {
          slug: 'production-line', titleEn: 'Production Lines', titleAr: 'خطوط الإنتاج', category: 'Production Lines',
          descriptionEn: 'Fully automated manufacturing systems for packaging, food processing, and industrial output.',
          descriptionAr: 'أنظمة تصنيع آلية متكاملة للتعبئة، وتجهيز الغذاء، والإنتاج الصناعي.',
          imageUrl: '/portfolio/production_bg.png', tags: 'automation, manufacturing, packaging', featured: true, order: 2
        },
        {
          slug: 'hotel-furniture-procurement', titleEn: 'Hospitality FF&E', titleAr: 'أثاث ومعدات فندقية', category: 'Hospitality FF&E',
          descriptionEn: 'Turnkey sourcing of Furniture, Fixtures & Equipment for hotels and hospitality projects.',
          descriptionAr: 'توريد شامل للأثاث والتجهيزات والمعدات لمشاريع الفنادق والضيافة.',
          imageUrl: '/portfolio/hospitality_bg.jpg', tags: 'furniture, hotel, FF&E', featured: true, order: 3
        },
        {
          slug: 'custom', titleEn: 'Custom Sourcing', titleAr: 'طلبات التوريد المخصصة', category: 'Custom Sourcing',
          descriptionEn: 'Niche industrial parts, bespoke commercial goods, and verified alternative suppliers.',
          descriptionAr: 'قطع صناعية نادرة، منتجات تجارية مخصصة، والبحث عن موردين بديلين معتمدين.',
          imageUrl: '/portfolio/custom_bg.png', tags: 'custom, sourcing, parts', featured: true, order: 4
        },
      ],
    })
    console.log('✅ Portfolio items seeded (5 records)')
  } else {
    console.log(`ℹ  Portfolio items already exist (${portfolioCount} records)`)
  }

  // --- Seed Machinery Category Portfolio Items + Products ---
  const machineryCategories = [
    {
      slug: 'machinery-excavators',
      titleEn: 'Excavators', titleAr: 'الحفارات',
      descriptionEn: 'High-performance excavators sourced for reliability in extreme conditions.',
      descriptionAr: 'حفارات عالية الأداء مصممة للاعتمادية في الظروف القاسية.',
      category: 'Heavy Machinery', imageUrl: '/portfolio/machinery_bg.jpg', order: 10,
      products: [
        { nameEn: 'Caterpillar', nameAr: 'كاتربيلار', icon: 'Truck', imageUrl: '/portfolio/machinery/excavators/cat.png', specs: JSON.stringify({ 'Available Models': '320, 320GC' }), displayOrder: 0 },
        { nameEn: 'Komatsu', nameAr: 'كوماتسو', icon: 'Truck', imageUrl: '/portfolio/machinery/excavators/komatsu.png', specs: JSON.stringify({ 'Available Models': 'PC210-10, PC200' }), displayOrder: 1 },
        { nameEn: 'SANY', nameAr: 'ساني', icon: 'Truck', imageUrl: '/portfolio/machinery/excavators/sany.png', specs: JSON.stringify({ 'Available Models': 'SY215C' }), displayOrder: 2 },
        { nameEn: 'Volvo', nameAr: 'فولفو', icon: 'Truck', imageUrl: '/portfolio/machinery/excavators/volvo.png', specs: JSON.stringify({ 'Available Models': 'EC210D' }), displayOrder: 3 },
        { nameEn: 'SDLG', nameAr: 'SDLG', icon: 'Truck', imageUrl: '/portfolio/machinery/excavators/sdlg.png', specs: JSON.stringify({ 'Available Models': 'LG6210E' }), displayOrder: 4 },
      ],
    },
    {
      slug: 'machinery-wheel-loaders',
      titleEn: 'Wheel Loaders', titleAr: 'الرافعات الشوكية',
      descriptionEn: 'Robust loaders for large-scale logistics and site preparation.',
      descriptionAr: 'رافعات قوية للعمليات اللوجستية وتجهيز المواقع على نطاق واسع.',
      category: 'Heavy Machinery', imageUrl: '/portfolio/machinery_bg.jpg', order: 11,
      products: [
        { nameEn: 'Caterpillar', nameAr: 'كاتربيلار', icon: 'Truck', imageUrl: '/portfolio/machinery/wheel-loaders/cat.png', specs: JSON.stringify({ 'Available Models': '950L, 966L, 980L' }), displayOrder: 0 },
        { nameEn: 'Volvo', nameAr: 'فولفو', icon: 'Truck', imageUrl: '/portfolio/machinery/wheel-loaders/volvo.png', specs: JSON.stringify({ 'Available Models': 'L120H, L150H' }), displayOrder: 1 },
        { nameEn: 'SDLG', nameAr: 'SDLG', icon: 'Truck', imageUrl: '/portfolio/machinery/wheel-loaders/sdlg.png', specs: JSON.stringify({ 'Available Models': 'LG958L' }), displayOrder: 2 },
        { nameEn: 'Komatsu', nameAr: 'كوماتسو', icon: 'Truck', imageUrl: '/portfolio/machinery/wheel-loaders/komatsu.png', specs: JSON.stringify({ 'Available Models': 'WA470, WA600' }), displayOrder: 3 },
        { nameEn: 'SANY', nameAr: 'ساني', icon: 'Truck', imageUrl: '/portfolio/machinery/wheel-loaders/sany.png', specs: JSON.stringify({ 'Available Models': 'SW955K' }), displayOrder: 4 },
      ],
    },
    {
      slug: 'machinery-bulldozers',
      titleEn: 'Bulldozers', titleAr: 'الجرافات',
      descriptionEn: 'Heavy-duty pushing power for land clearing and bulk earthmoving.',
      descriptionAr: 'قوة دفع للخدمة الشاقة لتطهير الأراضي ونقل التربة السائبة.',
      category: 'Heavy Machinery', imageUrl: '/portfolio/machinery_bg.jpg', order: 12,
      products: [
        { nameEn: 'Caterpillar', nameAr: 'كاتربيلار', icon: 'Truck', imageUrl: '/portfolio/machinery/bulldozers/cat.png', specs: JSON.stringify({ 'Available Models': 'D8R, D8T, D9' }), displayOrder: 0 },
        { nameEn: 'Komatsu', nameAr: 'كوماتسو', icon: 'Truck', imageUrl: '/portfolio/machinery/bulldozers/komatsu.png', specs: JSON.stringify({ 'Available Models': 'D155A, D275A' }), displayOrder: 1 },
        { nameEn: 'Shantui', nameAr: 'شانتوي', icon: 'Truck', imageUrl: '/portfolio/machinery/bulldozers/shantui.png', specs: JSON.stringify({ 'Available Models': 'SD32' }), displayOrder: 2 },
        { nameEn: 'SANY', nameAr: 'ساني', icon: 'Truck', imageUrl: '/portfolio/machinery/bulldozers/sany.png', specs: JSON.stringify({ 'Available Models': 'SYT160C' }), displayOrder: 3 },
        { nameEn: 'SDLG', nameAr: 'SDLG', icon: 'Truck', imageUrl: '/portfolio/machinery/bulldozers/sdlg.png', specs: JSON.stringify({ 'Available Models': 'B877F' }), displayOrder: 4 },
      ],
    },
    {
      slug: 'machinery-motor-graders',
      titleEn: 'Motor Graders', titleAr: 'ممهدات الطرق',
      descriptionEn: 'Precision equipment for leveling and road construction.',
      descriptionAr: 'معدات دقيقة لتسوية وتمهيد وإنشاء الطرق.',
      category: 'Heavy Machinery', imageUrl: '/portfolio/machinery_bg.jpg', order: 13,
      products: [
        { nameEn: 'Caterpillar', nameAr: 'كاتربيلار', icon: 'Truck', imageUrl: '/portfolio/machinery/motor-graders/caterpillar-140k-motor-grader.png', specs: JSON.stringify({ 'Available Models': '140K, 140GC' }), displayOrder: 0 },
        { nameEn: 'Komatsu', nameAr: 'كوماتسو', icon: 'Truck', imageUrl: '/portfolio/machinery/motor-graders/komatsu-gd655-motor-grader.png', specs: JSON.stringify({ 'Available Models': 'GD655' }), displayOrder: 1 },
        { nameEn: 'SANY', nameAr: 'ساني', icon: 'Truck', imageUrl: '/portfolio/machinery/motor-graders/sany-stg170c-motor-grader.png', specs: JSON.stringify({ 'Available Models': 'STG170C' }), displayOrder: 2 },
        { nameEn: 'SDLG', nameAr: 'SDLG', icon: 'Truck', imageUrl: '/portfolio/machinery/motor-graders/sdlg-g9190-motor-grader.png', specs: JSON.stringify({ 'Available Models': 'G9190' }), displayOrder: 3 },
        { nameEn: 'Volvo', nameAr: 'فولفو', icon: 'Truck', imageUrl: '/portfolio/machinery/motor-graders/volvo-g940-motor-grader.png', specs: JSON.stringify({ 'Available Models': 'G940' }), displayOrder: 4 },
      ],
    },
    {
      slug: 'machinery-backhoe-loaders',
      titleEn: 'Backhoe Loaders', titleAr: 'اللوادر الحفارة',
      descriptionEn: 'Multi-functional units for urban and utility projects.',
      descriptionAr: 'وحدات متعددة الوظائف للمشاريع الحضرية ومشاريع المرافق.',
      category: 'Heavy Machinery', imageUrl: '/portfolio/machinery_bg.jpg', order: 14,
      products: [
        { nameEn: 'JCB', nameAr: 'JCB', icon: 'Truck', imageUrl: '/portfolio/machinery/backhoe-loaders/jcb-3cx-backhoe-loader.png', specs: JSON.stringify({ 'Available Models': '3CX' }), displayOrder: 0 },
        { nameEn: 'Caterpillar', nameAr: 'كاتربيلار', icon: 'Truck', imageUrl: '/portfolio/machinery/backhoe-loaders/caterpillar-428-backhoe-loader.png', specs: JSON.stringify({ 'Available Models': '428, 432' }), displayOrder: 1 },
        { nameEn: 'CASE', nameAr: 'كيس', icon: 'Truck', imageUrl: '/portfolio/machinery/backhoe-loaders/case-580t-backhoe-loader.png', specs: JSON.stringify({ 'Available Models': '580T' }), displayOrder: 2 },
        { nameEn: 'SDLG', nameAr: 'SDLG', icon: 'Truck', imageUrl: '/portfolio/machinery/backhoe-loaders/sdlg-b877-backhoe-loader.png', specs: JSON.stringify({ 'Available Models': 'B877' }), displayOrder: 3 },
        { nameEn: 'Komatsu', nameAr: 'كوماتسو', icon: 'Truck', imageUrl: '/portfolio/machinery/backhoe-loaders/komatsu-wb97r-backhoe-loader.png', specs: JSON.stringify({ 'Available Models': 'WB97R' }), displayOrder: 4 },
      ],
    },
  ]

  for (const cat of machineryCategories) {
    const existing = await prisma.portfolioItem.findUnique({ where: { slug: cat.slug } })
    if (!existing) {
      const created = await prisma.portfolioItem.create({
        data: {
          slug: cat.slug,
          titleEn: cat.titleEn, titleAr: cat.titleAr,
          descriptionEn: cat.descriptionEn, descriptionAr: cat.descriptionAr,
          category: cat.category,
          imageUrl: cat.imageUrl,
          order: cat.order,
          status: 'published',
        },
      })
      await prisma.portfolioProduct.createMany({
        data: cat.products.map((p) => ({ ...p, portfolioItemId: created.id, active: true })),
      })
      console.log(`✅ Seeded machinery category: ${cat.titleEn} (${cat.products.length} products)`)
    } else {
      console.log(`ℹ  Machinery category already exists: ${cat.titleEn}`)
    }
  }

  // --- Seed Impact Stats ---
  const statsCount = await prisma.impactStat.count()
  if (statsCount === 0) {
    await prisma.impactStat.createMany({
      data: [
        { labelEn: 'Containers Processed', labelAr: 'حاوية تم شحنها', value: '450', suffix: '+', order: 0 },
        { labelEn: 'Global Clients', labelAr: 'عميل حول العالم', value: '17', suffix: '', order: 1 },
        { labelEn: 'Countries Reached', labelAr: 'دولة تم الوصول إليها', value: '13', suffix: '', order: 2 },
        { labelEn: 'Years of Expertise', labelAr: 'سنوات من الخبرة', value: '3', suffix: '+', order: 3 },
      ],
    })
    console.log('✅ Impact stats seeded (4 records)')
  } else {
    console.log(`ℹ  Stats already exist (${statsCount} records)`)
  }

  // --- Seed Global Site Settings ---
  await prisma.siteSettings.upsert({
    where: { id: "global" },
    update: {},
    create: { id: "global" },
  })
  console.log('✅ Global site settings initialized')

  // --- Seed Vault Documents ---
  const vaultCount = await prisma.vaultDocument.count()
  if (vaultCount === 0) {
    await prisma.vaultDocument.createMany({
      data: [
        {
          titleEn: 'Shanghai Business Registration', titleAr: 'تسجيل الأعمال في شنغهاي',
          descriptionEn: 'Official Entity Status & Operating License', descriptionAr: 'حالة الكيان الرسمي وتصريح التشغيل',
          categoryEn: 'Trade & Legal Compliance', categoryAr: 'الامتثال التجاري والقانوني',
          icon: 'Building2', status: 'Verified', validUntil: 'Valid 2026-2030', displayOrder: 0, active: true,
        },
        {
          titleEn: 'Export & Customs License', titleAr: 'رخصة التصدير والجمارك',
          descriptionEn: 'Verified Permits for International Trade Lanes', descriptionAr: 'تصاريح موثقة لمسارات التجارة الدولية',
          categoryEn: 'Trade & Legal Compliance', categoryAr: 'الامتثال التجاري والقانوني',
          icon: 'Scale', status: 'Verified', validUntil: 'Valid 2026-2030', displayOrder: 1, active: true,
        },
        {
          titleEn: 'Financial Standing & Tax Clearance', titleAr: 'الوضع المالي والتخليص الضريبي',
          descriptionEn: 'Certificate of Good Standing', descriptionAr: 'شهادة حسن السيرة',
          categoryEn: 'Trade & Legal Compliance', categoryAr: 'الامتثال التجاري والقانوني',
          icon: 'FileCheck', status: 'Verified', validUntil: 'Q1 2026', displayOrder: 2, active: true,
        },
        {
          titleEn: 'Global Carrier Certifications', titleAr: 'شهادات ناقلات الشحن العالمية',
          descriptionEn: 'Licensed International Logistics Partners', descriptionAr: 'شركاء لوجستيون دوليون مرخصون',
          categoryEn: 'Logistics & Shipping Safety', categoryAr: 'الخدمات اللوجستية وتأمين الشحن',
          icon: 'Anchor', status: 'Active', validUntil: 'Continuous Renewal', displayOrder: 3, active: true,
        },
        {
          titleEn: 'Secure Handling Standards', titleAr: 'معايير المناولة الآمنة',
          descriptionEn: 'Containerization & Cargo Protection Protocols', descriptionAr: 'بروتوكولات الشحن وحماية البضائع',
          categoryEn: 'Logistics & Shipping Safety', categoryAr: 'الخدمات اللوجستية وتأمين الشحن',
          icon: 'ShieldCheck', status: 'Active', validUntil: 'ISO Compliant', displayOrder: 4, active: true,
        },
      ],
    })
    console.log('✅ Vault documents seeded (5 records)')
  } else {
    console.log(`ℹ  Vault documents already exist (${vaultCount} records)`)
  }

  // --- Seed Brand Logos ---
  const brandsCount = await prisma.brandLogo.count()
  if (brandsCount === 0) {
    await prisma.brandLogo.createMany({
      data: [
        { name: 'Caterpillar', displayOrder: 0, active: true },
        { name: 'Komatsu', displayOrder: 1, active: true },
        { name: 'SANY', displayOrder: 2, active: true },
        { name: 'Volvo', displayOrder: 3, active: true },
        { name: 'SDLG', displayOrder: 4, active: true },
        { name: 'Shantui', displayOrder: 5, active: true },
        { name: 'JCB', displayOrder: 6, active: true },
        { name: 'CASE', displayOrder: 7, active: true },
        { name: 'Maersk', displayOrder: 8, active: true },
        { name: 'DHL', displayOrder: 9, active: true },
      ],
    })
    console.log('✅ Brand logos seeded (10 records)')
  } else {
    console.log(`ℹ  Brand logos already exist (${brandsCount} records)`)
  }

  // --- Seed Social Media defaults in SiteSettings ---
  await prisma.siteSettings.update({
    where: { id: 'global' },
    data: {
      socialLinkedIn: 'https://linkedin.com/company/darchang',
      socialTwitter: 'https://twitter.com/darchang',
      socialFacebook: 'https://facebook.com/darchang.consulting',
      socialInstagram: 'https://instagram.com/darchang.global',
      socialWhatsApp: 'https://wa.me/8618721160270',
    },
  }).catch(() => {
    // SiteSettings may not exist yet — that's fine, will be created on next settings save
  })
  console.log('✅ Social media defaults seeded')

  console.log('\n🎉 Seed complete!')
  console.log(`   Admin: ${adminEmail} / ${adminPassword}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

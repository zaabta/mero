import Image from 'next/image';
import {
  BatteryCharging,
  BadgeCheck,
  CircleDot,
  CornerUpRight,
  Filter,
  Gauge,
  History,
  Mail,
  Package,
  Phone,
  Ruler,
  ShieldCheck,
  Zap,
  Wrench,
} from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import ContactForm from '../components/ContactForm';
import QuoteButton from '../components/QuoteButton';
import ContactMapLoader from '../components/contact/ContactMapLoader';
import BrandGrid from '../components/BrandGrid';
import { getTranslations } from 'next-intl/server';
import { permanentRedirect } from 'next/navigation';
import type { Locale } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site';
import { BUSINESS } from '@/lib/business';
import TrackedAnchor from '@/components/TrackedAnchor';
import WhatsAppButton from '@/components/WhatsAppButton';

const products = [
  {
    title: 'الإطارات الفاخرة',
    titleEn: 'Premium Tires',
    tag: 'المرتبة الأولى',
    tagEn: 'Top tier',
    image: '/images/hero-tire.jpeg',
    desc: 'ثبات فائق، تحكم استثنائي، ومقاومة عالية لدرجات الحرارة على الطرق السريعة والصحراوية.',
    descEn: 'Reliable grip, control, and heat resistance for highways and desert roads.',
    footer: 'عقود توريد وتجزئة',
    detail: 'طلب تسعير',
  },
  {
    title: 'البطاريات عالية الأداء',
    titleEn: 'High-performance batteries',
    tag: 'عالية الطاقة',
    tagEn: 'High energy',
    image: '/images/battery.jpeg',
    desc: 'طاقة تشغيلية قوية ومستدامة مصممة لظروف المناخ الحار وأقصى درجات التحمل دون انقطاع.',
    descEn: 'Strong, dependable starting power designed for hot climates and demanding conditions.',
    footer: 'ضمان استبدال معتمد',
    detail: 'طلب تسعير',
  },
  {
    title: 'زيوت المحركات المتطورة',
    titleEn: 'Advanced engine oils',
    tag: 'تخليقي بالكامل',
    tagEn: 'Fully synthetic',
    image: '/images/engine.jpeg',
    desc: 'حماية متقدمة للمحرك مع تقنيات تخليقية تحافظ على سلاسة الأداء وعمر أطول للمركبة تحت الضغط.',
    descEn: 'Advanced engine protection with synthetic technology for smooth, lasting performance.',
    footer: 'لزوجة 5W-30 / 0W-20',
    detail: 'طلب تسعير',
  },
  {
    title: 'الفلاتر والملحقات',
    titleEn: 'Filters and accessories',
    tag: 'كفاءة تنقية %99',
    tagEn: '99% filtration efficiency',
    image: '/images/oil-filter.jpeg',
    desc: 'فلاتر هواء وزيت وقطع غيار سريعة التبديل تضمن كفاءة استهلاك الوقود ونقاء المنظومة بالكامل.',
    descEn: 'Air and oil filters plus essential parts for clean, efficient vehicle care.',
    footer: 'مواصفات المصنع الأصلية',
    detail: 'طلب تسعير',
  },
];

function ProductCard({
  product,
  english,
}: {
  product: (typeof products)[number];
  english: boolean;
}) {
  const ProductIcon =
    product.title === 'الإطارات الفاخرة'
      ? CircleDot
      : product.title === 'البطاريات عالية الأداء'
        ? BatteryCharging
        : product.title === 'زيوت المحركات المتطورة'
          ? Gauge
          : Filter;
  return (
    <article className="group overflow-hidden rounded-md border border-white/10 bg-carbon transition hover:border-gold/50">
      <div className="relative h-56 overflow-hidden bg-raised">
        <Image
          src={product.image}
          alt={english ? product.titleEn : product.title}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent" />
        <span className="label absolute right-3 top-3 rounded-full bg-void/85 px-2.5 py-1 text-[9px] text-gold">
          {english ? product.tagEn : product.tag}
        </span>
      </div>
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between gap-2">
          <h3 className="font-arabic text-xl font-bold transition-colors group-hover:text-gold">
            {english ? product.titleEn : product.title}
          </h3>
          <ProductIcon className="shrink-0 text-gold" size={19} strokeWidth={1.8} />
        </div>
        <p className="mt-2 text-xs leading-6 text-muted">
          {english ? product.descEn : product.desc}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-gold">
          <span className="text-[10px] text-gold">{english ? product.tagEn : product.footer}</span>
          <QuoteButton
            english={english}
            product={
              product.title === 'الإطارات الفاخرة'
                ? 'tires'
                : product.title === 'البطاريات عالية الأداء'
                  ? 'batteries'
                  : product.title === 'زيوت المحركات المتطورة'
                    ? 'oils'
                    : 'filters'
            }
            label={english ? 'Request a quote' : product.detail}
          />
        </div>
      </div>
    </article>
  );
}
export async function Home({ locale }: { locale: Locale }) {
  const english = locale === 'en';
  const t = await getTranslations('home');
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: english ? BUSINESS.legalNameEn : BUSINESS.legalNameAr,
        alternateName: BUSINESS.brandName,
        url: SITE_URL,
        logo: BUSINESS.logoUrl,
        email: BUSINESS.email,
        telephone: BUSINESS.phone,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: BUSINESS.brandName,
        url: SITE_URL,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: BUSINESS.languages,
      },
      {
        '@type': 'AutoPartsStore',
        '@id': `${SITE_URL}/#localbusiness`,
        name: `${BUSINESS.brandName} | ${english ? BUSINESS.legalNameEn : BUSINESS.legalNameAr}`,
        url: `${SITE_URL}/${locale}`,
        image: `${SITE_URL}/images/og/${english ? 'mero-og-image-en.jpg' : 'mero-og-image.jpg'}`,
        logo: BUSINESS.logoUrl,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: english ? BUSINESS.streetAddressEn : BUSINESS.streetAddressAr,
          addressLocality: english ? BUSINESS.cityEn : BUSINESS.cityAr,
          postalCode: BUSINESS.postalCode,
          addressCountry: BUSINESS.countryCode,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: BUSINESS.latitude,
          longitude: BUSINESS.longitude,
        },
        hasMap: BUSINESS.mapUrl,
        areaServed: BUSINESS.serviceArea,
        availableLanguage: BUSINESS.languages,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: BUSINESS.whatsapp,
          contactType: 'customer service',
          availableLanguage: BUSINESS.languages,
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/${locale}#webpage`,
        url: `${SITE_URL}/${locale}`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#localbusiness` },
        inLanguage: locale,
      },
    ],
  };
  return (
    <main dir={english ? 'ltr' : 'rtl'}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroCarousel />
      <section
        dir={english ? 'ltr' : 'rtl'}
        className="w-full overflow-hidden border-b border-white/10 bg-[#1b1c1e] py-4 shadow-inner"
      >
        <div className="container grid min-h-[76px] items-center gap-6 py-3 sm:grid-cols-3 sm:py-0">
          <div
            className={`mx-auto flex w-full max-w-[360px] items-center justify-start gap-4 ${english ? 'text-left' : 'flex-row-reverse text-right'}`}
          >
            <ShieldCheck className="text-gold" size={34} strokeWidth={1.8} />
            <div className="min-w-0 flex-1">
              <b className="font-arabic text-lg leading-6">
                {english ? 'Safety and fitment' : 'ضمان أمان ومطابقة'}
              </b>
              <p className="mt-1 text-xs text-muted">
                {english
                  ? 'Carefully selected for your vehicle'
                  : 'مطابق لأعلى مواصفات هيئات المقاييس الخليجية'}
              </p>
            </div>
          </div>
          <div
            className={`mx-auto flex w-full max-w-[360px] items-center justify-start gap-4 ${english ? 'text-left' : 'flex-row-reverse text-right'}`}
          >
            <Zap className="text-gold" size={34} strokeWidth={1.8} />
            <div className="min-w-0 flex-1">
              <b className="font-arabic text-lg leading-6">
                {english ? 'Reliable durability' : 'قوة تحمل قصوى'}
              </b>
              <p className="mt-1 text-xs text-muted">
                {english
                  ? 'Consistent everyday performance'
                  : 'أداء معتمد للظروف الصحراوية والحرارة العالية'}
              </p>
            </div>
          </div>
          <div
            className={`mx-auto flex w-full max-w-[360px] items-center justify-start gap-4 ${english ? 'text-left' : 'flex-row-reverse text-right'}`}
          >
            <Package className="text-gold" size={34} strokeWidth={1.8} />
            <div className="min-w-0 flex-1">
              <b className="font-arabic text-lg leading-6">
                {english ? 'Supply readiness' : 'جاهزية التوريد الفوري'}
              </b>
              <p className="mt-1 text-xs text-muted">
                {english
                  ? 'Contact us for specifications and availability'
                  : 'تواصل معنا لمعرفة المواصفات والتوفر'}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="products" className="bg-void py-16 lg:py-20">
        <div className="container">
          <div className="mb-9 flex items-end justify-between">
            <div>
              <p className="label mb-3 flex items-center gap-2 text-gold">
                <span className="h-2 w-2 rounded-full bg-gold" />
                {english ? 'ENGINEERED PRODUCT RANGE' : 'تشكيلة المنتجات الهندسية'}
              </p>
              <h2 className="font-arabic text-3xl font-bold">
                {english ? 'Premium product categories' : 'فئات المنتجات المتميزة'}
              </h2>
              <p className="mt-3 max-w-2xl text-xs leading-6 text-muted">
                {english
                  ? 'A complete selection of automotive products carefully chosen for everyday driving and Gulf roads.'
                  : 'مجموعة متكاملة من أجود قطع غيار ومستلزمات السيارات المصممة لتحمل ظروف الطريق الخليجية وتأمين رحلات يومية وسريعة بأعلى معايير الرفاهية والأمان.'}
              </p>
            </div>
            <span className="hidden text-[10px] text-muted sm:block">
              {english ? 'Wholesale and retail supply available' : 'توريد جملة وتجزئة متاح'}
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.title} product={product} english={english} />
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="bg-[#0d0e10] py-8">
        <div className="container">
          <div className="grid overflow-hidden rounded-xl bg-carbon lg:grid-cols-12" dir="ltr">
            <div className="relative min-h-[240px] lg:col-span-5 lg:min-h-[280px]">
              <Image
                src="/images/engineering-tire.png"
                alt={english ? 'Mero tire endurance engineering' : 'هندسة تحمل إطارات Mero'}
                fill
                sizes="(max-width: 1023px) 100vw, 42vw"
                className="hidden object-cover lg:block"
              />
              <Image
                src="/images/engineering-tire-mobile.png"
                alt={english ? 'Mero tire endurance engineering' : 'هندسة تحمل إطارات Mero'}
                fill
                sizes="(max-width: 1023px) 100vw, 42vw"
                className="object-cover lg:hidden"
              />
            </div>
            <div
              className={`flex flex-col px-4 py-4 lg:col-span-7 lg:px-8 lg:py-8 ${english ? 'text-left' : 'text-right'}`}
              dir={english ? 'ltr' : 'rtl'}
            >
              <p className="label mb-3 px-4 text-gold">
                {english ? 'SUPERIOR DURABILITY • GCC ROADS' : 'هندسة التحمل الفائق • GCC ROADS'}
              </p>
              <h2 className="font-arabic text-3xl font-bold">
                {english ? 'Performance starts with the details' : 'أداء يبدأ من التفاصيل'}
              </h2>
              <p className="mt-4 text-base leading-8 text-muted">
                {english
                  ? 'At Mero, we provide advanced solutions that elevate your driving experience and give you confidence and control on every journey.'
                  : '“نلتزم في إطار الثريا (MERO) بتقديم حلول متطورة ترتقي بتجربة قيادتك وتمنحك الثقة التامة والتحكم المطلق في كل منعطف ورحلة.”'}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-white/75">
                <span className="inline-flex items-center gap-2">
                  <CornerUpRight size={17} className="shrink-0 text-gold" />
                  {english ? 'Superior cornering stability' : 'استقرار فائق على المنعطفات'}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Ruler size={17} className="shrink-0 text-gold" />
                  {english ? 'Shorter braking distance' : 'مسافة فرملة أقصر'}
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck size={17} className="shrink-0 text-gold" />
                  {english ? 'Enhanced wear resistance' : 'مقاومة تآكل مدعمة'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="brands" className="py-16 lg:py-20">
        <div className="container text-center">
          <p className="label text-gold">{english ? 'BRANDS' : 'العلامات التجارية'}</p>
          <h2 className="mt-3 font-arabic text-3xl font-bold">{t('brandsTitle')}</h2>
          <div className="mx-auto mt-3 h-px w-16 bg-gold" />
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted">
            {t('brandsDescription')}
          </p>
          <BrandGrid />
        </div>
      </section>
      <section id="why-mero" className="py-20">
        <div className="container text-center">
          <p className="label text-gold">{english ? 'OUR DIFFERENCE' : 'معايير التميز'}</p>
          <h2 className="mt-3 font-arabic text-3xl font-bold">
            {english ? 'Why choose Mero?' : 'لماذا تختار Mero؟'}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-muted">
            {english
              ? 'We offer a professional experience and carefully selected products for drivers and workshops.'
              : 'نعمل على تقديم تجربة مهنية ومنتجات مختارة تناسب احتياجات السائقين وورش السيارات.'}
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card p-6">
              <ShieldCheck className="mx-auto text-gold" />
              <h3 className="mt-4 font-arabic">{english ? 'Product quality' : 'جودة المنتجات'}</h3>
              <p className="mt-2 text-xs leading-6 text-muted">
                {english ? 'Carefully selected products.' : 'منتجات مختارة بعناية.'}
              </p>
            </div>
            <div className="card p-6">
              <BatteryCharging className="mx-auto text-gold" />
              <h3 className="mt-4 font-arabic">
                {english ? 'Reliable performance' : 'أداء موثوق'}
              </h3>
              <p className="mt-2 text-xs leading-6 text-muted">
                {english ? 'Solutions for everyday needs.' : 'حلول لاحتياجاتك اليومية.'}
              </p>
            </div>
            <div className="card p-6">
              <Filter className="mx-auto text-gold" />
              <h3 className="mt-4 font-arabic">{english ? 'Complete range' : 'تشكيلة متكاملة'}</h3>
              <p className="mt-2 text-xs leading-6 text-muted">
                {english ? 'Tires, oils, and filters.' : 'إطارات وزيوت وفلاتر.'}
              </p>
            </div>
            <div className="card p-6">
              <Wrench className="mx-auto text-gold" />
              <h3 className="mt-4 font-arabic">{english ? 'Customer service' : 'خدمة العملاء'}</h3>
              <p className="mt-2 text-xs leading-6 text-muted">
                {english ? 'We help you choose the right fit.' : 'نساعدك في اختيار الأنسب.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about-section" className="w-full bg-[#1b1c1e] py-10 lg:py-12">
        <div className="container grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="relative min-w-0 lg:col-span-5">
            <div className="relative min-h-[420px] overflow-hidden rounded-xl bg-carbon shadow-2xl lg:min-h-[480px]">
              <Image
                src="/images/team.jpeg"
                alt="فريق Mero"
                fill
                sizes="(max-width: 1023px) 100vw, 42vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/95 via-void/20 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 rounded-xl bg-void/90 p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                    <Wrench size={20} />
                  </div>
                  <div>
                    <div className="font-arabic text-base font-bold">
                      {english ? 'Specialist technical team' : 'فريق فني متخصص ومعتمد'}
                    </div>
                    <div className="text-xs text-muted">
                      {english
                        ? 'Field experience in vehicle inspection and preparation'
                        : 'خبرة ميدانية في فحص ومطابقة وتجهيز المركبات'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex min-w-0 flex-col gap-5 lg:col-span-7 ${english ? 'text-left' : 'text-right'}`}
          >
            <div className="label flex items-center gap-2 text-gold">
              <History size={18} />
              {english ? 'ABOUT THE COMPANY AND OUR JOURNEY' : 'عن الشركة ومسيرتنا'}
            </div>
            <h2 className="max-w-full break-words font-arabic text-4xl font-bold leading-[1.35] lg:text-5xl xl:text-6xl">
              {english
                ? 'Al Thuraya Automotive Services (MERO)'
                : 'شركة إطار الثريا لخدمات السيارات (MERO)'}
            </h2>
            <div className="space-y-3 text-sm leading-8 text-muted">
              <p>
                {english
                  ? 'Al Thuraya Automotive Services was founded to be a trusted strategic partner for the automotive sector through the import, distribution, and supply of tires, batteries, engine oils, and fast-moving parts.'
                  : 'تأسست شركة إطار الثريا لتكون الشريك الاستراتيجي الموثوق في تلبية احتياجات قطاع السيارات من خلال استيراد وتوزيع وتوريد أجود أصناف الإطارات والبطاريات وزيوت المحركات وقطع الاستهلاك السريع.'}
              </p>
              <p>
                {english
                  ? 'Our operating strategy focuses on the specific road and weather conditions of Saudi Arabia, with a commitment to safety and improving fleet and private-vehicle performance.'
                  : 'نركز في استراتيجيتنا التشغيلية على تلبية الطبيعة الخاصة للطرق وظروف الطقس في المملكة العربية السعودية، حيث نلتزم بمعايير السلامة والأمان الصارمة ورفع كفاءة أداء الأساطيل والمركبات الخاصة.'}
              </p>
              <p>
                {english
                  ? 'Through experienced engineering and technical teams, we help our customers access reliable products for a comfortable and long-lasting driving experience.'
                  : 'من خلال كوادر هندسية وفنية متمرسة، نضمن لعملائنا توفير منتجات معتمدة ذات موثوقية عالية تمنحهم تجربة قيادة مريحة وأماناً يدوم طويلاً.'}
              </p>
            </div>
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg bg-carbon p-3 text-sm">
                <ShieldCheck className="shrink-0 text-gold" size={22} />
                <span>
                  {english
                    ? 'Absolute commitment to authenticity and quality'
                    : 'التزام مطلق بالأصالة والجودة'}
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-carbon p-3 text-sm">
                <Package className="shrink-0 text-gold" size={22} />
                <span>
                  {english ? 'Flexible and continuous supply chains' : 'سلاسل إمداد مرنة ومستمرة'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="certifications" className="w-full bg-[#0d0e10] py-12 lg:py-16">
        <div className="container">
          <div className="rounded-xl bg-carbon p-6 shadow-lg lg:p-8">
            <div className="grid items-center gap-6 lg:grid-cols-12">
              <div className="flex flex-col gap-2 lg:col-span-5">
                <span className="label font-bold text-gold">
                  {english ? 'CERTIFICATIONS AND STANDARDS' : 'الاعتمادات والمقاييس'}
                </span>
                <h3 className="font-arabic text-2xl font-bold">
                  {english ? 'Safety and performance standards' : 'مطابقة معايير السلامة والأداء'}
                </h3>
                <p className="text-sm leading-7 text-muted">
                  {english
                    ? 'MERO products supplied through our network are reviewed against applicable standards and quality requirements.'
                    : 'تخضع كافة منتجات MERO الموردة للفحص الدوري ومطابقة المعايير القياسية لدول مجلس التعاون الخليجي وهيئات التقييس المعتمدة.'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-7">
                {[
                  {
                    code: 'SASO',
                    ar: 'المواصفات السعودية',
                    en: 'Saudi standards',
                    icon: BadgeCheck,
                  },
                  { code: 'GSO', ar: 'المقاييس الخليجية', en: 'Gulf standards', icon: ShieldCheck },
                  {
                    code: 'ISO 9001',
                    ar: 'إدارة الجودة',
                    en: 'Quality management',
                    icon: BadgeCheck,
                  },
                  {
                    code: 'DOT / E-MARK',
                    ar: 'معايير السلامة الدولية',
                    en: 'International safety',
                    icon: Gauge,
                  },
                ].map((standard) => (
                  <div
                    key={standard.code}
                    className="flex min-h-24 flex-col items-center justify-center gap-1 rounded-lg bg-[#292a2c] p-3 text-center"
                  >
                    <standard.icon size={22} className="text-gold" />
                    <span className="font-cairo text-sm font-bold">{standard.code}</span>
                    <span className="text-[10px] text-muted">
                      {english ? standard.en : standard.ar}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" dir={english ? 'ltr' : 'rtl'} className="w-full bg-void py-16 lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex min-w-0 flex-col gap-8 lg:col-span-5">
            <div className="flex flex-col gap-3">
              <span className="label text-gold">
                {english ? 'CONTACT & SUPPLY CENTER' : 'مركز التواصل والتوريد'}
              </span>
              <h2 className="font-arabic text-3xl font-bold leading-tight lg:text-4xl">
                {english ? 'Talk to our experts today' : 'تواصل مع خبرائنا اليوم'}
              </h2>
              <p className="text-sm leading-8 text-muted">
                {english
                  ? 'We welcome your inquiries about supply requests, wholesale quotations, or commercial partnerships in Saudi Arabia.'
                  : 'يسعدنا استقبال استفساراتكم بخصوص طلبات التوريد، عروض أسعار الجملة، أو الشراكات التجارية في المملكة العربية السعودية.'}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 rounded-xl bg-carbon p-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold">
                  <Phone size={22} />
                </div>
                <div
                  className={`flex flex-1 flex-col gap-1 text-sm ${english ? 'text-left' : 'text-right'}`}
                >
                  <span className="font-arabic font-bold">
                    {english ? 'Direct phone and support' : 'الهاتف المباشر والدعم'}
                  </span>
                  <TrackedAnchor
                    href="tel:0112204999"
                    dir="ltr"
                    className="font-semibold text-gold"
                    eventName="phone_click"
                    eventParameters={{ link_location: 'contact', page_language: locale }}
                  >
                    011 220 4999
                  </TrackedAnchor>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-carbon p-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold">
                  <Mail size={22} />
                </div>
                <div
                  className={`flex flex-1 flex-col gap-1 text-sm ${english ? 'text-left' : 'text-right'}`}
                >
                  <span className="font-arabic font-bold">
                    {english ? 'Business email' : 'البريد الإلكتروني التجاري'}
                  </span>
                  <TrackedAnchor
                    href="mailto:Thrya.tire@gmail.com"
                    dir="ltr"
                    className="text-muted"
                    eventName="email_click"
                    eventParameters={{ link_location: 'contact', page_language: locale }}
                  >
                    Thrya.tire@gmail.com
                  </TrackedAnchor>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-carbon p-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold">
                  <Package size={22} />
                </div>
                <div
                  className={`flex flex-1 flex-col gap-1 text-sm ${english ? 'text-left' : 'text-right'}`}
                >
                  <span className="font-arabic font-bold">
                    {english ? 'Main branch' : 'الفرع الرئيسي'}
                  </span>
                  <TrackedAnchor
                    href="https://www.google.com/maps/search/?api=1&query=Car+Park+Complex+Al+Malaz+Riyadh+Saudi+Arabia"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted"
                    eventName="map_open"
                    eventParameters={{ page_language: locale }}
                  >
                    {english
                      ? 'Riyadh – Al Malaz District – Car Park Complex'
                      : 'الرياض - حي الملز - مجمع كار بارك'}
                  </TrackedAnchor>
                  <TrackedAnchor
                    href="https://www.google.com/maps/search/?api=1&query=Prince+Fahd+bin+Ibrahim+Al+Saud+Street+Riyadh+Saudi+Arabia"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted"
                    eventName="map_open"
                    eventParameters={{ page_language: locale }}
                  >
                    {english
                      ? 'Prince Fahd bin Ibrahim Al Saud Street • Postal Code: 12644'
                      : 'شارع الأمير فهد بن إبراهيم آل سعود • الرمز البريدي: 12644'}
                  </TrackedAnchor>
                  <span dir="ltr" className="pt-1 text-xs text-gold">
                    <TrackedAnchor
                      href="tel:0112204999"
                      eventName="phone_click"
                      eventParameters={{ link_location: 'contact_branch', page_language: locale }}
                    >
                      011 220 4999
                    </TrackedAnchor>{' '}
                    •{' '}
                    <TrackedAnchor
                      href="mailto:Thrya.tire@gmail.com"
                      eventName="email_click"
                      eventParameters={{ link_location: 'contact_branch', page_language: locale }}
                    >
                      Thrya.tire@gmail.com
                    </TrackedAnchor>
                  </span>
                </div>
              </div>
              <WhatsAppButton locale={locale} location="contact" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-carbon p-5 shadow-2xl lg:p-8">
              <h3 className="font-arabic text-xl font-bold">
                {english ? 'Inquiry and quotation form' : 'نموذج الاستفسار وطلب الأسعار'}
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted">
                {english
                  ? 'Fill in the details below and a sales representative will contact you shortly.'
                  : 'املأ البيانات أدناه وسيقوم ممثل المبيعات بالتواصل معكم خلال وقت قياسي.'}
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
        <div className="container pt-10">
          <ContactMapLoader />
        </div>
      </section>
    </main>
  );
}

export default function RootPage() {
  permanentRedirect('/ar');
}

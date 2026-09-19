'use client';

import Image, {getImageProps} from 'next/image';
import { BatteryCharging, Droplets, Gauge } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

const defaultSlides = [
  {
    image: '/images/hero-tire-ar.png',
    imageLtr: '/images/hero-tire-ltr.png',
    imageMobile: '/images/hero-tire-mobile.png',
    alt: 'إطار Mero على سيارة رياضية',
    altEn: 'Mero tire on a sports car',
    eyebrow: 'هندسة الإطارات الفائقة للظروف الصحراوية',
    title: 'إطارات عالية الجودة',
    accent: 'لرحلة أكثر أماناً',
    description: 'ثبات مطلق وتحكم استثنائي مع كل ما تحتاجه سيارتك في مكان واحد.',
    cta: 'تصفح الإطارات المعتمدة',
    icon: Gauge,
    meta: ['ضمان استبدال معتمد', 'مستورد ومعتمد'],
  },
  {
    image: '/images/hero-battery-premium.png',
    imageLtr: '/images/hero-battery-ltr.png',
    imageMobile: '/images/hero-battery-mobile.png',
    alt: 'بطارية Mero مع سيارة على الطريق',
    altEn: 'Mero battery with a car on the road',
    eyebrow: 'طاقة تشغيلية مستدامة • قوة تشغيل عالية',
    title: 'بطاريات فائقة الطاقة',
    accent: 'لتحمل أقصى الظروف',
    description: 'قوة تشغيلية فورية مصممة للتعامل مع درجات الحرارة العالية دون انقطاع.',
    cta: 'استكشف أنواع البطاريات',
    icon: BatteryCharging,
    meta: ['ضمان شامل', 'جاهزية التبديل السريع'],
  },
  {
    image: '/images/hero-oils-premium.png',
    imageLtr: '/images/hero-oils-ltr.png',
    imageMobile: '/images/hero-oils-mobile.png',
    alt: 'زيوت وفلاتر Mero',
    altEn: 'Mero oils and filters',
    eyebrow: 'زيوت تخليقية بالكامل • 5W-30 / 10W-40',
    title: 'زيوت محركات متطورة',
    accent: 'وقطع غيار بأعلى كفاءة',
    description: 'حماية متقدمة للمحرك مع زيوت وفلاتر مختارة للعناية المستمرة.',
    cta: 'عرض الزيوت والفلاتر',
    icon: Droplets,
    meta: ['حماية محرك مضاعفة', 'تشكيلة متكاملة'],
  },
];

export type HeroSlideOverride = {
  imageAr: string;
  imageEn: string;
  mobileImageAr: string;
  mobileImageEn: string;
  altAr: string;
  altEn: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  buttonAr: string;
  buttonEn: string;
};

type HeroSlide = (typeof defaultSlides)[number] & {
  imageMobileLtr?: string;
  titleEn?: string;
  descriptionEn?: string;
  ctaEn?: string;
};

function ResponsiveHeroImage({
  slide,
  english,
  priority,
}: {
  slide: HeroSlide;
  english: boolean;
  priority: boolean;
}) {
  const alt = english ? slide.altEn : slide.alt;
  const mobileImage = getImageProps({
    src: english ? (slide.imageMobileLtr ?? slide.imageMobile) : slide.imageMobile,
    alt,
    width: 1448,
    height: 1086,
    sizes: '(max-width: 639px) 100vw, 576px',
  }).props;

  return (
    <picture className="absolute inset-0 block">
      <source
        media="(max-width: 1023px)"
        srcSet={mobileImage.srcSet}
        sizes="(max-width: 639px) 100vw, 576px"
      />
      <Image
        src={english ? slide.imageLtr : slide.image}
        alt={alt}
        fill
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        sizes="100vw"
        className="object-cover object-center"
      />
    </picture>
  );
}

export default function HeroCarousel({slides: overrides}: {slides?: HeroSlideOverride[]}) {
  const slides: HeroSlide[] = defaultSlides.map((slide, index) => {
    const override = overrides?.[index];
    if (!override) return slide;
    return {
      ...slide,
      image: override.imageAr || slide.image,
      imageLtr: override.imageEn || slide.imageLtr,
      imageMobile: override.mobileImageAr || slide.imageMobile,
      imageMobileLtr: override.mobileImageEn || slide.imageMobile,
      alt: override.altAr || slide.alt,
      altEn: override.altEn || slide.altEn,
      title: override.titleAr || slide.title,
      titleEn: override.titleEn || slide.title,
      description: override.descriptionAr || slide.description,
      descriptionEn: override.descriptionEn || slide.description,
      cta: override.buttonAr || slide.cta,
      ctaEn: override.buttonEn || slide.cta,
    };
  });
  const [active, setActive] = useState(0);
  const current = slides[active];
  const locale = useLocale();
  const english = locale === 'en';
  const copy = english
    ? [
        {
          eyebrow: 'Premium tire engineering for every road',
          title: current.titleEn ?? 'High-quality tires',
          accent: 'For a safer journey',
          description: current.descriptionEn ?? 'Reliable grip and control, with everything your vehicle needs in one place.',
          cta: current.ctaEn ?? 'Explore tires',
          meta: ['Verified support', 'Trusted supplier'],
        },
        {
          eyebrow: 'Sustainable power • High cranking power',
          title: current.titleEn ?? 'High-performance batteries',
          accent: 'Built for demanding conditions',
          description: current.descriptionEn ?? 'Instant starting power designed for high temperatures and everyday confidence.',
          cta: current.ctaEn ?? 'Explore batteries',
          meta: ['Comprehensive support', 'Fast replacement'],
        },
        {
          eyebrow: 'Full synthetic oils • 5W-30 / 10W-40',
          title: current.titleEn ?? 'Advanced engine oils',
          accent: 'And essential parts',
          description: current.descriptionEn ?? 'Carefully selected oils and filters for consistent engine care.',
          cta: current.ctaEn ?? 'Explore oils and filters',
          meta: ['Engine protection', 'Complete range'],
        },
      ][active]
    : current;
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [slides.length]);
  return (
    <section
      id="top"
      dir={english ? 'ltr' : 'rtl'}
      aria-roledescription="carousel"
      aria-label={english ? 'Mero products' : 'منتجات Mero'}
      className="relative h-auto min-h-0 overflow-hidden pb-6 pt-24 lg:h-[750px] lg:pb-0 lg:pt-[72px]"
    >
      <div className="absolute inset-0 hidden transition-opacity duration-1000 lg:block">
        <ResponsiveHeroImage slide={current} english={english} priority={active === 0} />
      </div>
      <div className="container relative z-20 flex h-full items-start lg:items-center">
        <div
          className={`w-full max-w-xl rounded-xl bg-void/30 p-4 backdrop-blur-[1px] sm:p-7 lg:bg-transparent lg:p-0 ${english ? 'text-left' : 'text-right'}`}
        >
          <div className="label mb-4 inline-flex max-w-full items-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-gold/40 bg-gold/10 px-3 py-2 text-[10px] text-gold sm:text-[11px]">
            <current.icon size={14} />
            {copy.eyebrow}
          </div>
          <h1 className="mb-3 font-arabic text-2xl font-bold leading-tight text-white sm:text-3xl">
            {english
              ? 'Complete Tire, Battery and Automotive Solutions'
              : 'حلول متكاملة للإطارات والبطاريات وخدمات السيارات'}
          </h1>
          <h2
            className={`font-arabic text-3xl font-bold text-white sm:text-5xl lg:text-[50px] ${english ? 'leading-[1.05] sm:leading-[1.1] lg:leading-[1.15]' : 'leading-[1.1] sm:leading-[1.2] lg:leading-[1.35]'}`}
          >
            {copy.title}
            <br />
            <span className={`block text-gold ${english ? 'pt-0' : 'pt-0 sm:pt-3'}`}>
              {copy.accent}
            </span>
          </h2>
          <div className="mt-4 flex w-full items-start gap-2 text-[#d0c5af]">
            <current.icon className="mt-1 shrink-0 text-gold" size={22} />
            <p className="min-w-0 flex-1 text-sm leading-7 sm:text-base sm:leading-8">
              {copy.description}
            </p>
          </div>
          <div className="relative mt-6 h-[300px] overflow-hidden rounded-lg bg-carbon shadow-xl sm:h-[380px] lg:hidden">
            <ResponsiveHeroImage slide={current} english={english} priority={active === 0} />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              className="btn btn-primary min-h-14 w-full px-6 text-base sm:w-auto sm:px-8 sm:text-lg lg:min-h-[72px] lg:px-10 lg:text-2xl"
              href="#products"
            >
              {copy.cta}
            </a>
            <a
              className="btn btn-secondary min-h-14 w-full px-6 text-base sm:w-auto sm:px-8 sm:text-lg lg:min-h-[72px] lg:px-10 lg:text-2xl"
              href="#contact"
            >
              {english ? 'Contact us' : 'تواصل معنا'}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/80 sm:mt-7 sm:gap-4">
            {copy.meta.map((item, index) => (
              <span key={item}>
                {index > 0 && <i className="ml-4 inline-block h-4 w-px bg-white/20" />}
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="relative z-30 mt-6 lg:absolute lg:bottom-5 lg:left-0 lg:right-0 lg:mt-0">
        <div
          className={`container flex justify-center ${english ? 'lg:justify-end' : 'lg:justify-start'}`}
          dir="ltr"
        >
          <div className="carousel-tabs flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-void/85 p-2 backdrop-blur-xl">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                aria-label={english ? `Show ${slide.title}` : `عرض ${slide.title}`}
                aria-current={index === active}
                onClick={() => setActive(index)}
                dir="rtl"
                className={`flex min-h-14 shrink-0 items-center gap-2 rounded-xl px-2.5 text-right text-[10px] transition sm:px-3.5 ${index === active ? 'border border-gold/60 bg-raised text-white' : 'text-muted hover:text-white'}`}
              >
                <span className={`slide-spinner ${index === active ? 'slide-spinner-active' : ''}`}>
                  <svg viewBox="0 0 36 36" aria-hidden="true">
                    <circle className="slide-spinner-track" cx="18" cy="18" r="15" />
                    <circle className="slide-spinner-progress" cx="18" cy="18" r="15" />
                  </svg>
                  <b>0{index + 1}</b>
                </span>
                <span className="hidden leading-4 sm:block">
                  {index === 0
                    ? english
                      ? 'Premium tires'
                      : 'الإطارات الفاخرة'
                    : index === 1
                      ? english
                        ? 'High-performance batteries'
                        : 'البطاريات عالية الطاقة'
                      : english
                        ? 'Oils and parts'
                        : 'الزيوت والقطع'}
                  <small className="block text-[9px] text-muted">
                    {index === 0
                      ? english
                        ? 'Reliable grip and control'
                        : 'ثبات وتحكم فائق'
                      : index === 1
                        ? english
                          ? 'Dependable summer performance'
                          : 'أداء صيفي موثوق'
                        : english
                          ? 'Advanced engine care'
                          : 'حماية محرك متطورة'}
                  </small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

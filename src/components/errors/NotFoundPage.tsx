import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CircleHelp } from 'lucide-react';
import type { Locale } from '@/i18n/routing';

export default function NotFoundPage({ locale }: { locale: Locale }) {
  const english = locale === 'en';
  const Arrow = english ? ArrowRight : ArrowLeft;

  return (
    <main dir={english ? 'ltr' : 'rtl'} className="bg-void text-white">
      <section className="relative isolate flex min-h-[calc(100svh-72px)] items-center overflow-hidden pt-[72px]">
        <Image
          src="/images/hero-tire-ltr.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void/75 via-void/90 to-void" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-void via-transparent to-void/90" />

        <div className="container relative py-20 sm:py-24 lg:py-32">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 overflow-hidden">
            <span
              aria-hidden="true"
              className="block select-none text-center text-[clamp(10rem,35vw,30rem)] font-bold leading-none text-transparent opacity-60 [background:linear-gradient(180deg,rgba(212,175,55,0.38),rgba(212,175,55,0.04))] [background-clip:text] [-webkit-text-stroke:1px_rgba(212,175,55,0.3)]"
            >
              404
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 1200 280"
              className="absolute left-1/2 top-1/2 h-40 w-[min(90vw,1100px)] -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] opacity-40 sm:h-56"
              fill="none"
            >
              <path
                d="M-40 218C180 72 358 58 574 152c209 91 380 91 666-55"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="12 18"
                className="text-gold"
              />
              <path
                d="M-40 232C180 86 358 72 574 166c209 91 380 91 666-55"
                stroke="currentColor"
                strokeWidth="1"
                className="text-gold"
              />
            </svg>
          </div>

          <div className={`relative max-w-xl ${english ? 'text-left' : 'text-right'}`}>
            <p className="label mb-5 inline-flex items-center gap-2 text-gold">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              {english ? 'Looks like you took a wrong turn' : 'يبدو أنك سلكت طريقًا غير موجود'}
            </p>
            <h1
              className={`font-arabic font-bold leading-tight ${english ? 'text-4xl sm:text-5xl lg:text-7xl' : 'whitespace-nowrap text-3xl sm:text-5xl lg:text-7xl'}`}
            >
              {english ? 'This page could not be found.' : 'الصفحة غير موجودة'}
            </h1>
            <p className="mt-6 max-w-lg px-2 py-1 text-sm leading-8 text-muted sm:px-0 sm:text-base">
              {english
                ? 'Sorry, we couldn’t find the page you’re looking for. It may have been moved or its address may have changed.'
                : 'عذرًا، لم نتمكن من العثور على الصفحة التي تبحث عنها. ربما تم نقلها أو تغيير رابطها.'}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={`/${locale}`}
                className="btn btn-primary w-full gap-2 px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-void motion-reduce:transition-none sm:w-auto"
              >
                {english ? 'Back to Home' : 'العودة إلى الرئيسية'}
                <Arrow aria-hidden="true" size={17} />
              </Link>
              <Link
                href={`/${locale}#products`}
                className="btn btn-secondary w-full gap-2 px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-void motion-reduce:transition-none sm:w-auto"
              >
                {english ? 'Browse Products' : 'تصفح المنتجات'}
                <Arrow aria-hidden="true" size={17} />
              </Link>
            </div>

            <Link
              href={`/${locale}#contact`}
              className="mt-7 inline-flex items-center gap-2 text-sm text-muted underline decoration-gold/50 underline-offset-4 transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-void motion-reduce:transition-none"
            >
              <CircleHelp aria-hidden="true" size={16} className="text-gold" />
              {english ? 'Need help? Contact us' : 'تحتاج مساعدة؟ تواصل معنا'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {Home} from '../page';
import {routing} from '@/i18n/routing';
import {SITE_URL} from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const english = locale === 'en';
  const title = english
    ? 'Tires, Batteries and Car Services in Riyadh | Mero'
    : 'إطارات وبطاريات وزيوت سيارات في الرياض | ميرو';
  const description = english
    ? 'Mero by Al Thuraya Automotive Services provides tires, car batteries, engine oils and professional automotive services in Riyadh for Saudi driving conditions.'
    : 'ميرو من شركة إطار الثريا لخدمات السيارات توفر إطارات وبطاريات وزيوت محركات وخدمات سيارات في الرياض، مع منتجات موثوقة وخدمة متخصصة لظروف المملكة.';
  const ogImage = `${SITE_URL}${english ? '/images/og/mero-og-image-en.jpg' : '/images/og/mero-og-image.jpg'}`;
  const ogImageAlt = english
    ? 'Mero – High-quality tires for a safer journey'
    : 'Mero – إطارات عالية الجودة لرحلة أكثر أمانًا';
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {ar: `${SITE_URL}/ar`, en: `${SITE_URL}/en`, 'x-default': `${SITE_URL}/ar`},
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      type: 'website',
      locale: english ? 'en_US' : 'ar_SA',
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogImageAlt }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  };
}

export default async function LocalePage({ params }: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <Home locale={locale} />;
}

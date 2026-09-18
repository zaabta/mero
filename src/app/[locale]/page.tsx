import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Home from '../page';
import { isLocale } from '../../lib/i18n';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const english = locale === 'en';
  const title = english ? 'Mero | Premium Automotive Solutions' : 'Mero | حلول السيارات الراقية';
  const description = english
    ? 'Premium tires, batteries, oils, filters, and automotive supply solutions in Saudi Arabia.'
    : 'إطارات وبطاريات وزيوت وفلاتر وحلول توريد السيارات الراقية في المملكة العربية السعودية.';
  const ogImage = english ? '/images/og/mero-og-image-en.jpg' : '/images/og/mero-og-image.jpg';
  const ogImageAlt = english
    ? 'Mero – High-quality tires for a safer journey'
    : 'Mero – إطارات عالية الجودة لرحلة أكثر أمانًا';
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: '/ar', en: '/en', 'x-default': '/ar' },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      type: 'website',
      locale: english ? 'en_US' : 'ar_SA',
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogImageAlt }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  };
}

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Home locale={locale} />;
}

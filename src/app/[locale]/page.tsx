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
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: '/ar', en: '/en', 'x-default': '/ar' },
    },
    openGraph: { title, description, url: `/${locale}`, type: 'website', locale },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Home locale={locale} />;
}

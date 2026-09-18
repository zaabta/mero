import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import CertificationsPage from '../../../components/CertificationsPage';
import {routing} from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return {
    title: locale === 'en' ? 'Quality and standards | Mero' : 'شهادة الجودة والمقاييس | Mero',
    description:
      locale === 'en'
        ? 'Mero product quality, conformity and automotive standards practices.'
        : 'ممارسات ميرو في جودة المنتجات والمطابقة ومعايير السيارات.',
    alternates: {
      canonical: `/${locale}/certifications`,
      languages: {ar: '/ar/certifications', en: '/en/certifications', 'x-default': '/ar/certifications'}
    },
  };
}

export default async function CertificationsRoute({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <CertificationsPage />;
}

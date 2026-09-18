import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import LegalPage from '../../../components/LegalPage';
import {routing} from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return {
    title: locale === 'en' ? 'Privacy policy | Mero' : 'سياسة الخصوصية | Mero',
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {ar: '/ar/privacy', en: '/en/privacy', 'x-default': '/ar/privacy'}
    }
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <LegalPage type="privacy" />;
}

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
    title: locale === 'en' ? 'Terms and conditions | Mero' : 'الشروط والأحكام | Mero',
    alternates: {
      canonical: `/${locale}/terms`,
      languages: {ar: '/ar/terms', en: '/en/terms', 'x-default': '/ar/terms'}
    }
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <LegalPage type="terms" />;
}

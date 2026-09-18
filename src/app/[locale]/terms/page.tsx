import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import LegalPage from '../../../components/LegalPage';
import {routing} from '@/i18n/routing';
import {SITE_URL} from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return {
    title: locale === 'en' ? 'Terms and Conditions | Mero' : 'الشروط والأحكام | ميرو',
    description:
      locale === 'en'
        ? 'Read the terms and conditions governing the use of the Mero website, its information and automotive service enquiries.'
        : 'اقرأ شروط وأحكام استخدام موقع ميرو والخدمات والمعلومات المقدمة من شركة إطار الثريا لخدمات السيارات.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/terms`,
      languages: {
        ar: `${SITE_URL}/ar/terms`,
        en: `${SITE_URL}/en/terms`,
        'x-default': `${SITE_URL}/ar/terms`
      }
    }
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <LegalPage type="terms" />;
}

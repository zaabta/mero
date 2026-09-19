import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import LegalPage from '../../../components/LegalPage';
import {routing} from '@/i18n/routing';
import {SITE_URL} from '@/lib/site';
import {getSanityLegalPage} from '@/sanity/lib/queries';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const sanityPage = await getSanityLegalPage('privacy');
  return {
    title: sanityPage ? `${sanityPage.title[locale]} | Mero` : locale === 'en' ? 'Privacy Policy | Mero' : 'سياسة الخصوصية | ميرو',
    description:
      locale === 'en'
        ? 'Learn how Mero and Al Thuraya Automotive Services collect, use and protect personal information when you use this website or contact us.'
        : 'تعرف على كيفية جمع واستخدام وحماية البيانات الشخصية عند استخدام موقع ميرو والتواصل مع شركة إطار الثريا لخدمات السيارات.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/privacy`,
      languages: {
        ar: `${SITE_URL}/ar/privacy`,
        en: `${SITE_URL}/en/privacy`,
        'x-default': `${SITE_URL}/ar/privacy`
      }
    }
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const sanityPage = await getSanityLegalPage('privacy');
  return <LegalPage type="privacy" locale={locale} sanityPage={sanityPage} />;
}

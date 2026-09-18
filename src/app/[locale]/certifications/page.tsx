import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import CertificationsPage from '../../../components/CertificationsPage';
import {routing} from '@/i18n/routing';
import {SITE_URL} from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return {
    title:
      locale === 'en'
        ? 'Quality and Compliance Certifications | Mero'
        : 'شهادات الجودة والمطابقة | ميرو',
    description:
      locale === 'en'
        ? 'Learn about the quality and compliance standards followed by Mero for tires, batteries, oils and automotive services in Saudi Arabia.'
        : 'تعرف على معايير الجودة والمطابقة التي تعتمدها ميرو في الإطارات والبطاريات والزيوت وخدمات السيارات المقدمة في المملكة العربية السعودية.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/certifications`,
      languages: {
        ar: `${SITE_URL}/ar/certifications`,
        en: `${SITE_URL}/en/certifications`,
        'x-default': `${SITE_URL}/ar/certifications`
      }
    },
  };
}

export default async function CertificationsRoute({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <CertificationsPage />;
}

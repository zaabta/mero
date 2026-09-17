import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CertificationsPage from '../../../components/CertificationsPage';
import { isLocale } from '../../../lib/i18n';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === 'en' ? 'Quality and standards | Mero' : 'شهادة الجودة والمقاييس | Mero',
    description:
      locale === 'en'
        ? 'Mero product quality, conformity and automotive standards practices.'
        : 'ممارسات ميرو في جودة المنتجات والمطابقة ومعايير السيارات.',
  };
}

export default async function CertificationsRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CertificationsPage locale={locale} />;
}

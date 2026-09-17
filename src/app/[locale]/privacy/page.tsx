import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LegalPage from '../../../components/LegalPage';
import { isLocale } from '../../../lib/i18n';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: locale === 'en' ? 'Privacy policy | Mero' : 'سياسة الخصوصية | Mero' };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPage locale={locale} type="privacy" />;
}

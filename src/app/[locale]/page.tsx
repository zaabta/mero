import { notFound } from 'next/navigation';
import Home from '../page';
import { isLocale } from '../../lib/i18n';

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Home locale={locale} />;
}

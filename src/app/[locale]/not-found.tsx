import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import NotFoundPage from '../../components/errors/NotFoundPage';
import { defaultLocale, isLocale } from '../../lib/i18n';

export const metadata: Metadata = {
  title: 'Page not found | Mero',
  robots: { index: false, follow: false },
};

export default async function LocaleNotFound() {
  const requestedLocale = await getLocale();
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  return <NotFoundPage locale={locale} />;
}

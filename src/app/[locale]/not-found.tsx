import type { Metadata } from 'next';
import { headers } from 'next/headers';
import NotFoundPage from '../../components/errors/NotFoundPage';
import { defaultLocale, isLocale } from '../../lib/i18n';

export const metadata: Metadata = {
  title: 'Page not found | Mero',
  robots: { index: false, follow: false },
};

export default async function LocaleNotFound() {
  const localeHeader = (await headers()).get('x-locale');
  const locale = localeHeader && isLocale(localeHeader) ? localeHeader : defaultLocale;
  return <NotFoundPage locale={locale} />;
}

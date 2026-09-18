import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import {hasLocale} from 'next-intl';
import NotFoundPage from '../../components/errors/NotFoundPage';
import {routing} from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Page not found | Mero',
  robots: { index: false, follow: false },
};

export default async function LocaleNotFound() {
  const requestedLocale = await getLocale();
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  return <NotFoundPage locale={locale} />;
}

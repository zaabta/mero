import {hasLocale} from 'next-intl';
import {headers} from 'next/headers';
import {routing} from '@/i18n/routing';
import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import {cairo} from './font';

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const localeHeader = (await headers()).get('X-NEXT-INTL-LOCALE');
  const locale = hasLocale(routing.locales, localeHeader)
    ? localeHeader
    : routing.defaultLocale;
  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      data-scroll-behavior="smooth"
      className={cairo.variable}
      suppressHydrationWarning
    >
      <body className={cairo.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}

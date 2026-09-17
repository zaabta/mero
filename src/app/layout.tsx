import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import { defaultLocale, isLocale } from '../lib/i18n';
import './globals.css';
export const cairo = localFont({
  src: [
    { path: '../assets/fonts/cairo/Cairo-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../assets/fonts/cairo/Cairo-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../assets/fonts/cairo/Cairo-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../assets/fonts/cairo/Cairo-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-cairo',
  display: 'swap',
  preload: true,
  fallback: ['Arial', 'sans-serif'],
});
export async function generateMetadata(): Promise<Metadata> {
  const localeHeader = (await headers()).get('x-locale');
  const locale = localeHeader && isLocale(localeHeader) ? localeHeader : defaultLocale;
  return locale === 'en'
    ? {
        title: 'Mero | Premium Automotive Solutions',
        description: 'Carefully selected tires, batteries, oils, and filters.',
      }
    : {
        title: 'Mero | حلول السيارات الراقية',
        description: 'إطارات وبطاريات وزيوت وفلاتر مختارة بعناية.',
      };
}
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const localeHeader = (await headers()).get('x-locale');
  const locale = localeHeader && isLocale(localeHeader) ? localeHeader : defaultLocale;
  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={cairo.variable}
      suppressHydrationWarning
    >
      <body className={cairo.className}>{children}</body>
    </html>
  );
}

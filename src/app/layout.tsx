import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import { defaultLocale, isLocale } from '../lib/i18n';
import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
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
  const base = new URL('https://mero-ten-mocha.vercel.app');
  return locale === 'en'
    ? {
        metadataBase: base,
        title: 'Mero | Premium Automotive Solutions',
        description:
          'Premium tires, batteries, oils, filters, and automotive supply solutions in Saudi Arabia.',
        icons: { icon: '/mero-logo-white-gold.svg', apple: '/mero-logo-white-gold.svg' },
      }
    : {
        metadataBase: base,
        title: 'Mero | حلول السيارات الراقية',
        description:
          'إطارات وبطاريات وزيوت وفلاتر وحلول توريد السيارات الراقية في المملكة العربية السعودية.',
        icons: { icon: '/mero-logo-white-gold.svg', apple: '/mero-logo-white-gold.svg' },
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
      {/* Browser extensions may inject attributes such as cz-shortcut-listen before hydration. */}
      <body className={cairo.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

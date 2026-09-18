import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import { defaultLocale, isLocale } from '../lib/i18n';
import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
  const base = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thurayatires.com');
  const ogImage =
    locale === 'en' ? '/images/og/mero-og-image-en.jpg' : '/images/og/mero-og-image.jpg';
  const ogImageUrl = new URL(ogImage, base).toString();
  const ogAlt =
    locale === 'en'
      ? 'Mero – High-quality tires for a safer journey'
      : 'Mero – إطارات عالية الجودة لرحلة أكثر أمانًا';
  return locale === 'en'
    ? {
        metadataBase: base,
        title: 'Mero | Premium Automotive Solutions',
        description:
          'Premium tires, batteries, oils, filters, and automotive supply solutions in Saudi Arabia.',
        icons: { icon: '/mero-logo-white-gold.svg', apple: '/mero-logo-white-gold.svg' },
        openGraph: {
          type: 'website',
          siteName: 'Mero',
          locale: 'en_US',
          images: [{ url: ogImageUrl, width: 1200, height: 630, alt: ogAlt }],
        },
        twitter: { card: 'summary_large_image', images: [ogImageUrl] },
      }
    : {
        metadataBase: base,
        title: 'Mero | حلول السيارات الراقية',
        description:
          'إطارات وبطاريات وزيوت وفلاتر وحلول توريد السيارات الراقية في المملكة العربية السعودية.',
        icons: { icon: '/mero-logo-white-gold.svg', apple: '/mero-logo-white-gold.svg' },
        openGraph: {
          type: 'website',
          siteName: 'Mero',
          locale: 'ar_SA',
          images: [{ url: ogImageUrl, width: 1200, height: 630, alt: ogAlt }],
        },
        twitter: { card: 'summary_large_image', images: [ogImageUrl] },
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
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={cairo.className} suppressHydrationWarning>
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}

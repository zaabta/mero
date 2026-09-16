import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import { defaultLocale, isLocale } from '../lib/i18n';
import './globals.css';
const arabic = localFont({
  src: './fonts/Cairo.ttf',
  variable: '--font-arabic',
  weight: '100 900',
});
const inter = localFont({ src: './fonts/Cairo.ttf', variable: '--font-inter', weight: '100 900' });
const space = localFont({ src: './fonts/Cairo.ttf', variable: '--font-space', weight: '100 900' });
const plex = localFont({ src: './fonts/Cairo.ttf', variable: '--font-plex', weight: '100 900' });
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
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${inter.variable} ${space.variable} ${plex.variable} ${arabic.variable}`}>
        {children}
      </body>
    </html>
  );
}

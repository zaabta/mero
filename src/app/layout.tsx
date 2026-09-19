import { hasLocale } from 'next-intl';
import { headers } from 'next/headers';
import { routing } from '@/i18n/routing';
import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { cairo } from './font';
import { GoogleAnalytics } from '@next/third-parties/google';
import WhatsAppButton from '@/components/WhatsAppButton';
import {getSanitySiteSettings} from '@/sanity/lib/queries';

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const localeHeader = (await headers()).get('X-NEXT-INTL-LOCALE');
  const locale = hasLocale(routing.locales, localeHeader) ? localeHeader : routing.defaultLocale;
  const settings = await getSanitySiteSettings();
  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      data-scroll-behavior="smooth"
      className={cairo.variable}
      suppressHydrationWarning
    >
      <body className={cairo.className} suppressHydrationWarning>
        {children}
        <WhatsAppButton locale={locale} location="floating" whatsapp={settings?.whatsapp} />
        {process.env.NODE_ENV === 'production' && gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}

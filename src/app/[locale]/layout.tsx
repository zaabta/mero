import type {Metadata} from 'next';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {SITE_URL} from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {cairo} from '../font';
import {getFallbackSiteSettings, getSanitySiteSettings} from '@/sanity/lib/queries';

type Props = {children: React.ReactNode; params: Promise<{locale: string}>};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Omit<Props, 'children'>): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const base = new URL(SITE_URL);
  const english = locale === 'en';
  const image = `${SITE_URL}${english ? '/images/og/mero-og-image-en.jpg' : '/images/og/mero-og-image.jpg'}`;
  const title = english
    ? 'Tires, Batteries and Car Services in Riyadh | Mero'
    : 'إطارات وبطاريات وزيوت سيارات في الرياض | ميرو';
  const description = english
    ? 'Mero by Al Thuraya Automotive Services provides tires, car batteries, engine oils and professional automotive services in Riyadh for Saudi driving conditions.'
    : 'ميرو من شركة إطار الثريا لخدمات السيارات توفر إطارات وبطاريات وزيوت محركات وخدمات سيارات في الرياض، مع منتجات موثوقة وخدمة متخصصة لظروف المملكة.';
  return {
    metadataBase: base,
    title,
    description,
    icons: {icon: '/mero-logo-white-gold.svg', apple: '/mero-logo-white-gold.svg'},
    openGraph: {
      type: 'website', siteName: 'Mero', title, description,
      locale: english ? 'en_US' : 'ar_SA', images: [{url: image, width: 1200, height: 630}]
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ar: `${SITE_URL}/ar`,
        en: `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/ar`
      }
    }
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages({locale});
  const settings = (await getSanitySiteSettings()) ?? getFallbackSiteSettings();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header settings={settings} />
      {children}
      <Footer settings={settings} />
    </NextIntlClientProvider>
  );
}

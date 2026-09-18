import type {Metadata} from 'next';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {cairo} from '../font';

type Props = {children: React.ReactNode; params: Promise<{locale: string}>};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Omit<Props, 'children'>): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const base = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thurayatires.com');
  const english = locale === 'en';
  const image = english ? '/images/og/mero-og-image-en.jpg' : '/images/og/mero-og-image.jpg';
  const title = english ? 'Mero | Premium Automotive Solutions' : 'Mero | حلول السيارات الراقية';
  const description = english
    ? 'Premium tires, batteries, oils, filters, and automotive supply solutions in Saudi Arabia.'
    : 'إطارات وبطاريات وزيوت وفلاتر وحلول توريد السيارات الراقية في المملكة العربية السعودية.';
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
      canonical: `/${locale}`,
      languages: {ar: '/ar', en: '/en', 'x-default': '/ar'}
    }
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages({locale});
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}

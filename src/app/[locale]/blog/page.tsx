import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPage from '../../../components/BlogPage';
import { isLocale } from '../../../lib/i18n';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const english = locale === 'en';
  return {
    title: english ? 'Blog and technical knowledge | Mero' : 'مدونة ميرو ومركز المعرفة الفنية',
    description: english
      ? 'Engineering insights for tires, batteries, oils, and Gulf vehicle maintenance.'
      : 'تحليلات هندسية وإرشادات صيانة للإطارات والبطاريات والزيوت في ظروف الخليج.',
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { ar: '/ar/blog', en: '/en/blog', 'x-default': '/ar/blog' },
    },
  };
}

export default async function LocaleBlogPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <BlogPage locale={locale} />;
}

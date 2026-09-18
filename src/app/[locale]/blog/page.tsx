import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import BlogPage from '../../../components/BlogPage';
import { localizedBlogs } from '../../../data/blogs';
import {routing, type Locale} from '@/i18n/routing';
import {SITE_URL} from '@/lib/site';

const categoryValues = ['all', 'tires', 'batteries', 'oils', 'standards'] as const;
type Category = (typeof categoryValues)[number];

const categoryMap: Record<Exclude<Category, 'all'>, string> = {
  tires: 'تقنية الإطارات',
  batteries: 'البطاريات والمناخ الحار',
  oils: 'الزيوت والمحركات',
  standards: 'المعايير والمطابقة',
};

const categoryKeyByName = Object.fromEntries(
  Object.entries(categoryMap).map(([key, name]) => [name, key]),
) as Record<string, Exclude<Category, 'all'>>;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; category?: string }>;
};

function normalizeQuery(value: string | undefined) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeCategory(value: string | undefined): Category {
  return value && (categoryValues as readonly string[]).includes(value)
    ? (value as Category)
    : 'all';
}

function localizedCategory(locale: Locale, category: string) {
  const labels =
    locale === 'en'
      ? {
          tires: 'Tire technology',
          batteries: 'Batteries and hot climates',
          oils: 'Oils and engines',
          standards: 'Standards and compliance',
        }
      : categoryMap;
  return category === 'all'
    ? locale === 'en'
      ? 'All'
      : 'الكل'
    : labels[category as keyof typeof labels];
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { q, category } = await searchParams;
  if (!hasLocale(routing.locales, locale)) notFound();
  return {
    title:
      locale === 'en'
        ? 'Automotive Tips and Technical Blog | Mero'
        : 'مدونة ميرو | نصائح الإطارات والبطاريات وصيانة السيارات',
    description:
      locale === 'en'
        ? 'Explore professional guidance from Mero about tires, batteries, engine oils and vehicle maintenance for hot weather and Saudi driving conditions.'
        : 'مقالات وإرشادات من ميرو حول الإطارات والبطاريات وزيوت المحركات وصيانة السيارات في الأجواء الحارة وظروف القيادة في السعودية.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog`,
      languages: {
        ar: `${SITE_URL}/ar/blog`,
        en: `${SITE_URL}/en/blog`,
        'x-default': `${SITE_URL}/ar/blog`
      },
    },
  };
}

export default async function LocaleBlogPage({ params, searchParams }: Props) {
  const { locale: rawLocale } = await params;
  const { q: rawQuery, category: rawCategory } = await searchParams;
  if (!hasLocale(routing.locales, rawLocale)) notFound();

  const locale = rawLocale;
  setRequestLocale(locale);
  const query = normalizeQuery(rawQuery);
  const selectedCategory = normalizeCategory(rawCategory);
  const searchText = query.toLocaleLowerCase(locale === 'en' ? 'en-US' : 'ar');
  const articles = localizedBlogs.filter((article) => {
    const categoryMatch =
      selectedCategory === 'all' || categoryMap[selectedCategory] === article.type;
    const articleCategory = categoryKeyByName[article.type];
    const searchable = [
      article.title[locale],
      article.description[locale],
      article.content[locale],
      localizedCategory(locale, articleCategory),
      article.type,
    ]
      .join(' ')
      .toLocaleLowerCase(locale === 'en' ? 'en-US' : 'ar');
    return categoryMatch && (!searchText || searchable.includes(searchText));
  });

  return (
    <BlogPage
      locale={locale}
      articles={articles}
      query={query}
      selectedCategory={selectedCategory}
    />
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPage from '../../../components/BlogPage';
import { localizedBlogs } from '../../../data/blogs';
import { isLocale, type Locale } from '../../../lib/i18n';

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
  if (!isLocale(locale)) return {};
  const filtered = Boolean(normalizeQuery(q) || normalizeCategory(category) !== 'all');
  return {
    title:
      locale === 'en' ? 'Blog and technical knowledge | Mero' : 'مدونة Mero ومركز المعرفة الفنية',
    description:
      locale === 'en'
        ? 'Engineering insights for tires, batteries, oils, and Gulf vehicle maintenance.'
        : 'تحليلات هندسية وإرشادات صيانة للإطارات والبطاريات والزيوت في ظروف الخليج.',
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { ar: '/ar/blog', en: '/en/blog', 'x-default': '/ar/blog' },
    },
    robots: { index: !filtered, follow: true },
  };
}

export default async function LocaleBlogPage({ params, searchParams }: Props) {
  const { locale: rawLocale } = await params;
  const { q: rawQuery, category: rawCategory } = await searchParams;
  if (!isLocale(rawLocale)) notFound();

  const locale = rawLocale;
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

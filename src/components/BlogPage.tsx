import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  CircleGauge,
  Clock,
  Droplets,
  ListFilter,
  Search,
  type LucideIcon,
} from 'lucide-react';
import type { LocalizedBlogPost } from '../data/blogs';
import type { Locale } from '../lib/i18n';

type CategoryKey = 'all' | 'tires' | 'batteries' | 'oils' | 'standards';

const categoryLabels: Record<Locale, Record<CategoryKey, string>> = {
  ar: {
    all: 'الكل',
    tires: 'تقنية الإطارات',
    batteries: 'البطاريات والمناخ الحار',
    oils: 'الزيوت والمحركات',
    standards: 'المعايير والمطابقة',
  },
  en: {
    all: 'All',
    tires: 'Tire technology',
    batteries: 'Batteries and hot climates',
    oils: 'Oils and engines',
    standards: 'Standards and compliance',
  },
};

const categoryKeys: Record<LocalizedBlogPost['type'], Exclude<CategoryKey, 'all'>> = {
  'تقنية الإطارات': 'tires',
  'البطاريات والمناخ الحار': 'batteries',
  'الزيوت والمحركات': 'oils',
  'المعايير والمطابقة': 'standards',
};

const categoryIcons: Record<CategoryKey, LucideIcon> = {
  all: ListFilter,
  tires: CircleGauge,
  batteries: BatteryCharging,
  oils: Droplets,
  standards: BadgeCheck,
};

function formatBlogDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'ar-SA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

function blogHref(locale: Locale, category: CategoryKey, query: string) {
  const params = new URLSearchParams();
  if (category !== 'all') params.set('category', category);
  if (query) params.set('q', query);
  const search = params.toString();
  return `/${locale}/blog${search ? `?${search}` : ''}`;
}

type Props = {
  locale: Locale;
  articles: LocalizedBlogPost[];
  query: string;
  selectedCategory: CategoryKey;
};

export default function BlogPage({ locale, articles, query, selectedCategory }: Props) {
  const english = locale === 'en';
  const labels = categoryLabels[locale];
  const featured = articles[0];
  const Arrow = english ? ArrowRight : ArrowLeft;

  return (
    <main dir={english ? 'ltr' : 'rtl'} className="min-h-screen bg-void pt-[72px] text-white">
      <section className="container py-16 lg:py-20">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <span className="label inline-flex rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-gold">
              {english
                ? 'ENGINEERING INSIGHTS FOR GCC VEHICLES'
                : 'تحليلات هندسية وصيانة لمركبات الخليج'}
            </span>
            <h1 className="mt-4 font-arabic text-4xl font-bold leading-tight lg:text-6xl">
              {english ? (
                <>
                  Mero <span className="text-gold">Blog</span> and technical knowledge
                </>
              ) : (
                <>
                  مدونة <span className="text-gold">Mero</span> ومركز المعرفة الفنية
                </>
              )}
            </h1>
            <p className="mt-4 text-sm leading-8 text-muted lg:text-base">
              {english
                ? 'Professional guidance for tires, batteries, oils, and maintenance in demanding Gulf conditions.'
                : 'مقالات احترافية واستراتيجيات صيانة متقدمة للأجواء الخليجية وتقنيات الإطارات والبطاريات والزيوت.'}
            </p>
          </div>
          <form action={`/${locale}/blog`} method="get" className="w-full lg:w-96">
            <label className="relative block">
              <span className="sr-only">{english ? 'Search articles' : 'ابحث في المقالات'}</span>
              <input
                name="q"
                defaultValue={query}
                className="field w-full pe-11 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                placeholder={english ? 'Search articles…' : 'ابحث عن مقال أو معيار…'}
                type="search"
              />
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-gold"
                size={18}
              />
            </label>
            <input type="hidden" name="category" value={selectedCategory} />
          </form>
        </div>
        <nav
          className="mt-8 flex gap-2 overflow-x-auto pb-2"
          aria-label={english ? 'Article categories' : 'تصنيفات المقالات'}
        >
          {(['all', 'tires', 'batteries', 'oils', 'standards'] as const).map((item) => {
            const Icon = categoryIcons[item];
            const active = selectedCategory === item;
            return (
              <Link
                key={item}
                href={blogHref(locale, item, query)}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-void motion-reduce:transition-none ${active ? 'border-gold bg-gold text-void' : 'border-white/10 bg-carbon text-muted hover:border-gold/50 hover:text-gold'}`}
              >
                <Icon aria-hidden="true" size={15} strokeWidth={1.8} />
                <span>{labels[item]}</span>
              </Link>
            );
          })}
          {(query || selectedCategory !== 'all') && (
            <Link
              href={`/${locale}/blog`}
              className="inline-flex shrink-0 items-center px-3 py-2 text-xs text-muted underline underline-offset-4 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {english ? 'Clear filters' : 'مسح التصفية'}
            </Link>
          )}
        </nav>
      </section>

      <section className="container pb-20">
        {featured ? (
          <article className="grid overflow-hidden rounded-xl border border-white/10 bg-carbon lg:grid-cols-12">
            <div className="relative min-h-[280px] lg:col-span-7 lg:min-h-[420px]">
              <Image
                src={featured.image}
                alt={featured.imageAlt[locale]}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between gap-8 p-6 lg:col-span-5 lg:p-10">
              <div>
                <span className="label text-gold">
                  {english ? 'FEATURED ARTICLE' : 'مقال مميز'}
                </span>
                <h2 className="mt-4 font-arabic text-2xl font-bold leading-tight lg:text-4xl">
                  <Link href={`/${locale}/blog/${featured.slug}`} className="hover:text-gold">
                    {featured.title[locale]}
                  </Link>
                </h2>
                <p className="mt-4 text-sm leading-8 text-muted">{featured.description[locale]}</p>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-muted">
                <span className="inline-flex items-center gap-1">
                  <Clock size={15} className="text-gold" />
                  {featured.readingTime} {english ? 'min read' : 'دقائق قراءة'}
                </span>
                <time dateTime={featured.createdAt}>
                  {formatBlogDate(featured.createdAt, locale)}
                </time>
              </div>
            </div>
          </article>
        ) : (
          <p className="py-16 text-center text-muted">
            {english ? 'No articles found.' : 'لم يتم العثور على مقالات.'}
          </p>
        )}

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(1).map((article) => (
            <Link
              key={article.slug}
              href={`/${locale}/blog/${article.slug}`}
              className="group overflow-hidden rounded-xl border border-white/10 bg-carbon transition hover:-translate-y-0.5 hover:border-gold/50 motion-reduce:transition-none"
            >
              <div className="relative h-52 overflow-hidden bg-raised">
                <Image
                  src={article.image}
                  alt={article.imageAlt[locale]}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>
              <div className="flex min-h-48 flex-col justify-between gap-5 p-5">
                <div>
                  <span className="label text-gold">{labels[categoryKeys[article.type]]}</span>
                  <h3 className="mt-3 font-arabic text-lg font-bold leading-7 group-hover:text-gold">
                    {article.title[locale]}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-muted">{article.description[locale]}</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={14} className="text-gold" />
                    {article.readingTime} {english ? 'min read' : 'دقائق قراءة'}
                  </span>
                  <time dateTime={article.createdAt}>
                    {formatBlogDate(article.createdAt, locale)}
                  </time>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href={`/${locale}#contact`}
          className="btn btn-primary mx-auto mt-10 flex w-fit gap-2 px-6 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        >
          {english ? 'Talk to our experts' : 'تواصل مع خبرائنا'} <Arrow size={16} />
        </Link>
      </section>
    </main>
  );
}

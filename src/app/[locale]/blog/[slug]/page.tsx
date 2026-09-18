import type { Metadata } from 'next';
import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {routing, type Locale} from '@/i18n/routing';
import {SITE_URL} from '@/lib/site';
import { getLocalizedBlogBySlug, localizedBlogs } from '../../../../data/blogs';
const categoryKeys = {
  'تقنية الإطارات': 'tires',
  'البطاريات والمناخ الحار': 'batteries',
  'الزيوت والمحركات': 'oils',
  'المعايير والمطابقة': 'standards',
} as const;
const categoryLabels = {
  ar: {
    tires: 'تقنية الإطارات',
    batteries: 'البطاريات والمناخ الحار',
    oils: 'الزيوت والمحركات',
    standards: 'المعايير والمطابقة',
  },
  en: {
    tires: 'Tire technology',
    batteries: 'Batteries and hot climates',
    oils: 'Oils and engines',
    standards: 'Standards and compliance',
  },
} as const;
type Props = { params: Promise<{ locale: string; slug: string }> };

function formatBlogDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'ar-SA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    localizedBlogs.map((blog) => ({ locale, slug: blog.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const blog = getLocalizedBlogBySlug(slug);
  if (!hasLocale(routing.locales, rawLocale) || !blog) notFound();
  const locale = rawLocale;
  const articleUrl = `${SITE_URL}/${locale}/blog/${blog.slug}`;
  const imageUrl = new URL(blog.image, SITE_URL).toString();
  const title = blog.seoTitle[locale];
  const description = blog.seoDescription[locale];
  const section = categoryLabels[locale][categoryKeys[blog.type]];
  return {
    title,
    description,
    keywords: [section, locale === 'en' ? 'vehicle maintenance' : 'صيانة السيارات', 'Mero'],
    alternates: {
      canonical: articleUrl,
      languages: {
        ar: `${SITE_URL}/ar/blog/${blog.slug}`,
        en: `${SITE_URL}/en/blog/${blog.slug}`,
        'x-default': `${SITE_URL}/ar/blog/${blog.slug}`
      },
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: articleUrl,
      siteName: 'Mero',
      locale: locale === 'en' ? 'en_US' : 'ar_SA',
      publishedTime: blog.createdAt,
      ...(blog.updatedAt ? {modifiedTime: blog.updatedAt} : {}),
      section,
      images: [{ url: imageUrl, width: 1672, height: 941, alt: blog.imageAlt[locale] }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [imageUrl] },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const blog = getLocalizedBlogBySlug(slug);
  if (!hasLocale(routing.locales, rawLocale) || !blog) notFound();
  const locale = rawLocale;
  setRequestLocale(locale);
  const english = locale === 'en';
  const articleUrl = `${SITE_URL}/${locale}/blog/${blog.slug}`;
  const imageUrl = new URL(blog.image, SITE_URL).toString();
  const title = blog.title[locale];
  const description = blog.description[locale];
  const category = categoryLabels[locale][categoryKeys[blog.type]];
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: [imageUrl],
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt ?? blog.createdAt,
    inLanguage: locale,
    articleSection: category,
    '@id': articleUrl,
    mainEntityOfPage: articleUrl,
    author: { '@type': 'Organization', name: 'Mero', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Mero',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/mero-logo-white-gold.svg` },
    },
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: english ? 'Home' : 'الرئيسية',
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: english ? 'Blog' : 'المدونة',
        item: `${SITE_URL}/${locale}/blog`,
      },
      { '@type': 'ListItem', position: 3, name: title, item: articleUrl },
    ],
  };
  const paragraphs = blog.content[locale].split('\n');

  return (
    <main dir={english ? 'ltr' : 'rtl'} className="min-h-screen bg-void text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <article className="container max-w-4xl pt-[96px] pb-12 lg:pt-[120px] lg:pb-20">
        <div className="relative mb-8 h-64 overflow-hidden rounded-xl border border-white/10 bg-carbon lg:h-[420px]">
          <Image
            src={blog.image}
            alt={blog.imageAlt[locale]}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>
        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span className="label text-gold">{category}</span>
          <time dateTime={blog.createdAt}>{formatBlogDate(blog.createdAt, locale)}</time>
          <span>
            {blog.readingTime} {english ? 'min read' : 'دقائق قراءة'}
          </span>
        </div>
        <h1 className="font-arabic text-3xl font-bold leading-tight lg:text-5xl">{title}</h1>
        <p className="mt-5 text-base leading-8 text-muted">{description}</p>
        <div className="mt-10 space-y-5 text-sm leading-8 text-white/80 lg:text-base">
          {paragraphs.map((line, index) => {
            if (!line.trim()) return null;
            if (line.startsWith('## '))
              return (
                <h2 key={index} className="pt-5 font-arabic text-2xl font-bold text-gold">
                  {line.slice(3)}
                </h2>
              );
            if (line.startsWith('- '))
              return (
                <li key={index} className="ms-5 list-disc ps-2">
                  {line.slice(2)}
                </li>
              );
            return <p key={index}>{line}</p>;
          })}
        </div>
        <Link href="/blog" className="btn btn-secondary mt-10 inline-flex">
          {english ? 'Back to blog' : 'العودة إلى المدونة'}
        </Link>
      </article>
    </main>
  );
}

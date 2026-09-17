import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogs, getBlogBySlug } from '../../../../data/blogs';
import { isLocale } from '../../../../lib/i18n';

type Props = { params: Promise<{ locale: string; slug: string }> };

function formatBlogDate(date: string, locale: 'ar' | 'en') {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'ar-SA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

export function generateStaticParams() {
  return ['ar', 'en'].flatMap((locale) => blogs.map((blog) => ({ locale, slug: blog.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!isLocale(locale) || !blog) return {};
  return { title: blog.seoTitle, description: blog.seoDescription };
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!isLocale(locale) || !blog) notFound();
  const english = locale === 'en';
  const paragraphs = blog.content.split('\n');

  return (
    <main dir={english ? 'ltr' : 'rtl'} className="min-h-screen bg-void text-white">
      <article className="container max-w-4xl py-12 lg:py-20">
        <div className="relative mb-8 h-64 overflow-hidden rounded-xl border border-white/10 bg-carbon lg:h-[420px]">
          <Image
            src={blog.image}
            alt={blog.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>
        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span className="label text-gold">{blog.type}</span>
          <time dateTime={blog.createdAt}>{formatBlogDate(blog.createdAt, locale)}</time>
          <span>
            {blog.readingTime} {english ? 'min read' : 'دقائق قراءة'}
          </span>
        </div>
        <h1 className="font-arabic text-3xl font-bold leading-tight lg:text-5xl">{blog.title}</h1>
        <p className="mt-5 text-base leading-8 text-muted">{blog.description}</p>
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
      </article>
    </main>
  );
}

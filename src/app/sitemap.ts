import type { MetadataRoute } from 'next';
import {SITE_URL} from '@/lib/site';
import {localizedBlogs} from '@/data/blogs';
import {routing} from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '/ar',
    '/en',
    '/ar/blog',
    '/en/blog',
    '/ar/certifications',
    '/en/certifications',
    '/ar/privacy',
    '/en/privacy',
    '/ar/terms',
    '/en/terms',
  ];
  const articlePaths = routing.locales.flatMap((locale) =>
    localizedBlogs.map((blog) => `/${locale}/blog/${blog.slug}`),
  );

  return [...staticPaths, ...articlePaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path.endsWith('/privacy') || path.endsWith('/terms') ? 'yearly' : 'monthly',
    priority: path === '/ar' || path === '/en' ? 1 : path.includes('/blog/') ? 0.6 : 0.5,
  }));
}

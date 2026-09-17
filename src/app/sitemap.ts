import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mero-ten-mocha.vercel.app';
  return [
    '',
    '/ar',
    '/en',
    '/ar/blog',
    '/en/blog',
    '/ar/privacy',
    '/en/privacy',
    '/ar/terms',
    '/en/terms',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path.endsWith('/privacy') || path.endsWith('/terms') ? 'yearly' : 'monthly',
    priority: path === '/ar' || path === '/en' ? 1 : 0.5,
  }));
}

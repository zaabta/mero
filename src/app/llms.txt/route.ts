import {localizedBlogs} from '@/data/blogs';
import {BUSINESS} from '@/lib/business';
import {SITE_URL} from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const articleLines = localizedBlogs.flatMap((article) => [
    `- [${article.title.ar}](${SITE_URL}/ar/blog/${article.slug}): ${article.description.ar}`,
    `- [${article.title.en}](${SITE_URL}/en/blog/${article.slug}): ${article.description.en}`,
  ]);

  const content = `# ${BUSINESS.brandName}

${BUSINESS.brandName} is the automotive brand of ${BUSINESS.legalNameEn} in Riyadh, Saudi Arabia. The company provides tires, automotive batteries, engine oils, automotive parts, and vehicle services.

## Official Website

- Arabic: ${SITE_URL}/ar
- English: ${SITE_URL}/en

## Main Sections

- Arabic Blog: ${SITE_URL}/ar/blog
- English Blog: ${SITE_URL}/en/blog
- Certifications Arabic: ${SITE_URL}/ar/certifications
- Certifications English: ${SITE_URL}/en/certifications
- Contact Arabic: ${SITE_URL}/ar#contact
- Contact English: ${SITE_URL}/en#contact

## Technical Topics

- Tire technology
- Automotive batteries for hot climates
- Engine oils and engine care
- Automotive standards and compliance
- Vehicle maintenance in Gulf and Saudi driving conditions

## Blog Articles

${articleLines.join('\n')}

## Business Information

- Brand: ${BUSINESS.brandName}
- Legal company: ${BUSINESS.legalNameEn}
- Location: ${BUSINESS.cityEn}, ${BUSINESS.countryEn}
- Address: ${BUSINESS.addressEn}
- Phone: ${BUSINESS.phone}
- Email: ${BUSINESS.email}
- Languages: Arabic and English

## Important Files

- Sitemap: ${SITE_URL}/sitemap.xml
- Robots: ${SITE_URL}/robots.txt
`;

  return new Response(content, {
    status: 200,
    headers: {'Content-Type': 'text/plain; charset=utf-8'},
  });
}

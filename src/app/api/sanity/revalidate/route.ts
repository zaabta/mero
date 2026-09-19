import {isValidSignature} from '@sanity/webhook';
import {revalidatePath, revalidateTag} from 'next/cache';

const TAGS = {
  siteSettings: 'sanity:siteSettings',
  homepage: 'sanity:homepage',
  productCategory: 'sanity:productCategory',
  product: 'sanity:product',
  brand: 'sanity:brand',
  blogPost: 'sanity:blogPost',
  legalPage: 'sanity:legalPage',
  certification: 'sanity:certification',
} as const;

type SupportedType = keyof typeof TAGS;
type WebhookPayload = {
  _type?: unknown;
  slug?: unknown;
  legalPageType?: unknown;
  key?: unknown;
};

const localizedPaths = [
  '/ar',
  '/en',
  '/ar/blog',
  '/en/blog',
  '/ar/privacy',
  '/en/privacy',
  '/ar/terms',
  '/en/terms',
  '/ar/certifications',
  '/en/certifications',
];

function isSupportedType(value: unknown): value is SupportedType {
  return typeof value === 'string' && value in TAGS;
}

function articleSlug(value: unknown) {
  return typeof value === 'string' && value.length > 0 ? encodeURIComponent(value) : null;
}

function legalPaths(payload: WebhookPayload) {
  const key = payload.legalPageType ?? payload.key;
  if (key === 'privacy' || key === 'privacyPolicy') return ['/ar/privacy', '/en/privacy'];
  if (key === 'terms' || key === 'termsAndConditions') return ['/ar/terms', '/en/terms'];
  return ['/ar/privacy', '/en/privacy', '/ar/terms', '/en/terms'];
}

function affectedPaths(type: SupportedType, payload: WebhookPayload) {
  if (type === 'blogPost') {
    const slug = articleSlug(payload.slug);
    return [
      '/ar/blog',
      '/en/blog',
      ...(slug ? [`/ar/blog/${slug}`, `/en/blog/${slug}`] : []),
    ];
  }
  if (type === 'legalPage') return legalPaths(payload);
  if (type === 'certification') return ['/ar/certifications', '/en/certifications'];
  if (type === 'siteSettings') return localizedPaths;
  return ['/ar', '/en'];
}

export async function GET() {
  return Response.json({error: 'Method not allowed'}, {status: 405});
}

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return Response.json({error: 'Revalidation unavailable'}, {status: 500});

  try {
    const rawBody = await request.text();
    const signature = request.headers.get('sanity-webhook-signature') ?? '';
    if (!(await isValidSignature(rawBody, signature, secret))) {
      return Response.json({error: 'Invalid signature'}, {status: 401});
    }

    let payload: WebhookPayload;
    try {
      payload = JSON.parse(rawBody) as WebhookPayload;
    } catch {
      return Response.json({error: 'Invalid JSON'}, {status: 400});
    }

    if (!isSupportedType(payload._type)) {
      return Response.json({error: 'Unsupported document type'}, {status: 400});
    }

    const type = payload._type;
    const tags = [TAGS[type]];
    const paths = affectedPaths(type, payload);

    await Promise.all(tags.map((tag) => revalidateTag(tag, {expire: 0})));
    paths.forEach((path) => revalidatePath(path));

    return Response.json({
      revalidated: true,
      type,
      tags,
      paths,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return Response.json({error: 'Internal revalidation error'}, {status: 500});
  }
}

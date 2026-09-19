import 'server-only';

import {urlFor} from './image';
import {client} from './client';
import type {LocalizedBlogPost} from '../../data/blogs';
import {branches, type Branch} from '../../data/branches';
import {BUSINESS} from '../../lib/business';

export type PortableTextBlock = {
  _key?: string;
  _type: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: Array<{text?: string}>;
};

export type SanityBlogPost = {
  _id: string;
  slug: string;
  type: 'tires' | 'batteries' | 'oils' | 'standards';
  title: {ar: string; en: string};
  description: {ar: string; en: string};
  content: {ar: PortableTextBlock[]; en: PortableTextBlock[]};
  image: {asset?: {_ref: string}; altAr?: string; altEn?: string};
  createdAt: string;
  updatedAt?: string;
  readingTime: number;
  seo?: {
    metaTitleAr?: string;
    metaTitleEn?: string;
    metaDescriptionAr?: string;
    metaDescriptionEn?: string;
  };
};

export type SanityBrand = {
  _id: string;
  name: string;
  displayOrder: number;
  logo?: {asset?: {_ref: string}; altAr?: string; altEn?: string};
};

export type BrandCard = {
  id: string;
  name: string;
  logo: string;
  altAr: string;
  altEn: string;
};

export type SiteSettingsView = {
  brandName: string;
  legalNameAr: string;
  legalNameEn: string;
  logoUrl: string;
  phone: string;
  phoneLocal: string;
  whatsapp: string;
  email: string;
  addressAr: string;
  addressEn: string;
  latitude: number;
  longitude: number;
  mapUrl: string;
  branch: Branch;
  footerText: {ar: string; en: string};
};

export type HomepageView = {
  heroSlides: Array<{
    imageAr: string;
    imageEn: string;
    mobileImageAr: string;
    mobileImageEn: string;
    altAr: string;
    altEn: string;
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    buttonAr: string;
    buttonEn: string;
  }>;
  productSection?: {heading: {ar: string; en: string}; body: {ar: string; en: string}};
  aboutSection?: {heading: {ar: string; en: string}; body: {ar: string; en: string}};
  whyMeroSection?: {heading: {ar: string; en: string}; body: {ar: string; en: string}};
  brandsSection?: {heading: {ar: string; en: string}; body: {ar: string; en: string}};
  ctaSection?: {heading: {ar: string; en: string}; body: {ar: string; en: string}};
};

export type ProductCardData = {
  id: string;
  title: string;
  titleEn: string;
  tag: string;
  tagEn: string;
  image: string;
  desc: string;
  descEn: string;
  footer: string;
  footerEn: string;
  quoteProduct: string;
  detail: string;
};

export type SanityLegalPageView = {
  title: {ar: string; en: string};
  content: {ar: PortableTextBlock[]; en: PortableTextBlock[]};
  lastUpdated: string;
};

export type SanityCertificationView = {
  id: string;
  title: {ar: string; en: string};
  description: {ar: string; en: string};
  images: Array<{url: string; altAr: string; altEn: string}>;
  issuingOrganization: string;
  issueDate?: string;
};

type SanitySiteSettings = {
  brandName?: string;
  legalNameAr?: string;
  legalNameEn?: string;
  mainLogo?: {image?: {asset?: {_ref: string}}};
  phone?: string;
  whatsapp?: string;
  email?: string;
  addressAr?: string;
  addressEn?: string;
  latitude?: number;
  longitude?: number;
  mapUrl?: string;
  footerText?: {ar?: string; en?: string};
};

type SanityHomepage = {
  heroSlides?: Array<{
    desktopImageAr?: {image?: {asset?: {_ref: string}}; altAr?: string; altEn?: string};
    desktopImageEn?: {image?: {asset?: {_ref: string}}; altAr?: string; altEn?: string};
    mobileImageAr?: {image?: {asset?: {_ref: string}}; altAr?: string; altEn?: string};
    mobileImageEn?: {image?: {asset?: {_ref: string}}; altAr?: string; altEn?: string};
    title?: {ar?: string; en?: string};
    description?: {ar?: string; en?: string};
    buttonLabel?: {ar?: string; en?: string};
    displayOrder?: number;
    active?: boolean;
  }>;
  productSection?: {heading?: {ar?: string; en?: string}; body?: {ar?: string; en?: string}};
  aboutSection?: {heading?: {ar?: string; en?: string}; body?: {ar?: string; en?: string}};
  whyMeroSection?: {heading?: {ar?: string; en?: string}; body?: {ar?: string; en?: string}};
  brandsSection?: {heading?: {ar?: string; en?: string}; body?: {ar?: string; en?: string}};
  ctaSection?: {heading?: {ar?: string; en?: string}; body?: {ar?: string; en?: string}};
};

type SanityCategory = {
  _id: string;
  name: {ar: string; en: string};
  slug: string;
  description: {ar: string; en: string};
  image?: {image?: {asset?: {_ref: string}}; altAr?: string; altEn?: string};
  iconIdentifier?: string;
  displayOrder: number;
};

type SanityProduct = {
  _id: string;
  name: {ar: string; en: string};
  slug: string;
  category?: {name?: {ar?: string; en?: string}; slug?: string};
  shortDescription: {ar: string; en: string};
  fullDescription: {ar: string; en: string};
  mainImage?: {image?: {asset?: {_ref: string}}; altAr?: string; altEn?: string};
  specifications: {ar: string; en: string};
  displayOrder: number;
};

export const BLOG_POSTS_QUERY = `*[_type == "blogPost" && published == true] | order(publishedDate desc, displayOrder asc) {
  _id,
  "slug": slug.current,
  "type": category,
  title,
  description,
  content,
  "image": {"asset": mainImage.image.asset, "altAr": mainImage.altAr, "altEn": mainImage.altEn},
  "createdAt": publishedDate,
  "updatedAt": modifiedDate,
  readingTime,
  seo
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && published == true && slug.current == $slug][0] {
  _id,
  "slug": slug.current,
  "type": category,
  title,
  description,
  content,
  "image": {"asset": mainImage.image.asset, "altAr": mainImage.altAr, "altEn": mainImage.altEn},
  "createdAt": publishedDate,
  "updatedAt": modifiedDate,
  readingTime,
  seo
}`;

export const BRANDS_QUERY = `*[_type == "brand" && coalesce(isActive, active, true) != false] | order(displayOrder asc) {
  _id,
  name,
  displayOrder,
  "logo": {"asset": logo.image.asset, "altAr": logo.altAr, "altEn": logo.altEn}
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  brandName, legalNameAr, legalNameEn,
  "mainLogo": {"image": mainLogo.image},
  phone, whatsapp, email, addressAr, addressEn, latitude, longitude, mapUrl, footerText
}`;

export const HOMEPAGE_QUERY = `*[_type == "homepage"][0] {
  "heroSlides": heroSlides[active == true] | order(displayOrder asc) {
    desktopImageAr, desktopImageEn, mobileImageAr, mobileImageEn,
    title, description, buttonLabel, displayOrder, active
  },
  productSection, aboutSection, whyMeroSection, brandsSection, ctaSection
}`;

export const PRODUCT_CATEGORIES_QUERY = `*[_type == "productCategory" && active == true] | order(displayOrder asc) {
  _id, name, "slug": slug.current, description, image, iconIdentifier, displayOrder
}`;

export const PRODUCTS_QUERY = `*[_type == "product" && active == true] | order(displayOrder asc) {
  _id, name, "slug": slug.current,
  "category": category->{name, "slug": slug.current},
  shortDescription, fullDescription, mainImage, specifications, displayOrder
}`;

export const LEGAL_PAGE_QUERY = `*[_type == "legalPage" && _id == $id][0] {
  "title": {"ar": titleAr, "en": titleEn},
  "content": {"ar": contentAr, "en": contentEn},
  lastUpdated
}`;

export const CERTIFICATIONS_QUERY = `*[_type == "certification" && coalesce(isActive, active, true) != false] | order(coalesce(displayOrder, order, 0) asc) {
  _id,
  title,
  description,
  certificateAsset,
  issuingOrganization,
  issueDate
}`;

async function sanityRead<T>(query: string, params: Record<string, unknown>, tag: string) {
  try {
    return await client.fetch<T>(query, params, {next: {revalidate: 300, tags: [tag]}});
  } catch (error) {
    console.error(`[sanity] ${tag} read failed`, error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

export function portableTextToPlainText(blocks: PortableTextBlock[]) {
  return blocks
    .map((block) => block.children?.map((child) => child.text ?? '').join('') ?? '')
    .join('\n');
}

export function sanityImageUrl(image: SanityBlogPost['image'] | SanityBrand['logo']) {
  return image?.asset?._ref ? urlFor(image).width(1672).auto('format').url() : '';
}

export async function getSanityBlogPosts() {
  return sanityRead<SanityBlogPost[]>(BLOG_POSTS_QUERY, {}, 'sanity:blogPost');
}

export async function getSanityBlogPostBySlug(slug: string) {
  return sanityRead<SanityBlogPost | null>(BLOG_POST_BY_SLUG_QUERY, {slug}, 'sanity:blogPost');
}

export async function getSanityBrands() {
  const value = await sanityRead<SanityBrand[]>(BRANDS_QUERY, {}, 'sanity:brand');
  return value;
}

export function getFallbackSiteSettings(): SiteSettingsView {
  const branch = branches.find((item) => item.isMain) ?? branches[0];
  return {
    brandName: BUSINESS.brandName,
    legalNameAr: BUSINESS.legalNameAr,
    legalNameEn: BUSINESS.legalNameEn,
    logoUrl: '/mero-logo-white-gold.svg',
    phone: BUSINESS.phone,
    phoneLocal: BUSINESS.phoneLocal,
    whatsapp: BUSINESS.whatsapp,
    email: BUSINESS.email,
    addressAr: BUSINESS.addressAr,
    addressEn: BUSINESS.addressEn,
    latitude: BUSINESS.latitude,
    longitude: BUSINESS.longitude,
    mapUrl: BUSINESS.mapUrl,
    branch,
    footerText: {ar: 'شركة إطار الثريا لخدمات السيارات', en: 'Al Thuraya Automotive Services'},
  };
}

export async function getSanitySiteSettings() {
  const value = await sanityRead<SanitySiteSettings | null>(SITE_SETTINGS_QUERY, {}, 'sanity:siteSettings');
  if (!value) return null;
  const fallback = getFallbackSiteSettings();
  const branch: Branch = {
    ...fallback.branch,
    address: {ar: value.addressAr ?? fallback.addressAr, en: value.addressEn ?? fallback.addressEn},
    phone: value.phone ?? fallback.phoneLocal,
    latitude: value.latitude ?? fallback.latitude,
    longitude: value.longitude ?? fallback.longitude,
  };
  return {
    ...fallback,
    brandName: value.brandName ?? fallback.brandName,
    legalNameAr: value.legalNameAr ?? fallback.legalNameAr,
    legalNameEn: value.legalNameEn ?? fallback.legalNameEn,
    logoUrl: value.mainLogo?.image?.asset?._ref ? urlFor(value.mainLogo.image).width(180).url() : fallback.logoUrl,
    phone: value.phone ?? fallback.phone,
    phoneLocal: value.phone ?? fallback.phoneLocal,
    whatsapp: value.whatsapp ?? fallback.whatsapp,
    email: value.email ?? fallback.email,
    addressAr: value.addressAr ?? fallback.addressAr,
    addressEn: value.addressEn ?? fallback.addressEn,
    latitude: value.latitude ?? fallback.latitude,
    longitude: value.longitude ?? fallback.longitude,
    mapUrl: value.mapUrl ?? fallback.mapUrl,
    branch,
    footerText: {
      ar: value.footerText?.ar ?? fallback.footerText.ar,
      en: value.footerText?.en ?? fallback.footerText.en,
    },
  } satisfies SiteSettingsView;
}

const localizedSection = (section?: {heading?: {ar?: string; en?: string}; body?: {ar?: string; en?: string}}) =>
  section?.heading?.ar && section.heading.en && section.body?.ar && section.body.en
    ? {heading: {ar: section.heading.ar, en: section.heading.en}, body: {ar: section.body.ar, en: section.body.en}}
    : undefined;

export async function getSanityHomepage() {
  const value = await sanityRead<SanityHomepage | null>(HOMEPAGE_QUERY, {}, 'sanity:homepage');
  if (!value) return null;
  return {
    heroSlides: (value.heroSlides ?? []).map((slide) => ({
      imageAr: slide.desktopImageAr?.image?.asset?._ref ? urlFor(slide.desktopImageAr.image).width(1800).url() : '',
      imageEn: slide.desktopImageEn?.image?.asset?._ref ? urlFor(slide.desktopImageEn.image).width(1800).url() : '',
      mobileImageAr: slide.mobileImageAr?.image?.asset?._ref ? urlFor(slide.mobileImageAr.image).width(1200).url() : '',
      mobileImageEn: slide.mobileImageEn?.image?.asset?._ref ? urlFor(slide.mobileImageEn.image).width(1200).url() : '',
      altAr: slide.desktopImageAr?.altAr ?? slide.title?.ar ?? 'Mero',
      altEn: slide.desktopImageEn?.altEn ?? slide.title?.en ?? 'Mero',
      titleAr: slide.title?.ar ?? '',
      titleEn: slide.title?.en ?? '',
      descriptionAr: slide.description?.ar ?? '',
      descriptionEn: slide.description?.en ?? '',
      buttonAr: slide.buttonLabel?.ar ?? '',
      buttonEn: slide.buttonLabel?.en ?? '',
    })),
    productSection: localizedSection(value.productSection),
    aboutSection: localizedSection(value.aboutSection),
    whyMeroSection: localizedSection(value.whyMeroSection),
    brandsSection: localizedSection(value.brandsSection),
    ctaSection: localizedSection(value.ctaSection),
  } satisfies HomepageView;
}

export async function getSanityProductCategories() {
  return sanityRead<SanityCategory[]>(PRODUCT_CATEGORIES_QUERY, {}, 'sanity:productCategory');
}

const staticProductDefaults: Record<string, Partial<ProductCardData>> = {
  'premium-tires': {tag: 'المرتبة الأولى', tagEn: 'Top tier', footer: 'عقود توريد وتجزئة', footerEn: 'Wholesale and retail supply'},
  'high-performance-batteries': {tag: 'عالية الطاقة', tagEn: 'High energy', footer: 'ضمان استبدال معتمد', footerEn: 'Certified replacement support'},
  'advanced-engine-oils': {tag: 'تخليقي بالكامل', tagEn: 'Fully synthetic', footer: 'لزوجة 5W-30 / 0W-20', footerEn: '5W-30 / 0W-20 viscosity'},
  'filters-and-accessories': {tag: 'كفاءة تنقية %99', tagEn: '99% filtration efficiency', footer: 'مواصفات المصنع الأصلية', footerEn: 'Original manufacturer specifications'},
};

export async function getSanityProducts() {
  const value = await sanityRead<SanityProduct[]>(PRODUCTS_QUERY, {}, 'sanity:product');
  if (!value?.length) return null;
  return value.flatMap((product) => {
    const image = product.mainImage?.image?.asset?._ref ? urlFor(product.mainImage.image).width(900).auto('format').url() : '';
    if (!image) return [];
    const defaults = staticProductDefaults[product.slug] ?? {};
    return [{
      id: product._id,
      title: product.name.ar,
      titleEn: product.name.en,
      tag: defaults.tag ?? product.name.ar,
      tagEn: defaults.tagEn ?? product.name.en,
      image,
      desc: product.shortDescription.ar,
      descEn: product.shortDescription.en,
      footer: product.specifications.ar,
      footerEn: product.specifications.en,
      quoteProduct: product.category?.slug ?? product.slug,
      detail: 'طلب تسعير',
    } satisfies ProductCardData];
  });
}

const legalPageIds = {
  privacy: 'migration-legalPage-privacyPolicy',
  terms: 'migration-legalPage-termsAndConditions',
} as const;

export async function getSanityLegalPage(type: keyof typeof legalPageIds) {
  return sanityRead<SanityLegalPageView | null>(
    LEGAL_PAGE_QUERY,
    {id: legalPageIds[type]},
    'sanity:legalPage',
  );
}

type SanityCertificationRecord = {
  _id: string;
  title: {ar?: string; en?: string};
  description: {ar?: string; en?: string};
  certificateAsset?: Array<{
    _type?: string;
    asset?: {_ref?: string};
    altAr?: string;
    altEn?: string;
  }>;
  issuingOrganization?: string;
  issueDate?: string;
};

export async function getSanityCertifications() {
  const value = await sanityRead<SanityCertificationRecord[]>(CERTIFICATIONS_QUERY, {}, 'sanity:certification');
  if (value === null) return null;
  return value.map((certification) => ({
    id: certification._id,
    title: {ar: certification.title.ar ?? '', en: certification.title.en ?? ''},
    description: {ar: certification.description.ar ?? '', en: certification.description.en ?? ''},
    images: (certification.certificateAsset ?? []).flatMap((asset) =>
      asset.asset?._ref
        ? [{
            url: urlFor(asset).width(1200).auto('format').url(),
            altAr: asset.altAr ?? certification.title.ar ?? 'Mero certification',
            altEn: asset.altEn ?? certification.title.en ?? 'Mero certification',
          }]
        : [],
    ),
    issuingOrganization: certification.issuingOrganization ?? '',
    ...(certification.issueDate ? {issueDate: certification.issueDate} : {}),
  })) satisfies SanityCertificationView[];
}

export function toLocalizedBlogPost(post: SanityBlogPost): LocalizedBlogPost {
  const image = sanityImageUrl(post.image);
  const type = {
    tires: 'تقنية الإطارات',
    batteries: 'البطاريات والمناخ الحار',
    oils: 'الزيوت والمحركات',
    standards: 'المعايير والمطابقة',
  }[post.type] as LocalizedBlogPost['type'];
  const plainContent = {
    ar: portableTextToPlainText(post.content.ar),
    en: portableTextToPlainText(post.content.en),
  };
  return {
    slug: post.slug,
    type,
    title: post.title,
    description: post.description,
    content: plainContent,
    image,
    imageAlt: {ar: post.image.altAr ?? post.title.ar, en: post.image.altEn ?? post.title.en},
    createdAt: post.createdAt,
    ...(post.updatedAt ? {updatedAt: post.updatedAt} : {}),
    readingTime: post.readingTime,
    seoTitle: {
      ar: post.seo?.metaTitleAr ?? post.title.ar,
      en: post.seo?.metaTitleEn ?? post.title.en,
    },
    seoDescription: {
      ar: post.seo?.metaDescriptionAr ?? post.description.ar,
      en: post.seo?.metaDescriptionEn ?? post.description.en,
    },
  };
}

export function toBrandCards(items: SanityBrand[]): BrandCard[] {
  return items.flatMap((brand) => {
    const logo = sanityImageUrl(brand.logo);
    if (!logo) return [];
    return [{
      id: brand._id,
      name: brand.name,
      logo,
      altAr: brand.logo?.altAr || brand.name,
      altEn: brand.logo?.altEn || brand.name,
    }];
  });
}

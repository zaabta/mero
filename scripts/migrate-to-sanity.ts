import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {loadEnvConfig} from '@next/env';
import {createClient} from 'next-sanity';
import {localizedBlogs} from '../src/data/blogs';
import {brands} from '../src/data/brands';
import {branches} from '../src/data/branches';
import {BUSINESS} from '../src/lib/business';
import {SITE_URL} from '../src/lib/site';

type LocaleText = {ar: string; en: string};
type SanityDocument = Record<string, unknown> & {_id: string; _type: string};
type ImageAsset = {_type: 'reference'; _ref: string};

const root = resolve(process.cwd());
loadEnvConfig(root);
const writeMode = process.argv.includes('--write');
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-09-19';
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

const imagePaths = new Set<string>();
const missing: string[] = [];
const fallbacks: string[] = [];
const uploadedAssets = new Map<string, ImageAsset>();

const sourceImage = (path: string) => {
  imagePaths.add(path);
  const absolutePath = resolve(root, 'public', path.replace(/^\//, ''));
  if (!existsSync(absolutePath)) missing.push(`Missing image: ${path}`);
  return absolutePath;
};

const localizedImage = async (
  path: string,
  altAr: string,
  altEn: string,
  client?: ReturnType<typeof createClient>,
) => {
  const absolutePath = sourceImage(path);
  if (!writeMode || !client || !existsSync(absolutePath)) return undefined;
  const cached = uploadedAssets.get(absolutePath);
  const buffer = readFileSync(absolutePath);
  const sha1 = createHash('sha1').update(buffer).digest('hex');
  const existing = await client.fetch<{_id: string} | null>(
    '*[_type == "sanity.imageAsset" && sha1hash == $sha1][0]{_id}',
    {sha1},
  );
  const asset =
    cached ||
    (existing
      ? {_type: 'reference' as const, _ref: existing._id}
      : {
          _type: 'reference' as const,
          _ref: (await client.assets.upload('image', buffer, {filename: absolutePath.split('/').pop()}))._id,
        });
  uploadedAssets.set(absolutePath, asset);
  return {image: {asset}, altAr, altEn};
};

const heroImage = async (
  requestedPath: string,
  fallbackPath: string,
  altAr: string,
  altEn: string,
  client?: ReturnType<typeof createClient>,
) => {
  const requestedAbsolutePath = resolve(root, 'public', requestedPath.replace(/^\//, ''));
  if (existsSync(requestedAbsolutePath)) {
    return localizedImage(requestedPath, altAr, altEn, client);
  }
  const fallbackAbsolutePath = resolve(root, 'public', fallbackPath.replace(/^\//, ''));
  if (existsSync(fallbackAbsolutePath)) {
    fallbacks.push(`${requestedPath} -> ${fallbackPath}`);
    return localizedImage(fallbackPath, altAr, altEn, client);
  }
  sourceImage(requestedPath);
  return undefined;
};

const portableText = (value: string) => {
  const lines = value.trim().split(/\r?\n/);
  const blocks: Record<string, unknown>[] = [];
  let paragraph: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    const text = paragraph.join(' ').trim();
    if (text) {
      blocks.push({
        _key: `block-${key++}`,
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [{_key: `span-${key++}`, _type: 'span', marks: [], text}],
      });
    }
    paragraph = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushParagraph();
      const text = trimmed.slice(3).trim();
      blocks.push({
        _key: `block-${key++}`,
        _type: 'block',
        style: 'h2',
        markDefs: [],
        children: [{_key: `span-${key++}`, _type: 'span', marks: [], text}],
      });
      continue;
    }
    if (trimmed.startsWith('- ')) {
      flushParagraph();
      const text = trimmed.slice(2).trim();
      blocks.push({
        _key: `block-${key++}`,
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        markDefs: [],
        children: [{_key: `span-${key++}`, _type: 'span', marks: [], text}],
      });
      continue;
    }
    paragraph.push(trimmed);
  }
  flushParagraph();
  return blocks;
};

const extractObject = (file: string, declaration: string) => {
  const source = readFileSync(resolve(root, file), 'utf8');
  const declarationIndex = source.indexOf(declaration);
  const equalsIndex = source.indexOf('=', declarationIndex);
  const start = source.indexOf('{', equalsIndex);
  let depth = 0;
  let end = start;
  for (; end < source.length; end += 1) {
    if (source[end] === '{') depth += 1;
    if (source[end] === '}') {
      depth -= 1;
      if (depth === 0) break;
    }
  }
  return Function(`"use strict"; return (${source.slice(start, end + 1)});`)();
};

const sectionText = (sections: Record<string, Array<{title: string; paragraphs?: string[]; bullets?: string[]}>>) =>
  Object.values(sections)
    .flat()
    .map((section) => [`## ${section.title}`, ...(section.paragraphs ?? []), ...(section.bullets ?? []).map((item) => `- ${item}`)].join('\n'))
    .join('\n\n');

const categoryMap = {
  tires: {ar: 'الإطارات', en: 'Tires', descriptionAr: 'حلول الإطارات للطرق والظروف الحارة.', descriptionEn: 'Tire solutions for roads and hot driving conditions.'},
  batteries: {ar: 'البطاريات', en: 'Batteries', descriptionAr: 'بطاريات مناسبة لظروف المناخ الحار.', descriptionEn: 'Batteries selected for hot-climate conditions.'},
  oils: {ar: 'الزيوت والمحركات', en: 'Oils and engines', descriptionAr: 'زيوت وفلاتر للعناية بالمحركات.', descriptionEn: 'Oils and filters for engine care.'},
  filters: {ar: 'الفلاتر والملحقات', en: 'Filters and accessories', descriptionAr: 'فلاتر وقطع استهلاك سريع للمركبات.', descriptionEn: 'Filters and fast-moving vehicle parts.'},
} as const;

const homepageProducts = [
  {slug: 'premium-tires', name: {ar: 'الإطارات الفاخرة', en: 'Premium Tires'}, tag: {ar: 'المرتبة الأولى', en: 'Top tier'}, image: '/images/hero-tire.jpeg', description: {ar: 'ثبات فائق، تحكم استثنائي، ومقاومة عالية لدرجات الحرارة على الطرق السريعة والصحراوية.', en: 'Reliable grip, control, and heat resistance for highways and desert roads.'}, footer: {ar: 'عقود توريد وتجزئة', en: 'Wholesale and retail supply'}, category: 'tires'},
  {slug: 'high-performance-batteries', name: {ar: 'البطاريات عالية الأداء', en: 'High-performance batteries'}, tag: {ar: 'عالية الطاقة', en: 'High energy'}, image: '/images/battery.jpeg', description: {ar: 'طاقة تشغيلية قوية ومستدامة مصممة لظروف المناخ الحار وأقصى درجات التحمل دون انقطاع.', en: 'Strong, dependable starting power designed for hot climates and demanding conditions.'}, footer: {ar: 'ضمان استبدال معتمد', en: 'Certified replacement support'}, category: 'batteries'},
  {slug: 'advanced-engine-oils', name: {ar: 'زيوت المحركات المتطورة', en: 'Advanced engine oils'}, tag: {ar: 'تخليقي بالكامل', en: 'Fully synthetic'}, image: '/images/engine.jpeg', description: {ar: 'حماية متقدمة للمحرك مع تقنيات تخليقية تحافظ على سلاسة الأداء وعمر أطول للمركبة تحت الضغط.', en: 'Advanced engine protection with synthetic technology for smooth, lasting performance.'}, footer: {ar: 'لزوجة 5W-30 / 0W-20', en: '5W-30 / 0W-20 viscosity'}, category: 'oils'},
  {slug: 'filters-and-accessories', name: {ar: 'الفلاتر والملحقات', en: 'Filters and accessories'}, tag: {ar: 'كفاءة تنقية %99', en: '99% filtration efficiency'}, image: '/images/oil-filter.jpeg', description: {ar: 'فلاتر هواء وزيت وقطع غيار سريعة التبديل تضمن كفاءة استهلاك الوقود ونقاء المنظومة بالكامل.', en: 'Air and oil filters plus essential parts for clean, efficient vehicle care.'}, footer: {ar: 'مواصفات المصنع الأصلية', en: 'Original manufacturer specifications'}, category: 'filters'},
] as const;

const heroSlides = [
  {internalName: 'Premium tires', title: {ar: 'إطارات عالية الجودة', en: 'High-quality tires'}, description: {ar: 'ثبات مطلق وتحكم استثنائي مع كل ما تحتاجه سيارتك في مكان واحد.', en: 'Reliable grip and control, with everything your vehicle needs in one place.'}, desktop: '/images/hero-tire-ar.png', desktopEn: '/images/hero-tire-ltr.png', mobile: '/images/hero-tire-mobile.png', button: {ar: 'تصفح الإطارات المعتمدة', en: 'Explore tires'}},
  {internalName: 'High-performance batteries', title: {ar: 'بطاريات فائقة الطاقة', en: 'High-performance batteries'}, description: {ar: 'قوة تشغيلية فورية مصممة للتعامل مع درجات الحرارة العالية دون انقطاع.', en: 'Instant starting power designed for high temperatures and everyday confidence.'}, desktop: '/images/hero-battery-premium.png', desktopEn: '/images/hero-battery-ltr.png', mobile: '/images/hero-battery-mobile.png', button: {ar: 'استكشف أنواع البطاريات', en: 'Explore batteries'}},
  {internalName: 'Advanced engine oils', title: {ar: 'زيوت محركات متطورة', en: 'Advanced engine oils'}, description: {ar: 'حماية متقدمة للمحرك مع زيوت وفلاتر مختارة للعناية المستمرة.', en: 'Carefully selected oils and filters for consistent engine care.'}, desktop: '/images/hero-oils-premium.png', desktopEn: '/images/hero-oils-ltr.png', mobile: '/images/hero-oils-mobile.png', button: {ar: 'عرض الزيوت والفلاتر', en: 'Explore oils and filters'}},
] as const;

const makeId = (type: string, key: string) => `migration-${type}-${key}`;
const slug = (current: string) => ({_type: 'slug', current});

async function buildDocuments(client?: ReturnType<typeof createClient>) {
  const mainBranch = branches.find((branch) => branch.isMain) ?? branches[0];
  const logo = await localizedImage('/mero-logo-white-gold.svg', 'شعار ميرو', 'Mero logo', client);
  const documents: SanityDocument[] = [];

  documents.push({
    _id: makeId('singleton', 'siteSettings'),
    _type: 'siteSettings',
    brandName: BUSINESS.brandName,
    legalNameAr: BUSINESS.legalNameAr,
    legalNameEn: BUSINESS.legalNameEn,
    ...(logo ? {mainLogo: logo, whiteGoldLogo: logo} : {}),
    phone: BUSINESS.phone,
    whatsapp: BUSINESS.whatsapp,
    email: BUSINESS.email,
    addressAr: BUSINESS.addressAr,
    addressEn: BUSINESS.addressEn,
    latitude: BUSINESS.latitude,
    longitude: BUSINESS.longitude,
    mapUrl: BUSINESS.mapUrl,
    socialLinks: [],
    footerText: {ar: 'شركة إطار الثريا لخدمات السيارات', en: 'Al Thuraya Automotive Services'},
  });

  const slides = [];
  for (const [index, item] of heroSlides.entries()) {
    const desktopAr = await heroImage(item.desktop, item.desktopEn, item.title.ar, item.title.en, client);
    const desktopEn = await heroImage(item.desktopEn, item.desktop, item.title.ar, item.title.en, client);
    const mobileAr = await heroImage(item.mobile, item.mobile, item.title.ar, item.title.en, client);
    const mobileEn = await heroImage(item.mobile, item.mobile, item.title.ar, item.title.en, client);
    slides.push({
      _key: `hero-${index + 1}`,
      internalName: item.internalName,
      title: item.title,
      description: item.description,
      ...(desktopAr ? {desktopImageAr: desktopAr} : {}),
      ...(desktopEn ? {desktopImageEn: desktopEn} : {}),
      ...(mobileAr ? {mobileImageAr: mobileAr} : {}),
      ...(mobileEn ? {mobileImageEn: mobileEn} : {}),
      buttonLabel: item.button,
      buttonLink: '#products',
      displayOrder: index,
      active: true,
    });
  }
  documents.push({
    _id: makeId('singleton', 'homepage'),
    _type: 'homepage',
    heroSlides: slides,
    productSection: {heading: {ar: 'فئات المنتجات المتميزة', en: 'Premium product categories'}, body: {ar: 'مجموعة متكاملة من أجود قطع غيار ومستلزمات السيارات المصممة لتحمل ظروف الطريق الخليجية وتأمين رحلات يومية وسريعة بأعلى معايير الرفاهية والأمان.', en: 'A complete selection of automotive products carefully chosen for everyday driving and Gulf roads.'}},
    aboutSection: {heading: {ar: 'أداء يبدأ من التفاصيل', en: 'Performance starts with the details'}, body: {ar: 'نلتزم في إطار الثريا (MERO) بتقديم حلول متطورة ترتقي بتجربة قيادتك وتمنحك الثقة التامة والتحكم المطلق في كل منعطف ورحلة.', en: 'At Mero, we provide advanced solutions that elevate your driving experience and give you confidence and control on every journey.'}},
    whyMeroSection: {heading: {ar: 'لماذا تختار Mero؟', en: 'Why choose Mero?'}, body: {ar: 'نعمل على تقديم تجربة مهنية ومنتجات مختارة تناسب احتياجات السائقين وورش السيارات.', en: 'We offer a professional experience and carefully selected products for drivers and workshops.'}},
    brandsSection: {heading: {ar: 'العلامات التجارية', en: 'Brands'}, body: {ar: 'نوفر تشكيلة متنوعة من العلامات التجارية لتلبية احتياجات مختلف المركبات والطرق.', en: 'A diverse selection of automotive brands for different vehicles, roads, and driving needs.'}},
    ctaSection: {heading: {ar: 'تواصل مع خبرائنا اليوم', en: 'Talk to our experts today'}, body: {ar: 'يسعدنا استقبال استفساراتكم بخصوص طلبات التوريد، عروض أسعار الجملة، أو الشراكات التجارية في المملكة العربية السعودية.', en: 'We welcome your inquiries about supply requests, wholesale quotations, or commercial partnerships in Saudi Arabia.'}},
  });

  const categoryRefs = new Map<string, string>();
  for (const [index, [key, value]] of Object.entries(categoryMap).entries()) {
    const id = makeId('productCategory', key);
    categoryRefs.set(key, id);
    documents.push({_id: id, _type: 'productCategory', name: {ar: value.ar, en: value.en}, slug: slug(key), description: {ar: value.descriptionAr, en: value.descriptionEn}, iconIdentifier: key, displayOrder: index, active: true});
  }

  for (const [index, product] of homepageProducts.entries()) {
    const image = await localizedImage(product.image, product.name.ar, product.name.en, client);
    documents.push({_id: makeId('product', product.slug), _type: 'product', name: product.name, slug: slug(product.slug), category: {_type: 'reference', _ref: categoryRefs.get(product.category)}, shortDescription: product.description, fullDescription: product.description, ...(image ? {mainImage: image} : {}), specifications: product.footer, displayOrder: index, active: true, featured: index < 2});
  }

  for (const [index, brand] of brands.entries()) {
    const image = await localizedImage(brand.logo, brand.alt, brand.name, client);
    documents.push({_id: makeId('brand', brand.id), _type: 'brand', name: brand.name, ...(image ? {logo: image} : {}), displayOrder: index, active: true, featured: index < 6});
  }

  const categoryValues: Record<string, string> = { 'تقنية الإطارات': 'tires', 'البطاريات والمناخ الحار': 'batteries', 'الزيوت والمحركات': 'oils', 'المعايير والمطابقة': 'standards' };
  for (const blog of localizedBlogs) {
    const image = await localizedImage(blog.image, blog.imageAlt.ar, blog.imageAlt.en, client);
    documents.push({_id: makeId('blogPost', blog.slug), _type: 'blogPost', internalName: blog.slug, title: blog.title, slug: slug(blog.slug), description: blog.description, content: {ar: portableText(blog.content.ar), en: portableText(blog.content.en)}, ...(image ? {mainImage: image} : {}), category: categoryValues[blog.type], publishedDate: blog.createdAt, ...(blog.updatedAt ? {modifiedDate: blog.updatedAt} : {}), readingTime: blog.readingTime, keywordsAr: [blog.type, 'Mero'], keywordsEn: [categoryValues[blog.type], 'Mero'], featured: false, published: true, seo: {metaTitleAr: blog.seoTitle.ar, metaTitleEn: blog.seoTitle.en, metaDescriptionAr: blog.seoDescription.ar, metaDescriptionEn: blog.seoDescription.en}});
  }

  const legalSource = extractObject('src/components/LegalPage.tsx', 'const privacySections');
  const termsSource = extractObject('src/components/LegalPage.tsx', 'const termsSections');
  documents.push({_id: makeId('legalPage', 'privacyPolicy'), _type: 'legalPage', titleAr: 'سياسة الخصوصية', titleEn: 'Privacy policy', contentAr: portableText(sectionText(legalSource.ar)), contentEn: portableText(sectionText(legalSource.en)), lastUpdated: '2026-09-18'});
  documents.push({_id: makeId('legalPage', 'termsAndConditions'), _type: 'legalPage', titleAr: 'الشروط والأحكام', titleEn: 'Terms and conditions', contentAr: portableText(sectionText(termsSource.ar)), contentEn: portableText(sectionText(termsSource.en)), lastUpdated: '2026-09-18'});

  missing.push('No favicon file was found in public; Site Settings.favicon is omitted.');
  missing.push('No real social-media URLs were found; Site Settings.socialLinks is empty.');
  missing.push('No actual certification records or certificate files exist; no certification documents are created.');
  missing.push('Product full descriptions/specifications are not separate source records; existing visible descriptions and labels are reused.');
  return documents;
}

const verifyLocalMigration = (documents: SanityDocument[]) => {
  const ids = new Set(documents.map((document) => document._id));
  const references = documents.flatMap((document) => {
    const category = document.category;
    return category && typeof category === 'object' && '_ref' in category
      ? [{document: document._id, ref: String(category._ref)}]
      : [];
  });
  const brokenReferences = references.filter(({ref}) => !ids.has(ref));
  const blogSlugs = documents
    .filter((document) => document._type === 'blogPost')
    .map((document) => String((document.slug as {current: string}).current));
  const duplicateSlugs = blogSlugs.filter((value, index) => blogSlugs.indexOf(value) !== index);
  return {brokenReferences, duplicateSlugs, blogSlugs};
};

async function main() {
  if (writeMode && (!projectId || !dataset || !apiVersion || !token)) {
    throw new Error('Write mode requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION, and SANITY_API_WRITE_TOKEN.');
  }
  const client = writeMode
    ? createClient({projectId, dataset, apiVersion, token, useCdn: false})
    : undefined;
  const documents = await buildDocuments(client);
  const counts = documents.reduce<Record<string, number>>((result, document) => {
    result[document._type] = (result[document._type] ?? 0) + 1;
    return result;
  }, {});
  const localVerification = verifyLocalMigration(documents);

  if (writeMode && client) {
    for (const document of documents) await client.createOrReplace(document);
    const managedTypes = ['siteSettings', 'homepage', 'productCategory', 'product', 'brand', 'blogPost', 'certification', 'legalPage'];
    const [counts, total, imageCount, blogSlugs, existingIds, brokenReferences] = await Promise.all([
      Promise.all(managedTypes.map(async (type) => ({type, count: await client.fetch<number>('count(*[_type == $type])', {type})}))),
      client.fetch<number>('count(*[_type in $types])', {types: managedTypes}),
      client.fetch<number>('count(*[_type == "sanity.imageAsset"])'),
      client.fetch<string[]>('*[_type == "blogPost"] | order(slug.current asc).slug.current'),
      client.fetch<string[]>('*[_id in $ids]._id', {ids: documents.map((document) => document._id)}),
      client.fetch<Array<{document: string; ref: string}>>('*[_type == "product" && defined(category) && !defined(category->._id)]{"document": _id, "ref": category._ref}'),
    ]);
    const datasetVerification = {
      counts,
      total,
      imageCount,
      blogSlugs,
      missingIds: documents.map((document) => document._id).filter((id) => !existingIds.includes(id)),
      brokenReferences,
    };
    console.log('Dataset verification:', JSON.stringify(datasetVerification));
  }

  console.log(`Sanity migration ${writeMode ? 'write' : 'dry-run'} completed.`);
  console.log(`Mode: ${writeMode ? 'WRITE' : 'DRY RUN (no Dataset writes)'}`);
  console.log('Documents:');
  for (const [type, count] of Object.entries(counts)) console.log(`- ${type}: ${count}`);
  console.log(`- Total: ${documents.length}`);
  console.log(`Images referenced: ${imagePaths.size}`);
  console.log(`Images uploaded/reused: ${writeMode ? uploadedAssets.size : 0}`);
  console.log(`Fallbacks used: ${fallbacks.length ? fallbacks.join('; ') : 'none'}`);
  console.log(`Broken references: ${localVerification.brokenReferences.length}`);
  console.log(`Duplicate blog slugs: ${localVerification.duplicateSlugs.length}`);
  console.log(`Blog slugs: ${localVerification.blogSlugs.join(', ')}`);
  if (missing.length) {
    console.log('Missing or intentionally omitted data:');
    for (const item of [...new Set(missing)]) console.log(`- ${item}`);
  }
  console.log(`Production URL source: ${SITE_URL}`);
  console.log(`Business source: ${BUSINESS.brandName} / ${BUSINESS.legalNameEn}`);
  if (!writeMode) console.log('To write: npm run sanity:migrate -- --write');
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

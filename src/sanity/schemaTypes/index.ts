import type { SchemaTypeDefinition } from 'sanity';
import { blogPost } from './blogPost';
import { brand } from './brand';
import { certification } from './certification';
import { homepage } from './homepage';
import { legalPage } from './legalPage';
import { product } from './product';
import { productCategory } from './productCategory';
import { siteSettings } from './siteSettings';
import {
  localizedImage,
  localizedPortableText,
  localizedString,
  localizedText,
  seo,
} from './shared';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localizedString,
    localizedText,
    localizedPortableText,
    localizedImage,
    seo,
    siteSettings,
    homepage,
    productCategory,
    product,
    brand,
    blogPost,
    certification,
    legalPage,
  ],
};

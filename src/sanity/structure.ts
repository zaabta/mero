import type { StructureResolver } from 'sanity/structure';
import {
  CheckmarkCircleIcon,
  CogIcon,
  DocumentIcon,
  DocumentTextIcon,
  HomeIcon,
  PackageIcon,
  TagIcon,
} from '@sanity/icons';

export const singletonTypes = ['siteSettings', 'homepage', 'legalPage'];
const managedTypes = [
  'siteSettings',
  'homepage',
  'productCategory',
  'product',
  'brand',
  'blogPost',
  'certification',
  'legalPage',
];

const singleton = (
  S: Parameters<StructureResolver>[0],
  type: string,
  id: string,
  title: string,
  icon: typeof CogIcon,
) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(id).title(title));

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Mero Website Content')
    .items([
      singleton(S, 'siteSettings', 'migration-singleton-siteSettings', 'Site Settings', CogIcon),
      singleton(S, 'homepage', 'migration-singleton-homepage', 'Homepage', HomeIcon),
      S.divider(),
      S.listItem()
        .title('Products')
        .icon(PackageIcon)
        .child(
          S.list()
            .title('Products')
            .items([
              S.documentTypeListItem('productCategory').title('Product Categories').icon(TagIcon),
              S.documentTypeListItem('product').title('Products').icon(PackageIcon),
            ]),
        ),
      S.documentTypeListItem('brand').title('Brands').icon(TagIcon),
      S.documentTypeListItem('blogPost').title('Blog Posts').icon(DocumentTextIcon),
      S.documentTypeListItem('certification').title('Certifications').icon(CheckmarkCircleIcon),
      S.listItem()
        .title('Legal Pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Legal Pages')
            .items([
              singleton(S, 'legalPage', 'migration-legalPage-privacyPolicy', 'Privacy Policy', DocumentIcon),
              singleton(S, 'legalPage', 'migration-legalPage-termsAndConditions', 'Terms and Conditions', DocumentIcon),
            ]),
        ),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return !id || !managedTypes.includes(id);
      }),
    ]);

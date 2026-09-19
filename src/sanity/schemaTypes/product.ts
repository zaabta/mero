import { PackageIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import {
  localizedImage,
  localizedStringFields,
  localizedTextFields,
  positiveOrderField,
  slugValidation,
} from './shared';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    localizedStringFields('name', 'Name'),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.en', maxLength: 96 },
      validation: slugValidation,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      validation: (rule) => rule.required(),
    }),
    localizedTextFields('shortDescription', 'Short description'),
    localizedTextFields('fullDescription', 'Full description'),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'localizedImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'additionalImages',
      title: 'Additional images',
      type: 'array',
      of: [defineArrayMember({ type: 'localizedImage' })],
    }),
    localizedTextFields('specifications', 'Specifications'),
    positiveOrderField(),
    defineField({ name: 'active', title: 'Active', type: 'boolean', initialValue: true }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: { select: { title: 'name.en', subtitle: 'category.title', media: 'mainImage.image' } },
});

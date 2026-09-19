import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import {
  localizedImage,
  localizedStringFields,
  localizedTextFields,
  slugValidation,
} from './shared';

const categories = [
  { title: 'Tire technology', value: 'tires' },
  { title: 'Batteries and hot climates', value: 'batteries' },
  { title: 'Oils and engines', value: 'oils' },
  { title: 'Standards and compliance', value: 'standards' },
];

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'internalName',
      title: 'Internal name',
      type: 'string',
      validation: slugValidation,
    }),
    localizedStringFields('title', 'Title'),
    defineField({
      name: 'slug',
      title: 'Shared slug',
      type: 'slug',
      options: { source: 'title.en', maxLength: 120 },
      validation: (rule) => rule.required(),
    }),
    localizedTextFields('description', 'Description'),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localizedPortableText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'localizedImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: categories },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'modifiedDate', title: 'Modified date', type: 'date' }),
    defineField({
      name: 'readingTime',
      title: 'Reading time (minutes)',
      type: 'number',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'keywordsAr',
      title: 'Keywords (Arabic)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'keywordsEn',
      title: 'Keywords (English)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'published', title: 'Published', type: 'boolean', initialValue: false }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: { select: { title: 'title.en', subtitle: 'category', media: 'mainImage.image' } },
});

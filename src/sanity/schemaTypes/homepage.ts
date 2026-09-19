import { HomeIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import {
  localizedImage,
  localizedStringFields,
  localizedTextFields,
  positiveOrderField,
} from './shared';

const sectionFields = [
  localizedStringFields('heading', 'Heading'),
  localizedTextFields('body', 'Body'),
  defineField({ name: 'ctaLabel', title: 'CTA label', type: 'localizedString' }),
  defineField({ name: 'ctaLink', title: 'CTA link', type: 'string' }),
];

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heroSlides',
      title: 'Hero slides',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'heroSlide',
          title: 'Hero slide',
          fields: [
            defineField({
              name: 'internalName',
              title: 'Internal name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            localizedStringFields('title', 'Title'),
            localizedTextFields('description', 'Description'),
            defineField({
              name: 'desktopImageAr',
              title: 'Desktop image (Arabic)',
              type: 'localizedImage',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'desktopImageEn',
              title: 'Desktop image (English)',
              type: 'localizedImage',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'mobileImageAr',
              title: 'Mobile image (Arabic)',
              type: 'localizedImage',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'mobileImageEn',
              title: 'Mobile image (English)',
              type: 'localizedImage',
              validation: (rule) => rule.required(),
            }),
            localizedStringFields('buttonLabel', 'Button label'),
            defineField({
              name: 'buttonLink',
              title: 'Button link',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            positiveOrderField(),
            defineField({ name: 'active', title: 'Active', type: 'boolean', initialValue: true }),
          ],
          preview: {
            select: { title: 'internalName', subtitle: 'title.en', media: 'desktopImageAr.image' },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'productSection',
      title: 'Product section',
      type: 'object',
      fields: sectionFields,
    }),
    defineField({
      name: 'aboutSection',
      title: 'About section',
      type: 'object',
      fields: sectionFields,
    }),
    defineField({
      name: 'whyMeroSection',
      title: 'Why Mero section',
      type: 'object',
      fields: sectionFields,
    }),
    defineField({
      name: 'brandsSection',
      title: 'Brands section',
      type: 'object',
      fields: sectionFields,
    }),
    defineField({
      name: 'ctaSection',
      title: 'CTA section',
      type: 'object',
      fields: [
        ...sectionFields,
        defineField({ name: 'image', title: 'Image', type: 'localizedImage' }),
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
});

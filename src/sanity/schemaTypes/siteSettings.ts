import { CogIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { localizedImage, localizedTextFields } from './shared';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'legalNameAr',
      title: 'Legal name (Arabic)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'legalNameEn',
      title: 'Legal name (English)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'mainLogo', title: 'Main logo', type: 'localizedImage' }),
    defineField({ name: 'whiteGoldLogo', title: 'White/gold logo', type: 'localizedImage' }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'localizedImage' }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'addressAr',
      title: 'Address (Arabic)',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'addressEn',
      title: 'Address (English)',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'latitude',
      title: 'Branch latitude',
      type: 'number',
      validation: (rule) => rule.required().min(-90).max(90),
    }),
    defineField({
      name: 'longitude',
      title: 'Branch longitude',
      type: 'number',
      validation: (rule) => rule.required().min(-180).max(180),
    }),
    defineField({
      name: 'mapUrl',
      title: 'Map URL',
      type: 'url',
      validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social platform links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        }),
      ],
    }),
    localizedTextFields('footerText', 'Footer text'),
  ],
});

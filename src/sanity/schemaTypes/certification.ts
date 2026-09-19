import { CheckmarkCircleIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { localizedStringFields, localizedTextFields, positiveOrderField } from './shared';

export const certification = defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  icon: CheckmarkCircleIcon,
  fields: [
    localizedStringFields('title', 'Title'),
    localizedTextFields('description', 'Description'),
    defineField({
      name: 'certificateAsset',
      title: 'Image or certificate file',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'altAr',
              title: 'Alt text (Arabic)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'altEn',
              title: 'Alt text (English)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineArrayMember({ type: 'file' }),
      ],
      validation: (rule) => rule.max(1),
    }),
    defineField({
      name: 'issuingOrganization',
      title: 'Issuing organization',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'issueDate', title: 'Issue date', type: 'date' }),
    positiveOrderField(),
    defineField({ name: 'active', title: 'Active', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'title.en', subtitle: 'issuingOrganization' } },
});

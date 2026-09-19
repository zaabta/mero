import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { localizedImage, positiveOrderField } from './shared';

export const brand = defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Brand name',
      type: 'string',
      validation: (rule) =>
        rule.required().custom(async (value, context) => {
          if (!value) return true;
          const id = context.document?._id?.replace(/^drafts\./, '');
          const count = await context
            .getClient({ apiVersion: '2026-09-19' })
            .fetch('count(*[_type == "brand" && lower(name) == lower($name) && _id != $id])', {
              name: value,
              id,
            });
          return count === 0 || 'Brand name must be unique.';
        }),
    }),
    defineField({
      name: 'logo',
      title: 'Official logo',
      type: 'localizedImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    positiveOrderField(),
    defineField({ name: 'active', title: 'Active', type: 'boolean', initialValue: true }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'name', media: 'logo.image' } },
});

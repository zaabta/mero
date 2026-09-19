import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import {
  localizedImage,
  localizedStringFields,
  localizedTextFields,
  positiveOrderField,
  slugValidation,
} from './shared';

export const productCategory = defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    localizedStringFields('name', 'Name'),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.en', maxLength: 96 },
      validation: slugValidation,
    }),
    localizedTextFields('description', 'Description'),
    defineField({ name: 'image', title: 'Image', type: 'localizedImage' }),
    defineField({ name: 'iconIdentifier', title: 'Icon identifier', type: 'string' }),
    positiveOrderField(),
    defineField({ name: 'active', title: 'Active', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'name.en', subtitle: 'slug.current', media: 'image.image' } },
});

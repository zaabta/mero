import { defineArrayMember, defineField, defineType } from 'sanity';

const requiredLocalizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({
        name: 'ar',
        title: 'Arabic',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'en',
        title: 'English',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
    ],
  });

const requiredLocalizedText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({
        name: 'ar',
        title: 'Arabic',
        type: 'text',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'en',
        title: 'English',
        type: 'text',
        validation: (rule) => rule.required(),
      }),
    ],
  });

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized string',
  type: 'object',
  fields: [
    defineField({ name: 'ar', title: 'Arabic', type: 'string' }),
    defineField({ name: 'en', title: 'English', type: 'string' }),
  ],
});

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized text',
  type: 'object',
  fields: [
    defineField({ name: 'ar', title: 'Arabic', type: 'text' }),
    defineField({ name: 'en', title: 'English', type: 'text' }),
  ],
});

const portableTextBlocks = [
  defineArrayMember({
    type: 'block',
    styles: [
      { title: 'Normal', value: 'normal' },
      { title: 'Heading 2', value: 'h2' },
      { title: 'Heading 3', value: 'h3' },
      { title: 'Quote', value: 'blockquote' },
    ],
  }),
];

export const localizedPortableText = defineType({
  name: 'localizedPortableText',
  title: 'Localized Portable Text',
  type: 'object',
  fields: [
    defineField({
      name: 'ar',
      title: 'Arabic',
      type: 'array',
      of: portableTextBlocks,
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: portableTextBlocks,
      validation: (rule) => rule.required().min(1),
    }),
  ],
});

export const seo = defineType({
  name: 'seo',
  title: 'SEO fields',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitleAr',
      title: 'Meta title (Arabic)',
      type: 'string',
      validation: (rule) => rule.max(60).warning('Keep the title within 60 characters.'),
    }),
    defineField({
      name: 'metaTitleEn',
      title: 'Meta title (English)',
      type: 'string',
      validation: (rule) => rule.max(60).warning('Keep the title within 60 characters.'),
    }),
    defineField({
      name: 'metaDescriptionAr',
      title: 'Meta description (Arabic)',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Keep the description within 160 characters.'),
    }),
    defineField({
      name: 'metaDescriptionEn',
      title: 'Meta description (English)',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Keep the description within 160 characters.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});

export const localizedImage = defineType({
  name: 'localizedImage',
  title: 'Image with localized alt text',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
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
});

export const localizedStringFields = (name: string, title: string) =>
  requiredLocalizedString(name, title);

export const localizedTextFields = (name: string, title: string) =>
  requiredLocalizedText(name, title);

export const positiveOrderField = (name = 'displayOrder') =>
  defineField({
    name,
    title: 'Display order',
    type: 'number',
    validation: (rule) => rule.required().integer().min(0),
  });

type ValidationRuleLike = {
  required: () => ValidationRuleLike;
  custom: (validator: (value: unknown) => true | string) => ValidationRuleLike;
};

export const slugValidation = <T extends ValidationRuleLike>(rule: T): T =>
  rule.required().custom((value: unknown) => {
    const current =
      value && typeof value === 'object' && 'current' in value && typeof value.current === 'string'
        ? value.current
        : '';
    if (!current) return 'Slug is required.';
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(current)
      ? true
      : 'Use lowercase letters, numbers, and hyphens only.';
  }) as T;

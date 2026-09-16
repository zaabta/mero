export type Locale = 'ar' | 'en';

export const defaultLocale: Locale = 'ar';

export function isLocale(value: string): value is Locale {
  return value === 'ar' || value === 'en';
}

export const dictionaries = {
  ar: {
    products: 'المنتجات',
    about: 'من نحن',
    brands: 'العلامات التجارية',
    contact: 'تواصل معنا',
    home: 'الرئيسية',
    language: 'اللغة',
  },
  en: {
    products: 'Products',
    about: 'About',
    brands: 'Brands',
    contact: 'Contact',
    home: 'Home',
    language: 'Language',
  },
} as const;

export function getDictionary(locale: Locale = 'ar') {
  return dictionaries[locale];
}

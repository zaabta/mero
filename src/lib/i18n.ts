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
    blog: 'المدونة',
    contact: 'تواصل معنا',
    home: 'الرئيسية',
    language: 'اللغة',
    brandsTitle: 'العلامات التجارية',
    brandsDescription:
      'نوفر تشكيلة متنوعة من العلامات التجارية لتلبية احتياجات مختلف المركبات والطرق.',
    viewAllBrands: 'عرض جميع العلامات',
    showLess: 'عرض أقل',
  },
  en: {
    products: 'Products',
    about: 'About',
    brands: 'Brands',
    blog: 'Blog',
    contact: 'Contact',
    home: 'Home',
    language: 'Language',
    brandsTitle: 'Brands',
    brandsDescription:
      'A diverse selection of automotive brands for different vehicles, roads, and driving needs.',
    viewAllBrands: 'View all brands',
    showLess: 'Show less',
  },
} as const;

export function getDictionary(locale: Locale = 'ar') {
  return dictionaries[locale];
}

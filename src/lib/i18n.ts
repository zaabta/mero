export type Locale = 'ar' | 'en';

export const defaultLocale: Locale = 'ar';

export function isLocale(value: string): value is Locale {
  return value === 'ar' || value === 'en';
}

import { getRequestConfig } from 'next-intl/server';

const locales = ['ar', 'en'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = locales.includes(requestedLocale as (typeof locales)[number])
    ? (requestedLocale as (typeof locales)[number])
    : 'ar';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

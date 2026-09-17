'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isLocale, type Locale } from '../lib/i18n';

export default function LanguageSwitcher({ locale = 'ar' }: { locale?: Locale }) {
  const pathname = usePathname();
  const pathLocale = pathname?.split('/')[1];
  const language = pathLocale && isLocale(pathLocale) ? pathLocale : locale;
  const languages: Locale[] = language === 'en' ? ['en', 'ar'] : ['ar', 'en'];

  return (
    <div
      dir="ltr"
      className="flex items-center rounded-md border border-white/10 bg-carbon p-1 text-[10px]"
      role="group"
      aria-label={language === 'en' ? 'Language selection' : 'اختيار اللغة'}
    >
      {languages.map((item) => {
        const targetPath = (pathname ?? `/${language}`).replace(/^\/(?:ar|en)(?=\/|$)/, `/${item}`);

        return (
          <Link
            key={item}
            href={targetPath}
            aria-current={language === item ? 'page' : undefined}
            className={`min-h-7 min-w-8 rounded px-2 py-1.5 text-center transition ${language === item ? 'bg-gold text-void' : 'text-muted hover:text-white'}`}
          >
            {item.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

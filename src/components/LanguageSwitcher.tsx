'use client';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { trackEvent } from '@/lib/analytics';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const items = ['en', 'ar'] as const;
  return (
    <div
      dir="ltr"
      className="flex items-center rounded-md border border-white/10 bg-carbon p-1 text-[10px]"
      role="group"
      aria-label={locale === 'en' ? 'Language selection' : 'اختيار اللغة'}
    >
      {items.map((item) => {
        return (
          <Link
            key={item}
            href={pathname}
            locale={item}
            aria-current={locale === item ? 'page' : undefined}
            onClick={() => {
              if (item !== locale) {
                trackEvent('language_change', {
                  from_language: locale,
                  to_language: item,
                });
              }
            }}
            className={`min-h-7 min-w-8 rounded px-2 py-1.5 text-center transition ${locale === item ? 'bg-gold text-void' : 'text-muted hover:text-white'}`}
          >
            {item.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

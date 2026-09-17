'use client';

import Link from 'next/link';
import type { Locale } from '../lib/i18n';

export default function LanguageSwitcher({ locale = 'ar' }: { locale?: Locale }) {
  const language = locale;
  return (
    <div
      dir="ltr"
      className="flex items-center rounded-md border border-white/10 bg-carbon p-1 text-[10px]"
      role="group"
      aria-label={language === 'en' ? 'Language selection' : 'اختيار اللغة'}
    >
      {(language === 'en' ? ['en', 'ar'] : ['ar', 'en']).map((item) => (
        <Link
          key={item}
          href={`/${item}`}
          aria-current={language === item ? 'page' : undefined}
          className={`min-h-7 min-w-8 rounded px-2 py-1.5 text-center transition ${language === item ? 'bg-gold text-void' : 'text-muted hover:text-white'}`}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

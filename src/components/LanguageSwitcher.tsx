'use client';

import Link from 'next/link';
import type { Locale } from '../lib/i18n';

export default function LanguageSwitcher({ locale = 'ar' }: { locale?: Locale }) {
  const language = locale;
  return (
    <div
      className="flex items-center rounded-md border border-white/10 bg-carbon p-1 text-[10px]"
      role="group"
      aria-label={language === 'en' ? 'Language selection' : 'اختيار اللغة'}
    >
      <Link
        href="/ar"
        aria-current={language === 'ar' ? 'page' : undefined}
        className={`min-h-7 min-w-8 rounded px-2 py-1.5 text-center transition ${language === 'ar' ? 'bg-gold text-void' : 'text-muted hover:text-white'}`}
      >
        AR
      </Link>
      <Link
        href="/en"
        aria-current={language === 'en' ? 'page' : undefined}
        className={`min-h-7 min-w-8 rounded px-2 py-1.5 text-center transition ${language === 'en' ? 'bg-gold text-void' : 'text-muted hover:text-white'}`}
      >
        EN
      </Link>
    </div>
  );
}

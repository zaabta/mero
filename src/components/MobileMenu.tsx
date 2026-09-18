'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';


export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const english = locale === 'en'; 
  const t = useTranslations('header');
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);
  const links = [
    { href: `/${locale}#top`, label: t('home') },
    { href: `/${locale}#about`, label: t('about') },
    { href: `/${locale}#products`, label: t('products') },
    { href: `/${locale}#brands`, label: t('brands') },
    { href: `/${locale}/blog`, label: t('blog') },
  ];

  return (
    <div className="relative self-center lg:hidden">
      <button
        type="button"
        aria-label={open ? t('closeMenu') : t('openMenu')}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
        className="grid h-10 w-10 place-items-center text-gold transition hover:text-amber"
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
      {open && (
        <div
          id="mobile-navigation"
          dir={locale === 'en' ? 'ltr' : 'rtl'}
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] min-h-screen bg-void px-6 py-5 text-white"
        >
          <div
            className="flex items-center justify-between border-b border-white/10 pb-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/mero-logo-white-gold.svg"
                alt="Mero"
                width={105}
                height={56}
                style={{ width: 'auto' }}
                className="h-14 w-[105px] object-contain"
              />
              <span className="whitespace-nowrap text-xs leading-5 text-gold sm:text-sm">
                {locale === 'en' ? 'Al Thuraya Automotive Services' : 'شركة إطار الثريا لخدمات السيارات'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label={t('closeMenu')}
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 text-muted transition hover:border-gold hover:text-gold"
              >
                <X size={24} />
              </button>
            </div>
          </div>
          <nav
            onClick={(event) => event.stopPropagation()}
            className={`mx-auto mt-10 flex max-w-sm flex-col gap-2 ${locale === 'en' ? 'text-left' : 'text-right'}`}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-5 py-4 text-lg text-white/85 transition hover:bg-gold/10 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-5 flex items-center justify-between border-t border-white/10 px-5 pt-5">
              <span className="text-sm text-muted">{t('language')}</span>
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

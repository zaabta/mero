'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import type { Locale } from '../lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

export default function MobileMenu({ locale = 'ar' }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const english = locale === 'en';
  const links = [
    { href: '#top', label: english ? 'Home' : 'الرئيسية' },
    { href: '#about', label: english ? 'About' : 'من نحن' },
    { href: '#products', label: english ? 'Products' : 'المنتجات' },
    { href: '#brands', label: english ? 'Brands' : 'العلامات التجارية' },
    { href: '#contact', label: english ? 'Contact' : 'تواصل معنا' },
  ];

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        aria-label={
          open ? (english ? 'Close menu' : 'إغلاق القائمة') : english ? 'Open menu' : 'فتح القائمة'
        }
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="grid h-10 w-10 place-items-center text-muted transition hover:text-gold"
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
      {open && (
        <div
          dir={english ? 'ltr' : 'rtl'}
          className="fixed inset-0 z-[100] min-h-screen bg-void px-6 py-5 text-white"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <Image
                src="/mero-logo-white-gold.svg"
                alt="Mero"
                width={105}
                height={56}
                className="h-14 w-[105px] object-contain"
              />
              <span className="max-w-[180px] text-sm leading-6 text-gold">
                {english ? 'Al Thuraya Automotive Services' : 'شركة إطار الثريا لخدمات السيارات'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher locale={locale} />
              <button
                type="button"
                aria-label={english ? 'Close menu' : 'إغلاق القائمة'}
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 text-muted transition hover:border-gold hover:text-gold"
              >
                <X size={24} />
              </button>
            </div>
          </div>
          <nav
            className={`mx-auto mt-10 flex max-w-sm flex-col gap-2 ${english ? 'text-left' : 'text-right'}`}
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
          </nav>
        </div>
      )}
    </div>
  );
}

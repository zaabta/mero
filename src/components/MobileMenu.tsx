'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Locale } from '../lib/i18n';

export default function MobileMenu({ locale = 'ar' }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const english = locale === 'en';
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);
  const links = [
    { href: '#top', label: english ? 'Home' : 'الرئيسية' },
    { href: '#about', label: english ? 'About' : 'من نحن' },
    { href: '#products', label: english ? 'Products' : 'المنتجات' },
    { href: '#brands', label: english ? 'Brands' : 'العلامات التجارية' },
    { href: '#contact', label: english ? 'Contact' : 'تواصل معنا' },
  ];

  return (
    <div className="relative self-center lg:hidden">
      <button
        type="button"
        aria-label={
          open ? (english ? 'Close menu' : 'إغلاق القائمة') : english ? 'Open menu' : 'فتح القائمة'
        }
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
          dir={english ? 'ltr' : 'rtl'}
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
                className="h-14 w-[105px] object-contain"
              />
              <span className="whitespace-nowrap text-xs leading-5 text-gold sm:text-sm">
                {english ? 'Al Thuraya Automotive Services' : 'شركة إطار الثريا لخدمات السيارات'}
              </span>
            </div>
            <div className="flex items-center gap-3">
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
            onClick={(event) => event.stopPropagation()}
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

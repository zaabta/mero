'use client';
import type { Locale } from '../lib/i18n';
import { isLocale } from '../lib/i18n';
import { usePathname } from 'next/navigation';
import Logo from './MeroLogo';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

export default function Header({ locale = 'ar' }: { locale?: Locale }) {
  const pathname = usePathname();
  const pathLocale = pathname?.split('/')[1];
  const currentLocale = pathLocale && isLocale(pathLocale) ? pathLocale : locale;
  const english = currentLocale === 'en';
  return (
    <header className="nav-blur fixed inset-x-0 top-0 z-50 border-b border-white/10">
      <div className="container flex h-[72px] items-center justify-between gap-2 lg:gap-6">
        <Logo locale={currentLocale} />
        <nav
          dir={english ? 'ltr' : 'rtl'}
          className="hidden items-center gap-8 text-[12px] text-white/75 lg:flex"
        >
          <a className="text-gold" href={`/${currentLocale}#top`}>
            {english ? 'Home' : 'الرئيسية'}
          </a>
          <a href={`/${currentLocale}#about`}>{english ? 'About' : 'من نحن'}</a>
          <a href={`/${currentLocale}#products`}>{english ? 'Products' : 'المنتجات'}</a>
          <a href={`/${currentLocale}#brands`}>{english ? 'Brands' : 'العلامات التجارية'}</a>
          <a href={`/${currentLocale}/blog`}>{english ? 'Blog' : 'المدونة'}</a>
          <a href={`/${currentLocale}#contact`}>{english ? 'Contact' : 'تواصل معنا'}</a>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex">
            <LanguageSwitcher locale={currentLocale} />
          </div>
          <MobileMenu locale={currentLocale} />
        </div>
      </div>
    </header>
  );
}

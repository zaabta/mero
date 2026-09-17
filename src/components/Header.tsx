import type { Locale } from '../lib/i18n';
import Logo from './MeroLogo';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

export default function Header({ locale = 'ar' }: { locale?: Locale }) {
  const english = locale === 'en';
  return (
    <header className="nav-blur fixed inset-x-0 top-0 z-50 border-b border-white/10">
      <div className="container flex h-[72px] items-center justify-between gap-2 lg:gap-6">
        <Logo english={english} />
        <nav className="hidden items-center gap-8 text-[12px] text-white/75 lg:flex">
          <a className="text-gold" href="#top">
            {english ? 'Home' : 'الرئيسية'}
          </a>
          <a href="#about">{english ? 'About' : 'من نحن'}</a>
          <a href="#products">{english ? 'Products' : 'المنتجات'}</a>
          <a href="#brands">{english ? 'Brands' : 'العلامات التجارية'}</a>
          <a href={`/${locale}/blog`}>{english ? 'Blog' : 'المدونة'}</a>
          <a href="#contact">{english ? 'Contact' : 'تواصل معنا'}</a>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <MobileMenu locale={locale} />
        </div>
      </div>
    </header>
  );
}
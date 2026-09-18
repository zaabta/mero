import { useTranslations } from 'next-intl';
import {useLocale} from 'next-intl';
import Logo from './MeroLogo';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

export default function Header() {

  const t = useTranslations('header');
  const locale = useLocale();
  return (
    <header className="nav-blur fixed inset-x-0 top-0 z-50 border-b border-white/10">
      <div className="container flex h-[72px] items-center justify-between gap-2 lg:gap-6">
        <Logo />
        <nav
          dir={locale === 'en' ? 'ltr' : 'rtl'}
          className="hidden items-center gap-8 text-[12px] text-white/75 lg:flex"
        >
          <a className="text-gold" href={`/${locale}#top`}>
            {t('home')}
          </a>
          <a href={`/${locale}#about`}>{t('about')}</a>
          <a href={`/${locale}#products`}>{t('products')}</a>
          <a href={`/${locale}#brands`}>{t('brands')}</a>
          <a href={`/${locale}/blog`}>{t('blog')}</a>
          <a href={`/${locale}#contact`}>{t('contact')}</a>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex">
            <LanguageSwitcher />
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

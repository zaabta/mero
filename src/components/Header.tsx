import { useTranslations } from 'next-intl';
import {useLocale} from 'next-intl';
import Logo from './MeroLogo';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';
import {Link} from '@/i18n/navigation';
import type {SiteSettingsView} from '@/sanity/lib/queries';

export default function Header({settings}: {settings?: SiteSettingsView}) {
  const t = useTranslations('header');
  const locale = useLocale();
  return (
    <header dir={locale === 'en' ? 'ltr' : 'rtl'} className="nav-blur fixed inset-x-0 top-0 z-50 border-b border-white/10">
      <div className="container flex h-[72px] items-center justify-between gap-2 lg:gap-6">
        <Logo settings={settings} />
        <nav
          dir={locale === 'en' ? 'ltr' : 'rtl'}
          className="hidden items-center gap-8 text-[12px] text-white/75 lg:flex"
        >
          <Link className="text-gold" href="/#top">
            {t('home')}
          </Link>
          <Link href="/#about">{t('about')}</Link>
          <Link href="/#products">{t('products')}</Link>
          <Link href="/#brands">{t('brands')}</Link>
          <Link href="/blog">{t('blog')}</Link>
          <Link href="/#contact">{t('contact')}</Link>
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

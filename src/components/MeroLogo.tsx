import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import type {SiteSettingsView} from '@/sanity/lib/queries';

export default function Logo({ large = false, settings }: { large?: boolean; settings?: SiteSettingsView }) {
  const t = useTranslations('brand');
  const locale = useLocale();
  const english = locale === 'en';
  return (
    <div className="flex flex-row items-center gap-3" dir={locale === 'en' ? 'ltr' : 'rtl'}>
      <Image
        src={settings?.logoUrl ?? '/mero-logo-white-gold.svg'}
        alt={english ? 'Mero logo' : 'شعار ميرو'}
        width={large ? 150 : 82}
        height={large ? 54 : 44}
        className={large ? 'h-14 w-auto object-contain' : 'h-11 w-auto object-contain'}
      />
      <span
        dir={locale === 'en' ? 'ltr' : 'rtl'}
        className="block w-fit whitespace-nowrap pt-2.5 text-sm leading-4 text-gold sm:max-w-none sm:text-[10px] lg:text-sm lg:leading-5"
      >
        {settings ? (locale === 'en' ? settings.legalNameEn : settings.legalNameAr) : t('name')}
      </span>
    </div>
  );
}

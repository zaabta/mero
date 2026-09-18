'use client';
import Image from 'next/image';
import type { Locale } from '../lib/i18n';
import { isLocale } from '../lib/i18n';
import { usePathname } from 'next/navigation';


export default function Logo({
  locale = 'ar',
  large = false,
}: {
  locale?: Locale;
  large?: boolean;
}) {
    const pathname = usePathname();
    const pathLocale = pathname?.split('/')[1];
    const currentLocale = pathLocale && isLocale(pathLocale) ? pathLocale : locale;
    const english = currentLocale === 'en';
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/mero-logo-white-gold.svg"
        alt="Mero"
        width={large ? 150 : 82}
        height={large ? 54 : 44}
        style={{ width: 'auto' }}
        className={large ? 'h-14 w-[150px] object-contain' : 'h-11 w-[82px] object-contain'}
      />
      <span
        dir={english ? 'ltr' : 'rtl'}
        className={`block w-fit pt-2.5 text-sm leading-4 text-gold sm:max-w-none sm:text-[10px] lg:text-sm lg:leading-5 `}
      >
        {english ? 'Al Thuraya Automotive Services' : 'شركة إطار الثريا لخدمات السيارات'}
      </span>
    </div>
  );
}

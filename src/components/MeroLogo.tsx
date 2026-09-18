import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function Logo({ large = false }: { large?: boolean }) {
  const t = useTranslations('brand');
  const locale = useLocale();
  return (
    <div className="flex flex-row items-center gap-3" dir={locale === 'en' ? 'ltr' : 'rtl'}>
      <Image
        src="/mero-logo-white-gold.svg"
        alt="Mero"
        width={large ? 150 : 82}
        height={large ? 54 : 44}
        style={{ width: 'auto' }}
        className={large ? 'h-14 w-[150px] object-contain' : 'h-11 w-[82px] object-contain'}
      />
      <span
        dir={locale === 'en' ? 'ltr' : 'rtl'}
        className="block w-fit whitespace-nowrap pt-2.5 text-sm leading-4 text-gold sm:max-w-none sm:text-[10px] lg:text-sm lg:leading-5"
      >
        {t('name')}
      </span>
    </div>
  );
}

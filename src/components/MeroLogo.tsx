import Image from 'next/image';

export default function Logo({ english = false, large = false }: { english?: boolean; large?: boolean }) {
  return (
    <div className="flex items-center gap-3" dir={english ? 'ltr' : 'rtl'}>
      <Image
        src="/mero-logo-white-gold.svg"
        alt="Mero"
        width={large ? 150 : 82}
        height={large ? 54 : 44}
        style={{ width: 'auto' }}
        className={large ? 'h-14 w-[150px] object-contain' : 'h-11 w-[82px] object-contain'}
      />
      <span
        className={`block max-w-[135px] border-white/20 text-[9px] leading-4 text-gold sm:max-w-none sm:text-[10px] ${english ? 'border-l pl-2 sm:pl-3' : 'border-r pr-2 sm:pr-3'}`}
      >
        {english ? 'Al Thuraya Automotive Services' : 'شركة إطار الثريا لخدمات السيارات'}
      </span>
    </div>
  );
}
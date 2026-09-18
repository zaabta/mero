import Link from 'next/link';
import { useLocale } from 'next-intl';


export default function LanguageSwitcher() {
  const locale = useLocale();
  return (
    <div
      dir="ltr"
      className="flex items-center rounded-md border border-white/10 bg-carbon p-1 text-[10px]"
      role="group"
      aria-label={locale === 'en' ? 'Language selection' : 'اختيار اللغة'}
    >
      {['en', 'ar'].map((item) => {
        const targetPath = `/${item}`;

        return (
          <Link
            key={item}
            href={targetPath}
            aria-current={locale === item ? 'page' : undefined}
            className={`min-h-7 min-w-8 rounded px-2 py-1.5 text-center transition ${locale === item ? 'bg-gold text-void' : 'text-muted hover:text-white'}`}
          >
            {item.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { brands } from '../data/brands';
import { getDictionary, type Locale } from '../lib/i18n';

export default function BrandGrid({ locale }: { locale: Locale }) {
  const [expanded, setExpanded] = useState(false);
  const dictionary = getDictionary(locale);
  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {brands.map((brand, index) => (
          <div
            key={brand.id}
            className={`${index >= 8 && !expanded ? 'hidden sm:flex' : 'flex'} group h-28 items-center justify-center rounded-lg border border-white/10 bg-carbon p-4 transition duration-300 hover:-translate-y-0.5 hover:border-gold/60`}
          >
            <Image
              src={brand.logo}
              alt={brand.alt}
              width={720}
              height={240}
              sizes="(max-width: 639px) 45vw, (max-width: 767px) 30vw, (max-width: 1023px) 23vw, 15vw"
              className="h-auto max-h-16 w-full object-contain grayscale opacity-75 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className="btn btn-secondary mt-6 min-h-11 px-6 text-sm sm:hidden"
      >
        {expanded ? dictionary.showLess : dictionary.viewAllBrands}
      </button>
    </>
  );
}

'use client';

import dynamic from 'next/dynamic';
import type { Locale } from '../../lib/i18n';

const MeroMap = dynamic(() => import('./MeroMap'), { ssr: false });

export default function ContactMapLoader({ locale }: { locale: Locale }) {
  return <MeroMap locale={locale} />;
}

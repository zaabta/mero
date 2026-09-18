'use client';

import dynamic from 'next/dynamic';

const MeroMap = dynamic(() => import('./MeroMap'), {
  ssr: false,
  loading: () => (
    <div className="mero-map-skeleton" role="status">
      Loading map…
    </div>
  ),
});

export default function ContactMapLoader() {
  return <MeroMap />;
}

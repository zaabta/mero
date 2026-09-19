'use client';

import dynamic from 'next/dynamic';
import type {Branch} from '../../data/branches';

const MeroMap = dynamic(() => import('./MeroMap'), {
  ssr: false,
  loading: () => (
    <div className="mero-map-skeleton" role="status">
      Loading map…
    </div>
  ),
});

export default function ContactMapLoader({branches}: {branches: Branch[]}) {
  return <MeroMap branches={branches} />;
}

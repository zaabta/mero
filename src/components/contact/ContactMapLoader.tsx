import { Suspense } from 'react';
import MeroMap from './MeroMap';

export default function ContactMapLoader() {
  return (
    <Suspense fallback={<div>Loading map…</div>}>
      <MeroMap />
    </Suspense>
  );
}
'use client';

import { sendGAEvent } from '@next/third-parties/google';

type AnalyticsParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, parameters: AnalyticsParams = {}) {
  if (
    process.env.NODE_ENV !== 'production' ||
    !process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
    typeof window === 'undefined'
  ) {
    return;
  }

  sendGAEvent('event', eventName, parameters);
}

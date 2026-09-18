'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventParameters?: Record<string, string | number | boolean>;
  children: ReactNode;
};

export default function TrackedAnchor({
  eventName,
  eventParameters,
  children,
  onClick,
  ...props
}: Props) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) trackEvent(eventName, eventParameters);
      }}
    >
      {children}
    </a>
  );
}

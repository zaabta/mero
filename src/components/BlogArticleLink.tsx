'use client';

import type {ReactNode} from 'react';
import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {trackEvent} from '@/lib/analytics';

export default function BlogArticleLink({
  href,
  slug,
  locale,
  className,
  children,
}: {
  href: string;
  slug: string;
  locale: Locale;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        trackEvent('select_content', {
          content_type: 'blog_article',
          item_id: slug,
          page_language: locale,
        })
      }
    >
      {children}
    </Link>
  );
}

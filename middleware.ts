import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'always',
});

export function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = { matcher: ['/((?!_next|api|favicon.ico).*)'] };

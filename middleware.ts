import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale } from './src/lib/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname === '/') return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  const locale = pathname.split('/')[1];
  if (!isLocale(locale)) return NextResponse.next();
  const headers = new Headers(request.headers);
  headers.set('x-locale', locale);
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ['/((?!_next|api|favicon.ico).*)'] };

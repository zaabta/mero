import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {routing} from '@/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const localizedStudioMatch = pathname.match(/^\/(ar|en)\/studio(?=\/|$)/);
  const isStudioPath = pathname === '/studio' || pathname.startsWith('/studio/');

  if (localizedStudioMatch) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/(ar|en)(?=\/studio)/, '');
    return NextResponse.rewrite(url);
  }

  if (pathname === '/' || isStudioPath) {
    return NextResponse.next();
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};

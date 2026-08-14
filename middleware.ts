import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const validTopLevelPaths = new Set([
  '',
  'about',
  'articles',
  'article',
  'courses',
  'course',
  'contact',
  'compliance',
  'dashboard',
  'forgot-password',
  'invoices',
  'login',
  'privacy-policy',
  'refund-policy',
  'reset-password',
  'signup',
  'terms-and-conditions',
]);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/^\/+|\/+$/g, '');

  if (pathname === 'article') {
    return NextResponse.redirect(new URL('/articles', request.url), 308);
  }

  if (pathname === 'course') {
    return NextResponse.redirect(new URL('/courses', request.url), 308);
  }

  if (pathname.startsWith('articles/')) {
    return NextResponse.redirect(new URL(`/article/${pathname.slice('articles/'.length)}`, request.url), 308);
  }

  if (pathname && !pathname.includes('/') && !validTopLevelPaths.has(pathname)) {
    return NextResponse.redirect(new URL('/', request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/).*)'],
};

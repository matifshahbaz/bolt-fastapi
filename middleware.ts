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

function redirectTo(request: NextRequest, pathname: string) {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://shama.pk' : request.url;
  return NextResponse.redirect(new URL(pathname, baseUrl), 308);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/^\/+|\/+$/g, '');

  if (/\.(?:png|jpe?g|webp|gif|svg|ico|woff2?|ttf|css|js)$/i.test(pathname)) {
    return NextResponse.next();
  }

  if (pathname === 'article') {
    return redirectTo(request, '/articles');
  }

  if (pathname === 'article/cv-mistakes') {
    return redirectTo(request, '/article/five-important-cv-mistakes');
  }

  if (pathname === 'course') {
    return redirectTo(request, '/course/youth-career-guidance');
  }

  if (pathname.startsWith('articles/')) {
    return redirectTo(request, `/article/${pathname.slice('articles/'.length)}`);
  }

  if (pathname && !pathname.includes('/') && !validTopLevelPaths.has(pathname)) {
    return redirectTo(request, '/');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/).*)'],
};

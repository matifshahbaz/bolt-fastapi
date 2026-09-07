import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function redirectTo(request: NextRequest, pathname: string) {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://shama.pk' : request.url;
  return NextResponse.redirect(new URL(pathname, baseUrl), 308);
}

export function middleware(request: NextRequest) {
  // Canonical host is the apex domain. Nginx serves www.shama.pk without redirecting it,
  // so both hosts were reachable and indexable — collapsing that here fixes Search Console's
  // "Duplicate without user-selected canonical" reports on the www copies.
  // Note: request.nextUrl.hostname does not reflect the incoming Host header in this setup, so
  // read the header directly.
  if (request.headers.get('host')?.toLowerCase() === 'www.shama.pk') {
    const canonicalUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, 'https://shama.pk');
    return NextResponse.redirect(canonicalUrl, 308);
  }

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

  // Unknown paths intentionally fall through to Next's normal 404 handling here rather
  // than redirecting to '/'. Redirecting unmatched URLs to the homepage is a known SEO
  // anti-pattern (a "soft 404" that Google flags) — broken/removed URLs should return a
  // real 404 status, not a 308 to home.

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/).*)'],
};

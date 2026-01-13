
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // 1. ROBUSTNESS: Exclude static files and API routes strictly to prevent loops/unnecessary processing
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // Catches favicon.ico, sitemap.xml, robots.txt, images
  ) {
    return NextResponse.next();
  }

  // 2. SUBDOMAIN ROUTING (Hybrid Architecture)
  // Logic: If host is fr.bexora.ch, we rewrite to the /fr folder content
  if (hostname === 'fr.bexora.ch') {
    // Prevent infinite loop: Only rewrite if not already in /fr
    if (!pathname.startsWith('/fr')) {
      const url = new URL(`/fr${pathname}`, request.url);
      const response = NextResponse.rewrite(url);
      
      // SEO: Add header to indicate this is the French version logic
      response.headers.set('x-language-rewrite', 'fr');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignores static files to save compute time
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};

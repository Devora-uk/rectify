import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { STUDIO_COOKIE, verifyStudioSession } from '@/lib/studio-session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith('/studio')) return NextResponse.next();
  if (pathname === '/studio/login') return NextResponse.next();

  const token = request.cookies.get(STUDIO_COOKIE)?.value;
  if (await verifyStudioSession(token)) return NextResponse.next();

  const login = request.nextUrl.clone();
  login.pathname = '/studio/login';
  login.searchParams.set('next', pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ['/studio', '/studio/:path*'],
};

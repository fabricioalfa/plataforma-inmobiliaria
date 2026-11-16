import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const isAuthenticated = Boolean(token);
  const url = req.nextUrl.clone();

  if (url.pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', url));
  }

  if (url.pathname.startsWith('/dashboard') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

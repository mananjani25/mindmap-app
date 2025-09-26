// src/app/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware is disabled for now to allow access to all pages without authentication.
// It will simply pass the request to the next step.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    // This matcher is kept but the middleware function above does nothing with it.
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
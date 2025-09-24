import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(request: NextRequest) {
    const token = request.nextauth.token;
    const pathname = request.nextUrl.pathname;

    // Public routes that don't require authentication
    const publicRoutes = ['/auth/signin', '/auth/signup', '/auth/error', '/'];
    
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    // Protect all other routes
    if (!token) {
      const signInUrl = new URL('/auth/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(signInUrl);
    }

    // Role-based route protection
    const userRole = token.role as string;
    
    // Admin-only routes
    if (pathname.startsWith('/admin') && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Instructor/Admin routes
    const instructorRoutes = ['/tests/create', '/tests/manage', '/documents', '/mindmaps'];
    const isInstructorRoute = instructorRoutes.some(route => pathname.startsWith(route));
    
    if (isInstructorRoute && !['ADMIN', 'INSTRUCTOR'].includes(userRole)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
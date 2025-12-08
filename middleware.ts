import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/:locale',
  '/:locale/sign-in(.*)',
  '/:locale/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Handle i18n first for all non-API routes
  if (!req.nextUrl.pathname.startsWith('/api') && !req.nextUrl.pathname.startsWith('/trpc')) {
    const response = intlMiddleware(req);

    // Check auth after i18n redirect
    if (!isPublicRoute(req)) {
      await auth.protect();
    }

    return response;
  }

  // For API routes, just check auth
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
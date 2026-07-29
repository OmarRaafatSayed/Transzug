import createMiddleware from 'next-intl/middleware';
import { locales } from '../i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches — redirects /dashboard → /de/dashboard etc.
  defaultLocale: 'de',

  // Always use locale prefix
  localePrefix: 'always'
});

export const config = {
  // Match root, locale-prefixed paths, AND bare paths like /dashboard
  // that should be redirected to the default locale.
  matcher: [
    '/',
    '/(de|ar)/:path*',
    // Catch paths without a locale prefix (excluding _next, api, static files)
    '/((?!_next|api|.*\\..*).*)',
  ],
};

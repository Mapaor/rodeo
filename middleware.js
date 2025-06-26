import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ca', 'es', 'en'],
  defaultLocale: 'ca'
});

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
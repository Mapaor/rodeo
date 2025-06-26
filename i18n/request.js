import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const supported = ['ca', 'es', 'en'];
  const safeLocale = supported.includes(locale) ? locale : 'ca';
  
  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default
  };
});
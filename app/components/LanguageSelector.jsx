'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import styles from './LanguageSelector.module.css';

const locales = [
  { code: 'ca', label: 'CA' },
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' }
];

export default function LanguageSelector() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (newLocale) => {
    // Canvia l'idioma canviant la URL
    const currentPath = pathname.replace(`/${currentLocale}`, '');
    const newPath = `/${newLocale}${currentPath}`;
    router.push(newPath);
  };

  return (
    <div className={styles.languageSelector}>
      {locales.map((locale, index) => (
        <span key={locale.code}>
          <button
            onClick={() => changeLocale(locale.code)}
            className={`${styles.languageButton} ${
              currentLocale === locale.code ? styles.active : styles.inactive
            }`}
          >
            {locale.label}
          </button>
          {index < locales.length - 1 && (
            <span className={styles.separator}>|</span>
          )}
        </span>
      ))}
    </div>
  );
}

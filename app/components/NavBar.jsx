'use client';

import React from 'react';
import styles from './NavBar.module.css';
import { useTranslations } from 'next-intl';
import LanguageSelector from './LanguageSelector';
import { useLocale } from 'next-intl';

export default function NavBar() {
  const t = useTranslations();
  const locale = useLocale();
  const basePath = `/${locale}`;
  return (
    <nav className={styles.navbar}>
      <a href={basePath} className={styles.logo}>Rodeo Studio</a>
      
      <div className={styles.navRight}>
        <ul className={styles.navLinks}>
          <li><a href={`${basePath}#home`} className={styles.link}>{t('nav.home')}</a></li>
          <li><a href={`${basePath}#projects`} className={styles.link}>{t('nav.projects')}</a></li>
          <li><a href={`${basePath}#about`} className={styles.link}>{t('nav.about')}</a></li>
          <li><a href={`${basePath}#services`} className={styles.link}>{t('nav.services')}</a></li>
          <li><a href={`${basePath}#contact`} className={styles.link}>{t('nav.contact')}</a></li>
        </ul>
        <LanguageSelector />
      </div>
    </nav>
  );
}

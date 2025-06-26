'use client';

import React from 'react';
import styles from './Footer.module.css';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Rodeo Studio</h3>
          <p className={styles.footerText}>
            {t('footer.slogan')}
          </p>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>
            {t('footer.services')}
          </h3>
          <ul className={styles.footerList}>
            <li>{t('footer.commercial')}</li>
            <li>{t('footer.music')}</li>
            <li>{t('footer.documentary')}</li>
            <li>{t('footer.social')}</li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>
            {t('footer.contact')}
          </h3>
          <p className={styles.footerText}>📧 info@rodeostudio.net</p>
          <p className={styles.footerText}>📱 +34 123 456 789</p>
          <p className={styles.footerText}>📍 Barcelona, Spain</p>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>
            {t('footer.follow')}
          </h3>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>Instagram</a>
            <a href="#" className={styles.socialLink}>Vimeo</a>
            <a href="#" className={styles.socialLink}>LinkedIn</a>
          </div>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <p>&copy; {t('footer.copyright')}</p>
      </div>
    </footer>
  );
}

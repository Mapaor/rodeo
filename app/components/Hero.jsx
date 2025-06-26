'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './Hero.module.css';

export default function Hero() {
  const t = useTranslations();

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.heroLogo}>
          <Image src="/cavall.png" fill alt="Rodeo Studio Logo" />
        </div>
        <h1 className={styles.title}>{t('home.title')}</h1>
        <p className={styles.subtitle}>
          {t('home.subtitle')} {t('home.subtitle_long')}
        </p>
        <button className={styles.ctaButton} onClick={() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}>
          {t('home.cta')}
        </button>
      </div>
    </section>
  );
}

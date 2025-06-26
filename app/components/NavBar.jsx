'use client';

import React, { useState, useEffect } from 'react';
import styles from './NavBar.module.css';
import { useTranslations } from 'next-intl';
import LanguageSelector from './LanguageSelector';
import { useLocale } from 'next-intl';

export default function NavBar() {
  const t = useTranslations();
  const locale = useLocale();
  const basePath = `/${locale}`;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else {
        // Hide navbar when scrolling down (but only on mobile)
        if (window.innerWidth <= 768) {
          setIsVisible(false);
          setIsMobileMenuOpen(false); // Close mobile menu when hiding navbar
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${!isVisible ? styles.navbarHidden : ''}`}>
      <a href={basePath} className={styles.logo}>Rodeo Studio</a>
      
      {/* Hamburger Menu Button */}
      <button 
        className={styles.hamburger}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineActive : ''}`}></span>
        <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineActive : ''}`}></span>
        <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineActive : ''}`}></span>
      </button>
      
      {/* Desktop Navigation */}
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

      {/* Mobile Navigation Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileNavLinks}>
          <li><a href={`${basePath}#home`} className={styles.mobileLink} onClick={closeMobileMenu}>{t('nav.home')}</a></li>
          <li><a href={`${basePath}#projects`} className={styles.mobileLink} onClick={closeMobileMenu}>{t('nav.projects')}</a></li>
          <li><a href={`${basePath}#about`} className={styles.mobileLink} onClick={closeMobileMenu}>{t('nav.about')}</a></li>
          <li><a href={`${basePath}#services`} className={styles.mobileLink} onClick={closeMobileMenu}>{t('nav.services')}</a></li>
          <li><a href={`${basePath}#contact`} className={styles.mobileLink} onClick={closeMobileMenu}>{t('nav.contact')}</a></li>
          <li className={styles.mobileLanguageSelector}>
            <LanguageSelector />
          </li>
        </ul>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}></div>
      )}
    </nav>
  );
}

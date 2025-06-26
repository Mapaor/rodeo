import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Rodeo Studio</h3>
          <p className={styles.footerText}>
            Creating compelling visual narratives that connect brands with their audiences.
          </p>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Services</h3>
          <ul className={styles.footerList}>
            <li>Commercial Production</li>
            <li>Music Videos</li>
            <li>Documentary Films</li>
            <li>Social Media Content</li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Contact</h3>
          <p className={styles.footerText}>📧 hello@rodeostudio.com</p>
          <p className={styles.footerText}>📱 +34 123 456 789</p>
          <p className={styles.footerText}>📍 Barcelona, Spain</p>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Follow Us</h3>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>Instagram</a>
            <a href="#" className={styles.socialLink}>Vimeo</a>
            <a href="#" className={styles.socialLink}>LinkedIn</a>
          </div>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <p>&copy; 2025 Rodeo Studio. All rights reserved.</p>
      </div>
    </footer>
  );
}

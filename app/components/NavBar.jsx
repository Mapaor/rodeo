import React from 'react';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Rodeo Studio</div>
      <ul className={styles.navLinks}>
        <li><a href="#home" className={styles.link}>Home</a></li>
        <li><a href="#projects" className={styles.link}>Projects</a></li>
        <li><a href="#about" className={styles.link}>About</a></li>
        <li><a href="#services" className={styles.link}>Services</a></li>
        <li><a href="#contact" className={styles.link}>Contact</a></li>
      </ul>
    </nav>
  );
}

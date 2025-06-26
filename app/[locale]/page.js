"use client";

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import styles from '@/styles/HomePage.module.css';
import VideoSlider from '@/components/videoSlider';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function LocalePage() {
  const t = useTranslations();
  return (
    <>
      <NavBar />
      <main className={styles.main}>
        {/* Hero Section */}
        <section id="home" className={styles.hero}>
          <div className={styles.overlay}>
            <div className={styles.heroLogo}>
            <Image src="/cavall.png" width={450} height={225} alt="Rodeo Studio Logo" />
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

        {/* Featured Projects Section */}
        <section id="projects" className={styles.projectsSection}>
          <div className={styles.projectsContent}>
            <h2 className={styles.sectionTitle}>{t('projects.title')}</h2>
            <p className={styles.sectionSubtitle}>
              {t('projects.subtitle')}
            </p>
          </div>
          <VideoSlider />
        </section>

        {/* About Us Section */}
        <section id="about" className={styles.section}>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <h2 className={styles.sectionTitle}>{t('about.title')}</h2>
              <p className={styles.text}>
                {t('about.text1')}
              </p>
              <p className={styles.text}>
                {t('about.text2')}
              </p>
            </div>
            <div className={styles.aboutImage}>
              <Image src="/about-studio.jpg" alt={t('about.alt')} className={styles.image} width={500} height={333} />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('services.title')}</h2>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>{t('services.commercial.title')}</h3>
              <p className={styles.serviceDescription}>
                {t('services.commercial.desc')}
              </p>
            </div>
            <div className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>{t('services.music.title')}</h3>
              <p className={styles.serviceDescription}>
                {t('services.music.desc')}
              </p>
            </div>
            <div className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>{t('services.documentary.title')}</h3>
              <p className={styles.serviceDescription}>
                {t('services.documentary.desc')}
              </p>
            </div>
            <div className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>{t('services.social.title')}</h3>
              <p className={styles.serviceDescription}>
                {t('services.social.desc')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('contact.title')}</h2>
          <p className={styles.sectionSubtitle}>
            {t('contact.subtitle')}
          </p>
          <div className={styles.contactContainer}>
            <div className={styles.contactInfo}>
              <h3>{t('contact.info')}</h3>
              {/* <p><img src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f4ac.svg" alt="email" style={{ width: '1.2em', verticalAlign: 'middle' }} /> info@rodeostudio.net</p> */}
              {/* <p><img src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f4e8.svg" alt="email" style={{ width: '1.2em', verticalAlign: 'middle' }} /> info@rodeostudio.net</p> */}
              <p><img src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f4ee.svg" alt="email" style={{ width: '1.2em', verticalAlign: 'middle' }} /> info@rodeostudio.net</p>
              {/* <p><img src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f4ec.svg" alt="email" style={{ width: '1.2em', verticalAlign: 'middle' }} /> info@rodeostudio.net</p> */}
              <p><img src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f4de.svg" alt="phone" style={{ width: '1.2em', verticalAlign: 'middle' }} /> +34 123 456 789</p>
              {/* <p><img src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f4f2.svg" alt="phone" style={{ width: '1.2em', verticalAlign: 'middle' }} /> +34 123 456 789</p> */}
              <p><img src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f4cd.svg" alt="location" style={{ width: '1.2em', verticalAlign: 'middle' }} /> Barcelona, Spain</p>
            </div>
            <form className={styles.contactForm}>
              <input type="text" placeholder={t('contact.name')} className={styles.input} required />
              <input type="email" placeholder={t('contact.email')} className={styles.input} required />
              <input type="text" placeholder={t('contact.project')} className={styles.input} />
              <textarea placeholder={t('contact.message')} className={styles.textarea} required></textarea>
              <button type="submit" className={styles.submitButton}>{t('contact.send')}</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

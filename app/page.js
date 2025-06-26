'use client';

import styles from '@/styles/HomePage.module.css';
import VideoSlider from '@/components/videoSlider';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section id="home" className={styles.hero}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>{t('home.title')}</h1>
          <p className={styles.subtitle}>
            {t('home.subtitle')} {t('home.subtitle_long')}
          </p>
          <button className={styles.ctaButton}>{t('home.cta')}</button>
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
            <p>📧 info@rodeostudio.net</p>
            <p>📱 +34 123 456 789</p>
            <p>📍 Barcelona, Spain</p>
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
  );
}

"use client";

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import styles from '@/styles/HomePage.module.css';
import VideoSlider from '@/components/videoSlider';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function LocalePage() {
  const t = useTranslations();
  const [form, setForm] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        setForm({ name: '', email: '', project: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <main className={styles.main}>
        {/* Hero Section */}
        <Hero />

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
              <Image src="/foto-grup.jpg" alt={t('about.alt')} className={styles.image} width={600} height={333} />
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
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder={t('contact.name')}
                className={styles.input}
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t('contact.email')}
                className={styles.input}
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="project"
                placeholder={t('contact.project')}
                className={styles.input}
                value={form.project}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder={t('contact.message')}
                className={styles.textarea}
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? t('contact.sending') || 'Enviant...' : t('contact.send')}
              </button>
              {status === 'success' && (
                <p className={styles.successMsg}>{t('contact.success') || 'Missatge enviat!'}</p>
              )}
              {status === 'error' && (
                <p className={styles.errorMsg}>{t('contact.error') || 'Error enviant missatge'}</p>
              )}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

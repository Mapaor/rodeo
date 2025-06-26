'use client';
import styles from '@/styles/HomePage.module.css';
import VideoSlider from '@/components/videoSlider';
import NavBar from '@/components/NavBar';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();
  return (
    <>
      <NavBar />
      <main className={styles.main}>
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
      </main>
    </>
  );
}

"use client";
import styles from './Project.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import NavBar from '@/components/NavBar';
import React from "react";
import projects from '@/components/projectes';


export default function ProjectPage({ params }) {
  const t = useTranslations();
  const { id } = React.use(params);

  const project = projects[id];

  if (!project) {
    return (
      <div className={styles.container}>
        <NavBar />
        <h1>{t('project.notFound')}</h1>
        <Link href="/">{t('project.returnHome')}</Link>
      </div>
    );
  }

  const projectData = t.raw(`project.projects.${id}`);

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.hero}>
        <div className={styles.projectPresentation}>
          <h1 className={styles.title}>{projectData.title}</h1>
        </div>
        <div className={styles.videoContainer}>
          <iframe
            src={project.videoUrl}
            title={projectData.title}
            style={{ border: 0 }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className={styles.video}
          />
        </div>
        <div className={styles.projectInfo}>
          <p className={styles.description}>{projectData.description}</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.details}>
          <h2>{t('project.projectDetails')}</h2>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <strong>{t('project.client')}:</strong> {projectData.client}
            </div>
            <div className={styles.detailItem}>
              <strong>{t('project.year')}:</strong> {projectData.year}
            </div>
            <div className={styles.detailItem}>
              <strong>{t('project.duration')}:</strong> {projectData.duration}
            </div>
            <div className={styles.detailItem}>
              <strong>{t('project.category')}:</strong> {projectData.category}
            </div>
            <div className={styles.detailItem}>
              <strong>{t('project.director')}:</strong> {projectData.director}
            </div>
            <div className={styles.detailItem}>
              <strong>{t('project.cinematographer')}:</strong> {projectData.cinematographer}
            </div>
          </div>
        </div>

        <div className={styles.fullDescription}>
          <h2>{t('project.aboutProject')}</h2>
          <div className={styles.descriptionText}>
            {projectData.fullDescription.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>
        </div>

        <div className={styles.gallery}>
          <h2>{t('project.gallery')}</h2>
          <div className={styles.galleryGrid}>
            {project.gallery.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${projectData.title} - Image ${index + 1}`}
                className={styles.galleryImage}
                width={400}
                height={250}
              />
            ))}
          </div>
        </div>

        <div className={styles.navigation}>
          <Link href="/#projects" className={styles.backLink}>
            {t('project.backToProjects')}
          </Link>
        </div>
      </div>
    </div>
  );
}

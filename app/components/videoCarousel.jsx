'use client';

import React, { useState } from 'react';
import styles from './VideoCarousel.module.css';
import { useTranslations } from 'next-intl';

export default function VideoCarousel() {
  const t = useTranslations();
  const videos = [
    {
      title: t('carousel.vimeo'),
      url: 'https://player.vimeo.com/video/76979871?h=0f6c34c2b1&title=0&byline=0&portrait=0',
    },
    {
      title: t('carousel.urban'),
      url: 'https://player.vimeo.com/video/357274789?h=1a1dbb5b02&title=0&byline=0&portrait=0',
    },
    {
      title: t('carousel.indie'),
      url: 'https://player.vimeo.com/video/1084537?h=847b0e6e5e&title=0&byline=0&portrait=0',
    },
  ];
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((index - 1 + videos.length) % videos.length);
  const next = () => setIndex((index + 1) % videos.length);
  return (
    <div className={styles.carousel}>
      <button onClick={prev} className={styles.button} aria-label="Previous video">‹</button>
      <div className={styles.videoContainer}>
        <iframe
          src={videos[index].url}
          title={videos[index].title}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className={styles.video}
        />
        <p className={styles.caption}>{videos[index].title}</p>
      </div>
      <button onClick={next} className={styles.button} aria-label="Next video">›</button>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import styles from './VideoSlider.module.css';

const videos = [
  {
    id: 1,
    title: 'Urban Brand Campaign',
    director: 'Maria Rodriguez',
    thumbnail: 'https://images.unsplash.com/photo-1559705421-4ae9bf6fabb5?w=640&h=360&fit=crop&crop=center',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    aspectRatio: 1.778,
  },
  {
    id: 2,
    title: 'Music Video Production',
    director: 'Carlos Mendez',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=640&h=360&fit=crop&crop=center',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    aspectRatio: 1.778,
  },
  {
    id: 3,
    title: 'Documentary Short',
    director: 'Ana Gutierrez',
    thumbnail: 'https://images.unsplash.com/photo-1489599314420-15c52bebb4e0?w=640&h=440&fit=crop&crop=center',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    aspectRatio: 1.456,
  },
  {
    id: 4,
    title: 'Commercial Spot',
    director: 'David Kim',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=640&h=360&fit=crop&crop=center',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    aspectRatio: 1.778,
  },
  {
    id: 5,
    title: 'Brand Story',
    director: 'Sofia Patel',
    thumbnail: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=640&h=427&fit=crop&crop=center',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    aspectRatio: 1.5,
  },
];

export default function VideoSlider() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let scrollAmount = 0;
    const scrollSpeed = 1;

    const scrollInterval = setInterval(() => {
      if (container) {
        scrollAmount += scrollSpeed;
        container.style.transform = `translate3d(-${scrollAmount}px, 0px, 0px)`;

        if (
          scrollAmount >=
          container.scrollWidth - container.parentElement.clientWidth
        ) {
          scrollAmount = 0;
        }
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className={styles.carousel}>
      <div ref={containerRef} className={styles.carouselInner}>
        {videos.concat(videos).map((video, index) => (
          <a
            key={`${video.id}-${index}`}
            href={`/project/${video.id}`}
            className={styles.projectCard}
            draggable="false"
          >
            <div
              className={styles.videoContainer}
              style={{
                width: `min(100vw, calc(304px * ${video.aspectRatio}))`,
                aspectRatio: video.aspectRatio,
              }}
            >
              <div className={styles.mediaWrapper}>
                <img
                  src={video.thumbnail}
                  alt={`${video.title} thumbnail`}
                  className={styles.thumbnail}
                  loading="lazy"
                />
                <video
                  className={styles.video}
                  src={video.videoSrc}
                  preload="none"
                  loop
                  muted
                  playsInline
                  draggable="false"
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => e.target.pause()}
                />
              </div>
            </div>
            <div className={styles.projectInfo}>
              <h3 className={styles.projectTitle}>{video.title}</h3>
              <h3 className={styles.projectDirector}>{video.director}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './VideoSlider.module.css';
import { useTranslations } from 'next-intl';
import { getVideos } from './projectes';
import { useSliderMovement } from './movimentSlider';

export default function VideoSlider() {
  const t = useTranslations();
  const videos = getVideos(t);
  const containerRef = useRef(null);
  const [visibleVideos, setVisibleVideos] = useState(new Set());
  const observerRef = useRef(null);
  const dragEndTimeoutRef = useRef(null);
  
  const {
    isDragging,
    isInitialized,
    handleMouseDown,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove
  } = useSliderMovement(containerRef, videos, styles);

  // Pre-connectar amb dominis de vídeos per millorar rendiment
  useEffect(() => {
    // Pre-connectar amb el domini d'Amazon S3 per als vídeos
    const preconnectLink = document.createElement('link');
    preconnectLink.rel = 'preconnect';
    preconnectLink.href = 'https://bucket-general-public-marti.s3.eu-west-1.amazonaws.com';
    document.head.appendChild(preconnectLink);

    // DNS prefetch per altres dominis d'imatges
    const dnsPrefetchLink = document.createElement('link');
    dnsPrefetchLink.rel = 'dns-prefetch';
    dnsPrefetchLink.href = 'https://images.unsplash.com';
    document.head.appendChild(dnsPrefetchLink);

    return () => {
      // Cleanup links en el unmount
      document.head.removeChild(preconnectLink);
      document.head.removeChild(dnsPrefetchLink);
    };
  }, []);

  // Intersection Observer optimitzat - menys complex
  useEffect(() => {
    if (!isInitialized) return;

    // Observer més simple i eficient
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const updates = new Map();
        
        entries.forEach((entry) => {
          const videoKey = entry.target.getAttribute('data-video-key');
          if (videoKey) {
            updates.set(videoKey, entry.isIntersecting);
          }
        });

        if (updates.size > 0) {
          setVisibleVideos(prev => {
            const newSet = new Set(prev);
            updates.forEach((isIntersecting, videoKey) => {
              if (isIntersecting) {
                newSet.add(videoKey);
              } else if (!isDragging) {
                // Només descarregar si no estem fent drag
                newSet.delete(videoKey);
              }
            });
            return newSet;
          });
        }
      },
      {
        // Marges més raonables per millor rendiment
        rootMargin: '100% 0px 100% 0px',
        threshold: [0, 0.25]
      }
    );

    // Observar elements amb un sol timeout
    const timeoutId = setTimeout(() => {
      if (containerRef.current && observerRef.current) {
        const cards = containerRef.current.querySelectorAll('[data-video-key]');
        cards.forEach(card => observerRef.current.observe(card));
      }
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isInitialized]);

  // Cleanup simplificat després del drag
  useEffect(() => {
    if (dragEndTimeoutRef.current) {
      clearTimeout(dragEndTimeoutRef.current);
    }

    if (!isDragging && isInitialized) {
      // Cleanup més eficient després del drag
      dragEndTimeoutRef.current = setTimeout(() => {
        // Forçar re-observació dels elements visibles
        if (containerRef.current && observerRef.current) {
          observerRef.current.disconnect();
          const cards = containerRef.current.querySelectorAll('[data-video-key]');
          cards.forEach(card => observerRef.current.observe(card));
        }
      }, 100);
    }

    return () => {
      if (dragEndTimeoutRef.current) {
        clearTimeout(dragEndTimeoutRef.current);
      }
    };
  }, [isDragging, isInitialized]);

  return (
    <div className={styles.carousel}>
      <div 
        ref={containerRef} 
        className={styles.carouselInner}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        style={{ 
          userSelect: 'none',
          opacity: isInitialized ? 1 : 0,
          transition: isInitialized ? 'none' : 'opacity 0.3s ease-in'
        }}
      >
        {/* Render 15 copies (3 sets of 5 videos each) for infinite scrolling - optimized for performance */}
        {Array.from({ length: 3 }, (_, setIndex) => 
          videos.map((video, videoIndex) => {
            const uniqueKey = `${video.id}-set${setIndex}-${videoIndex}`;
            const isVisible = visibleVideos.has(uniqueKey);
            const shouldChangeOnHover = video.preferenceDefault !== video.preferenceHover;
            
            // Càrrega més agressiva per millorar rendiment inicial
            const shouldLoadVideo = isVisible || setIndex === 1; // Sempre carregar el set del mig
            
            return (
              <a
                key={uniqueKey}
                href={`/project/${video.id}`}
                className={styles.projectCard}
                draggable="false"
                data-video-key={uniqueKey}
                onMouseDown={(e) => isDragging && e.preventDefault()}
                onClick={(e) => {
                  // Només prevenir navegació si estem realment fent dragging
                  if (isDragging) {
                    e.preventDefault();
                  }
                }}
              >
                <div
                  className={styles.videoContainer}
                  style={{
                    width: `min(100vw, calc(304px * ${video.aspectRatio}))`,
                    aspectRatio: video.aspectRatio,
                    '--should-change-on-hover': shouldChangeOnHover ? '1' : '0'
                  }}
                >
                  <div className={styles.mediaWrapper}>
                    {/* Thumbnail sempre present com a fallback */}
                    <img
                      src={video.thumbnail}
                      alt={`${video.title} thumbnail`}
                      className={`${styles.thumbnail} ${
                        video.preferenceDefault === 'thumbnail' ? styles.thumbnailDefault : styles.thumbnailHidden
                      }`}
                      loading="lazy"
                    />
                    
                    {/* Video per defecte (quan preferenceDefault és videoSrc) */}
                    {video.preferenceDefault === 'videoSrc' && video.videoSrc && shouldLoadVideo && (
                      <video
                        className={`${styles.video} ${styles.videoDefault}`}
                        src={video.videoSrc}
                        preload="metadata" // Precarregar metadades per velocitat
                        loop
                        muted
                        playsInline
                        draggable="false"
                        autoPlay // Sempre autoplay, es controla via CSS visibility
                        onLoadedMetadata={(e) => {
                          // Establir startTime quan les metadades carreguin
                          if (video.startTime && video.startTime > 0) {
                            e.target.currentTime = video.startTime;
                          }
                        }}
                        onCanPlay={(e) => {
                          // Assegurar que comença al temps correcte
                          if (video.startTime && video.startTime > 0 && e.target.currentTime < video.startTime) {
                            e.target.currentTime = video.startTime;
                          }
                        }}
                        onError={(e) => console.log('Default video error:', e.target.error)}
                      />
                    )}
                    
                    {/* Video per al hover (només si les preferències són diferents) */}
                    {video.preferenceHover === 'videoSrc' && shouldChangeOnHover && video.videoSrc && shouldLoadVideo && (
                      <video
                        className={`${styles.video} ${styles.videoHover}`}
                        src={video.videoSrc}
                        preload="metadata" // Precarregar metadades
                        loop
                        muted
                        playsInline
                        draggable="false"
                        onLoadedMetadata={(e) => {
                          // Establir startTime quan les metadades carreguin
                          if (video.startTime && video.startTime > 0) {
                            e.target.currentTime = video.startTime;
                          }
                        }}
                        onMouseEnter={(e) => {
                          // Reproduir immediatament si està carregat
                          if (e.target.readyState >= 3) {
                            e.target.play().catch(err => console.log('Hover video play failed:', err));
                          } else {
                            // Carregar i reproduir
                            e.target.load();
                            e.target.addEventListener('canplay', () => {
                              e.target.play().catch(err => console.log('Hover video play failed:', err));
                            }, { once: true });
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.target.pause();
                          // Tornar al startTime
                          if (video.startTime && video.startTime > 0) {
                            e.target.currentTime = video.startTime;
                          } else {
                            e.target.currentTime = 0;
                          }
                        }}
                        onError={(e) => console.log('Hover video error:', e.target.error)}
                      />
                    )}
                    
                    {/* Thumbnail per al hover (només si les preferències són diferents) */}
                    {video.preferenceHover === 'thumbnail' && shouldChangeOnHover && (
                      <img
                        src={video.thumbnail}
                        alt={`${video.title} hover thumbnail`}
                        className={`${styles.thumbnail} ${styles.thumbnailHover}`}
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{video.title}</h3>
                  <h3 className={styles.projectDirector}>{video.director}</h3>
                </div>
              </a>
            );
          })
        ).flat()}
      </div>
    </div>
  );
}

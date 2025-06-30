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

  // Intersection Observer persistent - no es recrea durant drags
  useEffect(() => {
    if (!isInitialized) return;

    // Crear Observer persistent que no es destrueix durant drags
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoKey = entry.target.getAttribute('data-video-key');
          if (videoKey) {
            setVisibleVideos(prev => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                // Sempre permetre carregar videos quan són visibles
                newSet.add(videoKey);
              } else {
                // Durant drag: mantenir tots els videos carregats
                // Fora de drag: descarregar només si completament fora
                if (!isDragging && entry.intersectionRatio === 0) {
                  // Petit delay per evitar unload prematur
                  setTimeout(() => {
                    if (!isDragging) {
                      setVisibleVideos(current => {
                        const updated = new Set(current);
                        updated.delete(videoKey);
                        return updated;
                      });
                    }
                  }, 300);
                }
              }
              return newSet;
            });
          }
        });
      },
      {
        // Viewport més ampli per precarregar més videos
        rootMargin: '400% 0px 400% 0px',
        threshold: [0, 0.1, 0.5]
      }
    );

    // Observar tots els elements
    const observeCards = () => {
      if (containerRef.current && observerRef.current) {
        const cards = containerRef.current.querySelectorAll('[data-video-key]');
        cards.forEach(card => observerRef.current.observe(card));
      }
    };

    const timeoutId = setTimeout(observeCards, 100);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isInitialized]); // Només depèn d'isInitialized

  // Cleanup aggressiu dels videos no visibles després del drag
  useEffect(() => {
    if (dragEndTimeoutRef.current) {
      clearTimeout(dragEndTimeoutRef.current);
    }

    if (!isDragging && isInitialized) {
      // Cleanup més aggressiu després del drag
      dragEndTimeoutRef.current = setTimeout(() => {
        if (containerRef.current && observerRef.current) {
          // Forçar re-check de tots els elements
          const cards = containerRef.current.querySelectorAll('[data-video-key]');
          cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const isInExtendedViewport = rect.bottom > -viewportHeight * 4 && rect.top < viewportHeight * 5;
            
            const videoKey = card.getAttribute('data-video-key');
            if (videoKey) {
              setVisibleVideos(prev => {
                const newSet = new Set(prev);
                if (isInExtendedViewport) {
                  newSet.add(videoKey);
                } else {
                  newSet.delete(videoKey);
                }
                return newSet;
              });
            }
          });
        }
      }, 200);
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
          transition: isInitialized ? 'none' : 'opacity 0.1s ease-in'
        }}
      >
        {/* Render 25 copies (5 sets of 5 videos each) for infinite scrolling - reduced for performance */}
        {Array.from({ length: 5 }, (_, setIndex) => 
          videos.map((video, videoIndex) => {
            const uniqueKey = `${video.id}-set${setIndex}-${videoIndex}`;
            const isVisible = visibleVideos.has(uniqueKey);
            const shouldChangeOnHover = video.preferenceDefault !== video.preferenceHover;
            
            // Durant drag, ser més permissiu amb la càrrega
            const shouldLoadVideo = isVisible || isDragging;
            
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
                        preload="none"
                        loop
                        muted
                        playsInline
                        draggable="false"
                        autoPlay={isVisible} // Només autoplay si realment visible
                        onLoadedData={(e) => {
                          // Establir startTime quan el video carregui
                          if (video.startTime && video.startTime > 0) {
                            e.target.currentTime = video.startTime;
                          }
                        }}
                        onLoadStart={(e) => {
                          // Establir startTime immediatament quan comenci a carregar
                          if (video.startTime && video.startTime > 0) {
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
                        preload="none"
                        loop
                        muted
                        playsInline
                        draggable="false"
                        onMouseEnter={(e) => {
                          // Carregar i reproduir el video al hover
                          if (e.target.readyState === 0) {
                            e.target.load();
                          }
                          
                          const playVideo = () => {
                            if (video.startTime && video.startTime > 0) {
                              e.target.currentTime = video.startTime;
                            }
                            e.target.play().catch(err => console.log('Hover video play failed:', err));
                          };

                          if (e.target.readyState >= 2) {
                            playVideo();
                          } else {
                            e.target.addEventListener('canplay', playVideo, { once: true });
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.target.pause();
                          // Tornar al startTime o al principi
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

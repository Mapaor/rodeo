const projects = {
    // EXPLICACIO
    // videoUrl : El iframe de Vimeo o Youtube que es veu un cop entres al projecte
    // thumbnail : Imatge que es veu en el video slider
    // videoSrc: Video MP4 que es veu en el video slider
    1: {
        // Element Slider
        titleKey: 'slider.urban',
        directorKey: 'slider.maria',
        thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=640&h=360&fit=crop&crop=center',
        videoSrc: 'https://cdn.jsdelivr.net/gh/Mapaor/sample-videos@main/60s-720p/gtv-videos-bucket/BigBuckBunny.mp4',
        startTime: 30, // Començar als 30 segons
        aspectRatio: 1.778,
        preferenceDefault: 'videoSrc', // videoSrc o thumbnail
        preferenceHover: 'videoSrc', // videoSrc o thumbnail al fer hover
        // Pàgina projecte
        videoUrl: 'https://www.youtube.com/embed/6dYtsrTUvps?title=0&byline=0&portrait=0',
        gallery: [
            'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&h=600&fit=crop&crop=center'
        ],
    },
    2: {
        // Element Slider
        titleKey: 'slider.music',
        directorKey: 'slider.carlos',
        thumbnail: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=640&h=360&fit=crop&crop=center',
        videoSrc: 'https://cdn.jsdelivr.net/gh/Mapaor/sample-videos@main/60s-720p/gtv-videos-bucket/ElephantsDream.mp4',
        startTime: 10, // Reduït de 15 a 10 segons per evitar salts
        aspectRatio: 1.778,
        preferenceDefault: 'videoSrc', // videoSrc o thumbnail
        preferenceHover: 'videoSrc', // videoSrc o thumbnail al fer hover
        // Pàgina projecte
        videoUrl: 'https://player.vimeo.com/video/9011932?title=0&byline=0&portrait=0',
        gallery: [
            'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop&crop=center'
        ],
    },
    3: {
        // Element Slider
        titleKey: 'slider.documentary',
        directorKey: 'slider.ana',
        thumbnail: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=640&h=360&fit=crop&crop=center',
        videoSrc: 'https://cdn.jsdelivr.net/gh/Mapaor/sample-videos@main/60s-720p/gtv-videos-bucket/Sintel.mp4',
        startTime: 45, // Començar als 45 segons
        aspectRatio: 1.778,
        preferenceDefault: 'videoSrc', // videoSrc o thumbnail
        preferenceHover: 'videoSrc', // videoSrc o thumbnail al fer hover
        // Pàgina projecte
        videoUrl: 'https://player.vimeo.com/video/8870338?title=0&byline=0&portrait=0',
        gallery: [
            'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center'
        ],
    },
    4: {
        // Element Slider 
        titleKey: 'slider.commercial',
        directorKey: 'slider.david',
        thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=640&h=360&fit=crop&crop=center',
        videoSrc: 'https://cdn.jsdelivr.net/gh/Mapaor/sample-videos@main/60s-720p/gtv-videos-bucket/TearsOfSteel.mp4',
        aspectRatio: 1.778,
        preferenceDefault: 'videoSrc', // videoSrc o thumbnail
        preferenceHover: 'videoSrc', // videoSrc o thumbnail al fer hover
        // Pàgina projecte
        videoUrl: 'https://player.vimeo.com/video/4131364?title=0&byline=0&portrait=0',
        gallery: [
            'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center'
        ],
    },
    5: {
        // Element Slider 
        titleKey: 'slider.brand',
        directorKey: 'slider.sofia',
        thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=640&h=360&fit=crop&crop=center',
        videoSrc: 'https://cdn.jsdelivr.net/gh/Mapaor/sample-videos@main/nasa-internet-archive/47-Hatch-opening.mp4',
        aspectRatio: 1.778,
        preferenceDefault: 'videoSrc', // videoSrc o thumbnail
        preferenceHover: 'videoSrc', // videoSrc o thumbnail al fer hover
        // Pàgina projecte
        videoUrl: 'https://player.vimeo.com/video/1306133?title=0&byline=0&portrait=0',
        gallery: [
            'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&crop=center'
        ],
    }
};

export const getVideos = (t) => {
  return Object.entries(projects).map(([id, project]) => ({
    id: parseInt(id),
    title: project.titleKey ? t(project.titleKey) : `Project ${id}`,
    director: project.directorKey ? t(project.directorKey) : `Director ${id}`,
    thumbnail: project.thumbnail,
    videoSrc: project.videoSrc,
    startTime: project.startTime || 0,
    aspectRatio: project.aspectRatio,
    preferenceDefault: project.preferenceDefault,
    preferenceHover: project.preferenceHover,
  }));
};

export default projects;

import styles from './Project.module.css';

const projects = {
  1: {
    title: 'Urban Brand Campaign',
    description: 'A dynamic urban brand campaign showcasing modern lifestyle and contemporary culture.',
    videoUrl: 'https://player.vimeo.com/video/76979871?h=0f6c34c2b1&title=0&byline=0&portrait=0',
    details: {
      client: 'UrbanLife Brand',
      year: '2024',
      duration: '2:30',
      category: 'Commercial',
      director: 'Maria Rodriguez',
      cinematographer: 'Alex Thompson'
    },
    fullDescription: `This urban brand campaign was designed to capture the essence of modern city living. 
    Shot across multiple locations in Barcelona, the project showcases the dynamic energy of urban 
    culture while maintaining a sophisticated aesthetic that speaks to contemporary audiences.
    
    The creative approach focused on authentic storytelling, featuring real people in genuine moments 
    that reflect the brand's values of authenticity and connection. The visual style combines cinematic 
    techniques with documentary-style cinematography to create an engaging narrative.`,
    gallery: [
      '/project1-img1.jpg',
      '/project1-img2.jpg',
      '/project1-img3.jpg'
    ]
  },
  2: {
    title: 'Music Video Production',
    description: 'Creative music video with stunning visual effects and artistic cinematography.',
    videoUrl: 'https://player.vimeo.com/video/357274789?h=1a1dbb5b02&title=0&byline=0&portrait=0',
    details: {
      client: 'Indie Artist Collective',
      year: '2024',
      duration: '3:45',
      category: 'Music Video',
      director: 'Carlos Mendez',
      cinematographer: 'Sofia Patel'
    },
    fullDescription: `An artistic exploration of sound and vision, this music video pushes creative 
    boundaries while serving the artistic vision of the featured musicians. The project combines 
    practical effects with digital enhancement to create a surreal visual experience.
    
    Shot entirely in-studio with custom-built sets, the video creates multiple worlds that reflect 
    different emotional states within the music. The color palette evolves throughout the piece, 
    guiding viewers through a visual journey that complements the musical narrative.`,
    gallery: [
      '/project2-img1.jpg',
      '/project2-img2.jpg',
      '/project2-img3.jpg'
    ]
  },
  3: {
    title: 'Documentary Short',
    description: 'Emotional documentary capturing real stories of local communities.',
    videoUrl: 'https://player.vimeo.com/video/1084537?h=847b0e6e5e&title=0&byline=0&portrait=0',
    details: {
      client: 'Cultural Foundation',
      year: '2024',
      duration: '15:00',
      category: 'Documentary',
      director: 'Ana Gutierrez',
      cinematographer: 'Miguel Santos'
    },
    fullDescription: `This documentary short explores the rich cultural heritage of local communities, 
    focusing on stories that often go untold. Through intimate interviews and observational footage, 
    the film creates a portrait of resilience and tradition in contemporary society.
    
    The documentary approach prioritizes authentic storytelling, allowing subjects to share their 
    experiences in their own words. The visual style is deliberately understated, focusing attention 
    on the human stories at the heart of the narrative.`,
    gallery: [
      '/project3-img1.jpg',
      '/project3-img2.jpg',
      '/project3-img3.jpg'
    ]
  },
  4: {
    title: 'Commercial Spot',
    description: 'High-impact commercial with compelling narrative and strong brand messaging.',
    videoUrl: 'https://player.vimeo.com/video/148751763?h=2a5c7e8d9f&title=0&byline=0&portrait=0',
    details: {
      client: 'Global Tech Company',
      year: '2024',
      duration: '1:00',
      category: 'Commercial',
      director: 'David Kim',
      cinematographer: 'Elena Vasquez'
    },
    fullDescription: `A high-impact commercial that tells a compelling story while delivering strong 
    brand messaging. The project balances emotional resonance with clear communication of product 
    benefits, creating a memorable viewing experience.
    
    The creative strategy focused on demonstrating real-world applications of the technology while 
    maintaining human connection at the center of the narrative. The visual approach combines sleek 
    product cinematography with warm, human moments.`,
    gallery: [
      '/project4-img1.jpg',
      '/project4-img2.jpg',
      '/project4-img3.jpg'
    ]
  }
};

export default function ProjectPage({ params }) {
  const project = projects[params.id];

  if (!project) {
    return (
      <div className={styles.container}>
        <h1>Project not found</h1>
        <a href="/">Return to Home</a>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.videoContainer}>
          <iframe
            src={project.videoUrl}
            title={project.title}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className={styles.video}
          />
        </div>
        <div className={styles.projectInfo}>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.description}>{project.description}</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.details}>
          <h2>Project Details</h2>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <strong>Client:</strong> {project.details.client}
            </div>
            <div className={styles.detailItem}>
              <strong>Year:</strong> {project.details.year}
            </div>
            <div className={styles.detailItem}>
              <strong>Duration:</strong> {project.details.duration}
            </div>
            <div className={styles.detailItem}>
              <strong>Category:</strong> {project.details.category}
            </div>
            <div className={styles.detailItem}>
              <strong>Director:</strong> {project.details.director}
            </div>
            <div className={styles.detailItem}>
              <strong>Cinematographer:</strong> {project.details.cinematographer}
            </div>
          </div>
        </div>

        <div className={styles.fullDescription}>
          <h2>About the Project</h2>
          <div className={styles.descriptionText}>
            {project.fullDescription.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>
        </div>

        <div className={styles.gallery}>
          <h2>Gallery</h2>
          <div className={styles.galleryGrid}>
            {project.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${project.title} - Image ${index + 1}`}
                className={styles.galleryImage}
              />
            ))}
          </div>
        </div>

        <div className={styles.navigation}>
          <a href="/#projects" className={styles.backLink}>
            ← Back to Projects
          </a>
        </div>
      </div>
    </div>
  );
}

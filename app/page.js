import styles from '@/styles/HomePage.module.css';
import VideoSlider from '@/components/videoSlider';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section id="home" className={styles.hero}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>Welcome to Rodeo Studio</h1>
          <p className={styles.subtitle}>
            Bringing stories to life with creative and professional audiovisual production. 
            We specialize in creating compelling visual narratives that connect with audiences.
          </p>
          <button className={styles.ctaButton}>Start Your Project</button>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className={styles.section}>
        <h2 className={styles.sectionTitle}>Featured Projects</h2>
        <p className={styles.sectionSubtitle}>
          Explore our latest creative works showcasing diverse storytelling approaches
        </p>
        <VideoSlider />
      </section>

      {/* About Us Section */}
      <section id="about" className={styles.section}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <h2 className={styles.sectionTitle}>About Rodeo Studio</h2>
            <p className={styles.text}>
              Founded in 2020, Rodeo Studio is an independent production company that combines 
              passion for cinema with a contemporary vision. We believe in the power of visual 
              storytelling to create meaningful connections between brands and their audiences.
            </p>
            <p className={styles.text}>
              Our team of creative professionals specializes in commercials, music videos, 
              documentaries, and social media content. We work closely with brands, artists, 
              and agencies to create unique pieces that leave a lasting impression.
            </p>
          </div>
          <div className={styles.aboutImage}>
            <img src="/about-studio.jpg" alt="Rodeo Studio team" className={styles.image} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Services</h2>
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <h3 className={styles.serviceTitle}>Commercial Production</h3>
            <p className={styles.serviceDescription}>
              High-impact commercials that tell your brand story with creativity and precision.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <h3 className={styles.serviceTitle}>Music Videos</h3>
            <p className={styles.serviceDescription}>
              Artistic music videos that capture the essence of your sound and vision.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <h3 className={styles.serviceTitle}>Documentary Films</h3>
            <p className={styles.serviceDescription}>
              Compelling documentaries that explore real stories with depth and authenticity.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <h3 className={styles.serviceTitle}>Social Media Content</h3>
            <p className={styles.serviceDescription}>
              Engaging content optimized for social platforms and digital audiences.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className={styles.section}>
        <h2 className={styles.sectionTitle}>Let's Create Together</h2>
        <p className={styles.sectionSubtitle}>
          Ready to bring your vision to life? Get in touch with our team.
        </p>
        <div className={styles.contactContainer}>
          <div className={styles.contactInfo}>
            <h3>Contact Information</h3>
            <p>📧 hello@rodeostudio.com</p>
            <p>📱 +34 123 456 789</p>
            <p>📍 Barcelona, Spain</p>
          </div>
          <form className={styles.contactForm}>
            <input type="text" placeholder="Your Name" className={styles.input} required />
            <input type="email" placeholder="Your Email" className={styles.input} required />
            <input type="text" placeholder="Project Type" className={styles.input} />
            <textarea placeholder="Tell us about your project..." className={styles.textarea} required></textarea>
            <button type="submit" className={styles.submitButton}>Send Message</button>
          </form>
        </div>
      </section>
    </main>
  );
}

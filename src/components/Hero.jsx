import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import myPhoto from '../../DBU1601439.png';
import './Hero.css';

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 }
  })
};

const floatVariants = {
  animate: (i) => ({
    y: [0, -8, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      delay: i * 0.1,
      ease: "easeInOut"
    }
  })
};

const name1 = "Bereket".split("");
const name2 = "Sahlemariam".split("");
const subtitle = "Full Stack Developer".split("");

const Hero = () => {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="hero-tag">Available for work</span>
          <h1>
            {name1.map((letter, i) => (
              <motion.span key={i} className="letter" custom={i} variants={letterVariants} initial="hidden" animate="visible">
                {letter}
              </motion.span>
            ))}
            {" "}
            <span className="highlight">
              {name2.map((letter, i) => (
                <motion.span key={i} className="letter" custom={i + 8} variants={letterVariants} initial="hidden" animate="visible">
                  {letter}
                </motion.span>
              ))}
            </span>
          </h1>
          <p className="hero-subtitle">
            {subtitle.map((letter, i) => (
              <motion.span key={i} className="letter subtitle-letter" custom={i + 20} variants={letterVariants} initial="hidden" animate="visible">
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </p>
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            I build beautiful, responsive websites and applications that help businesses grow.
          </motion.p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollTo('portfolio')}>
              View My Work <ArrowRight size={18} />
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
              Contact Me
            </button>
          </div>

          <div className="hero-socials">
            <a href="https://github.com/beki255" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/bereket-sahlemariam-69a669362/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://twitter.com/@beki2553" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="hero-image-wrapper">
            <div className="hero-image-container">
              <img
                src={myPhoto}
                alt="Bereket Sahlemariam"
                className="hero-image"
              />
            </div>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">2+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Projects</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

import { motion } from 'framer-motion';
import { Download, Award, Users, Briefcase } from 'lucide-react';
import myPhoto from '../../DBU1601439.png';
import myCV from '../../Curriculum vitae(CV).pdf';
import './About.css';

const About = () => {
  const stats = [
    { icon: Award, number: '2+', label: 'Years Experience' },
    { icon: Users, number: '5+', label: 'Happy Clients' },
    { icon: Briefcase, number: '5', label: 'Projects Completed' },
    { icon: Award, number: '2+', label: 'Awards Won' },
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-badge">About Me</span>
          <h2 className="section-title">Passionate About Creating <span className="highlight">Amazing</span> Digital Experiences</h2>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="about-image-wrapper">
              <img
                src={myPhoto}
                alt="About Me"
              />
            </div>
            <div className="about-ring"></div>
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>I'm a Full Stack Developer</h3>
            <p>
              I'm a passionate full-stack developer with over 2 years of experience building 
              web applications and digital experiences. I specialize in creating responsive, 
              user-friendly websites and applications that deliver real business value.
            </p>
            <p>
              My expertise includes front-end technologies like HTML5, CSS3, JavaScript, 
              and React, as well as back-end technologies like Node.js, Python, php, mysql and MongoDB.
            </p>

            <div className="about-stats">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <stat.icon size={22} className="stat-icon" />
                  <span className="stat-value">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            <a href={myCV} download="Bereket_Sahlemariam_CV.pdf" className="btn btn-primary">
              <Download size={18} />
              Download CV
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

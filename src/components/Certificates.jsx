import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import './Certificates.css';

const Certificates = () => {
  const certificates = [
    {
      title: 'Internship Certificate',
      issuer: 'Internship Provider',
      description: 'Certificate of completion for software development internship program.',
      file: '/certificates/BEREKET SAHLEMARIAM NEGA Internship Certificate (1).pdf'
    },
    {
      title: 'Letter of Recommendation',
      issuer: 'Professional Reference',
      description: 'Letter of recommendation highlighting professional skills and work ethic.',
      file: '/certificates/BEREKET SAHLEMARIAM NEGA LoR.pdf'
    },
    {
      title: 'Tech Skills - Advance Career',
      issuer: 'Udacity',
      description: 'Data Analysis Fundamentals',
      file: '/certificates/Learn the Latest Tech Skills; Advance Your Career _ Udacity.pdf'
    },
    {
      title: 'Advanced Tech Skills 1',
      issuer: 'Udacity',
      description: 'Artificial Intelligence Fundamentals',
      file: '/certificates/Learn_the_Latest_Tech_Skills;_Advance_Your_Career_Udacity1.PDF'
    },
    {
      title: 'Advanced Tech Skills 3',
      issuer: 'Udacity',
      description: 'Android Developer Fundamentals',
      file: '/certificates/Learn_the_Latest_Tech_Skills;_Advance_Your_Career_Udacity3.PDF'
    },
    {
      title: 'Advanced Tech Skills 4',
      issuer: 'Udacity',
      description: 'Programming Fundamentals',
      file: '/certificates/Learn_the_Latest_Tech_Skills;_Advance_Your_Career_Udacity4.PDF'
    },
    {
      title: 'HACK-X Hackathon 2026',
      issuer: 'HACK-X',
      description: 'Certificate of participation and achievement in the HACK-X 2026 Hackathon.',
      file: '/certificates/HACK-X 2026.jpg'
    }
  ];

  return (
    <section id="certificates" className="certificates section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-badge">My Achievements</span>
          <h2 className="section-title">Awards & <span className="highlight">Certificates</span></h2>
        </motion.div>

        <div className="certificates-grid">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              className="certificate-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="certificate-icon">
                <Award size={32} />
              </div>
              <h3>{cert.title}</h3>
              <div className="certificate-meta">
                <span className="issuer">{cert.issuer}</span>
              </div>
              <p>{cert.description}</p>
              
              <a href={cert.file} target="_blank" rel="noopener noreferrer" className="view-cert-btn">
                <span>View Certificate</span>
                <ExternalLink size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;

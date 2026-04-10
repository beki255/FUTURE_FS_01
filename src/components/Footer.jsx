import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    { href: 'https://github.com/beki255', label: 'GitHub', icon: 'fab fa-github' },
    { href: 'https://www.linkedin.com/in/bereket-sahlemariam-69a669362/', label: 'LinkedIn', icon: 'fab fa-linkedin' },
    { href: 'https://twitter.com/@beki2553', label: 'Twitter', icon: 'fab fa-twitter' },
    { href: 'mailto:bereket2553@gmail.com', label: 'Email', icon: 'fas fa-envelope' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3>Bereket<span>Sahlemariam</span></h3>
            <p>
              Full Stack Developer creating digital experiences 
              that make a difference.
            </p>
            <div className="footer-socials">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Bereket Sahlemariam. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

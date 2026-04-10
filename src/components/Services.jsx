import { motion } from 'framer-motion';
import { Code2, Monitor, Database, Server, Globe, Shield } from 'lucide-react';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: 'Web App Development',
      description: 'Building modern, responsive web applications using React, Node.js, and other cutting-edge technologies.',
      features: ['React / Next.js', 'Node.js / Express', 'PHP / MySQL', 'MongoDB Database'],
    },
    {
      icon: Monitor,
      title: 'Desktop Application',
      description: 'Creating powerful desktop applications for Windows with clean interfaces and robust functionality.',
      features: ['Electron Framework', 'JavaScript / Python', 'Desktop UI/UX', 'System Integration'],
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Developing scalable server-side solutions with RESTful APIs and efficient database management.',
      features: ['REST API Design', 'Database Architecture', 'Authentication', 'Server Deployment'],
    },
    {
      icon: Shield,
      title: 'Web Security',
      description: 'Implementing security best practices to protect your applications from vulnerabilities.',
      features: ['SSL/HTTPS', 'Input Validation', 'Data Encryption', 'Security Audits'],
    },
  ];

  return (
    <section id="services" className="services section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-badge">My Services</span>
          <h2 className="section-title">What I <span className="highlight">Offer</span></h2>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="service-icon">
                <service.icon size={32} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

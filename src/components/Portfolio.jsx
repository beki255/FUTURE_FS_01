import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jobPortalImg from '../../jop-portal-photo.jpg';
import millHouseImg from '../../mill-house.png';
import crmImg from '../../crm.png';
import habeshaImg from '../../habesha-butique.png';
import bloodBankImg from '../../bloodbank.jpg';
import './Portfolio.css';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '');

const fallbackProjects = [
  { _id: 1, title: 'Client Lead Management System', category: 'web-app', image: crmImg, description: 'MERN stack CRM for managing client leads with authentication and dashboard', tech: ['React', 'Node.js', 'MongoDB'], liveLink: '#', githubLink: '#' },
  { _id: 2, title: 'Habesha Boutique', category: 'web-app', image: habeshaImg, description: 'Local business e-commerce platform for Ethiopian traditional clothing', tech: ['React', 'Node.js', 'MongoDB'], liveLink: '#', githubLink: '#' },
  { _id: 3, title: 'Blood Bank System', category: 'web-app', image: bloodBankImg, description: 'A Laravel-based system coordinating emergency blood requests, donor matching, and real-time inventory management for hospitals and donors.', tech: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS'], liveLink: '#', githubLink: '#' },
  { _id: 4, title: 'Human Resource Management System', category: 'desktop', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', description: 'Beginner-friendly HR management system with employee record management features using Python', tech: ['Python', 'SQL'], liveLink: '#', githubLink: '#' },
  { _id: 5, title: 'Job Portal System', category: 'desktop', image: jobPortalImg, description: 'Job portal platform for job posting and applications with user authentication and job listing features', tech: ['Java', 'JavaFX'], liveLink: '#', githubLink: '#' },
  { _id: 6, title: 'Mill House Management System', category: 'desktop', image: millHouseImg, description: 'Management system for mill house operations with CRUD operations and responsive UI', tech: ['Java', 'JavaFX', 'MySQL'], liveLink: '#', githubLink: '#' },
];

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    if (!API_URL) {
      setProjects(fallbackProjects);
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${API_URL}/projects`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.log('Using fallback data');
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const categories = ['all', 'web-app', 'desktop'];

  const categoryLabels = { 'all': 'All', 'web-app': 'Web-App', 'desktop': 'Desktop' };

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-badge">My Portfolio</span>
          <h2 className="section-title">Recent <span className="highlight">Projects</span></h2>
        </motion.div>

        <div className="portfolio-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : (
          <motion.div className="portfolio-grid">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  className="portfolio-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  layout
                >
                  <div className="portfolio-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="portfolio-content">
                    <span className="portfolio-category">{categoryLabels[project.category] || project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="portfolio-tech">
                      {project.tech && project.tech.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
export default Portfolio;

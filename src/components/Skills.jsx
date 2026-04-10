import { motion } from 'framer-motion';
import { Code2, Database, Server, Cloud } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend (React)',
      icon: Code2,
      skills: [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 90 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'TypeScript', level: 80 },
      ],
    },
    {
      title: 'Backend (Node/Express)',
      icon: Server,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 85 },
        { name: 'PHP', level: 80 },
        { name: 'Python', level: 75 },
      ],
    },
    {
      title: 'Database (MongoDB/MySQL)',
      icon: Database,
      skills: [
        { name: 'MongoDB', level: 85 },
        { name: 'MySQL', level: 88 },
        { name: 'SQL', level: 82 },
      ],
    },
    {
      title: 'Other Tools',
      icon: Cloud,
      skills: [
        { name: 'Git', level: 88 },
        { name: 'Docker', level: 70 },
        { name: 'Linux', level: 75 },
      ],
    },
  ];

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-badge">My Skills</span>
          <h2 className="section-title">Technical <span className="highlight">Expertise</span></h2>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="skill-category"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <div className="category-header">
                <category.icon size={24} className="category-icon" />
                <h3>{category.title}</h3>
              </div>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

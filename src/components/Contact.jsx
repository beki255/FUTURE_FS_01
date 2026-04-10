import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Send email TO YOU (the website owner)
      await emailjs.send(
        'service_v5xwcjc',
        'template_dgfnmkl',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'bereket2553@gmail.com'
        },
        '9ndqIG4UG-XT0U57e'
      );

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(''), 4000);
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'bereket2553@gmail.com', href: 'mailto:bereket2553@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+251 925 537 199', href: 'tel:+251925537199' },
    { icon: MapPin, label: 'Location', value: 'Addis Ababa, Ethiopia', href: '#' },
  ];

  const socials = [
    { href: 'https://github.com/beki255', label: 'GitHub', icon: 'fab fa-github' },
    { href: 'https://www.linkedin.com/in/bereket-sahlemariam-69a669362/', label: 'LinkedIn', icon: 'fab fa-linkedin' },
    { href: 'https://twitter.com/@beki2553', label: 'Twitter', icon: 'fab fa-twitter' },
  ];

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Contact Me</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>Feel free to reach out if you have any questions or want to work together.</p>

            <div className="contact-details">
              {contactInfo.map((info) => (
                <a key={info.label} href={info.href} className="contact-item">
                  <div className="contact-icon">
                    <info.icon size={20} />
                  </div>
                  <span className="contact-value">{info.value}</span>
                </a>
              ))}
            </div>

            <div className="contact-socials">
              <span>Follow Me</span>
              <div className="social-links">
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
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows="5"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                <Send size={18} />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && <p className="form-success">✓ Message sent! I'll get back to you soon.</p>}
              {status === 'error' && <p className="form-error">✗ Failed to send. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

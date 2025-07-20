import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Globe, 
  Users, 
  Shield, 
  Search, 
  Download, 
  Heart, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink,
  Calendar,
  User,
  Award,
  BookOpen,
  Target,
  Briefcase,
  Send,
  ChevronDown,
  ChevronUp,
  Star,
  ArrowRight
} from 'lucide-react';
import { 
  newsArticles, 
  teamMembers, 
  researchProjects, 
  partners, 
  resources, 
  donationTiers, 
  jobOpenings,
  testimonials 
} from '../mock';

const Home = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [applicationForm, setApplicationForm] = useState({
    jobId: '',
    name: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: ''
  });
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Scroll to section functionality
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for your message! We will get back to you soon.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  // Handle job application submission
  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    console.log('Job application submitted:', applicationForm);
    alert('Your application has been submitted successfully!');
    setApplicationForm({
      jobId: '',
      name: '',
      email: '',
      phone: '',
      experience: '',
      coverLetter: ''
    });
  };

  // Handle donation selection
  const handleDonation = (tier) => {
    console.log('Donation selected:', tier);
    alert(`Thank you for choosing the ${tier.name} tier! Redirecting to payment...`);
  };

  const faqData = [
    {
      question: "What is War:Observe's primary mission?",
      answer: "War:Observe is an international analytical and media project supporting young experts, journalists, and opinion leaders who strive to objectively cover armed conflicts, with a particular focus on the war initiated by Russia against Ukraine."
    },
    {
      question: "How can I contribute to your research projects?",
      answer: "We welcome contributions from researchers, journalists, and subject matter experts. You can apply for our open positions, participate in our internship programs, or collaborate on specific research projects. Contact us at office@warobserve.com to discuss opportunities."
    },
    {
      question: "Do you provide training for young journalists?",
      answer: "Yes, we offer comprehensive training programs for young journalists and students in international relations. Our programs cover ethical reporting in conflict zones, safety protocols, and analytical methodologies."
    },
    {
      question: "How can my organization partner with War:Observe?",
      answer: "We collaborate with various organizations including think tanks, media outlets, and international institutions. Partnership opportunities include joint research projects, exchange programs, and shared resources. Please reach out to discuss potential collaborations."
    }
  ];

  return (
    <div className="home">
      {/* Header */}
      <header className="design-header">
        <div className="nav-container">
          <div className="nav-brand">
            <img 
              src="https://www.warobserve.com/img/photo/logo.gif" 
              alt="War:Observe" 
              className="nav-logo"
            />
          </div>
          <nav className="nav-menu">
            <a href="#about" className="nav-link" onClick={() => scrollToSection('about')}>About</a>
            <a href="#news" className="nav-link" onClick={() => scrollToSection('news')}>News</a>
            <a href="#research" className="nav-link" onClick={() => scrollToSection('research')}>Research</a>
            <a href="#team" className="nav-link" onClick={() => scrollToSection('team')}>Team</a>
            <a href="#resources" className="nav-link" onClick={() => scrollToSection('resources')}>Resources</a>
            <a href="#contact" className="nav-link" onClick={() => scrollToSection('contact')}>Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="section-container">
          <h1 className="display-lg animate-fadeInUp">
            Objective Analysis.<br />
            <span style={{ color: 'var(--brand-green)' }}>Informed Reporting.</span>
          </h1>
          <p className="body-xl" style={{ marginTop: '24px', maxWidth: '600px', margin: '24px auto 40px' }}>
            Supporting young experts, journalists, and opinion leaders in providing objective coverage of armed conflicts and fostering international collaboration.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn-primary"
              onClick={() => scrollToSection('research')}
            >
              <BookOpen style={{ marginRight: '8px' }} size={20} />
              Explore Research
            </button>
            <button 
              className="btn-secondary"
              onClick={() => scrollToSection('contact')}
            >
              Join Our Mission
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding" style={{ background: 'var(--bg-card)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="heading-1">Who We Are</h2>
            <p className="body-lg" style={{ marginTop: '16px', maxWidth: '800px', margin: '16px auto 0' }}>
              War:Observe is an international analytical and media project created to support objective conflict coverage and foster collaboration among experts and journalists worldwide.
            </p>
          </div>
          
          <div className="design-grid">
            <div className="design-card">
              <div className="card-icon">
                <Target size={24} />
              </div>
              <h3 className="heading-3">Objective Analysis</h3>
              <p className="body-md" style={{ marginTop: '16px' }}>
                Providing comprehensive analytical studies on international peace initiatives and conflict resolution mechanisms.
              </p>
            </div>
            
            <div className="design-card">
              <div className="card-icon">
                <Users size={24} />
              </div>
              <h3 className="heading-3">Expert Collaboration</h3>
              <p className="body-md" style={{ marginTop: '16px' }}>
                Establishing workspaces in Brussels and Kyiv for collaboration among journalists, experts, and opinion leaders.
              </p>
            </div>
            
            <div className="design-card">
              <div className="card-icon">
                <BookOpen size={24} />
              </div>
              <h3 className="heading-3">Education & Training</h3>
              <p className="body-md" style={{ marginTop: '16px' }}>
                Offering exchange programs, internships, and practical opportunities for journalism and international relations students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="section-padding">
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="heading-1">Latest News & Analysis</h2>
            <p className="body-lg" style={{ marginTop: '16px' }}>
              Stay updated with our latest research findings, analytical reports, and insights on global conflicts.
            </p>
          </div>
          
          <div className="news-grid">
            {newsArticles.map((article) => (
              <article key={article.id} className="news-card">
                <img src={article.imageUrl} alt={article.title} />
                <div className="news-card-content">
                  <div className="news-meta">
                    <span className="news-category">{article.category}</span>
                    <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
                    <span>By {article.author}</span>
                  </div>
                  <h3 className="heading-3" style={{ marginBottom: '12px' }}>{article.title}</h3>
                  <p className="body-md" style={{ marginBottom: '16px' }}>{article.excerpt}</p>
                  <button className="btn-secondary" style={{ padding: '12px 20px', minHeight: 'auto' }}>
                    Read More <ExternalLink size={16} style={{ marginLeft: '8px' }} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Research Projects Section */}
      <section id="research" className="section-padding" style={{ background: 'var(--bg-card)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="heading-1">Research Projects</h2>
            <p className="body-lg" style={{ marginTop: '16px' }}>
              Our ongoing and completed research initiatives focused on conflict analysis and peace studies.
            </p>
          </div>
          
          <div className="design-grid">
            {researchProjects.map((project) => (
              <div key={project.id} className="design-card">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <div className="card-icon" style={{ width: '48px', height: '48px', marginRight: '16px', marginBottom: '0' }}>
                    <Search size={20} />
                  </div>
                  <span 
                    className={`badge ${project.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: project.status === 'Completed' ? 'var(--brand-green)' : 'var(--brand-orange)',
                      color: 'white'
                    }}
                  >
                    {project.status}
                  </span>
                </div>
                <h3 className="heading-3" style={{ marginBottom: '12px' }}>{project.title}</h3>
                <p className="body-md" style={{ marginBottom: '16px' }}>{project.description}</p>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  <strong>Team:</strong> {project.team.join(', ')}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  <strong>Results:</strong> {project.results}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section-padding">
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="heading-1">Our Team</h2>
            <p className="body-lg" style={{ marginTop: '16px' }}>
              Meet our dedicated team of experts, journalists, and analysts working to provide objective conflict coverage.
            </p>
          </div>
          
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="team-avatar"
                />
                <h3 className="heading-3" style={{ marginBottom: '8px' }}>{member.name}</h3>
                <p style={{ color: 'var(--brand-green)', fontWeight: '500', marginBottom: '12px' }}>
                  {member.position}
                </p>
                <p className="body-md" style={{ fontSize: '14px', marginBottom: '16px' }}>
                  {member.bio}
                </p>
                <a href={`mailto:${member.email}`} className="btn-secondary" style={{ padding: '8px 16px', minHeight: 'auto' }}>
                  <Mail size={14} style={{ marginRight: '6px' }} />
                  Contact
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-padding" style={{ background: 'var(--bg-card)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="heading-1">What Experts Say</h2>
            <p className="body-lg" style={{ marginTop: '16px' }}>
              Testimonials from professionals who have worked with War:Observe.
            </p>
          </div>
          
          <div className="design-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="design-card">
                <div style={{ display: 'flex', marginBottom: '16px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--brand-orange)" color="var(--brand-orange)" />
                  ))}
                </div>
                <p className="body-md" style={{ marginBottom: '24px', fontStyle: 'italic' }}>
                  "{testimonial.content}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', marginRight: '12px' }}
                  />
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                      {testimonial.name}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                      {testimonial.position}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="section-padding">
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="heading-1">Resources</h2>
            <p className="body-lg" style={{ marginTop: '16px' }}>
              Access our research materials, guidelines, and training resources.
            </p>
          </div>
          
          <div className="design-grid">
            {resources.map((resource) => (
              <div key={resource.id} className="design-card">
                <div className="card-icon">
                  <Download size={24} />
                </div>
                <h3 className="heading-3" style={{ marginBottom: '12px' }}>{resource.title}</h3>
                <p className="body-md" style={{ marginBottom: '16px' }}>{resource.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    {resource.type} • {resource.fileType}
                  </span>
                  <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    {new Date(resource.publishedDate).toLocaleDateString()}
                  </span>
                </div>
                <button className="btn-primary" style={{ width: '100%' }}>
                  <Download size={16} style={{ marginRight: '8px' }} />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="section-padding" style={{ background: 'var(--bg-card)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="heading-1">Our Partners</h2>
            <p className="body-lg" style={{ marginTop: '16px' }}>
              Collaborating with leading organizations worldwide to advance our mission.
            </p>
          </div>
          
          <div className="design-grid">
            {partners.map((partner) => (
              <div key={partner.id} className="design-card">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
                />
                <h3 className="heading-3" style={{ marginBottom: '12px' }}>{partner.name}</h3>
                <p className="body-md" style={{ marginBottom: '16px' }}>{partner.description}</p>
                <a href={partner.website} className="btn-secondary" style={{ padding: '8px 16px', minHeight: 'auto' }}>
                  Visit Website <ExternalLink size={14} style={{ marginLeft: '6px' }} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="section-padding">
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="heading-1">Support Our Mission</h2>
            <p className="body-lg" style={{ marginTop: '16px' }}>
              Help us continue our important work in conflict analysis and journalism training.
            </p>
          </div>
          
          <div className="design-grid">
            {donationTiers.map((tier) => (
              <div key={tier.id} className="design-card">
                <div className="card-icon">
                  <Heart size={24} />
                </div>
                <h3 className="heading-3" style={{ marginBottom: '8px' }}>{tier.name}</h3>
                <div style={{ fontSize: '32px', fontWeight: '600', color: 'var(--brand-green)', marginBottom: '12px' }}>
                  €{tier.amount}
                </div>
                <p className="body-md" style={{ marginBottom: '16px' }}>{tier.description}</p>
                <ul style={{ listStyle: 'none', marginBottom: '24px' }}>
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ width: '6px', height: '6px', background: 'var(--brand-green)', borderRadius: '50%', marginRight: '8px' }}></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%' }}
                  onClick={() => handleDonation(tier)}
                >
                  Choose {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section id="join" className="section-padding" style={{ background: 'var(--bg-card)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="heading-1">Join Our Team</h2>
            <p className="body-lg" style={{ marginTop: '16px' }}>
              Explore career opportunities and become part of our mission to provide objective conflict analysis.
            </p>
          </div>
          
          <div className="design-grid">
            {jobOpenings.map((job) => (
              <div key={job.id} className="design-card">
                <div className="card-icon">
                  <Briefcase size={24} />
                </div>
                <h3 className="heading-3" style={{ marginBottom: '8px' }}>{job.title}</h3>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  {job.department} • {job.location} • {job.type}
                </div>
                <p className="body-md" style={{ marginBottom: '16px' }}>{job.description}</p>
                <div style={{ marginBottom: '16px' }}>
                  <strong style={{ fontSize: '14px' }}>Requirements:</strong>
                  <ul style={{ fontSize: '14px', marginTop: '8px', paddingLeft: '20px' }}>
                    {job.requirements.slice(0, 2).map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%' }}
                  onClick={() => setApplicationForm({ ...applicationForm, jobId: job.id })}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
          
          {/* Job Application Form */}
          {applicationForm.jobId && (
            <div style={{ marginTop: '60px' }}>
              <form onSubmit={handleApplicationSubmit} className="contact-form">
                <h3 className="heading-2" style={{ marginBottom: '24px', textAlign: 'center' }}>
                  Job Application
                </h3>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={applicationForm.name}
                    onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={applicationForm.email}
                    onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={applicationForm.phone}
                    onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Years of Experience</label>
                  <input
                    type="text"
                    className="form-input"
                    value={applicationForm.experience}
                    onChange={(e) => setApplicationForm({ ...applicationForm, experience: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Cover Letter</label>
                  <textarea
                    className="form-textarea"
                    value={applicationForm.coverLetter}
                    onChange={(e) => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                    placeholder="Tell us why you're interested in this position..."
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                    <Send size={16} style={{ marginRight: '8px' }} />
                    Submit Application
                  </button>
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setApplicationForm({ jobId: '', name: '', email: '', phone: '', experience: '', coverLetter: '' })}
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding">
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="heading-1">Frequently Asked Questions</h2>
            <p className="body-lg" style={{ marginTop: '16px' }}>
              Find answers to common questions about our work and services.
            </p>
          </div>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqData.map((faq, index) => (
              <div key={index} className="design-card" style={{ marginBottom: '16px' }}>
                <button
                  style={{
                    width: '100%',
                    padding: '0',
                    border: 'none',
                    background: 'transparent',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <h3 className="heading-3" style={{ textAlign: 'left' }}>{faq.question}</h3>
                  {expandedFaq === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>
                {expandedFaq === index && (
                  <p className="body-md" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding" style={{ background: 'var(--bg-card)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="heading-1">Contact Us</h2>
            <p className="body-lg" style={{ marginTop: '16px' }}>
              Get in touch with our team for collaborations, inquiries, or more information about our work.
            </p>
          </div>
          
          <form onSubmit={handleContactSubmit} className="contact-form">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                className="form-input"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                className="form-textarea"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Tell us how we can help you..."
                required
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              <Send size={16} style={{ marginRight: '8px' }} />
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="section-container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>War:Observe</h3>
              <p style={{ marginBottom: '20px', color: 'rgba(255, 255, 255, 0.8)' }}>
                Supporting objective conflict coverage and expert collaboration worldwide.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <Mail size={16} style={{ marginRight: '8px' }} />
                <span>office@warobserve.com</span>
              </div>
            </div>
            
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#research">Research</a></li>
                <li><a href="#team">Our Team</a></li>
                <li><a href="#resources">Resources</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Get Involved</h3>
              <ul className="footer-links">
                <li><a href="#join">Join Our Team</a></li>
                <li><a href="#donate">Support Us</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#partners">Partnerships</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Connect</h3>
              <ul className="footer-links">
                <li><a href="#news">Latest News</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#resources">Download Resources</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 War:Observe. All rights reserved. | Designed for objective conflict analysis and international collaboration.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
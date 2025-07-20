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
  Menu,
  X,
  Award,
  BookOpen,
  Target,
  Briefcase,
  Send,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Loader,
  Facebook,
  Linkedin
} from 'lucide-react';

// Import components
import Modal from './Modal';

// Import API services
import { 
  newsAPI, 
  teamAPI, 
  researchAPI, 
  partnersAPI, 
  resourcesAPI, 
  jobsAPI,
  contactAPI,
  faqAPI,
  donationsAPI 
} from '../services/api';

const Home = () => {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'news' or 'project'
  const [modalData, setModalData] = useState(null);

  // State for API data
  const [newsArticles, setNewsArticles] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [researchProjects, setResearchProjects] = useState([]);
  const [partners, setPartners] = useState([]);
  const [resources, setResources] = useState([]);
  const [jobOpenings, setJobOpenings] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const [donationTiers, setDonationTiers] = useState([]);
  
  // Loading states
  const [loading, setLoading] = useState({
    news: true,
    team: true,
    research: true,
    partners: true,
    resources: true,
    jobs: true,
    faq: true,
    donations: true
  });
  
  // Error states
  const [errors, setErrors] = useState({});
  
  // Form states
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
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Load data on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      // Load all data in parallel
      const [
        newsData,
        teamData,
        researchData,
        partnersData,
        resourcesData,
        jobsData,
        faqDataResponse,
        donationData
      ] = await Promise.allSettled([
        newsAPI.getAll(),
        teamAPI.getAll(),
        researchAPI.getAll(),
        partnersAPI.getAll(),
        resourcesAPI.getAll(),
        jobsAPI.getAll(),
        faqAPI.getAll(),
        donationsAPI.getTiers()
      ]);

      // Handle successful responses
      if (newsData.status === 'fulfilled') {
        setNewsArticles(newsData.value);
        setLoading(prev => ({ ...prev, news: false }));
      } else {
        setErrors(prev => ({ ...prev, news: newsData.reason?.message }));
        setLoading(prev => ({ ...prev, news: false }));
      }

      if (teamData.status === 'fulfilled') {
        setTeamMembers(teamData.value);
        setLoading(prev => ({ ...prev, team: false }));
      } else {
        setErrors(prev => ({ ...prev, team: teamData.reason?.message }));
        setLoading(prev => ({ ...prev, team: false }));
      }

      if (researchData.status === 'fulfilled') {
        setResearchProjects(researchData.value);
        setLoading(prev => ({ ...prev, research: false }));
      } else {
        setErrors(prev => ({ ...prev, research: researchData.reason?.message }));
        setLoading(prev => ({ ...prev, research: false }));
      }

      if (partnersData.status === 'fulfilled') {
        setPartners(partnersData.value);
        setLoading(prev => ({ ...prev, partners: false }));
      } else {
        setErrors(prev => ({ ...prev, partners: partnersData.reason?.message }));
        setLoading(prev => ({ ...prev, partners: false }));
      }

      if (resourcesData.status === 'fulfilled') {
        setResources(resourcesData.value);
        setLoading(prev => ({ ...prev, resources: false }));
      } else {
        setErrors(prev => ({ ...prev, resources: resourcesData.reason?.message }));
        setLoading(prev => ({ ...prev, resources: false }));
      }

      if (jobsData.status === 'fulfilled') {
        setJobOpenings(jobsData.value);
        setLoading(prev => ({ ...prev, jobs: false }));
      } else {
        setErrors(prev => ({ ...prev, jobs: jobsData.reason?.message }));
        setLoading(prev => ({ ...prev, jobs: false }));
      }

      if (faqDataResponse.status === 'fulfilled') {
        setFaqData(faqDataResponse.value);
        setLoading(prev => ({ ...prev, faq: false }));
      } else {
        setErrors(prev => ({ ...prev, faq: faqDataResponse.reason?.message }));
        setLoading(prev => ({ ...prev, faq: false }));
      }

      if (donationData.status === 'fulfilled') {
        setDonationTiers(donationData.value.tiers || []);
        setLoading(prev => ({ ...prev, donations: false }));
      } else {
        setErrors(prev => ({ ...prev, donations: donationData.reason?.message }));
        setLoading(prev => ({ ...prev, donations: false }));
      }

    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  // Scroll to section functionality
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    
    try {
      await contactAPI.submit(contactForm);
      alert('Thank you for your message! We will get back to you soon.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      alert(`Failed to send message: ${error.message}`);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handle job application submission
  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    
    try {
      await jobsAPI.apply(applicationForm.jobId, {
        name: applicationForm.name,
        email: applicationForm.email,
        phone: applicationForm.phone,
        experience: applicationForm.experience,
        coverLetter: applicationForm.coverLetter
      });
      
      alert('Your application has been submitted successfully!');
      setApplicationForm({
        jobId: '',
        name: '',
        email: '',
        phone: '',
        experience: '',
        coverLetter: ''
      });
    } catch (error) {
      alert(`Failed to submit application: ${error.message}`);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handle donation selection
  const handleDonation = async (tier) => {
    setFormSubmitting(true);
    
    try {
      const donationData = {
        donorName: "Anonymous Donor",
        donorEmail: "donor@example.com",
        amount: tier.amount,
        tier: tier.name
      };
      
      const result = await donationsAPI.donate(donationData);
      alert(`Thank you for choosing the ${tier.name} tier! Donation ID: ${result.data.donationId}`);
    } catch (error) {
      alert(`Donation failed: ${error.message}`);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handle resource download
  const handleResourceDownload = async (resource) => {
    try {
      const result = await resourcesAPI.download(resource.id);
      // In a real app, this would trigger an actual download
      alert(`Download started: ${result.filename}`);
    } catch (error) {
      alert(`Download failed: ${error.message}`);
    }
  };

  // Loading component
  const LoadingSpinner = ({ size = 20 }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <Loader size={size} className="animate-spin" style={{ color: 'var(--brand-green)' }} />
    </div>
  );

  // Error component
  const ErrorMessage = ({ message }) => (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      color: 'var(--text-muted)',
      background: 'var(--bg-subtle)',
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <p>⚠️ {message}</p>
    </div>
  );

  return (
    <div className="home">
      {/* Header */}
      <header className="design-header">
        <div className="nav-container">
          <div className="nav-brand">
            <h2 className="nav-logo-text" style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '24px' }}>
              War:OBSERVE
            </h2>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="nav-menu desktop-nav">
            <a href="#about" className="nav-link" onClick={() => scrollToSection('about')}>About</a>
            <a href="#news" className="nav-link" onClick={() => scrollToSection('news')}>News</a>
            <a href="#research" className="nav-link" onClick={() => scrollToSection('research')}>Research</a>
            <a href="#team" className="nav-link" onClick={() => scrollToSection('team')}>Team</a>
            <a href="#resources" className="nav-link" onClick={() => scrollToSection('resources')}>Resources</a>
            <a href="#contact" className="nav-link" onClick={() => scrollToSection('contact')}>Contact</a>
            <a href="/admin" className="nav-link" style={{ color: 'var(--brand-green)' }}>Admin</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="mobile-nav-overlay">
            <nav className="mobile-nav">
              <a 
                href="#about" 
                className="mobile-nav-link" 
                onClick={() => {
                  scrollToSection('about');
                  setMobileMenuOpen(false);
                }}
              >
                About
              </a>
              <a 
                href="#news" 
                className="mobile-nav-link" 
                onClick={() => {
                  scrollToSection('news');
                  setMobileMenuOpen(false);
                }}
              >
                News
              </a>
              <a 
                href="#research" 
                className="mobile-nav-link" 
                onClick={() => {
                  scrollToSection('research');
                  setMobileMenuOpen(false);
                }}
              >
                Research
              </a>
              <a 
                href="#team" 
                className="mobile-nav-link" 
                onClick={() => {
                  scrollToSection('team');
                  setMobileMenuOpen(false);
                }}
              >
                Team
              </a>
              <a 
                href="#resources" 
                className="mobile-nav-link" 
                onClick={() => {
                  scrollToSection('resources');
                  setMobileMenuOpen(false);
                }}
              >
                Resources
              </a>
              <a 
                href="#contact" 
                className="mobile-nav-link" 
                onClick={() => {
                  scrollToSection('contact');
                  setMobileMenuOpen(false);
                }}
              >
                Contact
              </a>
              <a 
                href="/admin" 
                className="mobile-nav-link admin-link" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </a>
            </nav>
          </div>
        )}
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
          
          {loading.news ? (
            <LoadingSpinner size={32} />
          ) : errors.news ? (
            <ErrorMessage message={errors.news} />
          ) : (
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
          )}
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
          
          {loading.research ? (
            <LoadingSpinner size={32} />
          ) : errors.research ? (
            <ErrorMessage message={errors.research} />
          ) : (
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
                    <strong>Team:</strong> {project.team && Array.isArray(project.team) ? project.team.join(', ') : 'Not specified'}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    <strong>Results:</strong> {project.results}
                  </div>
                </div>
              ))}
            </div>
          )}
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
          
          {loading.team ? (
            <LoadingSpinner size={32} />
          ) : errors.team ? (
            <ErrorMessage message={errors.team} />
          ) : (
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
          )}
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
          
          {loading.resources ? (
            <LoadingSpinner size={32} />
          ) : errors.resources ? (
            <ErrorMessage message={errors.resources} />
          ) : (
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
                  <button 
                    className="btn-primary" 
                    style={{ width: '100%' }}
                    onClick={() => handleResourceDownload(resource)}
                  >
                    <Download size={16} style={{ marginRight: '8px' }} />
                    Download
                  </button>
                </div>
              ))}
            </div>
          )}
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
          
          {loading.partners ? (
            <LoadingSpinner size={32} />
          ) : errors.partners ? (
            <ErrorMessage message={errors.partners} />
          ) : (
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
          )}
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
          
          {loading.donations ? (
            <LoadingSpinner size={32} />
          ) : errors.donations ? (
            <ErrorMessage message={errors.donations} />
          ) : (
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
                    {tier.benefits && Array.isArray(tier.benefits) ? tier.benefits.map((benefit, index) => (
                      <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ width: '6px', height: '6px', background: 'var(--brand-green)', borderRadius: '50%', marginRight: '8px' }}></div>
                        {benefit}
                      </li>
                    )) : <li>No benefits listed</li>}
                  </ul>
                  <button 
                    className="btn-primary" 
                    style={{ width: '100%' }}
                    onClick={() => handleDonation(tier)}
                    disabled={formSubmitting}
                  >
                    {formSubmitting ? <Loader size={16} className="animate-spin" /> : `Choose ${tier.name}`}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Job Openings Section */}
      <section id="join" className="section-padding" style={{ background: 'var(--bg-card)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="heading-1">Join Our Team</h2>
            <p className="body-lg" style={{ marginTop: '16px' }}>
              Explore career opportunities and become part of our mission to provide objective conflict analysis.
            </p>
          </div>
          
          {loading.jobs ? (
            <LoadingSpinner size={32} />
          ) : errors.jobs ? (
            <ErrorMessage message={errors.jobs} />
          ) : (
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
                      {job.requirements && Array.isArray(job.requirements) ? job.requirements.slice(0, 2).map((req, index) => (
                        <li key={index}>{req}</li>
                      )) : <li>No requirements listed</li>}
                    </ul>
                  </div>
                  <button 
                    className="btn-primary" 
                    style={{ width: '100%' }}
                    onClick={() => setApplicationForm({ ...applicationForm, jobId: job.id })}
                    disabled={formSubmitting}
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}
          
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
                    disabled={formSubmitting}
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
                    disabled={formSubmitting}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={applicationForm.phone}
                    onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                    disabled={formSubmitting}
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
                    disabled={formSubmitting}
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
                    disabled={formSubmitting}
                  />
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={formSubmitting}>
                    {formSubmitting ? <Loader size={16} className="animate-spin" /> : <Send size={16} style={{ marginRight: '8px' }} />}
                    {formSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setApplicationForm({ jobId: '', name: '', email: '', phone: '', experience: '', coverLetter: '' })}
                    style={{ flex: 1 }}
                    disabled={formSubmitting}
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
          
          {loading.faq ? (
            <LoadingSpinner size={32} />
          ) : errors.faq ? (
            <ErrorMessage message={errors.faq} />
          ) : (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {faqData.map((faq, index) => (
                <div key={faq.id} className="design-card" style={{ marginBottom: '16px' }}>
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
          )}
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
                  disabled={formSubmitting}
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
                  disabled={formSubmitting}
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
                disabled={formSubmitting}
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
                disabled={formSubmitting}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={formSubmitting}>
              {formSubmitting ? <Loader size={16} className="animate-spin" /> : <Send size={16} style={{ marginRight: '8px' }} />}
              {formSubmitting ? 'Sending...' : 'Send Message'}
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
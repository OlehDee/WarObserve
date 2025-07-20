import React from 'react';
import { X, Calendar, User, Tag, ExternalLink, Users, Target, Send, Loader, Briefcase } from 'lucide-react';

const Modal = ({ isOpen, onClose, type, data, onSubmit, formData, setFormData, formSubmitting }) => {
  if (!isOpen || !data) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderJobApplicationContent = () => (
    <div className="modal-content">
      <div className="modal-header">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            background: 'var(--brand-green)', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '16px'
          }}>
            <Briefcase size={24} style={{ color: 'white' }} />
          </div>
          <div>
            <h1 className="modal-title" style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px', color: 'var(--text-primary)' }}>
              {data.title}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              {data.location} • {data.type}
            </p>
          </div>
        </div>
        
        <div className="job-details" style={{ 
          background: 'var(--bg-subtle)', 
          padding: '16px', 
          borderRadius: '8px', 
          marginBottom: '24px' 
        }}>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            {data.description}
          </p>
          {data.salary && (
            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              <strong>Зарплата:</strong> {data.salary}
            </div>
          )}
        </div>
      </div>
      
      <div className="modal-body">
        <form onSubmit={onSubmit} style={{ width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>
                Name *
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--border-light)',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
                required
                disabled={formSubmitting}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>
                Email *
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--border-light)',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
                required
                disabled={formSubmitting}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                fontSize: '14px'
              }}
              disabled={formSubmitting}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>
              Work Experience *
            </label>
            <textarea
              value={formData.experience || ''}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="Tell us about your relevant experience..."
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                fontSize: '14px',
                minHeight: '80px',
                resize: 'vertical'
              }}
              required
              disabled={formSubmitting}
            />
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>
              Cover Letter *
            </label>
            <textarea
              value={formData.coverLetter || ''}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              placeholder="Why are you interested in this position?..."
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                fontSize: '14px',
                minHeight: '120px',
                resize: 'vertical'
              }}
              required
              disabled={formSubmitting}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              disabled={formSubmitting}
              style={{
                flex: 1,
                background: 'var(--brand-green)',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: formSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: formSubmitting ? 0.7 : 1
              }}
            >
              {formSubmitting ? (
                <Loader size={16} className="animate-spin" style={{ marginRight: '8px' }} />
              ) : (
                <Send size={16} style={{ marginRight: '8px' }} />
              )}
              {formSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'var(--bg-subtle)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-light)',
                padding: '12px 20px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderNewsContent = () => (
    <div className="modal-content">
      <div className="modal-header">
        <img 
          src={data.imageUrl} 
          alt={data.title}
          className="modal-image"
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
        />
        <div className="modal-meta" style={{ display: 'flex', gap: '16px', margin: '16px 0', fontSize: '14px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={16} />
            {new Date(data.publishedDate).toLocaleDateString('uk-UA')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <User size={16} />
            {data.author}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Tag size={16} />
            {data.category}
          </div>
        </div>
        <h1 className="modal-title" style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
          {data.title}
        </h1>
        <p className="modal-excerpt" style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '24px', fontWeight: '500' }}>
          {data.excerpt}
        </p>
      </div>
      
      <div className="modal-body">
        <div className="modal-text" style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
          {data.content}
        </div>
        
        {data.tags && data.tags.length > 0 && (
          <div className="modal-tags" style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border-light)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>Теги:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {data.tags.map((tag, index) => (
                <span 
                  key={index}
                  style={{ 
                    background: 'var(--bg-subtle)', 
                    color: 'var(--text-primary)',
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderProjectContent = () => (
    <div className="modal-content">
      <div className="modal-header">
        <div className="project-status" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span 
            className={`status-badge ${data.status?.toLowerCase()}`}
            style={{ 
              padding: '6px 12px', 
              borderRadius: '20px', 
              fontSize: '12px', 
              fontWeight: '600',
              background: data.status === 'Completed' ? '#dcfce7' : '#fef3c7',
              color: data.status === 'Completed' ? '#166534' : '#a16207'
            }}
          >
            {data.status === 'Completed' ? '✅ Завершено' : '🔄 В процесі'}
          </span>
          {data.category && (
            <span style={{ 
              background: 'var(--brand-green)', 
              color: 'white', 
              padding: '4px 8px', 
              borderRadius: '4px', 
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {data.category}
            </span>
          )}
        </div>
        
        <h1 className="modal-title" style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
          {data.title}
        </h1>
        
        <div className="project-dates" style={{ display: 'flex', gap: '24px', margin: '16px 0', fontSize: '14px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={16} />
            Початок: {new Date(data.startDate).toLocaleDateString('uk-UA')}
          </div>
          {data.endDate && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Target size={16} />
              Завершення: {new Date(data.endDate).toLocaleDateString('uk-UA')}
            </div>
          )}
        </div>
      </div>
      
      <div className="modal-body">
        <div className="project-description" style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          {data.description}
        </div>
        
        {data.team && data.team.length > 0 && (
          <div className="project-team" style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>
              <Users size={18} />
              Команда проекту:
            </h4>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              {data.team.join(', ')}
            </div>
          </div>
        )}
        
        {data.results && (
          <div className="project-results" style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>
              📊 Результати:
            </h4>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {data.results}
            </div>
          </div>
        )}
        
        {data.technologies && data.technologies.length > 0 && (
          <div className="project-technologies" style={{ paddingTop: '24px', borderTop: '1px solid var(--border-light)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>Методології та технології:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {data.technologies.map((tech, index) => (
                <span 
                  key={index}
                  style={{ 
                    background: 'var(--brand-green)', 
                    color: 'white',
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="modal-container" style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '12px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative'
      }}>
        <button 
          className="modal-close"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1001,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
        >
          <X size={18} />
        </button>
        
        <div className="modal-scroll" style={{
          padding: '24px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          {type === 'news' && renderNewsContent()}
          {type === 'project' && renderProjectContent()}
          {type === 'job-application' && renderJobApplicationContent()}
        </div>
      </div>
    </div>
  );
};

export default Modal;
import React from 'react';
import { X, Calendar, User, Tag, ExternalLink, Users, Target } from 'lucide-react';

const Modal = ({ isOpen, onClose, type, data }) => {
  if (!isOpen || !data) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
        </div>
      </div>
    </div>
  );
};

export default Modal;
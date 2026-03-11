import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Clock, ArrowRight } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <div className="card animate-fade-in">
      <img 
        src={course.image} 
        alt={course.title} 
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <div style={{ padding: '1.5rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '0.5rem',
          fontSize: '0.875rem'
        }}>
          <span style={{ 
            color: 'var(--primary)', 
            fontWeight: '600',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px'
          }}>
            {course.category}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>{course.level}</span>
        </div>
        
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{course.title}</h3>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '1.5rem',
          color: 'var(--text-muted)',
          fontSize: '0.875rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Star size={16} fill="var(--accent)" stroke="var(--accent)" />
            <span>{course.rating || 0}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Users size={16} />
            <span>{(course.students || 0).toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={16} />
            <span>{course.duration || 'N/A'}</span>
          </div>
        </div>

        <Link 
          to={`/course/${course.id}`} 
          className="btn-primary" 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '0.5rem',
            textDecoration: 'none'
          }}
        >
          View Course <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;

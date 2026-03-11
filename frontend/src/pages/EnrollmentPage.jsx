import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { useUser } from '../context/UserContext';
import { CheckCircle, ArrowLeft, ShieldCheck, CreditCard } from 'lucide-react';

const EnrollmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enrollInCourse, user } = useUser();
  const course = courses.find(c => c.id === parseInt(id));

  const [formData, setFormData] = useState({
    phone: '',
    background: 'Student',
    goal: ''
  });

  if (!course) return <div className="container">Course not found</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    enrollInCourse(course.id);
    navigate(`/learn/${course.id}`);
  };

  return (
    <div className="container" style={{ maxWidth: '900px', padding: '4rem 1.5rem' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          backgroundColor: 'transparent', 
          color: 'var(--text-muted)',
          marginBottom: '2rem'
        }}
      >
        <ArrowLeft size={18} /> Back to Course
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem' }}>
        <div>
          <h1 style={{ marginBottom: '1rem' }}>Complete Your Enrollment</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            You're just one step away from starting your journey in <strong>{course.title}</strong>.
          </p>

          <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Confirm Your Name</label>
              <input type="text" value={user?.name || ''} disabled style={{ backgroundColor: '#f8fafc' }} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone Number</label>
              <input 
                type="tel" 
                placeholder="+1 (555) 000-0000" 
                required 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Current Background</label>
              <select 
                value={formData.background}
                onChange={e => setFormData({...formData, background: e.target.value})}
              >
                <option>Student</option>
                <option>Professional</option>
                <option>Self-taught Learner</option>
                <option>Other</option>
              </select>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Learning Goal</label>
              <textarea 
                rows="4" 
                placeholder="What do you hope to achieve with this course?"
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  fontFamily: 'inherit'
                }}
                required
                value={formData.goal}
                onChange={e => setFormData({...formData, goal: e.target.value})}
              ></textarea>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              padding: '1rem', 
              backgroundColor: 'rgba(16, 185, 129, 0.05)', 
              borderRadius: 'var(--radius)',
              marginBottom: '2rem',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <ShieldCheck size={20} color="var(--secondary)" />
              <span style={{ fontSize: '0.875rem', color: '#065f46' }}>
                This course is free as part of your early access plan.
              </span>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem' }}>
              Confirm & Start Learning
            </button>
          </form>
        </div>

        <aside>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.25rem' }}>Course Summary</h3>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <img 
                src={course.image} 
                alt={course.title} 
                style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} 
              />
              <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{course.title}</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Status</span>
                <span style={{ color: 'var(--secondary)', fontWeight: '600' }}>Free Enrollment</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Items</span>
                <span>{course.modules.length} Modules</span>
              </div>
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '1.5rem' }} />
            
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              By clicking "Confirm & Start Learning", you agree to our Terms of Service and Privacy Policy.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EnrollmentPage;

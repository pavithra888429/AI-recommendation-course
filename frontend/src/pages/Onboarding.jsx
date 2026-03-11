import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Onboarding = () => {
  const [interests, setInterests] = useState([]);
  const [level, setLevel] = useState('Beginner');
  const { completeOnboarding } = useUser();
  const navigate = useNavigate();

  const categories = [
    'Full Stack', 'AI & Machine Learning', 'Data Science', 
    'Cybersecurity', 'Cloud Computing', 'Mobile Development'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const toggleInterest = (category) => {
    if (interests.includes(category)) {
      setInterests(interests.filter(i => i !== category));
    } else {
      setInterests([...interests, category]);
    }
  };

  const handleFinish = () => {
    completeOnboarding({ interests, level });
    navigate('/dashboard');
  };

  return (
    <div className="container" style={{ maxWidth: '800px', padding: '4rem 1.5rem' }}>
      <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Personalize your learning</h1>
        <p style={{ color: 'var(--text-muted)' }}>Help us recommend the best courses for your career goals.</p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>What are you interested in?</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '1rem' 
        }}>
          {categories.map(cat => (
            <div 
              key={cat}
              onClick={() => toggleInterest(cat)}
              style={{
                padding: '1rem',
                border: '2px solid',
                borderColor: interests.includes(cat) ? 'var(--primary)' : 'var(--border)',
                borderRadius: 'var(--radius)',
                cursor: 'pointer',
                textAlign: 'center',
                backgroundColor: interests.includes(cat) ? 'rgba(99, 102, 241, 0.05)' : 'white',
                transition: 'all 0.2s ease',
                fontWeight: '500'
              }}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>What's your experience level?</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {levels.map(l => (
            <div 
              key={l}
              onClick={() => setLevel(l)}
              style={{
                flex: 1,
                padding: '1rem',
                border: '2px solid',
                borderColor: level === l ? 'var(--primary)' : 'var(--border)',
                borderRadius: 'var(--radius)',
                cursor: 'pointer',
                textAlign: 'center',
                backgroundColor: level === l ? 'rgba(99, 102, 241, 0.05)' : 'white',
                transition: 'all 0.2s ease',
                fontWeight: '500'
              }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>

      <button 
        className="btn-primary" 
        style={{ width: '100%', padding: '1rem' }}
        onClick={handleFinish}
        disabled={interests.length === 0}
      >
        Continue to Dashboard
      </button>
    </div>
  );
};

export default Onboarding;

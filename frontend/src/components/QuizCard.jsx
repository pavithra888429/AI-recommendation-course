import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const QuizCard = ({ quiz, onComplete }) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected !== null) {
      setSubmitted(true);
      setTimeout(() => {
        onComplete(selected === quiz.answer);
      }, 1500);
    }
  };

  return (
    <div className="card" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h3 style={{ marginBottom: '1.5rem' }}>{quiz.question}</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {quiz.options.map((option, index) => {
          let styles = {
            padding: '1rem',
            border: '2px solid var(--border)',
            borderRadius: 'var(--radius)',
            cursor: submitted ? 'default' : 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'all 0.2s ease',
            backgroundColor: 'transparent'
          };

          if (selected === index) {
            styles.borderColor = 'var(--primary)';
            styles.backgroundColor = 'rgba(99, 102, 241, 0.05)';
          }

          if (submitted) {
            if (index === quiz.answer) {
              styles.borderColor = 'var(--secondary)';
              styles.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            } else if (selected === index) {
              styles.borderColor = '#ef4444';
              styles.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            }
          }

          return (
            <div 
              key={index} 
              style={styles}
              onClick={() => !submitted && setSelected(index)}
            >
              <span>{option}</span>
              {submitted && index === quiz.answer && <CheckCircle size={20} color="var(--secondary)" />}
              {submitted && selected === index && index !== quiz.answer && <XCircle size={20} color="#ef4444" />}
            </div>
          );
        })}
      </div>

      <button 
        className="btn-primary" 
        style={{ width: '100%', opacity: (selected === null || submitted) ? 0.5 : 1 }}
        disabled={selected === null || submitted}
        onClick={handleSubmit}
      >
        {submitted ? 'Checking...' : 'Submit Answer'}
      </button>
    </div>
  );
};

export default QuizCard;

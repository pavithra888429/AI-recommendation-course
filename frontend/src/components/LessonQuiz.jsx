import React, { useState } from 'react';
import { CheckCircle, XCircle, Trophy, RefreshCw, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LessonQuiz = ({ lessonId, courseId, quizzes, onBackToLesson, onComplete, onNextActivity, isCompleted, initialScore }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(initialScore || 0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [finished, setFinished] = useState(isCompleted || false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [passed, setPassed] = useState(isCompleted || false);

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
        <h3>No quiz available for this section.</h3>
        <button className="btn-primary" onClick={onBackToLesson} style={{ marginTop: '1rem' }}>
          Back to Lesson
        </button>
      </div>
    );
  }

  const quiz = quizzes[currentIdx];

  const handleSubmit = () => {
    if (selected !== null) {
      setSubmitted(true);
      const isCorrect = selected === quiz.answer;
      if (isCorrect) {
        setScore(score + 1);
      }
      setUserAnswers([...userAnswers, { questionIdx: currentIdx, selectedIdx: selected, isCorrect }]);
    }
  };

  const handleNext = () => {
    if (currentIdx < quizzes.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      const isPassed = (score / quizzes.length) >= 0.8;
      setPassed(isPassed);
      setFinished(true);
      if (onComplete && isPassed) {
        onComplete(score);
      }
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
    setSubmitted(false);
    setFinished(false);
    setUserAnswers([]);
  };

  if (finished) {
    return (
      <div className="card animate-fade-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: passed ? 1.2 : 1, rotate: passed ? [0, -10, 10, -10, 10, 0] : 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: passed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)', 
              borderRadius: '50%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              margin: '0 auto 1rem',
              position: 'relative'
            }}
          >
            <Trophy size={32} color={passed ? 'var(--secondary)' : 'var(--primary)'} />
            {passed && [1,2,3,4,5,6].map(i => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1.5, 0],
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 200
                }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: Math.random() * 2 }}
                style={{
                  position: 'absolute',
                  width: '8px',
                   height: '8px',
                  backgroundColor: ['#f59e0b', '#10b981', '#6366f1'][i % 3],
                  borderRadius: '50%'
                }}
              />
            ))}
          </motion.div>
          <h2 style={{ marginBottom: '0.5rem' }}>{passed ? 'Quiz Passed!' : 'Quiz Not Passed'}</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
            Your score: <span style={{ fontWeight: 'bold', color: passed ? 'var(--secondary)' : '#ef4444' }}>{score} / {quizzes.length}</span>
          </p>
          {!passed && <p style={{ color: '#ef4444', marginBottom: '1.5rem', fontSize: '0.9rem' }}>You need 80% to pass and mark as completed.</p>}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ padding: '0.5rem 1.5rem' }} onClick={handleReset}>
              <RefreshCw size={18} style={{ marginRight: '0.5rem' }} /> Retry
            </button>
            {passed && onNextActivity && (
              <button className="btn-primary" style={{ padding: '0.5rem 1.5rem', backgroundColor: 'var(--secondary)' }} onClick={onNextActivity}>
                Next Activity <ChevronRight size={18} style={{ marginLeft: '0.5rem' }} />
              </button>
            )}
            <button 
              className="btn-primary" 
              style={{ padding: '0.5rem 1.5rem', backgroundColor: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border)' }}
              onClick={onBackToLesson}
            >
              Back to video
            </button>
          </div>
        </div>

        {(userAnswers.length > 0 || finished) && (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Review Questions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {quizzes.map((q, idx) => {
                const userAnswer = userAnswers.find(ua => ua.questionIdx === idx);
                const showMistake = userAnswer && !userAnswer.isCorrect;
                
                return (
                  <div key={idx} style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>{idx + 1}.</span>
                      <p style={{ margin: 0, fontWeight: '500' }}>{q.question}</p>
                      {userAnswer ? (
                        userAnswer.isCorrect ? (
                          <CheckCircle size={18} color="var(--secondary)" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                        ) : (
                          <XCircle size={18} color="#ef4444" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                        )
                      ) : (
                        <CheckCircle size={18} color="var(--secondary)" style={{ marginLeft: 'auto', flexShrink: 0, opacity: 0.5 }} />
                      )}
                    </div>
                    <div style={{ paddingLeft: '2rem', fontSize: '0.9rem' }}>
                      {userAnswer && (
                        <p style={{ margin: '0.25rem 0', color: userAnswer.isCorrect ? 'var(--secondary)' : '#ef4444' }}>
                          Your answer: {q.options[userAnswer.selectedIdx]}
                        </p>
                      )}
                      {(showMistake || !userAnswer) && (
                        <p style={{ margin: '0.25rem 0', color: 'var(--secondary)', fontWeight: '500' }}>
                          Correct answer: {q.options[q.answer]}
                        </p>
                      )}
                      {q.explanation && (
                        <p style={{ margin: '0.75rem 0 0', padding: '0.75rem', backgroundColor: 'white', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', borderLeft: '3px solid var(--primary)' }}>
                          <strong>Explanation:</strong> {q.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h4 style={{ margin: 0, color: 'var(--text-muted)' }}>Question {currentIdx + 1} of {quizzes.length}</h4>
        <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--primary)' }}>Score: {score}</span>
      </div>
      
      <h3 style={{ marginBottom: '2rem' }}>{quiz.question}</h3>
      
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

      {!submitted ? (
        <button 
          className="btn-primary" 
          style={{ width: '100%', opacity: selected === null ? 0.5 : 1 }}
          disabled={selected === null}
          onClick={handleSubmit}
        >
          Submit Answer
        </button>
      ) : (
        <button 
          className="btn-primary" 
          style={{ width: '100%' }}
          onClick={handleNext}
        >
          {currentIdx < quizzes.length - 1 ? 'Next Question' : 'Show Results'}
        </button>
      )}
    </div>
  );
};

export default LessonQuiz;

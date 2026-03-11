import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import QuizCard from '../components/QuizCard';
import { Trophy, ArrowLeft, ArrowRight } from 'lucide-react';

const API_URL = 'https://course-platform-api-mjpn.onrender.com/api';

const QuizPage = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const { completeModule } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API_URL}/courses/${courseId}`);
        if (res.ok) {
          const data = await res.json();
          setCourse(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading quiz...</div>;

  const module = course?.modules.find(m => m.id === moduleId);

  if (!course || !module) return <div>Quiz not found</div>;

  const handleQuizComplete = (isCorrect) => {
    setFinished(true);
    setPassed(isCorrect);
    if (isCorrect) {
      completeModule(course.id, module.id);
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {!finished ? (
        <>
          <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ marginBottom: '0.5rem' }}>Module Quiz</h1>
            <p style={{ color: 'var(--text-muted)' }}>Complete this quiz to unlock the next module of {course.title}.</p>
          </header>
          
          <QuizCard quiz={module.quiz} onComplete={handleQuizComplete} />
        </>
      ) : (
        <div className="card animate-fade-in" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ marginBottom: '2rem' }}>
            {passed ? (
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                borderRadius: '50%', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                margin: '0 auto'
              }}>
                <Trophy size={48} color="var(--secondary)" />
              </div>
            ) : (
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                borderRadius: '50%', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                margin: '0 auto'
              }}>
                <ArrowLeft size={48} color="#ef4444" />
              </div>
            )}
          </div>
          
          <h2 style={{ marginBottom: '1rem' }}>{passed ? 'Awesome Job!' : 'Keep Practicing'}</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            {passed 
              ? `You've successfully completed the quiz for ${module.title}.` 
              : "Don't worry! You can retake the quiz after reviewing the module material."}
          </p>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className="btn-primary" 
              style={{ flex: 1, backgroundColor: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border)' }}
              onClick={() => navigate(`/learn/${course.id}`)}
            >
              Back to Course
            </button>
            {passed && (
              <button 
                className="btn-primary" 
                style={{ flex: 1 }}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </button>
            )}
            {!passed && (
              <button 
                className="btn-primary" 
                style={{ flex: 1 }}
                onClick={() => setFinished(false)}
              >
                Retry Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;

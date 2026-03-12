import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import ProgressBar from '../components/ProgressBar';
import { Trophy, CheckCircle, Book } from 'lucide-react';

const API_URL = 'https://course-platform-api-mjpn.onrender.com/api';

const ProgressPage = () => {
  const { progress, loading: userLoading } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/courses`);
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const enrolledCourses = courses.filter(course => progress[course.id]);

  if (loading || userLoading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading your progress...</div>;

  return (
    <div className="container">
      <header style={{ marginBottom: '3rem' }}>
        <h1>Your Learning Progress</h1>
        <p style={{ color: 'var(--text-muted)' }}>Track your achievements and ongoing courses.</p>
      </header>

      {enrolledCourses.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {enrolledCourses.map(course => {
            const courseProgress = progress[course.id] || { completedLessons: [], completedQuizzes: [], completedModules: [] };
            
            const allItems = [];
            if (course.modules) {
              course.modules.forEach((mod) => {
                if (mod.lessons) {
                  mod.lessons.forEach((les) => {
                    allItems.push({ type: 'video', id: les.id });
                    if (les.quizzes && les.quizzes.length > 0) allItems.push({ type: 'quiz', id: les.id });
                  });
                }
                if (mod.quiz) allItems.push({ type: 'module-quiz', mId: mod.id });
              });
            }

            const isCompletedItem = (item) => {
              if (item.type === 'video') return courseProgress.completedLessons?.includes(item.id);
              if (item.type === 'quiz') return courseProgress.completedQuizzes?.includes(item.id);
              if (item.type === 'module-quiz') return courseProgress.completedModules?.includes(item.mId);
              return false;
            };

            const completedCount = allItems.filter(isCompletedItem).length;
            const totalCount = allItems.length;
            const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
            const isCourseCompleted = courseProgress.isCompleted || percentage === 100;

            const totalModules = course.modules?.length || 0;

            return (
              <div key={course.id} className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                  <img src={course.image} alt={course.title} style={{ width: '100%', borderRadius: 'var(--radius)' }} />
                  <div>
                    <h2 style={{ marginBottom: '1rem' }}>{course.title}</h2>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <ProgressBar progress={percentage} />
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                      <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius)' }}>
                        <Book size={20} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
                        <div style={{ fontWeight: 'bold' }}>{totalCount}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Activities</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius)' }}>
                        <CheckCircle size={20} color="var(--secondary)" style={{ marginBottom: '0.5rem' }} />
                        <div style={{ fontWeight: 'bold' }}>{completedCount}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Completed</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius)' }}>
                        <Trophy size={20} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
                        <div style={{ fontWeight: 'bold' }}>{courseProgress.completedModules?.length || 0} / {totalModules}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Modules Done</div>
                      </div>
                    </div>

                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-start' }}>
                      {isCourseCompleted ? (
                        <a 
                          href={`/certificate/${course.id}`} 
                          className="btn-primary" 
                          style={{ 
                            textDecoration: 'none', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem',
                            backgroundColor: 'var(--secondary)'
                          }}
                        >
                          <Trophy size={18} /> Claim Certificate
                        </a>
                      ) : (
                        <a 
                          href={`/learn/${course.id}`} 
                          className="btn-primary" 
                          style={{ 
                            textDecoration: 'none', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem'
                          }}
                        >
                          Continue Learning
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
          <h2>No progress yet.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Start your learning journey today by browsing our courses.</p>
          <a href="/courses" className="btn-primary" style={{ textDecoration: 'none' }}>Browse Courses</a>
        </div>
      )}
    </div>
  );
};

export default ProgressPage;

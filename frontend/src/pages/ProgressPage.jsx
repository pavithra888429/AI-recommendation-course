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
            const courseProgress = progress[course.id];
            const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
            const completedLessons = courseProgress.completedLessons?.length || 0;
            const percentage = (completedLessons / totalLessons) * 100;

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
                        <div style={{ fontWeight: 'bold' }}>{totalLessons}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Lessons</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius)' }}>
                        <CheckCircle size={20} color="var(--secondary)" style={{ marginBottom: '0.5rem' }} />
                        <div style={{ fontWeight: 'bold' }}>{completedLessons}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Completed</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius)' }}>
                        <Trophy size={20} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
                        <div style={{ fontWeight: 'bold' }}>{courseProgress.completedModules?.length || 0}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Modules Done</div>
                      </div>
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

import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { getRecommendations } from '../services/recommendationService';
import CourseCard from '../components/CourseCard';
import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { Sparkles, Trophy, BookOpen, ArrowRight } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const Dashboard = () => {
  const { user, progress } = useUser();
  const [recommendations, setRecommendations] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recsRes, coursesRes] = await Promise.all([
          getRecommendations(user?.profile?.interests || [], user?.profile?.level || 'Beginner'),
          fetch(`${API_URL}/courses`)
        ]);
        
        setRecommendations(recsRes);
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          setCourses(coursesData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);

  const enrolledCourses = courses.filter(c => progress[c.id]);
  const activeCourses = enrolledCourses.filter(c => !progress[c.id].isCompleted);
  const completedCourses = enrolledCourses.filter(c => progress[c.id].isCompleted);

  if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading dashboard...</div>;

  return (
    <div className="container">
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Welcome back, {user?.name}! 👋</h1>
        <p style={{ color: 'var(--text-muted)' }}>Here's your learning progress and recommendations.</p>
      </header>

      {activeCourses.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <BookOpen size={24} color="var(--primary)" />
            <h2>Continue Learning</h2>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '2rem' 
          }}>
            {activeCourses.map(course => {
              const courseProgress = progress[course.id] || { completedLessons: [], completedQuizzes: [], completedModules: [] };
              
              const allItems = [];
              if (course.modules) {
                course.modules.forEach((mod, mIdx) => {
                  if (mod.lessons) {
                    mod.lessons.forEach((les, lIdx) => {
                      allItems.push({ type: 'video', id: les.id, mId: mod.id });
                      if (les.quizzes) allItems.push({ type: 'quiz', id: les.id, mId: mod.id });
                    });
                  }
                  if (mod.quiz) allItems.push({ type: 'module-quiz', mId: mod.id });
                });
              }

              const isCompleted = (item) => {
                if (item.type === 'video') return courseProgress.completedLessons?.includes(item.id);
                if (item.type === 'quiz') return courseProgress.completedQuizzes?.includes(item.id);
                if (item.type === 'module-quiz') return courseProgress.completedModules?.includes(item.mId);
                return false;
              };

              const completedItems = allItems.filter(isCompleted).length;
              const totalItems = allItems.length;
              const percent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

              return (
                <Link 
                  key={course.id} 
                  to={`/learn/${course.id}`}
                  className="card active-card" 
                  style={{ 
                    padding: '1.5rem', 
                    textDecoration: 'none', 
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} 
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0 }}>{course.title}</h4>
                      <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        {completedItems} / {totalItems} activities completed
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      <span style={{ fontWeight: '600' }}>Overall Progress</span>
                      <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{percent}%</span>
                    </div>
                    <ProgressBar progress={percent} />
                  </div>

                  <div style={{ 
                    marginTop: '0.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    color: 'var(--primary)', 
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    Resume Learning <ArrowRight size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section style={{ marginTop: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Sparkles size={24} color="var(--accent)" />
          <h2>Recommended for You</h2>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {recommendations.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {completedCourses.length > 0 && (
        <section style={{ marginTop: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Trophy size={24} color="#f59e0b" />
            <h2>Completed Courses</h2>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '2rem' 
          }}>
            {completedCourses.map(course => (
              <div 
                key={course.id} 
                className="card" 
                style={{ 
                  padding: '1.5rem', 
                  opacity: 0.8,
                  border: '1px solid #f59e0b',
                  backgroundColor: '#fffdfa'
                }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px', filter: 'grayscale(0.5)' }} 
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0 }}>{course.title}</h4>
                    <span style={{ 
                      display: 'inline-block', 
                      marginTop: '0.25rem', 
                      fontSize: '0.75rem', 
                      padding: '2px 8px', 
                      backgroundColor: '#fef3c7', 
                      color: '#92400e', 
                      borderRadius: '12px',
                      fontWeight: 'bold'
                    }}>
                      COMPLETED
                    </span>
                  </div>
                </div>
                <Link 
                  to={`/learn/${course.id}`} 
                  style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--primary)', 
                    textDecoration: 'none', 
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  Review Content <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Trophy size={24} color="var(--secondary)" />
          <h2>Weekly Goal</h2>
        </div>
        <div className="card glass" style={{ padding: '2rem', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>6 hours left to reach your goal</h3>
          <ProgressBar progress={40} height="12px" label={false} />
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>4 out of 10 hours completed this week. Keep going!</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

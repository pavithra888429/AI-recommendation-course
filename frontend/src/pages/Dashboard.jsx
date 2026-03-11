import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { getRecommendations } from '../services/recommendationService';
import CourseCard from '../components/CourseCard';
import ProgressBar from '../components/ProgressBar';
import { Sparkles, Trophy, BookOpen } from 'lucide-react';

const Dashboard = () => {
  const { user, progress } = useUser();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (user) {
      const recs = getRecommendations(user.interests || [], user.level || 'Beginner');
      setRecommendations(recs);
    }
  }, [user]);

  const activeCourseIds = Object.keys(progress);

  return (
    <div className="container">
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Welcome back, {user?.name}! 👋</h1>
        <p style={{ color: 'var(--text-muted)' }}>Here's your learning progress and recommendations.</p>
      </header>

      {activeCourseIds.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <BookOpen size={24} color="var(--primary)" />
            <h2>Continue Learning</h2>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
             {/* Simplified display for active courses */}
             <div className="card" style={{ padding: '1.5rem' }}>
               <h3 style={{ marginBottom: '1rem' }}>In Progress</h3>
               <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                 You are currently enrolled in {activeCourseIds.length} course(s).
               </p>
               <ProgressBar progress={65} />
             </div>
          </div>
        </section>
      )}

      <section>
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

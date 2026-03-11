import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { useUser } from '../context/UserContext';
import { Play, CheckSquare, ChevronRight, ChevronLeft, Menu, X } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';

const LearningPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { progress, updateProgress, isEnrolled } = useUser();
  const course = courses.find(c => c.id === parseInt(id));
  
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  React.useEffect(() => {
    if (course && !isEnrolled(course.id)) {
      navigate(`/enroll/${course.id}`);
    }
  }, [course, isEnrolled, navigate]);

  if (!course) return <div>Course not found</div>;
  if (!isEnrolled(course.id)) return <div>Redirecting to enrollment...</div>;

  const activeModule = course.modules[activeModuleIdx];
  const activeLesson = activeModule.lessons[activeLessonIdx];

  const handleLessonComplete = () => {
    updateProgress(course.id, activeModule.id, activeLesson.id);
    
    // Auto next lesson or quiz
    if (activeLessonIdx < activeModule.lessons.length - 1) {
      setActiveLessonIdx(activeLessonIdx + 1);
    } else {
      navigate(`/quiz/${course.id}/${activeModule.id}`);
    }
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 80px)', overflow: 'hidden' }}>
      {/* Sidebar Navigation */}
      <div style={{ 
        width: sidebarOpen ? '350px' : '0', 
        borderRight: '1px solid var(--border)',
        overflowY: 'auto',
        transition: 'width 0.3s ease',
        backgroundColor: 'white',
        position: 'relative'
      }}>
        <div style={{ padding: '1.5rem', visibility: sidebarOpen ? 'visible' : 'hidden' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Course Content</h3>
          {course.modules.map((module, mIdx) => (
            <div key={module.id} style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                Module {mIdx + 1}: {module.title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {module.lessons.map((lesson, lIdx) => {
                  const isCompleted = progress[course.id]?.completedLessons?.includes(lesson.id);
                  const isActive = activeModuleIdx === mIdx && activeLessonIdx === lIdx;
                  
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setActiveModuleIdx(mIdx);
                        setActiveLessonIdx(lIdx);
                      }}
                      style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        backgroundColor: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                        color: isActive ? 'var(--primary)' : 'var(--text-main)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      {isCompleted ? <CheckSquare size={16} color="var(--secondary)" /> : <Play size={16} />}
                      <span style={{ fontWeight: isActive ? 'bold' : 'normal' }}>{lesson.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f1f5f9' }}>
        <div style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', backgroundColor: 'white', borderBottom: '1px solid var(--border)' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ backgroundColor: 'transparent', padding: '0.5rem' }}>
            {sidebarOpen ? <Menu size={20} /> : <Menu size={20} />}
          </button>
          <div style={{ marginLeft: '1rem', flex: 1 }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{course.title} / {activeModule.title}</span>
            <h4 style={{ margin: 0 }}>{activeLesson.title}</h4>
          </div>
        </div>

        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Video Placeholder */}
            <div style={{ 
              width: '100%', 
              aspectRatio: '16/9', 
              backgroundColor: 'black', 
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 'var(--shadow-lg)',
              marginBottom: '2rem'
            }}>
              <Play size={64} color="white" />
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>Lesson Summary</h2>
                <button 
                  className="btn-primary" 
                  onClick={handleLessonComplete}
                  style={{ backgroundColor: 'var(--secondary)' }}
                >
                  Mark as Completed
                </button>
              </div>
              <p style={{ color: 'var(--text-muted)' }}>
                In this lesson, you will learn about the core concepts of {activeLesson.title}. We'll cover the fundamental principles and explore real-world applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;

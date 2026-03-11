import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Play, CheckSquare, ChevronRight, ChevronLeft, Menu, X, BookOpen, HelpCircle, Trophy, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from '../components/ProgressBar';
import LessonQuiz from '../components/LessonQuiz';

const API_URL = 'https://course-platform-api-mjpn.onrender.com/api';

const LearningPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { progress, updateProgress, completeModule, isEnrolled, loading: userLoading } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState('video'); // 'video', 'quiz', or 'module-quiz'

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API_URL}/courses/${id}`);
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
  }, [id]);

  useEffect(() => {
    if (!loading && !userLoading) {
      if (course && !isEnrolled(course.id)) {
        navigate(`/enroll/${course.id}`);
      }
    }
  }, [course, isEnrolled, navigate, loading, userLoading]);

  if (loading || userLoading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading content...</div>;
  if (!course) return <div style={{ padding: '2rem', textAlign: 'center' }}>Course not found</div>;
  if (!isEnrolled(course.id)) return <div style={{ padding: '2rem', textAlign: 'center' }}>Redirecting to enrollment...</div>;

  const activeModule = course.modules[activeModuleIdx];
  const activeLesson = activeModule.lessons[activeLessonIdx];

  // Flatten course items for locking logic and navigation
  const allItems = [];
  course.modules.forEach((mod, mIdx) => {
    mod.lessons.forEach((les, lIdx) => {
      allItems.push({ type: 'video', mIdx, lIdx, id: les.id, modId: mod.id });
      if (les.quizzes) {
        allItems.push({ type: 'quiz', mIdx, lIdx, id: les.id, modId: mod.id });
      }
    });
    if (mod.quiz) {
       allItems.push({ type: 'module-quiz', mIdx, mId: mod.id });
    }
  });

  const courseProgress = progress[course.id] || { completedLessons: [], completedQuizzes: [], completedModules: [] };
  
  const isItemCompleted = (item) => {
    if (item.type === 'video') return courseProgress.completedLessons?.includes(item.id);
    if (item.type === 'quiz') return courseProgress.completedQuizzes?.includes(item.id);
    if (item.type === 'module-quiz') return courseProgress.completedModules?.includes(item.mId);
    return false;
  };

  const isItemLocked = (itemIndex) => {
    if (itemIndex === 0) return false;
    const item = allItems[itemIndex];
    if (isItemCompleted(item)) return false; // Already completed items are never locked
    return !isItemCompleted(allItems[itemIndex - 1]);
  };

  const handleNextActivity = () => {
    const currentItemIdx = allItems.findIndex(item => {
      if (viewMode === 'video') return item.type === 'video' && item.mIdx === activeModuleIdx && item.lIdx === activeLessonIdx;
      if (viewMode === 'quiz') return item.type === 'quiz' && item.mIdx === activeModuleIdx && item.lIdx === activeLessonIdx;
      if (viewMode === 'module-quiz') return item.type === 'module-quiz' && item.mIdx === activeModuleIdx;
      return false;
    });

    if (currentItemIdx < allItems.length - 1) {
      const nextItem = allItems[currentItemIdx + 1];
      setActiveModuleIdx(nextItem.mIdx);
      if (nextItem.type !== 'module-quiz') {
        setActiveLessonIdx(nextItem.lIdx);
      }
      setViewMode(nextItem.type);
    }
  };

  const handleLessonComplete = () => {
    updateProgress(course.id, activeModule.id, activeLesson.id);
    handleNextActivity();
  };

  const completionPercentage = Math.round((allItems.filter(isItemCompleted).length / allItems.length) * 100);

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
          <div style={{ marginBottom: '2rem', padding: '1.25rem', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>YOUR PROGRESS</h4>
                <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--primary)' }}>{completionPercentage}%</span>
             </div>
             <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ height: '100%', backgroundColor: 'var(--primary)' }} 
                />
             </div>
          </div>
          <h3 style={{ marginBottom: '1.5rem' }}>Course Content</h3>
          {course.modules.map((module, mIdx) => (
            <div key={module.id} style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                Module {mIdx + 1}: {module.title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {module.lessons.map((lesson, lIdx) => {
                  const lessonItemIndex = allItems.findIndex(item => item.type === 'video' && item.mIdx === mIdx && item.lIdx === lIdx);
                  const quizItemIndex = allItems.findIndex(item => item.type === 'quiz' && item.mIdx === mIdx && item.lIdx === lIdx);
                  
                  const videoLocked = isItemLocked(lessonItemIndex);
                  const quizLocked = quizItemIndex !== -1 && isItemLocked(quizItemIndex);
                  
                  const isLessonCompleted = courseProgress.completedLessons?.includes(lesson.id);
                  const isLessonActive = activeModuleIdx === mIdx && activeLessonIdx === lIdx && viewMode === 'video';
                  
                  return (
                    <div key={lesson.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <button
                        onClick={() => !videoLocked && (setActiveModuleIdx(mIdx), setActiveLessonIdx(lIdx), setViewMode('video'))}
                        style={{
                          padding: '0.75rem',
                          textAlign: 'left',
                          backgroundColor: isLessonActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                          color: videoLocked ? 'var(--text-muted)' : (isLessonActive ? 'var(--primary)' : 'var(--text-main)'),
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          fontSize: '0.875rem',
                          border: 'none',
                          cursor: videoLocked ? 'not-allowed' : 'pointer',
                          width: '100%',
                          borderRadius: '8px',
                          opacity: videoLocked ? 0.6 : 1
                        }}
                      >
                        {videoLocked ? <Lock size={16} /> : (isLessonCompleted ? <CheckSquare size={16} color="var(--secondary)" /> : <Play size={16} />)}
                        <span style={{ fontWeight: isLessonActive ? 'bold' : 'normal' }}>{lesson.title}</span>
                      </button>
                      
                      {lesson.quizzes && (
                        <button
                          onClick={() => !quizLocked && (setActiveModuleIdx(mIdx), setActiveLessonIdx(lIdx), setViewMode('quiz'))}
                          style={{
                            padding: '0.5rem 0.75rem 0.5rem 2.5rem',
                            textAlign: 'left',
                            backgroundColor: activeModuleIdx === mIdx && activeLessonIdx === lIdx && viewMode === 'quiz' ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                            color: quizLocked ? 'var(--text-muted)' : (activeModuleIdx === mIdx && activeLessonIdx === lIdx && viewMode === 'quiz' ? 'var(--primary)' : 'var(--text-muted)'),
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.8rem',
                            border: 'none',
                            cursor: quizLocked ? 'not-allowed' : 'pointer',
                            width: '100%',
                            borderRadius: '8px',
                            opacity: quizLocked ? 0.6 : 1
                          }}
                        >
                          {quizLocked ? <Lock size={14} /> : <HelpCircle size={14} />}
                          <span style={{ flex: 1 }}>Lesson Quiz</span>
                          {courseProgress.completedQuizzes?.includes(lesson.id) && (
                            <span style={{ 
                              fontSize: '0.7rem', 
                              fontWeight: 'bold', 
                              color: 'var(--secondary)',
                              backgroundColor: 'rgba(16, 185, 129, 0.1)',
                              padding: '1px 5px',
                              borderRadius: '4px'
                            }}>
                              {courseProgress.quizScores?.[lesson.id] || 0} pts
                            </span>
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}

                {module.quiz && (() => {
                  const mQuizIndex = allItems.findIndex(item => item.type === 'module-quiz' && item.mIdx === mIdx);
                  const mQuizLocked = isItemLocked(mQuizIndex);
                  const isMQuizCompleted = courseProgress.completedModules?.includes(module.id);
                  
                  return (
                    <button
                      onClick={() => !mQuizLocked && (setActiveModuleIdx(mIdx), setViewMode('module-quiz'))}
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.75rem',
                        textAlign: 'left',
                        backgroundColor: activeModuleIdx === mIdx && viewMode === 'module-quiz' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                        color: mQuizLocked ? 'var(--text-muted)' : (activeModuleIdx === mIdx && viewMode === 'module-quiz' ? 'var(--primary)' : 'var(--text-main)'),
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.875rem',
                        border: '1px dashed var(--border)',
                        cursor: mQuizLocked ? 'not-allowed' : 'pointer',
                        width: '100%',
                        borderRadius: '8px',
                        opacity: mQuizLocked ? 0.6 : 1
                      }}
                    >
                      {mQuizLocked ? <Lock size={16} /> : <Trophy size={16} />}
                      <span style={{ flex: 1, fontWeight: viewMode === 'module-quiz' ? 'bold' : 'normal' }}>Module Quiz</span>
                      {isMQuizCompleted && (
                        <span style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: 'bold', 
                          color: 'var(--secondary)',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          {courseProgress.quizScores?.[`module-${module.id}`] || 0} pts
                        </span>
                      )}
                    </button>
                    );
                  })()}
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
          
          <div style={{ display: 'flex', backgroundColor: '#f1f5f9', borderRadius: '8px', padding: '4px' }}>
            <button 
              onClick={() => setViewMode('video')}
              style={{ 
                padding: '0.5rem 1rem', 
                borderRadius: '6px', 
                border: 'none',
                backgroundColor: viewMode === 'video' ? 'white' : 'transparent',
                boxShadow: viewMode === 'video' ? 'var(--shadow-sm)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                color: viewMode === 'video' ? 'var(--primary)' : 'var(--text-muted)'
              }}
            >
              <Play size={16} /> Video
            </button>
            <button 
              onClick={() => setViewMode('quiz')}
              style={{ 
                padding: '0.5rem 1rem', 
                borderRadius: '6px', 
                border: 'none',
                backgroundColor: viewMode === 'quiz' ? 'white' : 'transparent',
                boxShadow: viewMode === 'quiz' ? 'var(--shadow-sm)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                color: viewMode === 'quiz' ? 'var(--primary)' : 'var(--text-muted)'
              }}
            >
              <HelpCircle size={16} /> Quiz
            </button>
          </div>
        </div>

        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {viewMode === 'video' ? (
              <motion.div 
                key={`${activeLesson.id}-video`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Content Area: Video or Text */}
                {activeLesson.videoUrl ? (
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
                ) : activeLesson.content ? (
                  <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem', borderLeft: '4px solid var(--primary)' }}>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                      {activeLesson.content}
                    </div>
                    {activeLesson.example && (
                      <div style={{ 
                        marginTop: '2rem', 
                        padding: '1.5rem', 
                        backgroundColor: '#1e293b', 
                        borderRadius: '8px',
                        color: '#f8fafc',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                        overflowX: 'auto'
                      }}>
                        <div style={{ borderBottom: '1px solid #334155', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                          Example / Code Snippet
                        </div>
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{activeLesson.example}</pre>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ 
                    width: '100%', 
                    aspectRatio: '16/9', 
                    backgroundColor: '#1e293b', 
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: 'var(--shadow-lg)',
                    marginBottom: '2rem'
                  }}>
                    <div style={{ textAlign: 'center', color: 'white' }}>
                      <BookOpen size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                      <p>No video or content available for this lesson.</p>
                    </div>
                  </div>
                )}

                <div className="card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2>{activeLesson.content ? 'Lesson Material' : 'Lesson Summary'}</h2>
                    <button 
                      className="btn-primary" 
                      onClick={handleLessonComplete}
                      style={{ backgroundColor: courseProgress.completedLessons?.includes(activeLesson.id) ? 'var(--secondary)' : 'var(--primary)' }}
                    >
                      {courseProgress.completedLessons?.includes(activeLesson.id) ? 'Completed' : 'Mark as Completed'}
                    </button>
                  </div>
                  <p style={{ color: 'var(--text-muted)' }}>
                    {activeLesson.content ? 'Please read the content above and mark it as completed to proceed to the quiz.' : `In this lesson, you will learn about the core concepts of ${activeLesson.title}. We'll cover the fundamental principles and explore real-world applications.`}
                  </p>
                </div>
              </motion.div>
            ) : viewMode === 'quiz' ? (
              <motion.div 
                key={`${activeLesson.id}-quiz`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <LessonQuiz 
                  key={`lesson-quiz-${activeLesson.id}`}
                  lessonId={activeLesson.id}
                  courseId={course.id}
                  quizzes={activeLesson.quizzes || []} 
                  isCompleted={courseProgress.completedQuizzes?.includes(activeLesson.id)}
                  initialScore={courseProgress.quizScores?.[activeLesson.id] || 0}
                  onBackToLesson={() => setViewMode('video')} 
                  onComplete={(score) => {
                    updateProgress(course.id, activeModule.id, activeLesson.id, true, score);
                  }}
                  onNextActivity={handleNextActivity}
                />
              </motion.div>
            ) : (
              <motion.div 
                key={`${activeModule.id}-module-quiz`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <LessonQuiz 
                  key={`module-quiz-${activeModule.id}`}
                  lessonId={`module-quiz-${activeModule.id}`}
                  courseId={course.id}
                  quizzes={activeModule.quiz ? [activeModule.quiz] : []} 
                  isCompleted={courseProgress.completedModules?.includes(activeModule.id)}
                  initialScore={courseProgress.quizScores?.[`module-${activeModule.id}`] || 0}
                  onBackToLesson={() => setViewMode('video')} 
                  onComplete={(score) => {
                    completeModule(course.id, activeModule.id, score);
                  }}
                  onNextActivity={handleNextActivity}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;

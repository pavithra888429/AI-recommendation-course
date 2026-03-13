import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const UserContext = createContext();
const API_URL = 'http://localhost:5000/api';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) { return null; }
  });

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async (authToken) => {
    try {
      const res = await fetch(`${API_URL}/progress`, {
        headers: { 'x-auth-token': authToken }
      });
      if (res.ok) {
        const data = await res.json();
        setProgress(data);
      }
    } catch (err) {
      console.error("Failed to fetch progress:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchProgress(token);
    } else {
      localStorage.removeItem('token');
      setProgress({});
      setLoading(false);
    }
  }, [token, fetchProgress]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      setUser(data.user);
      return { success: true, user: data.user };
    }
    return { success: false, message: data.message };
  };

  const register = async (name, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      setUser(data.user);
      return { success: true, user: data.user };
    }
    return { success: false, message: data.message };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setProgress({});
  };

  const completeOnboarding = async (profile) => {
    const res = await fetch(`${API_URL}/auth/onboarding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify({ profile })
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    }
  };

  const updateProgress = async (courseId, moduleId, lessonId, isQuiz = false, score = 0) => {
    // Optimistic update
    setProgress(prev => {
      const courseProgress = prev[courseId] || { completedLessons: [], completedQuizzes: [], completedModules: [], quizScores: {} };
      const newCourseProgress = {
        ...courseProgress,
        completedLessons: [...(courseProgress.completedLessons || [])],
        completedQuizzes: [...(courseProgress.completedQuizzes || [])],
        quizScores: { ...(courseProgress.quizScores || {}) }
      };

      if (isQuiz) {
        if (!newCourseProgress.completedQuizzes.includes(lessonId)) newCourseProgress.completedQuizzes.push(lessonId);
        if (score > (newCourseProgress.quizScores[lessonId] || 0)) newCourseProgress.quizScores[lessonId] = score;
      } else {
        if (!newCourseProgress.completedLessons.includes(lessonId)) newCourseProgress.completedLessons.push(lessonId);
      }
      return { ...prev, [courseId]: newCourseProgress };
    });

    // Server update
    try {
      const res = await fetch(`${API_URL}/progress/update`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ courseId, lessonId, isQuiz, score })
      });
      if (res.ok) {
        const data = await res.json();
        setProgress(prev => ({
          ...prev,
          [courseId]: {
            ...data,
            quizScores: Object.fromEntries(new Map(Object.entries(data.quizScores || {})))
          }
        }));
      }
    } catch (err) { console.error(err); }
  };

  const completeModule = async (courseId, moduleId, score = 0) => {
    // Optimistic update
    setProgress(prev => {
      const courseProgress = prev[courseId] || { completedModules: [], quizScores: {} };
      const newCourseProgress = {
        ...courseProgress,
        completedModules: [...(courseProgress.completedModules || [])],
        quizScores: { ...(courseProgress.quizScores || {}) }
      };
      if (!newCourseProgress.completedModules.includes(moduleId)) {
        newCourseProgress.completedModules.push(moduleId);
      }
      const scoreKey = `module-${moduleId}`;
      if (score > (newCourseProgress.quizScores[scoreKey] || 0)) {
        newCourseProgress.quizScores[scoreKey] = score;
      }
      return { ...prev, [courseId]: newCourseProgress };
    });

    try {
      const res = await fetch(`${API_URL}/progress/update`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ courseId, lessonId: moduleId, isModule: true, score })
      });
      if (res.ok) {
        const data = await res.json();
        setProgress(prev => ({
          ...prev,
          [courseId]: {
            ...data,
            quizScores: Object.fromEntries(new Map(Object.entries(data.quizScores || {})))
          }
        }));
      }
    } catch (err) { console.error(err); }
  };

  const enrollInCourse = async (courseId) => {
    try {
      const res = await fetch(`${API_URL}/progress/enroll`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ courseId })
      });
      if (res.ok) {
        await fetchProgress(token);
        return true;
      }
      return false;
    } catch (err) { 
      console.error(err); 
      return false;
    }
  };

  const isEnrolled = (courseId) => !!progress[courseId];

  return (
    <UserContext.Provider value={{ 
      user, progress, loading, login, register, logout, 
      completeOnboarding, updateProgress, completeModule, enrollInCourse, isEnrolled 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

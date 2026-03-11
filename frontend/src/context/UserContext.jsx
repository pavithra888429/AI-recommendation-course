import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("User parsing error:", e);
      return null;
    }
  });

  const [progress, setProgress] = useState(() => {
    try {
      const savedProgress = localStorage.getItem('progress');
      return savedProgress ? JSON.parse(savedProgress) : {};
    } catch (e) {
      console.error("Progress parsing error:", e);
      return {};
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  const login = (userData) => {
    setUser({ ...userData, onboardingComplete: false });
  };

  const register = (userData) => {
    setUser({ ...userData, onboardingComplete: false });
  };

  const logout = () => {
    setUser(null);
    setProgress({});
  };

  const completeOnboarding = (profileData) => {
    setUser(prev => ({ ...prev, ...profileData, onboardingComplete: true }));
  };

  const updateProgress = (courseId, moduleId, lessonId) => {
    setProgress(prev => {
      const courseProgress = prev[courseId] || { completedLessons: [], completedModules: [] };
      if (!courseProgress.completedLessons.includes(lessonId)) {
        courseProgress.completedLessons.push(lessonId);
      }
      return { ...prev, [courseId]: courseProgress };
    });
  };

  const completeModule = (courseId, moduleId) => {
    setProgress(prev => {
      const courseProgress = prev[courseId] || { completedLessons: [], completedModules: [] };
      if (!courseProgress.completedModules.includes(moduleId)) {
        courseProgress.completedModules.push(moduleId);
      }
      return { ...prev, [courseId]: courseProgress };
    });
  };

  const enrollInCourse = (courseId) => {
    setProgress(prev => {
      if (prev[courseId]) return prev; // Already enrolled
      return { 
        ...prev, 
        [courseId]: { 
          completedLessons: [], 
          completedModules: [],
          enrolledAt: new Date().toISOString()
        } 
      };
    });
  };

  const isEnrolled = (courseId) => {
    return !!progress[courseId];
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      progress, 
      login, 
      register, 
      logout, 
      completeOnboarding, 
      updateProgress,
      completeModule,
      enrollInCourse,
      isEnrolled
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import CourseList from './pages/CourseList';
import CourseDetails from './pages/CourseDetails';
import LearningPage from './pages/LearningPage';
import QuizPage from './pages/QuizPage';
import ProgressPage from './pages/ProgressPage';
import EnrollmentPage from './pages/EnrollmentPage';
import CertificatePage from './pages/CertificatePage';
import './styles/global.css';

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 80px)' }}>
            <Routes>
              <Route path="/" element={<CourseList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/courses" element={<CourseList />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              
              <Route path="/onboarding" element={
                <PrivateRoute><Onboarding /></PrivateRoute>
              } />
              <Route path="/dashboard" element={
                <PrivateRoute><Dashboard /></PrivateRoute>
              } />
              <Route path="/learn/:id" element={
                <PrivateRoute><LearningPage /></PrivateRoute>
              } />
              <Route path="/enroll/:id" element={
                <PrivateRoute><EnrollmentPage /></PrivateRoute>
              } />
              <Route path="/quiz/:courseId/:moduleId" element={
                <PrivateRoute><QuizPage /></PrivateRoute>
              } />
              <Route path="/progress" element={
                <PrivateRoute><ProgressPage /></PrivateRoute>
              } />
              <Route path="/certificate/:id" element={
                <PrivateRoute><CertificatePage /></PrivateRoute>
              } />
            </Routes>
          </main>
          
          <footer style={{ 
            backgroundColor: 'white', 
            padding: '4rem 0', 
            borderTop: '1px solid var(--border)',
            marginTop: '4rem'
          }}>
            <div className="container" style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '1rem' }}>EduAI</div>
              <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 2rem' }}>
                Empowering learners worldwide with AI-driven personalized course recommendations.
              </p>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                © 2026 EduAI Learning Platform. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

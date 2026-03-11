import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { BookOpen, User, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '1rem 0',
      marginBottom: '2rem'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          textDecoration: 'none',
          color: 'var(--primary)',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          <BookOpen size={32} />
          <span>EduAI</span>
        </Link>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {user ? (
            <>
              <Link to="/dashboard" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                color: 'var(--text-main)',
                fontWeight: '500'
              }}>
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
              <Link to="/courses" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                color: 'var(--text-main)',
                fontWeight: '500'
              }}>
                Courses
              </Link>
              <Link to="/progress" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                color: 'var(--text-main)',
                fontWeight: '500'
              }}>
                Progress
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontWeight: '500', color: 'var(--primary)' }}>{user.name}</span>
                <button 
                  onClick={handleLogout}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none', color: 'var(--text-main)' }}>Login</Link>
              <Link to="/register" className="btn-primary" style={{ textDecoration: 'none' }}>Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

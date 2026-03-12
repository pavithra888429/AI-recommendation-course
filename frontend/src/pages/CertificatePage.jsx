import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Award, ShieldCheck, Printer, ChevronLeft, Calendar, User, BookOpen } from 'lucide-react';

const API_URL = 'https://course-platform-api-mjpn.onrender.com/api';

const CertificatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, progress, loading: userLoading } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [certificateData, setCertificateData] = useState(null);
  const certificateRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/courses/${id}`);
        if (res.ok) {
          const data = await res.json();
          setCourse(data);
        } else {
          const errData = await res.json().catch(() => ({}));
          setError(errData.message || `Failed to fetch course: ${res.status}`);
          return;
        }

        const token = localStorage.getItem('token');
        if (token) {
          const certRes = await fetch(`${API_URL}/certificates/${id}`, {
            headers: { 'x-auth-token': token }
          });
          if (certRes.ok) {
            const certInfo = await certRes.json();
            setCertificateData(certInfo);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(`Network or connection error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading || userLoading) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', backgroundColor: '#f8fafc', minHeight: '80vh' }}>
        <h2 style={{ color: '#6366f1' }}>Loading Certificate...</h2>
        <p>Please wait while we prepare your achievement.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: '#ef4444' }}>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/progress')} className="btn-primary" style={{ marginTop: '1rem' }}>
          Back to Progress
        </button>
      </div>
    );
  }

  if (!course) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Course Not Found</h2>
        <p>We couldn't find any course with ID: {id}</p>
        <button onClick={() => navigate('/courses')} className="btn-primary" style={{ marginTop: '1rem' }}>
          Browse Courses
        </button>
      </div>
    );
  }

  const courseProgress = progress[course.id] || progress[course._id] || {};
  const totalLessons = course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
  const completedLessons = courseProgress.completedLessons?.length || 0;
  const isCompleted = totalLessons > 0 && completedLessons === totalLessons;

  /* 
  if (!isCompleted) {
    return (
      <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
        <Award size={64} color="var(--text-muted)" style={{ marginBottom: '2rem', opacity: 0.3 }} />
        <h2>Certificate Not Available</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          You need to complete all lessons in "{course.title}" to earn your certificate.
        </p>
        <button onClick={() => navigate(`/learn/${course.id}`)} className="btn-primary">
          Continue Learning
        </button>
      </div>
    );
  }
  */

  const completionDate = certificateData ? new Date(certificateData.issueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const certificateId = certificateData?.certificateId || `CERT-SAMPLE-${String(course.id || course._id).substring(0, 4)}-${Math.floor(Math.random() * 10000)}`;

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: '1100px', backgroundColor: 'white' }}>

      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          onClick={() => navigate('/progress')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            backgroundColor: 'transparent', 
            color: '#64748b',
            padding: '0.5rem 0',
            fontSize: '0.9rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={18} /> Back to Progress
        </button>
        
        <div style={{ display: 'flex', gap: '1rem' }} className="no-print">
          {isCompleted ? (
            <button 
              onClick={handlePrint}
              className="btn-primary"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                backgroundColor: '#1e293b',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '8px'
              }}
            >
              <Printer size={18} /> Print / Save PDF
            </button>
          ) : (
            <div style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#f1f5f9', 
              color: '#94a3b8', 
              borderRadius: '8px',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1px solid #e2e8f0'
            }}>
              <Award size={18} /> Complete course to unlock download
            </div>
          )}
        </div>
      </header>

      <div
        className="certificate-container"
        style={{
          background: '#ffffff',
          color: '#1e293b',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
          padding: '4rem',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
          aspectRatio: '1.414/1', // A4 Landscape ratio
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
        ref={certificateRef}
      >
        {!isCompleted && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            overflow: 'hidden'
          }}>
            <div style={{
              transform: 'rotate(-45deg)',
              color: 'rgba(0,0,0,0.05)',
              fontSize: '8rem',
              fontWeight: '900',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
              letterSpacing: '1rem',
              userSelect: 'none'
            }}>
              SAMPLE • PREVIEW • SAMPLE • PREVIEW
            </div>
          </div>
        )}
        {/* Background Decorations */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          border: '20px solid transparent',
          borderImage: 'linear-gradient(45deg, #6366f1, #818cf8, #6366f1) 1',
          pointerEvents: 'none',
          opacity: 0.8
        }} />
        
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          border: '1px solid #e2e8f0',
          pointerEvents: 'none'
        }} />

        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />

        {/* Certificate Content */}
        <div style={{ zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', justifyContent: 'center' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              backgroundColor: '#6366f1', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <Award size={28} />
            </div>
            <span style={{ fontSize: '1.75rem', fontWeight: '800', color: '#6366f1' }}>EduAI</span>
          </div>

          <p style={{ 
            textTransform: 'uppercase', 
            letterSpacing: '0.2rem', 
            fontSize: '0.9rem', 
            color: '#64748b',
            fontWeight: '600',
            marginBottom: '1rem'
          }}>
            Certificate of Achievement
          </p>

          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '500', 
            color: '#1e293b', 
            marginBottom: '2rem' 
          }}>
            This is to certify that
          </h3>

          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '900', 
            color: '#1e293b', 
            marginBottom: '1.5rem',
            fontFamily: "serif"
          }}>
            {isCompleted ? (user?.name || 'Valued Learner') : 'SAMPLE LEARNER'}
          </h1>

          <p style={{ 
            fontSize: '1.2rem', 
            color: '#64748b', 
            maxWidth: '600px', 
            margin: '0 auto 2.5rem',
            lineHeight: '1.6'
          }}>
            has successfully completed the professional course on
            <br />
            <strong style={{ color: '#1e293b', fontSize: '1.5rem' }}>"{isCompleted ? course.title : 'SAMPLE COURSE TITLE'}"</strong>
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr', 
            gap: '3rem', 
            width: '100%', 
            maxWidth: '800px',
            marginTop: '2rem'
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ borderBottom: '1px solid #cbd5e1', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                <img 
                  src="https://signature.freefire-name.com/img.php?last=EduAI%20Director&first=Sarah%20Johnson&font=signature" 
                  alt="Signature" 
                  style={{ height: '40px', opacity: 0.8 }}
                />
              </div>
              <p style={{ fontSize: '0.8rem', fontWeight: 'bold', margin: 0 }}>Sarah Johnson</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>Director of Learning, EduAI</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                border: '4px double #6366f1', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6366f1',
                position: 'relative'
              }}>
                <ShieldCheck size={48} />
                <div style={{
                  position: 'absolute',
                  width: '120px',
                  height: '120px',
                  border: '1px dashed #6366f1',
                  borderRadius: '50%',
                  opacity: 0.3
                }} />
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ borderBottom: '1px solid #cbd5e1', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '1rem', fontWeight: '600', height: '40px', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', margin: 0, color: '#1e293b' }}>
                  {completionDate}
                </p>
              </div>
              <p style={{ fontSize: '0.8rem', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>Date of Issue</p>
              <p style={{ fontSize: '0.7rem', color: '#64748b', margin: 0 }}>Certificate ID: {certificateId}</p>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div style={{ 
          position: 'absolute', 
          bottom: '30px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: '100%',
          padding: '0 4rem',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <p style={{ fontSize: '0.7rem', color: '#64748b', opacity: 0.5 }}>
            This certificate is verified by EduAI Accreditation Board. To verify authenticity, visit eduai.com/verify
          </p>
        </div>
      </div>

      {/* Info Section Below Certificate */}
      <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }} className="no-print">
        <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ color: '#6366f1', padding: '0.5rem', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px' }}>
            <User size={20} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.25rem 0' }}>Student Name</h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>{user?.name}</p>
          </div>
        </div>
        
        <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ color: '#10b981', padding: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>
            <BookOpen size={20} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.25rem 0' }}>Course Completed</h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>{course.title}</p>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ color: '#f59e0b', padding: '0.5rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px' }}>
            <Calendar size={20} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.25rem 0' }}>Issue Date</h4>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>{completionDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;

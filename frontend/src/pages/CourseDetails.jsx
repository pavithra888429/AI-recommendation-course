import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { PlayCircle, CheckCircle, ChevronDown, Award, Globe, Clock, MessageCircle, ArrowRight } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const CourseDetails = () => {
  const { id } = useParams();
  const { isEnrolled } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="container">Loading...</div>;
  if (!course) return <div className="container">Course not found</div>;

  const enrolled = isEnrolled(course.id);

  return (
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem', paddingTop: '2rem' }}>
        
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{course.title}</h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            {course.description}
          </p>
          
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} color="var(--primary)" />
              <span>{course.duration}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={20} color="var(--primary)" />
              <span>English</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={20} color="var(--primary)" />
              <span>Certificate of completion</span>
            </div>
          </div>

          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Course Content</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {course.modules.map((module, idx) => (
                <div key={module.id} className="card" style={{ padding: '0' }}>
                  <div style={{ 
                    padding: '1.25rem 1.5rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    borderBottom: '1px solid var(--border)'
                  }}>
                    <h4 style={{ margin: 0 }}>Module {idx + 1}: {module.title}</h4>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{module.lessons.length} lessons</span>
                  </div>
                  <div style={{ padding: '1rem 1.5rem' }}>
                    {module.lessons.map(lesson => (
                      <div key={lesson.id} style={{ 
                        padding: '0.75rem 0', 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #f1f5f9'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <PlayCircle size={18} color="var(--text-muted)" />
                          <span>{lesson.title}</span>
                        </div>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside>
          <div className="card" style={{ position: 'sticky', top: '100px', overflow: 'hidden' }}>
            <img src={course.image} alt={course.title} style={{ width: '100%', aspectRatio: '16/9' }} />
            <div style={{ padding: '1.5rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Free</span>
                <span style={{ marginLeft: '0.5rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>$99.00</span>
              </div>
              <Link 
                to={enrolled ? `/learn/${course.id}` : `/enroll/${course.id}`} 
                className="btn-primary" 
                style={{ 
                  width: '100%', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  textDecoration: 'none' 
                }}
              >
                {enrolled ? 'Go to Course' : 'Enroll Now'} <ArrowRight size={18} />
              </Link>
              <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                30-day money-back guarantee
              </p>
              
              <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <MessageCircle size={16} />
                  <span>Instructor support</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <Award size={16} />
                  <span>Lifetime access</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default CourseDetails;

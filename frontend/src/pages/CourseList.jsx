import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import CourseCard from '../components/CourseCard';
import { Search, Filter } from 'lucide-react';

const API_URL = 'https://course-platform-api-mjpn.onrender.com/api';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/courses`);
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ['All', ...new Set(courses.map(c => c.category))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || course.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading courses...</div>;

  return (
    <div className="container">
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Explore Our Courses</h1>
        <p style={{ color: 'var(--text-muted)' }}>Learn from industry experts and master new skills.</p>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '3rem',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search for courses..." 
            style={{ paddingLeft: '3rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '20px',
                backgroundColor: category === cat ? 'var(--primary)' : 'white',
                color: category === cat ? 'white' : 'var(--text-main)',
                border: '1px solid var(--border)',
                fontWeight: '500'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem',
          marginBottom: '5rem' 
        }}>
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h3>No courses found matching your criteria.</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;

const API_URL = 'http://localhost:5000/api';

export const getRecommendations = async (interests, level) => {
  try {
    const res = await fetch(`${API_URL}/courses`);
    const courses = await res.json();
    
    let recs = courses.filter(course => {
      const categoryMatch = interests.some(interest => 
        course.category.toLowerCase().includes(interest.toLowerCase()) ||
        course.title.toLowerCase().includes(interest.toLowerCase())
      );
      const levelMatch = course.level.toLowerCase() === level.toLowerCase();
      
      return categoryMatch || levelMatch;
    });

    if (recs.length === 0) {
      return courses.slice(0, 3);
    }

    return recs.sort((a, b) => b.rating - a.rating);
  } catch (err) {
    console.error("Recommendation error:", err);
    return [];
  }
};

import { courses } from '../data/courses';

export const getRecommendations = (interests, level) => {
  // Simple mock logic:
  // 1. Filter by category if match found in interests
  // 2. Filter by level if match found
  // 3. If no specific match, return top rated courses
  
  let recs = courses.filter(course => {
    const categoryMatch = interests.some(interest => 
      course.category.toLowerCase().includes(interest.toLowerCase()) ||
      course.title.toLowerCase().includes(interest.toLowerCase())
    );
    const levelMatch = course.level.toLowerCase() === level.toLowerCase();
    
    return categoryMatch || levelMatch;
  });

  if (recs.length === 0) {
    return courses.slice(0, 3); // Return first 3 if no match
  }

  return recs.sort((a, b) => b.rating - a.rating);
};

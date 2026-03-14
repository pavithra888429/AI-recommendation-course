import { API_URL, AI_SERVICE_URL } from '../config';

// Fallback: simple keyword + level matching (used when AI service is unavailable)
const keywordFallback = (courses, interests, level) => {
  if (!Array.isArray(courses)) return [];
  
  let recs = courses.filter(course => {
    if (!course) return false;
    const title = (course.title || "").toLowerCase();
    const category = (course.category || "").toLowerCase();
    const courseLevel = (course.level || "").toLowerCase();
    const targetLevel = (level || "Beginner").toLowerCase();

    const categoryMatch = interests.some(interest =>
      category.includes(interest.toLowerCase()) ||
      title.includes(interest.toLowerCase())
    );
    const levelMatch = courseLevel === targetLevel;
    return categoryMatch || levelMatch;
  });
  
  if (recs.length === 0) return courses.slice(0, 3);
  return recs.sort((a, b) => (b.rating || 0) - (a.rating || 0));
};

export const getRecommendations = async (interests, level) => {
  try {
    const res = await fetch(`${API_URL}/courses`);
    const courses = await res.json();

    // Read search history from localStorage (saved by CourseList page)
    let searchHistory = [];
    try {
      searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    } catch (_) {}

    // Try AI service first
    try {
      const aiRes = await fetch(`${AI_SERVICE_URL}/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests, level, searchHistory, courses }),
        signal: AbortSignal.timeout(20000) // 20s timeout
      });

      if (aiRes.ok) {
        const aiRecs = await aiRes.json();
        if (Array.isArray(aiRecs) && aiRecs.length > 0) {
          return aiRecs;
        }
      }
    } catch (aiErr) {
      console.warn('AI service unavailable, using fallback recommendations:', aiErr.message);
    }

    // Fallback to keyword matching
    return keywordFallback(courses, interests, level);

  } catch (err) {
    console.error("Recommendation error:", err);
    return [];
  }
};

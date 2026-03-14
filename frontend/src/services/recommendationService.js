const API_URL = 'https://course-platform-api-mjpn.onrender.com/api';
const AI_SERVICE_URL = 'http://192.168.171.127:5001';

// Fallback: simple keyword + level matching (used when AI service is unavailable)
const keywordFallback = (courses, interests, level) => {
  let recs = courses.filter(course => {
    const categoryMatch = interests.some(interest =>
      course.category.toLowerCase().includes(interest.toLowerCase()) ||
      course.title.toLowerCase().includes(interest.toLowerCase())
    );
    const levelMatch = course.level.toLowerCase() === level.toLowerCase();
    return categoryMatch || levelMatch;
  });
  if (recs.length === 0) return courses.slice(0, 3);
  return recs.sort((a, b) => b.rating - a.rating);
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
        signal: AbortSignal.timeout(8000) // 8s timeout
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

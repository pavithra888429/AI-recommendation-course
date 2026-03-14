const API_URL = 'https://course-platform-api-mjpn.onrender.com/api';

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

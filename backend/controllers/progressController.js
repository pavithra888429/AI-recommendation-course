const Progress = require('../models/Progress');
const Course = require('../models/Course');

const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.id });
    // Convert to the dictionary format expected by frontend
    const progressDict = {};
    progress.forEach(p => {
      progressDict[p.course] = {
        completedLessons: p.completedLessons,
        completedQuizzes: p.completedQuizzes,
        completedModules: p.completedModules,
        quizScores: Object.fromEntries(p.quizScores || new Map()),
        isCompleted: p.isCompleted,
        enrolledAt: p.enrolledAt
      };
    });
    res.json(progressDict);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { courseId, lessonId, isQuiz, score, isModule } = req.body;
    let progress = await Progress.findOne({ user: req.user.id, course: courseId });

    if (!progress) {
       progress = new Progress({ user: req.user.id, course: courseId });
    }

    if (isModule) {
      if (!progress.completedModules.includes(lessonId)) {
        progress.completedModules.push(lessonId);
      }
      const scoreKey = `module-${lessonId}`;
      const currentBest = progress.quizScores.get(scoreKey) || 0;
      if (score > currentBest) {
        progress.quizScores.set(scoreKey, score);
      }
    } else if (isQuiz) {
      if (!progress.completedQuizzes.includes(lessonId)) {
        progress.completedQuizzes.push(lessonId);
      }
      const currentBest = progress.quizScores.get(lessonId) || 0;
      if (score > currentBest) {
        progress.quizScores.set(lessonId, score);
      }
    } else {
      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
      }
    }

    progress.lastAccessed = Date.now();

    // Check for overall course completion
    const course = await Course.findOne({ id: courseId });
    if (course) {
      const allItems = [];
      course.modules.forEach(mod => {
        mod.lessons.forEach(les => {
          allItems.push({ type: 'video', id: les.id });
          if (les.quizzes && les.quizzes.length > 0) allItems.push({ type: 'quiz', id: les.id });
        });
        if (mod.quiz) allItems.push({ type: 'module-quiz', mId: mod.id });
      });

      const completedCount = allItems.filter(item => {
        if (item.type === 'video') return progress.completedLessons.includes(item.id);
        if (item.type === 'quiz') return progress.completedQuizzes.includes(item.id);
        if (item.type === 'module-quiz') return progress.completedModules.includes(item.mId);
        return false;
      }).length;

      if (completedCount === allItems.length && allItems.length > 0) {
        progress.isCompleted = true;
      }
    }

    await progress.save();

    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    let progress = await Progress.findOne({ user: req.user.id, course: courseId });
    if (progress) return res.status(200).json(progress);

    progress = new Progress({ user: req.user.id, course: courseId });
    await progress.save();

    res.status(201).json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getProgress, updateProgress, enrollInCourse };

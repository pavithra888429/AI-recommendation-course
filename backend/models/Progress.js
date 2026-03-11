const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Number, required: true }, // Using legacy Number ID for now to match frontend
  completedLessons: [{ type: String }], // Lesson IDs
  completedQuizzes: [{ type: String }], // Lesson/Quiz IDs
  completedModules: [{ type: String }], // Module IDs
  quizScores: {
    type: Map,
    of: Number
  },
  isCompleted: { type: Boolean, default: false },
  enrolledAt: { type: Date, default: Date.now },
  lastAccessed: { type: Date, default: Date.now }
});

// Compound index for efficient lookup
ProgressSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);

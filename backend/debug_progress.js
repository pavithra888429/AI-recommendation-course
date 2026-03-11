const mongoose = require('mongoose');
const fs = require('fs');
const Progress = require('./models/Progress');
const User = require('./models/User');
require('dotenv').config();

const logFile = 'debug_output.txt';
const log = (msg) => {
  console.log(msg);
  fs.appendFileSync(logFile, msg + '\n');
};

const debugProgress = async () => {
  try {
    fs.writeFileSync(logFile, '--- Debug Start ---\n');
    await mongoose.connect(process.env.MONGODB_URI);
    
    const users = await User.find({});
    log(`Total users found: ${users.length}`);

    for (const user of users) {
      log(`\nUser: ${user.name} (${user.email}) ID: ${user._id}`);
      const progressDocs = await Progress.find({ user: user._id });
      if (progressDocs.length === 0) {
          log('No progress records.');
          continue;
      }
      for (const p of progressDocs) {
        log(`\nCourse ID: ${p.course}`);
        log(`Completed Lessons: ${JSON.stringify(p.completedLessons)}`);
        log(`Completed Quizzes: ${JSON.stringify(p.completedQuizzes)}`);
        log(`Completed Modules: ${JSON.stringify(p.completedModules)}`);
        
        let scores = {};
        if (p.quizScores) {
          if (p.quizScores instanceof Map) {
            scores = Object.fromEntries(p.quizScores);
          } else {
            scores = p.quizScores;
          }
        }
        log(`Quiz Scores: ${JSON.stringify(scores)}`);
        log(`Is Completed: ${p.isCompleted}`);
      }
    }
    process.exit();
  } catch (err) {
    log(`\nError: ${err.stack}`);
    process.exit(1);
  }
};

debugProgress();

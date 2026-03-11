const mongoose = require('mongoose');
const Progress = require('./models/Progress');
require('dotenv').config();

const cleanup = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Cleaning up progress records...');
    
    const progressRecords = await Progress.find({});
    for (const p of progressRecords) {
      p.completedLessons = p.completedLessons.filter(id => id !== null);
      p.completedQuizzes = p.completedQuizzes.filter(id => id !== null);
      p.completedModules = p.completedModules.filter(id => id !== null);
      
      // Also remove null strings if they exist
      p.completedLessons = p.completedLessons.filter(id => id !== 'null' && id !== 'undefined');
      p.completedQuizzes = p.completedQuizzes.filter(id => id !== 'null' && id !== 'undefined');
      p.completedModules = p.completedModules.filter(id => id !== 'null' && id !== 'undefined');

      await p.save();
    }
    
    console.log(`Cleaned ${progressRecords.length} records.`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

cleanup();

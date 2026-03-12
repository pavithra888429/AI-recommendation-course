const Certificate = require('../models/Certificate');
const Progress = require('../models/Progress');
const Course = require('../models/Course');
const User = require('../models/User');

const getCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    // 1. Check if certificate already exists
    let certificate = await Certificate.findOne({ user: userId, course: courseId });
    if (certificate) {
      return res.json(certificate);
    }

    // 2. If not, check if course is completed
    const progress = await Progress.findOne({ user: userId, course: courseId });
    
    // Safety check for completion
    if (!progress || !progress.isCompleted) {
      return res.status(403).json({ message: 'Course not yet completed' });
    }

    // 3. Generate new certificate
    const course = await Course.findOne({ id: courseId });
    const user = await User.findById(userId);

    if (!course || !user) {
      return res.status(404).json({ message: 'Course or User information missing' });
    }

    const certificateId = `CERT-${String(courseId).substring(0, 4)}-${String(userId).substring(0, 4)}-${Math.floor(Math.random() * 10000)}`;

    certificate = new Certificate({
      certificateId,
      user: userId,
      course: courseId,
      courseTitle: course.title,
      userName: user.name
    });

    await certificate.save();
    res.status(201).json(certificate);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;
    const certificate = await Certificate.findOne({ certificateId });
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found or invalid' });
    }
    
    res.json({
      valid: true,
      certificate
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getCertificate, verifyCertificate };

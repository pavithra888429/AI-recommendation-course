const express = require('express');
const router = express.Router();
const { getProgress, updateProgress, enrollInCourse } = require('../controllers/progressController');
const auth = require('../config/auth');

router.get('/', auth, getProgress);
router.post('/update', auth, updateProgress);
router.post('/enroll', auth, enrollInCourse);

module.exports = router;

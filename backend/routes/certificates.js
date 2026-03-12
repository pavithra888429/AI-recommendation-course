const express = require('express');
const router = express.Router();
const { getCertificate, verifyCertificate } = require('../controllers/certificateController');
const auth = require('../config/auth');

// @route   GET api/certificates/:courseId
// @desc    Get or generate a certificate for a course
// @access  Private
router.get('/:courseId', auth, getCertificate);

// @route   GET api/certificates/verify/:certificateId
// @desc    Verify a certificate by its unique ID
// @access  Public
router.get('/verify/:certificateId', verifyCertificate);

module.exports = router;

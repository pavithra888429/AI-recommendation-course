const express = require('express');
const router = express.Router();
const { register, login, completeOnboarding } = require('../controllers/authController');
const auth = require('../config/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/onboarding', auth, completeOnboarding);

module.exports = router;

const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  console.log('Registration attempt received:', req.body?.email || 'EMPTY BODY');
  try {
    const { name, email, password } = req.body || {};
    
    if (!name || !email || !password) {
      console.log('Validation failed: Missing fields');
      return res.status(400).json({ message: 'Please provide all fields' });
    }
    
    console.log('Checking for existing user...', email);
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log('Creating new user object...');
    user = new User({ name, email, password });
    
    console.log('Saving user to database...');
    await user.save();
    console.log('User saved successfully:', user._id);

    console.log('Signing JWT...');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    const responsePayload = { 
      token, 
      user: { id: user._id, name, email, onboardingComplete: user.onboardingComplete, profile: user.profile } 
    };
    
    console.log('Sending response with status 201');
    res.status(201).json(responsePayload);
  } catch (err) {
    console.error('Registration ERROR:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email, onboardingComplete: user.onboardingComplete, profile: user.profile } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const completeOnboarding = async (req, res) => {
  try {
    const { profile } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.profile = profile;
    user.onboardingComplete = true;
    await user.save();

    res.json({ message: 'Onboarding completed', user: { id: user._id, name: user.name, email: user.email, onboardingComplete: true, profile: user.profile } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { register, login, completeOnboarding };

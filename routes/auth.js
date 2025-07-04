const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ErrorHandler } = require('../utils/error');
const User = require('../models/User');

// Register (Admin creation)
router.post('/register', async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new ErrorHandler(400, 'Username already exists');
    }

    // Create new user
    const newUser = new User({ username, password, role });
    await newUser.save();

    // Automatically log in the new user
    req.login(newUser, (err) => {
      if (err) return next(err);
      res.json({ success: true, user: newUser.toJSON() });
    });
  } catch (err) {
    next(err);
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return next(new ErrorHandler(401, info.message || 'Invalid credentials'));
    }
    
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ 
        success: true, 
        user: {
          _id: user._id,
          username: user.username,
          role: user.role
        }
      });
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ success: true, message: 'Logged out successfully' });
});

// Current user
router.get('/current', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.json({ success: false, user: null });
  }
  res.json({ 
    success: true, 
    user: {
      _id: req.user._id,
      username: req.user.username,
      role: req.user.role
    }
  });
});

module.exports = router;

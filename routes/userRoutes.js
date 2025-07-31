const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Example protected route to get user profile data
router.get('/profile', authMiddleware, (req, res) => {
  // req.user is available thanks to the middleware
  res.json({
    msg: `Welcome, your email is ${req.user.email}`,
    user: req.user
  });
});

module.exports = router;

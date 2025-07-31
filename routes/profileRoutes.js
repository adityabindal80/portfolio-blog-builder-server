const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createOrUpdateProfile } = require('../controllers/profileController');
const User = require('../models/User');

router.put('/', authMiddleware, createOrUpdateProfile);

router.get('/', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json({
        name: user.name || '',
        bio: user.bio || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;

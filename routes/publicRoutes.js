const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Blog = require('../models/Blog');
const Project = require('../models/Project');

// GET /api/public/:username
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const blogs = await Blog.find({ user: user._id });
    const projects = await Project.find({ user: user._id });
    res.json({
      user: {
        username: user.username,
        name: user.name || user.username,
        bio: user.bio || '',
        github: user.github || '',
        linkedin: user.linkedin || ''
      },
      blogs,
      projects,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

const Profile = require('../models/Profile');
const User = require('../models/User');

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { name, bio, github, linkedin } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, bio, github, linkedin },
      { new: true }
    );

    res.json(updatedUser);  // Send updated user back
  } catch (err) {
    console.error("❌ Error in profile update:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getProfileByName = async (req, res) => {
  try {
    const { username } = req.params;

    // Step 1: Find the user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Step 2: Find the profile associated with this user
    const profile = await Profile.findOne({ user: user._id });
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    // Step 3: Also fetch projects/blogs if needed (depends on your DB schema)
    // Assuming you fetch projects and blogs in /routes/public.js

    res.json({ user: profile, username });  // Return the profile
  } catch (err) {
    console.error("❌ Error in getProfileByName:", err);
    return res.status(500).json({ msg: 'Server error' });
  }
};
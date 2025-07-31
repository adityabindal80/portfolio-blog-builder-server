const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,           // ✅ Add this line
  bio: String,
  github: String,
  linkedin: String,
  skills: [String],
}, { timestamps: true });


module.exports = mongoose.model('Profile', profileSchema);
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },

title: { type: String, required: true },
  content: { type: String, required: true }, // markdown content
}, { timestamps: true });


module.exports = mongoose.model('Blog', BlogSchema);

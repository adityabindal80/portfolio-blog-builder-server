const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog({ ...req.body, user: req.user._id });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user._id });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

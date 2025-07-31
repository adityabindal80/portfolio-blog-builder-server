const express = require('express');
const router = express.Router();

const { createBlog, getBlogs } = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');


const Blog = require('../models/Blog');
router.put('/:id',authMiddleware, async (req,res)=>{
 try{
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Check ownership
    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this blog' });
    }

 blog.title = req.body.title || req.body.title;
 blog.content = req.body.content || blog.content ;

 await blog.save();
 res.json({ message: 'Blog updated successfully', blog });
 }
 catch(err){
  console.error(err);
  res.status(500).json({ error: 'Error updating blog' });
 }
});
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Ensure logged-in user owns this blog
    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    await blog.deleteOne();
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ error: 'Error deleting blog' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching blog' });
  }
});


router.post('/', authMiddleware, createBlog);
router.get('/', authMiddleware, getBlogs);
// DELETE /api/blogs/:id
router.delete('/:id',  authMiddleware, async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
  
      // Optional: Check if blog.user === req.user.id
      await blog.deleteOne();
      res.json({ message: 'Blog deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting blog' });
    }
  });
  
module.exports = router;

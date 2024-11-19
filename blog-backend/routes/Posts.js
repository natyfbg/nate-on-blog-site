const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post('/', auth, async (req, res) => {
  try {
    console.log('Creating post with data:', {
      title: req.body.title,
      hasContent: !!req.body.content,
      hasImage: !!req.body.imageUrl,
      userId: req.userId
    });

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.userId,
      imageUrl: req.body.imageUrl,
      highlight: req.body.highlight,
    });

    const newPost = await post.save();
    console.log('Post created successfully:', newPost);
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(400).json({ 
      message: err.message,
      details: err.errors || 'Unknown error'
    });
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a post
router.put('/:id', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    console.log('Post author:', post.author);
    console.log('Request user ID:', req.userId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check user
    if (post.author.toString() !== req.userId.toString()) {
      console.log('Authorization failed');
      return res.status(401).json({ message: 'User not authorized' });
    }

    const { title, content, imageUrl, highlight } = req.body;

    // Build post object
    const postFields = {};
    if (title) postFields.title = title;
    if (content) postFields.content = content;
    if (imageUrl) postFields.imageUrl = imageUrl;
    if (highlight) postFields.highlight = highlight;

    // Update
    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: postFields },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a post (accessible by post author or admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is post author or admin
    if (post.author.toString() !== req.userId.toString() && !req.user.isAdmin) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// Optional: Admin-only route to delete any post
router.delete('/admin/:id', [auth, isAdmin], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: 'Post removed by admin' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
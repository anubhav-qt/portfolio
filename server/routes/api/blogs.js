const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to store blog posts
const BLOGS_DIR = path.join(__dirname, '../../data/blogs');

// Ensure blogs directory exists
if (!fs.existsSync(BLOGS_DIR)) {
  fs.mkdirSync(BLOGS_DIR, { recursive: true });
}

// @route   GET api/blogs
// @desc    Get all blog posts
// @access  Public
router.get('/', (req, res) => {
  try {
    // Read all blog files
    const blogFiles = fs.readdirSync(BLOGS_DIR)
      .filter(file => file.endsWith('.json'));
    
    // Parse each blog file and collect data
    const blogs = blogFiles.map(file => {
      const blogPath = path.join(BLOGS_DIR, file);
      const blogData = JSON.parse(fs.readFileSync(blogPath, 'utf8'));
      
      // Return only required fields for listing (not full content)
      return {
        slug: blogData.slug,
        title: blogData.title,
        date: blogData.date,
        description: blogData.description,
        createdAt: blogData.createdAt,
      };
    });
    
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// @route   GET api/blogs/:slug
// @desc    Get a single blog post by slug
// @access  Public
router.get('/:slug', (req, res) => {
  try {
    const slug = req.params.slug;
    const blogPath = path.join(BLOGS_DIR, `${slug}.json`);
    
    if (!fs.existsSync(blogPath)) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    const blogData = JSON.parse(fs.readFileSync(blogPath, 'utf8'));
    res.json(blogData);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// @route   POST api/blogs
// @desc    Create a new blog post
// @access  Private (via environment check)
router.post('/', (req, res) => {
  // Only allow in development mode
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Not allowed in production mode' });
  }
  
  try {
    const { title, content, date, description, slug } = req.body;
    
    // Validate required fields
    if (!title || !content || !date || !description || !slug) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Check if blog with this slug already exists
    const blogPath = path.join(BLOGS_DIR, `${slug}.json`);
    if (fs.existsSync(blogPath)) {
      return res.status(409).json({ error: 'A blog post with this slug already exists' });
    }
    
    // Create blog post object
    const blogPost = {
      title,
      content,
      date,
      description,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Save to file
    fs.writeFileSync(blogPath, JSON.stringify(blogPost, null, 2));
    
    res.status(201).json({
      message: 'Blog post created successfully',
      slug: blogPost.slug
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

module.exports = router;
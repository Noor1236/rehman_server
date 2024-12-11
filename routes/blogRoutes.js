import express from 'express';
import {
  createBlogPost,
  getBlogPosts,
  getBlogPost,
  editBlogPost,
  deleteBlogPost,
} from '../controller/BlogController.js';

const router = express.Router();

// Route to create a blog post
router.post('/create', createBlogPost);

// Route to get all blog posts
router.get('/posts', getBlogPosts);

// Route to get a single blog post
router.get('/posts/:id', getBlogPost);

// Route to edit a blog post
router.put('/edit/:id', editBlogPost);

// Route to delete a blog post
router.delete('/delete/:id', deleteBlogPost);

export default router;

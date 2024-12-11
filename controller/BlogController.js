import BlogPost from '../models/Blog.js';

// Create a blog post
export const createBlogPost = async (req, res) => {
  try {
    const newBlog = new BlogPost(req.body);
    await newBlog.save();
    res.status(201).json({ msg: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all blog posts
export const getBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single blog post by ID
export const getBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Edit a blog post
export const editBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, long_description, author_name } = req.body;

    const updatedBlog = await BlogPost.findByIdAndUpdate(
      id,
      { title, description, long_description, author_name },
      { new: true }
    );

    if (!updatedBlog) return res.status(404).json({ success: false, message: 'Blog not found' });

    res.status(200).json({ success: true, blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a blog post
export const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await BlogPost.findByIdAndDelete(id);

    if (!deletedBlog) return res.status(404).json({ success: false, message: 'Blog not found' });

    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import mongoose from 'mongoose';

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  long_description: {
    type: String,
    required: true,
  },
  author_name: {
    type: String,
    required: true,
  },
});

// Blog Model
const BlogPost = mongoose.model('blogs', blogSchema);

export default BlogPost;

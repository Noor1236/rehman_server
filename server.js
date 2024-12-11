import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config.js';
import blogRoutes from './routes/blogRoutes.js'; // Import blog routes
import userRoutes from './routes/userRoutes.js';
import bodyParser from 'body-parser';

const app = express();
app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
const PORT = 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

connectDB();

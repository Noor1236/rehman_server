import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SignUp, Login, getAllUser } from '../controller/UserController.js';

// Secure the secret key from the environment variables
const jwtSecret = process.env.JWT_SECRET;

const router = express.Router();

router.post('/api/signup', SignUp);
router.post('/api/login', Login);
router.get('/api/users', getAllUser);

export default router;

import express from 'express';
import { editUserProfile } from '../controller/UserController.js';

const router = express.Router();

// Edit user profile route
router.put('/edit-profile/:id', editUserProfile);

export default router;

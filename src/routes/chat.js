import express from 'express';
import { handleChat } from '../controllers/chatController.js';

const router = express.Router();

// POST endpoint for chat
router.post('/chat', handleChat);

export default router;
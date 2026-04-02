import { generateResponse } from '../services/aiService.js';

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required and must be a non-empty string' });
    }

    // Generate response from AI service
    const response = await generateResponse(message);

    res.json({
      message: message,
      response: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat error:', error.message);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
};

export const getStatus = (req, res) => {
  res.json({ status: 'Nebula is online and ready to chat!' });
};
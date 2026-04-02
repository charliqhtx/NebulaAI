import express from 'express';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', chatRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Nebula is online 🚀' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌌 Nebula is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}/health to check status`);
});
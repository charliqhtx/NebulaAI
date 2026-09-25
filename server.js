require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const MAX_MESSAGE_LENGTH = 4000;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;
const requestLog = new Map();

app.use(express.json({ limit: '10kb' }));
app.use(express.static('.'));

function isRateLimited(ip) {
  const now = Date.now();
  const recentRequests = (requestLog.get(ip) || []).filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(ip, recentRequests);
  return false;
}

// API endpoint to get AI response. The API key is read only on the server.
app.post('/api/chat', async (req, res) => {
  if (isRateLimited(req.ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { message } = req.body;

  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer`
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('OPENAI_API_KEY is not configured');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are Nebula, a friendly and knowledgeable cosmic chatbot that loves discussing space, astronomy, and the universe. Keep responses concise and engaging. Provide accurate, helpful answers.'
          },
          { role: 'user', content: message.trim() }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      // Do not send OpenAI's response (which may contain sensitive details) to clients.
      console.error('OpenAI request failed with status', response.status);
      return res.status(502).json({ error: 'Failed to get AI response' });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;

    if (typeof answer !== 'string') {
      console.error('OpenAI returned an unexpected response');
      return res.status(502).json({ error: 'Invalid AI response' });
    }

    res.json({ response: answer });
  } catch (error) {
    console.error('OpenAI request error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Nebula server running on http://localhost:${PORT}`);
  console.log(`📂 Open http://localhost:${PORT}/demo-secure.html in your browser`);
});

import axios from 'axios';

const API_KEY = process.env.OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateResponse = async (message) => {
  try {
    if (!API_KEY) {
      return 'Sorry, I\'m not configured yet. Please set up your OPENAI_API_KEY in the .env file.';
    }

    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are Nebula, a helpful and friendly AI chatbot. Provide clear, concise, and helpful responses.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('AI Service error:', error.message);
    
    if (error.response?.status === 401) {
      return 'Authentication failed. Please check your API key.';
    }
    
    return 'I encountered an error processing your request. Please try again.';
  }
};

// Mock response for development/testing without API key
export const generateMockResponse = (message) => {
  const responses = [
    'That\'s an interesting question! Can you tell me more?',
    'I understand what you\'re asking. Here\'s my perspective...',
    'Great question! Let me help you with that.',
    'I appreciate your inquiry. Based on what you shared...'
  ];

  return responses[Math.floor(Math.random() * responses.length)];
};
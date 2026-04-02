# Nebula - AI Chatbot

Nebula is a Node.js-based AI chatbot powered by NebularGPT, inspired by ChatGPT. It provides a conversational interface for interacting with AI models.

## Features

- 🤖 AI-powered conversations
- 💬 RESTful API for chat interactions
- 🚀 Easy to deploy
- 🔧 Configurable and extensible
- 📝 Conversation history support

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key (or compatible API)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/charliqhtx/NebularGPT.git
cd NebularGPT
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Add your API keys and configuration to `.env`

### Running the Chatbot

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Endpoints

### POST /api/chat
Send a message to Nebula and receive a response.

**Request:**
```json
{
  "message": "Hello, how are you?"
}
```

**Response:**
```json
{
  "response": "I'm doing well, thank you for asking!",
  "timestamp": "2026-04-02T12:00:00Z"
}
```

## Project Structure

```
NebularGPT/
├── src/
│   ├── index.js           # Main entry point
│   ├── config/            # Configuration files
│   ├── routes/            # API routes
│   ├── controllers/       # Request handlers
│   └── utils/             # Utility functions
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore file
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## Configuration

Configure Nebula by editing your `.env` file:

- `OPENAI_API_KEY` - Your OpenAI API key
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or contributions, please open an issue or submit a pull request.

---

**Nebula** - Powered by NebulaAI 🚀

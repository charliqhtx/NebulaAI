# Getting Started
Follow the instructions below to get started with Nebula.

# 🔒 Secure Setup with Environment Variables

## Installation & Access

To install and access NebulaAI securely with your OpenAI API key:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/charliqhtx/NebulaAI.git
   cd NebulaAI
   ```

2. **Get Your OpenAI API Key:**
   - Visit [OpenAI Platform](https://platform.openai.com/account/api-keys)
   - Create a new API key
   - Copy it safely

3. **Create Environment File:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your key:
   ```
   OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Run the application:**
   ```bash
   npm start
   ```
   The server runs on `http://localhost:3000`

---

# 🔒 Security Best Practices

✅ **What We Do Right:**
- API key is stored locally in `.env` (never committed to GitHub)
- Frontend communicates with your backend server only
- Backend securely handles all API calls
- Your key never exposes to the browser or client-side

❌ **Never Do This:**
- Don't hardcode API keys in HTML/JavaScript files
- Don't make direct API calls from the browser
- Don't commit `.env` to GitHub
- Don't share your `.env` file

---

# 📱 Demo Mode (No Setup Required)

There is a demo available at `https://charliqhtx.github.io/NebulaAI/demo.html`

In demo mode, Nebula is limited to:
- Jokes (say "joke")
- Fun facts (say "fun fact")
- General conversation

**To Enable Full AI Features:** Follow the secure setup above.

---

# ✨ Features

- 🤖 AI-powered responses via OpenAI GPT-3.5-turbo
- 😄 Jokes and fun facts
- 🌌 Cosmic-themed UI
- 📱 Mobile responsive design
- 🔒 Secure backend API (your key is protected)

# 📚 How It Works

```
Browser (demo-secure.html)
    ↓
    ↓ POST /api/chat
    ↓
Your Server (server.js) - has API key
    ↓
    ↓ API call with key
    ↓
OpenAI API
    ↓
    ↓ Response
    ↓
Your Server
    ↓
    ↓ Response to browser
    ↓
Browser displays response
```

Your API key is never exposed to the browser!

---

# 🛠️ Troubleshooting

**Server won't start?**
```bash
npm install
npm start
```

**"API key not configured" error?**
- Make sure `.env` file exists in root directory
- Check that `OPENAI_API_KEY=your_key` is set
- Verify API key is valid at openai.com

**Messages not sending?**
- Is the server running? (`npm start`)
- Check browser console for errors (F12)
- Make sure you're opening `demo-secure.html` or navigating to `http://localhost:3000`

---

# ⚠️ Important Notes

- Each API call costs money (based on OpenAI pricing)
- The `.env` file is gitignored - it will never be committed
- If you ever expose your API key, regenerate it immediately
- Keep your API key private and secure

---

# 📄 License

MIT

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = "YOUR_OPENAI_KEY";
const SEARCH_KEY = "YOUR_TAVILY_KEY";

// 🔍 Web search function
async function searchWeb(query) {
  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SEARCH_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  return await res.json();
}

// 🤖 AI endpoint
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  let searchResults = null;

  // simple logic: search if needed
  if (message.includes("latest") || message.includes("news")) {
    searchResults = await searchWeb(message);
  }

  const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are Nebula AI, a smart assistant that uses search results when provided."
        },
        {
          role: "user",
          content: `
User question: ${message}

Search results:
${JSON.stringify(searchResults)}

Answer clearly and helpfully.
`
        }
      ]
    })
  });

  const data = await aiRes.json();
  res.json({ reply: data.choices[0].message.content });
});

app.listen(3000, () => console.log("Nebula running on port 3000"));


async function sendMessage(message) {
  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  return data.reply;
}





async function handleSend() {
  const input = document.getElementById("input").value;

  addMessage("You", input);

  const reply = await sendMessage(input);

  addMessage("Nebula", reply);
}

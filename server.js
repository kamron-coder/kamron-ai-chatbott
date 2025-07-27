const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = "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";

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "openrouter/mistral-7b",
      messages: [{ role: "user", content: userMessage }]
    }, {
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://kamron-chat.example.com",
        "Content-Type": "application/json"
      }
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Xato:", error.response?.data || error.message);
    res.status(500).json({ reply: "AI javob bera olmadi." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Kamron AI server http://localhost:${PORT} da ishlayapti`);
});

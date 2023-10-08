const { Router } = require('@next/router');
const axios = require('axios'); // Ensure axios is installed

const OPENAI_ENDPOINT = 'https://api.openai.com/v1/engines/davinci/completions';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const router = Router();

router.get('/api/chat', async (req, res) => {
    res.send("Please, use POST method");
});
router.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (typeof userMessage !== 'string') {
    return res.status(400).json({ error: 'Invalid input.' });
  }

  const headers = {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const data = {
    prompt: userMessage,
    max_tokens: 150,
  };

  try {
    const response = await axios.post(OPENAI_ENDPOINT, data, { headers });
    const aiResponse = response.data.choices[0].text.trim();
    return res.json({ message: aiResponse });
  } catch (error) {
    console.error("There was an error making the GPT-3 request:", error);
    return res.status(500).json({ message: "Sorry, I couldn't process that." });
  }
});

module.exports = router;

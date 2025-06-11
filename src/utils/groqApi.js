require('dotenv').config();
const axios = require('axios');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama3-70b-8192';

if (!GROQ_API_KEY) {
  throw new Error('🚫 Missing GROQ_API_KEY in environment variables');
}

async function getGroqResponse(prompt) {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant. Write short, engaging, and informative content using relevant emojis. Keep responses under 100 words. Do not use * anywhere. Avoid unnecessary phrases—if unsure about something, skip it without explanation.'
          },
          {
            role: 'user',
            content: `Write a blog/article on the topic: "${prompt}". do not Use bullets (*) and emojis where helpful. responses under 100 words`,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('❌ GROQ API Error:', error.response?.data || error.message);
    return '⚠️ Failed to generate content. Please try again.';
  }
}

module.exports = { getGroqResponse };

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { google } = require('googleapis');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());


// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });


// Weather API route
app.get("/api/weather", async (req, res) => {
  try {
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (
      !ip ||
      ip === "::1" ||
      ip.startsWith("127.") ||
      ip.startsWith("::ffff:127")
    ) {
      ip = "110.224.171.77";
    }

    const locationRes = await axios.get(`http://ip-api.com/json/${ip}`);
    if (locationRes.data.status !== "success") {
      return res.status(400).json({ error: "Could not determine location" });
    }

    const { city, lat, lon } = locationRes.data;

    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          units: "metric",
          appid: process.env.OPENWEATHER_API_KEY,
        },
      }
    );

    const weatherData = weatherRes.data;
    const weatherMain = weatherData.weather[0].main;

    const tracks = weatherTracks[weatherMain] || weatherTracks["Clear"];
    const randomTrackId = tracks[Math.floor(Math.random() * tracks.length)];

    res.json({
      user_location: { ip, city, lat, lon },
      weather: weatherData,
      trackId: randomTrackId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

// AI Assistant route
app.post('/api/ai/analyze', async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required.' });
    }

    const result = await model.generateContent(
      `You are an AI code assistant. 
      Given the following ${language} code, improve it and return the result. 
      Reply only with a valid JavaScript array with two elements:
      - First element: the improved code as a string.
      - Second element: a short description of what was improved as a string.
      Example: ["<code here>", "<description here>"]
      Only return the array and nothing else — no explanations, no extra text, no formatting.
      Here is the code:
      \n\n${code}`
    );      

    const response = await result.response;
    const text = response.text();

    res.json({ analysis: text });
  } catch (error) {
    console.error('Gemini AI Assistant error:', error);
    res.status(500).json({ error: 'Failed to analyze code' });
  }
});

// Get API Address
app.get('/api/ip', (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',').shift() || req.socket.remoteAddress;
  res.json({ ip });
});

// Spotify

const weatherTracks = {
  Clear: [
    "3AhXZa8sUQht0UEdBJgpGc", // Mr. Blue Sky
    "7qiZfU4dY1lWllzX7mPBI3", // Shape of You
    "0VjIjW4GlUZAMYd2vXMi3b"  // Blinding Lights
  ],
  Rain: [
    "2RSHsoi04658QL5xgQVov3", // Set Fire To The Rain
    "3YBZIN3rekqsKxbJc9FZko", // Someone Like You
    "4iV5W9uYEdYUVa79Axb7Rh"  // Umbrella
  ],
  Clouds: [
    "1kPpge9JDLpcj15qgrPbYX", // Demons
    "1jYiIOC5d6soxkJP81fxq2", // Counting Stars
    "5ChkMS8OtdzJeqyybCc9R5"  // Don't Stop Believin'
  ],
  Snow: [
    "2VxeLyX666F8uXCJ0dZF8B", // Let It Go
    "0k0vFacOHNuArLWMiH60p7", // Sweater Weather
    "2dLLR6qlu5UJ5gk0dKz0h3"  // Winter Song
  ]
};

async function getAccessToken() {
  const res = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({ grant_type: 'client_credentials' }),
    {
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return res.data.access_token;
}

async function getTrack(trackId) {
  const token = await getAccessToken();
  const res = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res.data);
}

getTrack('7ouMYWpwJ422jRcDASZB7P'); // Example track ID


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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
app.get('/api/weather', async (req, res) => {
  try {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Fallback for local testing
    if (!ip || ip === '::1' || ip.startsWith('127.') || ip.startsWith('::ffff:127')) {
      console.log('Local IP detected, using fallback public IP for testing.');
      ip = '110.224.171.77 '; 
    }

    const locationRes = await axios.get(`http://ip-api.com/json/${ip}`);
    if (locationRes.data.status !== 'success') {
      return res.status(400).json({ error: 'Could not determine location' });
    }

    const { city, lat, lon } = locationRes.data;

    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: process.env.OPENWEATHER_API_KEY
        }
      }
    );

    res.json({
      user_location: {
        ip,
        city,
        lat,
        lon
      },
      weather: weatherRes.data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});



// Calendar API route
// app.get('/api/calendar/events', async (req, res) => {
//   try {
//     const auth = new google.auth.GoogleAuth({
//       credentials: {
//         client_id: process.env.GOOGLE_CLIENT_ID,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET,
//         refresh_token: req.headers.refresh_token
//       },
//       scopes: ['https://www.googleapis.com/auth/calendar.readonly']
//     });

//     const calendar = google.calendar({ version: 'v3', auth });
//     const now = new Date();
//     const events = await calendar.events.list({
//       calendarId: 'primary',
//       timeMin: now.toISOString(),
//       maxResults: 5,
//       singleEvents: true,
//       orderBy: 'startTime'
//     });

//     res.json(events.data.items);
//   } catch (error) {
//     console.error('Calendar API error:', error);
//     res.status(500).json({ error: 'Failed to fetch calendar events' });
//   }
// });

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

app.get('/api/ip', (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',').shift() || req.socket.remoteAddress;
  res.json({ ip });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
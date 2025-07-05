import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { google } from 'googleapis';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });


// Weather API route
app.get("/api/weather", async (req, res) => {
  try {
    // Default to New York coordinates if IP lookup fails
    let location = {
      city: "New York",
      lat: 40.7128,
      lon: -74.0060
    };

    // Try to get location from IP if not in development
    try {
      const ip = req.headers["x-forwarded-for"]?.split(',')[0] || req.socket.remoteAddress;
      if (ip && ip !== '::1' && !ip.startsWith('127.')) {
        const locationRes = await axios.get(`http://ip-api.com/json/${ip}`);
        if (locationRes.data.status === "success") {
          location = {
            city: locationRes.data.city,
            lat: locationRes.data.lat,
            lon: locationRes.data.lon
          };
        }
      }
    } catch (locationError) {
      console.log("Using default location due to error:", locationError.message);
    }

    // Get weather from WeatherAPI
    const weatherRes = await axios.get(
      `http://api.weatherapi.com/v1/current.json`,
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: `${location.lat},${location.lon}`,
          aqi: 'no'
        }
      }
    );

    const weatherData = weatherRes.data;
    const weatherMain = weatherData.current.condition.text.toLowerCase();

    // Map WeatherAPI conditions to our track categories
    let weatherCategory = "Clear";
    if (weatherMain.includes('rain')) {
      weatherCategory = "Rain";
    } else if (weatherMain.includes('cloud')) {
      weatherCategory = "Clouds";
    } else if (weatherMain.includes('snow')) {
      weatherCategory = "Snow";
    } else if (weatherMain.includes('thunder') || weatherMain.includes('storm')) {
      weatherCategory = "Thunder";
    }

    const tracks = weatherTracks[weatherCategory] || weatherTracks["Clear"];
    const randomTrackId = tracks[Math.floor(Math.random() * tracks.length)];

    res.json({
      user_location: {
        city: location.city,
        lat: location.lat,
        lon: location.lon
      },
      weather: {
        main: weatherCategory,
        temp: weatherData.current.temp_c,
        condition: weatherData.current.condition
      },
      trackId: randomTrackId,
    });
  } catch (err) {
    console.error("Weather API error:", err.response?.data || err.message);
    res.status(500).json({ 
      error: "Failed to fetch weather",
      details: err.response?.data?.error?.message || err.message 
    });
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

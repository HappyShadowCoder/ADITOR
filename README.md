# Code Editor Backend

Backend server for a web-based code editor with integrated weather, calendar, and AI assistant features.

## Features

- Weather API integration (OpenWeatherMap)
- Calendar API integration (Google Calendar)
- AI Code Assistant (OpenAI)
- RESTful API endpoints

## Setup Instructions

1. Clone the repository
2. Create a `.env` file based on `.env.example` and fill in your API keys:
   - OpenWeatherMap API key
   - Google Calendar credentials
   - OpenAI API key

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

- `GET /api/weather/:location` - Get current weather for a location
- `GET /api/calendar/events` - Get next calendar events
- `POST /api/ai/analyze` - Analyze code with AI assistant

## Environment Variables

- `OPENWEATHER_API_KEY` - OpenWeatherMap API key
- `GOOGLE_API_KEY' - Gemini Key
- `PORT` - Server port (default: 3000)

import Clock from "./Clock";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function TopBar({
  classname,
  theme,
  switchTheme,
  weather, // Keep this prop if you still want to allow manual override
  handleweather, // Keep this prop if you still want to allow manual override
  runCode,
}) {
  const [name, setname] = useState("main");
  const [displayname, setdisplayname] = useState("main");
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [currentWeatherCondition, setCurrentWeatherCondition] = useState("sunny"); // Default

  useEffect(() => {
    const interval = setInterval(() => {
      const lang = sessionStorage.getItem("ext") || "txt";
      setdisplayname(`${name}.${lang}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [name]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Use the API key from environment variables
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        // Default to New Delhi coordinates, you can make this dynamic if needed
        const lat = 28.6139;
        const lon = 77.2090;
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCurrentTemperature(Math.round(data.main.temp));
        setCurrentWeatherCondition(data.weather[0].main.toLowerCase());
        
        if (handleweather) {
          const openWeatherCondition = data.weather[0].main.toLowerCase();
          let emojiValue = "sunny"; // Default to sunny
          
          if (openWeatherCondition.includes("rain")) {
            emojiValue = "rain";
          } else if (openWeatherCondition.includes("cloud")) {
            emojiValue = "cloudy";
          } else if (openWeatherCondition.includes("mist") || openWeatherCondition.includes("fog")) {
            emojiValue = "mist";
          } else if (openWeatherCondition.includes("snow")) {
            emojiValue = "snow";
          } else if (openWeatherCondition.includes("thunder")) {
            emojiValue = "thunder";
          }
          
          handleweather(emojiValue);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        // Set default values in case of error
        setCurrentTemperature(25); // Default temperature
        setCurrentWeatherCondition("sunny");
        if (handleweather) handleweather("sunny");
      }
    };

    fetchWeatherData();
  }, [handleweather]); // Re-run if handleweather changes

  // Function to map OpenWeatherMap conditions to your emoji options
  const mapWeatherToEmoji = (condition) => {
    if (!condition) return "☀️"; // Default
    const lowerCaseCondition = condition.toLowerCase();
    if (lowerCaseCondition.includes("clear")) return "☀️";
    if (lowerCaseCondition.includes("rain")) return "🌧️";
    if (lowerCaseCondition.includes("cloud")) return "☁️";
    if (lowerCaseCondition.includes("mist") || lowerCaseCondition.includes("fog")) return "🌫️";
    if (lowerCaseCondition.includes("snow")) return "❄️";
    if (lowerCaseCondition.includes("thunder")) return "⛈️";
    return "☀️"; // Default if no match
  };


  return (
    <div className="absolute top-0 left-0 w-screen h-10 z-50">
      <div className={classname}>
        <div className="flex justify-between items-center px-5 py-4">
          <div className="flex items-center space-x-4">
            <Clock className="text-xl font-bold text-[#00f5c9]" />
            <p
              id="temperature"
              className="font-semibold text-lg text-white/90"
              style={{ fontFamily: "Satoshi" }}
            >
              {currentTemperature !== null ? `${currentTemperature}°C` : "Loading..."}
            </p>
            <select
              value={weather || mapWeatherToEmoji(currentWeatherCondition)} // Use fetched weather or prop
              onChange={(e) => handleweather(e.target.value)}
              className="bg-black/20 text-white py-2 px-2 rounded-full font-semibold outline-none text-lg w-14 text-center"
            >
              <option value="sunny">☀️</option>
              <option value="rain">🌧️</option>
              <option value="cloudy">☁️</option>
              <option value="mist">🌫️</option>
              <option value="snow">❄️</option>
              <option value="thunder">⛈️</option>
            </select>
          </div>

          <div className="flex items-center space-x-10">
            <button
              onClick={switchTheme}
              aria-label="Toggle theme"
              className={`text-2xl hover:scale-110 transition-transform duration-300 rounded-full
                ${theme === "dark" ? "bg-black" : "bg-white"}`}
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>

            <input
              placeholder="Enter filename"
              type="text"
              disabled
              value={displayname}
              onChange={(e) => setname(e.target.value)}
              className="w-[100px] h-full bg-white/50 p-1 rounded-xl text-black font-bold"
              style={{ fontFamily: "Oswald" }}
            />

            <button
              onClick={runCode}
              aria-label="Run code"
              className="px-3 py-1 rounded-md font-bold text-sm hover:scale-110 transition-transform duration-300
              bg-gradient-to-r from-[#00f5c9] to-[#0ff] text-black shadow "
            >
              ▶ Run
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-lg" style={{ fontFamily: "Satoshi" }}>
              Monday, 24th July
            </p>
            <div className="flex space-x-2 px-2">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 2,
                  delay: 0,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="w-3 h-3 rounded-full bg-red-500"
              ></motion.div>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 2,
                  delay: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="w-3 h-3 rounded-full bg-yellow-500"
              ></motion.div>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 2,
                  delay: 3,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="w-3 h-3 rounded-full bg-green-500"
              ></motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
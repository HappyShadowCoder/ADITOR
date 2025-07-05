import Clock from "../Clock";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function TopBar({classname, theme, switchTheme, weather, handleweather}) {
    const navigate = useNavigate()
    const [name, setname] = useState("main");
    const [displayname, setdisplayname] = useState("main");
    const [temperature, setTemperature] = useState("--");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
        const lang = sessionStorage.getItem("ext") || "txt";
        setdisplayname(`${name}.${lang}`);
        }, 1000);

        return () => clearInterval(interval);
    }, [name]);

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000);

        // Fetch weather data
        const fetchWeather = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/weather');
                const temp = Math.round(response.data.weather.temp);
                setTemperature(temp);

                // Update weather icon based on condition
                const weatherCondition = response.data.weather.condition.text.toLowerCase();
                if (weatherCondition.includes('rain')) {
                    handleweather('rain');
                } else if (weatherCondition.includes('cloud')) {
                    handleweather('cloudy');
                } else if (weatherCondition.includes('snow')) {
                    handleweather('snow');
                } else if (weatherCondition.includes('thunder') || weatherCondition.includes('storm')) {
                    handleweather('thunder');
                } else {
                    handleweather('sunny');
                }
            } catch (error) {
                console.error('Error fetching weather:', error);
                setTemperature("--");
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
        const weatherInterval = setInterval(fetchWeather, 15 * 60 * 1000); // Update every 15 minutes

        return () => {
            clearInterval(interval);
            clearInterval(weatherInterval);
        };
    }, []);

    return (
        <>
            <div className="absolute top-0 left-0 w-screen h-10 z-50">
                <div className={classname}>
                    <div className="flex justify-between items-center px-5 py-4">

        <div className="flex items-center space-x-4">
                <Clock className="text-2xl font-bold text-[#00f5c9]" />
                {loading ? (
                    <div className="w-12 h-6 bg-gray-700/50 rounded animate-pulse"></div>
                ) : (
                    <p id="temperature" className="font-semibold text-lg text-white/90" style={{ fontFamily: "Satoshi" }}>
                        {temperature}°C
                    </p>
                )}
                <select
              value={weather}
              onChange={(e) => {handleweather(e.target.value)}}
              className="bg-black/20 text-white py-2 px-2 rounded-full font-semibold outline-none text-lg w-14 text-center"
            >
              <option value="sunny">☀️</option>
              <option value="rain">🌧️</option>
              <option value="cloudy">☁️</option>
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
            className="w-[100px] h-full bg-white/50 p-1 rounded-xl text-black
            font-bold" style={{fontFamily:"Oswald"}}>
            </input>
            

            <button onClick={() => navigate('/settings')}
            className="text-lg hover:text-[#00f5c9] hover:scale-110 transition-transform duration-300">⚙️</button>

        </div>
        <div className="flex items-center space-x-4">
            <p className="text-lg"
            style={{fontFamily:"Satoshi"}}
            > {currentDate.toLocaleDateString()}</p>
            <div className="flex space-x-2 px-2">
                <motion.div 
                    initial={{scale:1}}
                    animate={{scale:[1,1.5,1]}}
                    transition={{duration:2, delay:0, repeat:Infinity, repeatDelay:3}}
                    className="w-3 h-3 rounded-full bg-red-500">
                </motion.div>
                <motion.div 
                    initial={{scale:1}}
                    animate={{scale:[1,1.5,1]}}
                    transition={{duration:2, delay:1.5, repeat:Infinity, repeatDelay:3}}
                    className="w-3 h-3 rounded-full bg-yellow-500">
                </motion.div>
                <motion.div 
                    initial={{scale:1}}
                    animate={{scale:[1,1.5,1]}}
                    transition={{duration:2, delay:3, repeat:Infinity, repeatDelay:3}}
                    className="w-3 h-3 rounded-full bg-green-500">
                </motion.div>
            </div>
        </div>


                    </div>
                </div>
            </div>
        </>
    )
}
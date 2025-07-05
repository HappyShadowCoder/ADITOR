import {motion} from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom";


export default function EditorPref() {
    const [weather, setWeather] = useState(sessionStorage.getItem("weather") || "rain");
    const [mode, setmode] = useState(sessionStorage.getItem("mode") || "dark");
    const [fontsize, setfontsize] = useState(parseInt(sessionStorage.getItem("fontsize")) || 18)
    const [font, setfont] = useState(parseInt(sessionStorage.getItem("font")) || "sans-serif")
    const navigate = useNavigate()
    const updateweather = (e) => {
      setWeather(e);
      sessionStorage.setItem("weather",e);

    }

    const updatetheme = (e) => {
      setmode(e)
      sessionStorage.setItem("mode",e)
    }

    const handlefontsizechange = (e) => {
      setfontsize(e)
      sessionStorage.setItem("fontsize",e);
    }

    const handlefontchange = (e) => {
      setfont(e)
      sessionStorage.setItem("font",e);
    }

    return (
        <>
        <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-md shadow-2xl text-white"
        style={{ fontFamily: "Satoshi" }}
        >
 <h2 className="text-2xl font-bold mb-6 text-center">Editor Preferences</h2>

      <div className="space-y-6">

        {/* Theme selection */}
        <div>
          <label className="block mb-1 text-sm font-medium">Theme</label>
          <select 
          value = {mode}
          onChange={(e) => updatetheme(e.target.value)}
          className="w-full h-10 px-4 rounded-xl bg-white/30 text-black font-semibold">
            <option>System Default</option>
            <option>dark</option>
            <option>light</option>
          </select>
        </div>

        {/* Weather background toggle */}
        <div className="flex items-center space-x-5">
          <label className="text-sm font-medium">Weather Background</label>
            <select
              value={weather}
              onChange={(e) => updateweather(e.target.value)}
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

        {/* Music toggle */}
        <div className="flex items-center justify-between space-x-5">
          <label className="text-sm font-medium whitespace-nowrap">Add Playlist ID: </label>
          <input type="textbox" className="w-full h-10 px-4 rounded-xl bg-white/30 text-black font-semibold placeholder:text-gray-700" />
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-white">Text Size</label>
            <input
            value={fontsize}
            onChange={(e) => handlefontsizechange(e.target.value)}
            type="number"
            min="8"
            max="48"
            placeholder="14"
            className="w-full h-10 px-4 rounded-xl bg-white/30 text-black font-semibold placeholder:text-gray-700"
            />
        </div>

        <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-white">Font</label>
            <select 
            value={font}
            onChange={(e) => handlefontchange(e.target.value)}
            className="w-full h-10 px-4 rounded-xl bg-white/30 text-black font-semibold">
            <option>Satoshi</option>
            <option>Oswald</option>
            <option>Sans Serif</option>
            <option>JetBrains Mono</option>
            </select>
        </div>
        </div>


        <div className="text-center pt-4">
          <motion.button
          onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/90 text-black px-6 py-2 rounded-full font-bold shadow-md hover:bg-white"
          >
            Save Preferences
          </motion.button>
        </div>
      </div>

        </motion.div>
        </>
    )
}
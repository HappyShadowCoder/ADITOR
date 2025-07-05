import astronaut from "../assets/astronaut.svg";
import StarBackground from "./Components/StarBackground";
import {motion} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function NotFound() {
    
    const navigate = useNavigate()
    const { content, i18n } = useTranslation();

  return (
    <>
    <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden text-white font-mono
    flex flex-col justify-center items-center z-10">
      {/* Floating astronaut */}
        <motion.img
        src={astronaut}
        alt="astronaut"
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, -10, 20, 10, 0], y: [0, -20, 0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="w-40 md:w-52"
        />

        <p className="text-6xl md:text-9xl text-gray-300 my-5" style={{fontFamily:"Oswald"}}>Lost In Space?</p>
        <button onClick={() => navigate(-1)} 
        className="relative inline-block group cursor-pointer text-white px-6 py-3 hover:shadow-white hover:shadow-lg transition-all duration-500 delay-500 ease-in-out
        hover:backdrop-blur-md">
        Back to Future

        <span className="absolute left-0 bottom-0 h-0.5 w-full origin-left scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100"></span>
        
        <span className="absolute left-0 bottom-0 w-0.5 h-full origin-bottom scale-y-0 bg-white transition-transform duration-500 delay-100 group-hover:scale-y-100"></span>

        <span className="absolute right-0 top-0 w-0.5 h-full origin-top scale-y-0 bg-white transition-transform duration-500 delay-200 group-hover:scale-y-100"></span>

        <span className="absolute left-0 top-0 h-0.5 w-full origin-right scale-x-0 bg-white transition-transform duration-500 delay-300 group-hover:scale-x-100"></span>
        </button>
    </div>



    <StarBackground></StarBackground>
    </>
  );
}

import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion } from "framer-motion";
import astronaut from "../../../assets/astronaut.svg"
const speak = (text) => {
    if (!text) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 200;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

}


export default function BottomPanel({classname}) {
    const welcomeText = "Helllo and welcome to ADITOR, an AI based code editor, as you can see we have the header with time, temperature and other detials, we also have switchable modes, we have our center editor with output, terminal, files, and then the bottom with spotify, Error page and more, Feel free to visit our settings page too!"

    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    const { t, i18n } = useTranslation();

    return (
        <>
        <div className="h-full w-full">
        <div className={`${classname} rounded-xl p-2`}>
            <div className="text-white font-mono rounded-xl
            flex space-x-5">
                <div className="relative min-w-[400px] h-20 ml-2 mr-2 rounded-xl overflow-hidden">
                    {/* Banner / Loader */}
                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 text-white text-sm font-semibold backdrop-blur-md">
                            <motion.img
                            initial={{x:350}}
                            animate={{x:-20}}
                            transition={{duration:4, delay:0}}
                            src={astronaut}
                            className="w-12 h-24">
                            </motion.img>
                            <motion.p
                            initial={{ clipPath: 'inset(0 0 0 100%)'}}
                            animate={{ clipPath: 'inset(0 0 0 0%'}}
                            transition={{duration:2.3, delay:1.1}}
                            className="text-xl font-bold">
                                Spotify is loading...
                            </motion.p>
                        </div>
                    )}

                    {/* Iframe */}
                    <iframe
                        className="rounded-xl w-full h-full"
                        src="https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp?utm_source=generator"
                        frameBorder="0"
                        onLoad={() => {setTimeout(() => setIsLoaded(true), 3000);}}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                    </div>
             
            <div className="flex-1 rounded-xl">
                <div className="overflow-hidden h-full
                     flex space-x-5 mr-2 justify-center items-center">
                            <button className="px-5 py-5 rounded-xl bg-black font-bold
                            hover:bg-blue-300/40 transition-all duration-300 ease-in-out">{t('button_checkcode')}</button>
                            <button className="px-5 py-5 rounded-xl bg-black font-bold
                            hover:bg-blue-300/40 transition-all duration-300 ease-in-out">{t('button_ask_gemini')}</button>
                            <button onClick={() => navigate('*')} 
                            className="px-5 py-5 rounded-xl bg-black font-bold
                            hover:bg-blue-800/40 transition-all duration-300 ease-in-out">{t('button_404')}</button>
                            <button onClick={() => speak(welcomeText)} 
                            className="px-5 py-5 rounded-xl bg-black font-bold
                            hover:bg-blue-800/40 transition-all duration-300 ease-in-out">{t('button_hear_page')}</button>
                            <button onClick={() => navigate("/settings")} 
                            className="px-5 py-5 rounded-xl bg-black font-bold
                            hover:bg-blue-800/40 transition-all duration-300 ease-in-out">{t('button_settings')}</button>
                    </div>
            </div>
             </div>
             </div>   
        </div>
        </>
    )
}
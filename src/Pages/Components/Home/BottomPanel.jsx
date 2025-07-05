import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion } from "framer-motion";
import astronaut from "../../../assets/astronaut.svg"

export default function BottomPanel({classname, mode}) {
    const [speaking, setSpeaking ] = useState(false);
    const welcomeText = '\
We are team CODE BLOODED and we have created an aware and advanced code editor!\
The background changes dynamically using the weather outside, or, well you can force it by clicking on the icon at the top left,\
We also have dark and light modes, toggle able from the settings OR the nav bar\
The console automatically detects your language, u can run a sample program like\
console.log("Hello from Team CODE BLOODED")\
We have included a 4 o 4 page, which is really cute and interactive, and pops up whenver we mess up a url, oops,\
And we also have a custom loading box which you can see when you reload the page, in the spotify section, A cute astronaut slides up with text appearing, P.S. he was fixing our backend lol,\
We also have a welcome message which uses TTS api, its not fantastic but its something :) \
We have a settings panel also, Along with music of your choice By Spotify at the bottom left,\
Thank you for visiting.!'

    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    const { t, i18n } = useTranslation();

    const speak = (text) => {
    if (!text) return;

    if (speaking){
        window.speechSynthesis.cancel()
        setSpeaking(false)        
        return;
    }

    setSpeaking(true)
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 200;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}



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
                        src="https://open.spotify.com/embed/track/131yybV7A3TmC34a0qE8u8?utm_source=generator"
                        frameBorder="0"
                        onLoad={() => {setTimeout(() => setIsLoaded(true), 3000);}}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                    </div>
             
            <div className="flex-1 rounded-xl">
                <div className="overflow-hidden h-full
                     flex space-x-5 mr-2 justify-center items-center">
                            <button className={`px-5 py-5 rounded-xl font-bold bg-gradient-to-br
                            ${mode==="dark"? "from-purple-800 to-blue-800 hover:from-blue-800 hover:to-purple-800":
                                "from-yellow-800 to-orange-800 hover:from-orange-700 hover:to-yellow-700"}
                                transition-all duration-300 ease-in-out`}>{t('button_checkcode')}</button>
                            <button className={`px-5 py-5 rounded-xl font-bold bg-gradient-to-br
                            ${mode==="dark"? "from-purple-800 to-blue-800 hover:from-blue-800 hover:to-purple-800":
                                "from-yellow-800 to-orange-800 hover:from-orange-700 hover:to-yellow-700"}
                                transition-all duration-300 ease-in-out`}>{t('button_ask_gemini')}</button>
                            <button onClick={() => navigate('*')} 
                            className={`px-5 py-5 rounded-xl font-bold bg-gradient-to-br
                            ${mode==="dark"? "from-purple-800 to-blue-800 hover:from-blue-800 hover:to-purple-800":
                                "from-yellow-800 to-orange-800 hover:from-orange-700 hover:to-yellow-700"}
                                transition-all duration-300 ease-in-out`}>{t('button_404')}</button>
                            <button onClick={() => speak(welcomeText)} 
                            className={`px-5 py-5 rounded-xl font-bold bg-gradient-to-br
                            ${mode==="dark"? "from-purple-800 to-blue-800 hover:from-blue-800 hover:to-purple-800":
                                "from-yellow-800 to-orange-800 hover:from-orange-700 hover:to-yellow-700"}
                                transition-all duration-300 ease-in-out`}>{t('button_hear_page')}</button>
                            <button onClick={() => navigate("/settings")} 
                            className={`px-5 py-5 rounded-xl font-bold bg-gradient-to-br
                            ${mode==="dark"? "from-purple-800 to-blue-800 hover:from-blue-800 hover:to-purple-800":
                                "from-yellow-800 to-orange-800 hover:from-orange-700 hover:to-yellow-700"}
                                transition-all duration-300 ease-in-out`}>{t('button_settings')}</button>
                    </div>
            </div>
             </div>
             </div>   
        </div>
        </>
    )
}
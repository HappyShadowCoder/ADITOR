import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";
import EditorPanel from "./Components/Home/EditorPanel";
import TopBar from "./Components/Home/TopBar";
import BottomPanel from "./Components/Home/BottomPanel";


const speak = (text) => {
    if (!text) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

export default function Aditor(){
    const [weather, setweather] = useState(sessionStorage.getItem("weather" || "rain"));
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

      {/*useEffect(() => {
        fetch('http://localhost:3000/api/weather')
            .then(response => response.json())
            .then(data => {
                console.log("User Location:", data.user_location);
                console.log("Weather:", data.weather.main.temp);
                console.log("Suggested Track ID:", data.trackId);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
        }, []);*/} 

    const handleweather = (e) => {
        setweather(e);
        sessionStorage.setItem(e);
    }

    const [mode, setmode] = useState(sessionStorage.getItem("mode") || "dark"); 
    
    const switchTheme = () => {
        if(mode==="dark"){
            setmode("light")
            sessionStorage.setItem("mode","light")
        }
        else{
            setmode("dark")
            sessionStorage.setItem("mode","dark")
        }
    }

    return (
        <>
            <TopBar classname={mode==="dark"?
"bg-gradient-to-br from-[#0f0c29]/80 via-[#1f1c4c]/70 to-[#302b63]/70 text-[#e0e0e0]"
    :
"bg-gradient-to-br from-[#fdfbfb]/80 via-[#fceabb]/70 to-[#ffdde1]/70 text-[#222831]"
            } 
            theme={mode} switchTheme={switchTheme} weather={weather} handleweather={handleweather}/>

            <div className="absolute top-0 left-0 overflow-x-hidden
            w-screen h-screen z-2 flex flex-col justify-between">
                

                <div className="flex mt-18 flex-1 ">

                    <div className="flex-1 bg-black/20 z-2
                    rounded-xl mx-5 my-2 h-fit">
                        <EditorPanel classname={mode==="dark"?
"bg-gradient-to-br from-[#0f0c29]/80 via-[#1f1c4c]/70 to-[#302b63]/70 text-[#e0e0e0]"
    :
"bg-gradient-to-br from-[#fdfbfb]/80 via-[#fceabb]/70 to-[#ffdde1]/70 text-[#222831]"
                        }></EditorPanel>
                    </div>

            </div>

            <div className="mb-2 mx-5">
                    <BottomPanel classname={mode==="dark"?
"bg-gradient-to-br from-[#0f0c29]/80 via-[#1f1c4c]/70 to-[#302b63]/70 text-[#e0e0e0]"
    :
"bg-gradient-to-br from-[#fdfbfb]/80 via-[#fceabb]/70 to-[#ffdde1]/70 text-[#222831]"
                        }></BottomPanel>

            </div>
        </div>
                
            
            <div className="absolute top-0 left-0 w-scren h-screen overflow-hidden
            x-0">
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                <video
                    src={`./${weather}.mp4`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                </div>
            </div>

            <div className="absolute top-0 left-0 w-screen h-[100vh] z-1 overflow-x-hidden
            backdrop-blur-sm">
            </div>
        </>
    )
}
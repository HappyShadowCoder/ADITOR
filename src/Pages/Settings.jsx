import rain from "../assets/rain2.mp4"
import { useState } from "react";
import Account from "./Components/Account";
import Profile from "./Components/Profile"
import EditorPref from "./Components/EditorPref";
import Language from "./Components/Language"

import { useNavigate } from "react-router-dom";
export default function Settings() {
    
    const [weather, setWeather] = useState(sessionStorage.getItem("weather") || "rain");
    const [mode, setmode] = useState(sessionStorage.getItem("mode") || "dark");
    const [state, setstate] = useState('account');
    const navigate = useNavigate()
    return (
        <>

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

        <div className="absolute top-0 left-0 w-screen h-screen z-1 bg-black/20
            backdrop-blur-sm">
        </div>

        <div className="absolute flex top-0 left-0 w-screen h-screen z-50
        px-2 py-5 space-x-[32px]">

            <div className={`flex flex-col max-w-[232px] flex-1 h-full ${mode==="dark"? "bg-black/60":"bg-white/60"}
            rounded-xl py-15`}>
                <div className="flex flex-col text-left px-5 text-xl 
                justify-center h-full space-y-5">
                    <button onClick={() => setstate('account')} 
                    className={`${state==='account'? mode==="dark"? "bg-white/60":"bg-black/60" : mode==="dark"? "bg-transparent hover:bg-white/30":"bg-transparent hover:bg-black/30"}
                    px-5 rounded-full py-1 transition-all duration-500 ease-in-out
                    flex items-center`} style={{fontFamily:"Oswald"}}>Account</button>
                    <button onClick={() => setstate('profile')} 
                    className={`${state==='profile'? mode==="dark"? "bg-white/60":"bg-black/60" : mode==="dark"? "bg-transparent hover:bg-white/30":"bg-transparent hover:bg-black/30"}
                    px-5 rounded-full py-1 transition-all duration-500 ease-in-out
                    flex items-center`} style={{fontFamily:"Oswald"}}>Profile</button>
                    <button onClick={() => setstate('editor')} 
                    className={`${state==='editor'? mode==="dark"? "bg-white/60":"bg-black/60" : mode==="dark"? "bg-transparent hover:bg-white/30":"bg-transparent hover:bg-black/30"}
                    px-5 rounded-full py-1 transition-all duration-500 ease-in-out
                    flex items-center`} style={{fontFamily:"Oswald"}}>Editor</button>
                    <button onClick={() => setstate('language')} 
                    className={`${state==='language'? mode==="dark"? "bg-white/60":"bg-black/60" : mode==="dark"? "bg-transparent hover:bg-white/30":"bg-transparent hover:bg-black/30"}
                    px-5 rounded-full py-1 transition-all duration-500 ease-in-out
                    flex items-center`} style={{fontFamily:"Oswald"}}>Language</button>
                    <button onClick={() => navigate(-1)}
                    className={`${state==='back'? mode==="dark"? "bg-white/60":"bg-black/60" : mode==="dark"? "bg-transparent hover:bg-white/30":"bg-transparent hover:bg-black/30"}
                    px-5 rounded-full py-1 transition-all duration-500 ease-in-out
                    flex items-center`} style={{fontFamily:"Oswald"}}>Back</button>
                </div>
            </div>
            <div className="flex flex-col flex-1 h-full
            rounded-xl justify-center items-center">
                {
                    state==='account'? (
                        <Account></Account>
                    ) : null
                }
                {
                    state==='profile'? (
                        <Profile></Profile>
                    ) : null
                }
                {
                    state==='editor'? (
                        <EditorPref></EditorPref>
                    ) : null
                }
                {
                    state==='language'? (
                        <Language></Language>
                    ) : null
                }
            </div>
        </div>
        </>
    )
}
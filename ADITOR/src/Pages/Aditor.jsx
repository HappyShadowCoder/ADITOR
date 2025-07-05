import { useState } from "react"
import rain from "../assets/rain2.mp4"

const files = [
    "abs.jsx",
    "java.jsx",
    "newfile.jsx"
]
export default function Aditor(){
    const [weather, setweather] = useState('rainy');
    return (
        <>
            <div className="absolute top-0 left-0 w-scren h-screen overflow-hidden
            x-0">
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                <video
                    src={rain}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                </div>
            </div>

            <div className="absolute top-0 left-0 w-screen h-screen z-1
            backdrop-blur-sm">
            </div>

            <div className="absolute top-0 left-0 
            w-screen h-screen z-2 flex flex-col justify-center">
                
                <div className="flex justify-center pb-10">
                    <div className="flex w-fit bg-black/80 rounded-full 
                    m-1 px-4 py-2 space-x-2 justify-between items-center">
                        <p className="text-white font-bold text-xl">19:45</p>
                        {/*Add spotify here*/}
                        <p className="text-white font-bold text-xl"> 34*C 🌧️</p>
                    </div>
                </div>

                <div className="flex pb-5">

                    <div className="w-[220px] bg-black/40 mx-5 rounded-xl
                    flex-col h-fit">
                        <div className="flex flex-col">
                            <div className="flex text-xl font-bold
                            justify-between items-center px-4 py-2">
                                <p>Files</p>
                                <button className="bg-black/80 w-15 h-8 pb-1 flex 
                                justify-center items-center 
                                rounded-full hover:bg-blue-300/50 transition-all duration-300
                                ease-in-out">+</button>
                            </div>
                        </div>
                        <hr className="border-t-2 border-black"/>
                        <div className="flex flex-col space-y-2">
                            {files.map((file, index) => (
                                <button className="text-left px-3 text-lg 
                                font-light mx-2 my-2 bg-black/60 rounded-xl py-2
                                hover:bg-blue-300/50 transition-all duration-300
                                ease-in-out">
                                    {file}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 h-[80vh] bg-black/20 z-2
                    rounded-xl mx-5 h-fit">
                        <div className="rounded-xl bg-black/20 w-fit h-10 p-2 m-1">
                            new.jsx
                        </div>
                        <hr className="border-t-1 border-black"/>
                        <textarea
                        rows={15}
                        placeholder="Start Typing"
                        className="
                            w-full 
                            h-[50vh] 
                            rounded-xl 
                            border-transparent
                            outline-none
                            ring-0
                            p-4

                            focus:outline-none       /* drop default outline */
                            focus:ring-0             /* drop default ring */
                            focus:border-0    /* keep border gray on focus */
                        "
                        />
                        <hr className="border-t-1 border-black"/>
                        <textarea
                        rows={15}
                        placeholder="Output goes here"
                        className="
                            w-full 
                            h-[20vh] 
                            rounded-xl 
                            border-transparent
                            outline-none
                            ring-0
                            p-4
                            
                            focus:outline-none       /* drop default outline */
                            focus:ring-0             /* drop default ring */
                            focus:border-0    /* keep border gray on focus */
                        "
                        />
                    </div>


                    <div className="w-[220px] overflow-hidden h-fit
                     flex flex-col space-y-5 mr-2">
                            <button className="px-5 py-2 rounded-xl bg-black font-bold
                            hover:bg-blue-300/40 transition-all duration-300 ease-in-out">Check Code</button>
                            <button className="px-5 py-2 rounded-xl bg-black font-bold
                            hover:bg-blue-300/40 transition-all duration-300 ease-in-out">Execute</button>
                            <button className="px-5 py-2 rounded-xl bg-black font-bold
                            hover:bg-blue-300/40 transition-all duration-300 ease-in-out">Set Deadline</button>
                    </div>
                </div>
                
            </div>
        </>
    )
}
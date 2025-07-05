import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';

import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import { useEffect, useState } from 'react';

const files = [
    "Pragati_Jain.Leader",
    "Avichal_Khanna.Frontend",
    "Swastiek_Kala.Backend",
    "Mitakshi_Sinha.EmoSupport"
]

export default function EditorPanel({ classname }) {

    const [code, updatecode] = useState();
    const [cmd, setCmd] = useState();
    const [output, setOutput] = useState();
    hljs.registerLanguage('js', javascript);
    hljs.registerLanguage('py', python);
    hljs.registerLanguage('java', java);

    const [detectedlangauge, updatelanguage] = useState();

    const handleRun = () => {
        console.log("run")
    }

    const updatecodefunction = (e) => {
    const code = e.target.value;
    updatecode(code);

    const detected = hljs.highlightAuto(code).language;
    console.log(sessionStorage.getItem("ext"))
    if (detected && detected !== detectedlangauge) {
        updatelanguage(detected);
        sessionStorage.setItem("ext", detected);
    }
    };

    return (
        <>
        <div className={`${classname} rounded-xl px-5 py-3`}>
            <div className="text-white font-mono w-full rounded-xl
            flex space-x-5">
                
                <textarea
                    value={code}
                    onChange={(e) => updatecodefunction(e)}
                    placeholder="Start typing..."
                    rows={20}
                    spellCheck={false}
                    className={`
                        w-full p-4 rounded-xl resize-none outline-none font-mono
                        bg-black/30 text-[#f8f8f2] placeholder:text-gray-400
                        border border-white/10 focus:ring-2 focus:ring-[#00f5c9]
                        transition-all duration-300 shadow-inner

                        dark:bg-black/40 dark:text-[#f8f8f2] dark:placeholder:text-gray-500
                        light:bg-white/50 light:text-[#1f1f1f] light:placeholder:text-gray-600
                    `}
                />

            <div className="w-full md:w-[40%] lg:w-[35%] xl:w-[30%] space-y-3">
                
                {/* Output */}
                <div>
                <h2 className="text-lg font-semibold mb-1 text-[#fcb045]"> Output</h2>
                <pre className="w-full p-4 rounded-xl bg-black/30 border border-white/10 text-[#00ff90]
                    font-mono text-sm whitespace-pre-wrap shadow-inner backdrop-blur-md h-40 overflow-y-auto">
                    {output || "// Only JSX codes will be executed for now."}
                </pre>
                </div>

                {/* Terminal */}
                <div>
                <h2 className="text-lg font-semibold mb-1 text-[#89f7fe]">Terminal</h2>
                <input
                    type="text"
                    value={cmd}
                    onChange={(e) => setCmd(e.target.value)}
                    placeholder=">>> Enter your command"
                    className="h-16 w-full px-4 py-2 rounded-lg font-mono text-sm
                    bg-black/30 text-[#f8f8f2] placeholder:text-[#888]
                    border border-white/10 outline-none focus:ring-2 focus:ring-[#00f5c9]
                    shadow transition-all duration-300 ease-in-out"
                />
                </div>
                
                <div className="w-full rounded-xl mt-2
                    flex-col h-fit">
                        <div className="flex flex-col">
                            <div className="flex text-xl font-bold
                            justify-between items-center px-4 py-2">
                                <div className='w-15'></div>
                                <h2 className="text-lg font-semibold mb-1 text-[#89f45e]">Files</h2>
                                <button className="bg-black/80 w-15 h-8 pb-1 flex 
                                justify-center items-center 
                                rounded-full hover:bg-blue-300/50 transition-all duration-300
                                ease-in-out">+</button>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1  max-h-[130px] overflow-y-scroll">
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

            </div>
            </div>

        </div>
        </>
    )
}
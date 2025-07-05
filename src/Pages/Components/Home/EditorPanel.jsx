import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';

import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import { useState } from 'react';

const files = [
  "Pragati_Jain.Leader",
  "Avichal_Khanna.Frontend",
  "Swastiek_Kala.Backend",
  "Mitakshi_Sinha.EmoSupport"
];

// Register languages once
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('py', python);
hljs.registerLanguage('java', java);

export default function EditorPanel({ classname, code, setCode, output }) {
  const [cmd, setCmd] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [activeFile, setActiveFile] = useState(files[0]); // State for active file

  const updateCodeFunction = (e) => {
    const codeValue = e.target.value;
    setCode(codeValue);

    // Language detection logic (can be re-enabled if multi-language is brought back)
    const detected = hljs.highlightAuto(codeValue, ['javascript', 'python', 'java']).language; // Specify languages to detect
    if (detected && detected !== detectedLanguage) {
      setDetectedLanguage(detected);
      sessionStorage.setItem("ext", detected); // Store detected extension
    } else if (!detected && detectedLanguage) {
        // If no language is detected, clear the previous detection
        setDetectedLanguage('');
        sessionStorage.removeItem("ext");
    }
  };

  const handleFileClick = (file) => {
    setActiveFile(file);
    // In a real application, you would load the content of 'file' into the editor here.
    // For now, we are just updating the active file state for visual indication.
    console.log(`File clicked: ${file}. In a real app, its content would load.`);
    // Example: setCode(`// Content for ${file}\nconsole.log("This is ${file}");`);
  };

  // Function to insert a boilerplate code snippet (for demonstration)
  const insertBoilerplate = () => {
    const snippet = `function calculateArea(length, width) {
  // Calculates the area of a rectangle
  return length * width;
}

console.log("Area (5x10):", calculateArea(5, 10));
// Snippet inserted by EditorPanel!
`;
    // Append the snippet with a newline, ensuring 'code' is treated as a string
    setCode(String(code || '') + "\n" + snippet);
  };


  return (
    <div className={`${classname} rounded-xl px-5 py-3`}>
      <div className="text-white font-mono w-full rounded-xl flex space-x-5">
        {/* Editor */}
        <div className="flex-1 relative"> {/* Added relative for button positioning */}
          <textarea
            value={code}
            onChange={updateCodeFunction}
            placeholder="Start typing..."
            rows={20}
            spellCheck={false}
            className={`
              w-full p-4 rounded-xl resize-none outline-none font-mono
              bg-black/30 text-[#f8f8f2] placeholder:text-gray-400
              border border-white/10 focus:ring-2 focus:ring-[#00f5c9]
              transition-all duration-300 shadow-inner
            `}
          />
          {/* New Button for inserting a snippet */}
          <button
            onClick={insertBoilerplate}
            className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700
                       text-white font-bold py-2 px-4 rounded-lg shadow-lg
                       transition-all duration-300 ease-in-out text-sm z-10"
          >
            Insert JS Snippet
          </button>
        </div>

        <div className="w-full md:w-[40%] lg:w-[35%] xl:w-[30%] space-y-3">
          {/* Output */}
          <div>
            <h2 className="text-lg font-semibold mb-1 text-[#fcb045]">Output</h2>
            <pre className="w-full p-4 rounded-xl bg-black/30 border border-white/10 text-[#00ff90]
              font-mono text-sm whitespace-pre-wrap shadow-inner backdrop-blur-md h-40 overflow-y-auto">
              {output || "// Only JS code will be executed for now."}
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

          {/* Files */}
          <div className="w-full rounded-xl mt-2 flex-col h-fit">
            <div className="flex flex-col">
              <div className="flex text-xl font-bold justify-between items-center px-4 py-2">
                <div className='w-15'></div> {/* Empty div for spacing */}
                <h2 className="text-lg font-semibold mb-1 text-[#89f45e]">Files</h2>
                <button className="bg-black/80 w-15 h-8 pb-1 flex
                  justify-center items-center
                  rounded-full hover:bg-blue-300/50 transition-all duration-300
                  ease-in-out">+</button>
              </div>
            </div>
            <div className="flex flex-col space-y-1 max-h-[130px] overflow-y-scroll">
              {files.map((file, index) => (
                <button
                  key={index}
                  onClick={() => handleFileClick(file)}
                  className={`text-left px-3 text-lg
                  font-light mx-2 my-2 rounded-xl py-2
                  hover:bg-blue-300/50 transition-all duration-300
                  ease-in-out ${activeFile === file ? 'bg-blue-500/60' : 'bg-black/60'}`}
                >
                  {file}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import { useState, useEffect } from "react";
import TopBar from "./TopBar";
import EditorPanel from "./EditorPanel";
import BottomPanel from "./BottomPanel";

export default function App() {
  const [code, setCode] = useState(`console.log("Hello, ADITOR!");\n// Type some code and press 'Ask Gemini!'`); // Fixed string quote
  const [output, setOutput] = useState("// Output will appear here");
  const [weather, setWeather] = useState("sunny");
  const [theme, setTheme] = useState("light");

  const runCode = () => {
    if (!code.trim()) {
      setOutput("// Nothing to run");
      return;
    }

    try {
      const logs = [];
      const originalLog = console.log;
      
      // Override console.log to capture output
      console.log = (...args) => {
        const logMessage = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        logs.push(logMessage);
        originalLog(...args);
      };

      // Create a safe execution context
      const result = (function() {
        try {
          // Using Function constructor is safer than eval
          const fn = new Function(code);
          return fn();
        } catch (e) {
          return `Error: ${e.message}`;
        }
      })();

      // Restore original console.log
      console.log = originalLog;

      // Format the output
      const outputText = [
        ...logs,
        result !== undefined ? String(result) : ""
      ].filter(Boolean).join("\n");

      setOutput(outputText || "// Code executed successfully (no output)");
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    }
  };

  const switchTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme === "dark" ? "bg-black text-white" : "bg-white text-black";
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <TopBar
        runCode={runCode}
        weather={weather}
        handleweather={setWeather}
        theme={theme}
        switchTheme={switchTheme}
        classname="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      />
      <EditorPanel
        code={code}
        setCode={setCode}
        output={output}
        classname="bg-black/50 backdrop-blur-lg mt-10"
      />
      <BottomPanel classname="mt-4" />
    </div>
  );
}
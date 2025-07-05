import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import './App.css'
import Aditor from './Pages/Aditor'
import NotFound from "./Pages/NotFound"
import "./i18n"; 
import Settings from "./Pages/Settings";

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Aditor/>}/>  
        <Route path="*" element={<NotFound/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App

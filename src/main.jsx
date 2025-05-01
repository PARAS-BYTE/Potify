import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MoodDetector from './Detection/MoodDetector.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <MoodDetector/> */}
  </StrictMode>,
)

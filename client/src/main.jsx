import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'; // or './App.css' if that’s where you added Tailwind
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

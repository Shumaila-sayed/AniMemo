import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </StrictMode>,
)


// TODO: 
// make cards smaller in small screen
// local storage for best scores
// Ability to choose more or less cards / levels
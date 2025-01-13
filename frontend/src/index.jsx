import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/tailwind.css'
import App from './App.jsx'

console.log("renderizando index.jsx", { location: window.location.pathname })
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

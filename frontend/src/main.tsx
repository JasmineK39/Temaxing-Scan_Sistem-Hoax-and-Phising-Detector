import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import ThemeWrapper from './ThemeWrapper.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </StrictMode>,
)

import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PomodoroProvider } from './context/PomodoroContext.jsx'
import App from './App.jsx'
import Historico from './components/Historico/Historico.jsx'
import Sobre from './components/Sobre/Sobre.jsx'
import Config from './components/Config/Config.jsx'
import './index.css'
import '@fontsource/fraunces/700.css'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PomodoroProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/sobre" element={<Sobre />}/>
        <Route path="/config" element={<Config/>}/>
      </Routes>
    </PomodoroProvider>
  </BrowserRouter>
)

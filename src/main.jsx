import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
import App from './App.jsx';
import ClientProjectPage from './pages/ClientProjectPage.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/project/:clientName" element={<ClientProjectPage />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
)

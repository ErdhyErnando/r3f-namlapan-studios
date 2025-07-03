import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
import App from './App.jsx';
import ClientProjectPage from './pages/ClientProjectPage.jsx';
import PricingPage from './pages/PricingPage.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/project/:clientName" element={<ClientProjectPage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
)

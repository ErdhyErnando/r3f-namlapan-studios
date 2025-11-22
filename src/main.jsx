import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css'
import App from './App.jsx';
import ClientProjectPage from './pages/ClientProjectPage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <HelmetProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/project/:clientName" element={<ClientProjectPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HelmetProvider>
    </StrictMode>
  </BrowserRouter>
)

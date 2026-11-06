import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import './index.css'
import App from './App.jsx';
import ClientProjectPage from './pages/ClientProjectPage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <HelmetProvider>
        {/*
          LazyMotion + `m` instead of the full `motion` entry: ~43 kB of motion
          runtime down to ~5 kB, with the ~24 kB of domAnimation features loaded
          once here. The animation features used by this app are covered —
          initial/animate/transition/variants/whileInView/whileHover, no layout
          or drag. `strict` turns any stray `motion.*` import into a hard error.
        */}
        <LazyMotion features={domAnimation} strict>
          {/* Reduced motion is honoured for every route, not just the home page. */}
          <MotionConfig reducedMotion="user">
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/project/:clientName" element={<ClientProjectPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MotionConfig>
        </LazyMotion>
      </HelmetProvider>
    </StrictMode>
  </BrowserRouter>
)

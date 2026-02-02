import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './style.css';
import { LandingPage } from './pages/LandingPage';
import { DocsPage } from './pages/DocsPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/docs/*" element={<DocsPage />} />
        <Route path="*" element={<Navigate to="/docs" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

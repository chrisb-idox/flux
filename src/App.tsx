import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DocumentBrowser } from './pages/DocumentBrowser';
import { DocumentDetail } from './pages/DocumentDetail';
import { DesignSystem } from './pages/DesignSystem';
import { Packages } from './pages/Packages';
import { BrandBanner } from './components/BrandBanner';
export function App() {
  return (
    <BrowserRouter>
      <BrandBanner />
      <Routes>
        <Route path="/" element={<DocumentBrowser />} />
        <Route path="/chat" element={<DocumentBrowser />} />
        <Route path="/document/:id" element={<DocumentDetail />} />
        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="/packages" element={<Packages />} />
      </Routes>
    </BrowserRouter>);

}
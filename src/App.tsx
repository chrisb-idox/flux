import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DocumentBrowser } from './pages/DocumentBrowser';
import { DocumentDetail } from './pages/DocumentDetail';
import { DesignSystem } from './pages/DesignSystem';
import { Packages } from './pages/Packages';
import { Dashboard } from './pages/Dashboard';
import { BrandBanner } from './components/BrandBanner';
import { ClipboardProvider } from './contexts/ClipboardContext';
export function App() {
  return (
    <ClipboardProvider>
      <BrowserRouter>
        <BrandBanner />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/documents" element={<DocumentBrowser />} />
          <Route path="/chat" element={<DocumentBrowser />} />
          <Route path="/document/:id" element={<DocumentDetail />} />
          <Route path="/design-system" element={<DesignSystem />} />
          <Route path="/packages" element={<Packages />} />
        </Routes>
      </BrowserRouter>
    </ClipboardProvider>);

}
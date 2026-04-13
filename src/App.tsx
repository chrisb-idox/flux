import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DocumentBrowser } from './pages/DocumentBrowser';
import { DocumentDetail } from './pages/DocumentDetail';
import { DesignSystem } from './pages/DesignSystem';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DocumentBrowser />} />
        <Route path="/document/:id" element={<DocumentDetail />} />
        <Route path="/design-system" element={<DesignSystem />} />
      </Routes>
    </BrowserRouter>);

}
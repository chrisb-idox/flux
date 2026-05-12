import React, { createContext, useContext, useState } from 'react';
import { Document } from '../types/document';

interface ClipboardContextType {
  clipboard: Document[];
  addToClipboard: (doc: Document) => void;
  removeFromClipboard: (docId: string) => void;
  clearClipboard: () => void;
  isInClipboard: (docId: string) => boolean;
}

const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export function ClipboardProvider({ children }: { children: React.ReactNode }) {
  const [clipboard, setClipboard] = useState<Document[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('flux.clipboard');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addToClipboard = (doc: Document) => {
    setClipboard((prev) => {
      const alreadyExists = prev.some((d) => d.id === doc.id);
      const updated = alreadyExists ? prev : [...prev, doc];
      localStorage.setItem('flux.clipboard', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromClipboard = (docId: string) => {
    setClipboard((prev) => {
      const updated = prev.filter((d) => d.id !== docId);
      localStorage.setItem('flux.clipboard', JSON.stringify(updated));
      return updated;
    });
  };

  const clearClipboard = () => {
    setClipboard([]);
    localStorage.removeItem('flux.clipboard');
  };

  const isInClipboard = (docId: string) => clipboard.some((d) => d.id === docId);

  return (
    <ClipboardContext.Provider value={{ clipboard, addToClipboard, removeFromClipboard, clearClipboard, isInClipboard }}>
      {children}
    </ClipboardContext.Provider>
  );
}

export function useClipboard() {
  const ctx = useContext(ClipboardContext);
  if (!ctx) {
    throw new Error('useClipboard must be used within ClipboardProvider');
  }
  return ctx;
}

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaletteIcon, CheckIcon } from 'lucide-react';
interface ColorPalette {
  name: string;
  mainBg: string;
  elementBg: string;
  description: string;
}
const palettes: ColorPalette[] = [
{
  name: 'Light',
  mainBg: '#E5E5E5',
  elementBg: '#FFFFFF',
  description: 'Clean and bright'
},
{
  name: 'Dark',
  mainBg: '#1A1A1A',
  elementBg: '#2A2A2A',
  description: 'Easy on the eyes'
},
{
  name: 'Midnight',
  mainBg: '#0F172A',
  elementBg: '#1E293B',
  description: 'Deep blue darkness'
},
{
  name: 'Forest',
  mainBg: '#064E3B',
  elementBg: '#065F46',
  description: 'Natural green'
},
{
  name: 'Ocean',
  mainBg: '#0C4A6E',
  elementBg: '#075985',
  description: 'Deep blue waters'
},
{
  name: 'Warm',
  mainBg: '#FFF8F0',
  elementBg: '#FFFBF5',
  description: 'Cozy and inviting'
}];

interface ColorCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ColorCustomizer({ isOpen, onClose }: ColorCustomizerProps) {
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>(
    palettes[0]
  );
  // Load saved palette from localStorage on mount
  useEffect(() => {
    const savedPalette = localStorage.getItem('colorPalette');
    if (savedPalette) {
      const palette = JSON.parse(savedPalette);
      setSelectedPalette(palette);
      applyPalette(palette);
    }
  }, []);
  const applyPalette = (palette: ColorPalette) => {
    // Update CSS variables on the root element
    document.documentElement.style.setProperty(
      '--main-bg-color',
      palette.mainBg
    );
    document.documentElement.style.setProperty(
      '--element-bg-color',
      palette.elementBg
    );
    // Save to localStorage
    localStorage.setItem('colorPalette', JSON.stringify(palette));
    // Update state
    setSelectedPalette(palette);
  };
  const handlePaletteSelect = (palette: ColorPalette) => {
    applyPalette(palette);
  };
  return (
    <AnimatePresence>
      {isOpen &&
      <>
          {/* Backdrop */}
          <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          onClick={onClose}
          className="fixed inset-0 z-40" />
        

          {/* Popover */}
          <motion.div
          initial={{
            opacity: 0,
            x: -10,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1
          }}
          exit={{
            opacity: 0,
            x: -10,
            scale: 0.95
          }}
          transition={{
            duration: 0.15
          }}
          className="fixed left-12 bottom-4 z-50 bg-white border border-neutral-200 rounded-lg shadow-2xl w-72">
          
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-100">
              <PaletteIcon size={16} className="text-[#0461BA]" />
              <h3 className="text-sm font-semibold text-neutral-900">
                Color Theme
              </h3>
            </div>

            {/* Palette Grid */}
            <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
              {palettes.map((palette) =>
            <button
              key={palette.name}
              onClick={() => handlePaletteSelect(palette)}
              className={`w-full flex items-center gap-3 p-3 rounded-md transition-all ${selectedPalette.name === palette.name ? 'bg-[#E8F1FB] border-2 border-[#0461BA] shadow-sm' : 'hover:bg-neutral-50 border-2 border-transparent hover:border-neutral-200'}`}>
              
                  {/* Color Preview */}
                  <div className="flex gap-1.5 shrink-0">
                    <div
                  className="w-8 h-8 rounded border-2 border-neutral-300 shadow-sm"
                  style={{
                    backgroundColor: palette.mainBg
                  }}
                  title="Background Color" />
                
                    <div
                  className="w-8 h-8 rounded border-2 border-neutral-300 shadow-sm"
                  style={{
                    backgroundColor: palette.elementBg
                  }}
                  title="Element Color" />
                
                  </div>

                  {/* Palette Info */}
                  <div className="flex-1 text-left">
                    <div className="text-sm font-semibold text-neutral-900">
                      {palette.name}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {palette.description}
                    </div>
                  </div>

                  {/* Selected Indicator */}
                  {selectedPalette.name === palette.name &&
              <CheckIcon size={16} className="text-[#0461BA] shrink-0" />
              }
                </button>
            )}
            </div>

            {/* Footer Legend */}
            <div className="px-4 py-3 border-t border-neutral-100 bg-neutral-25">
              <div className="text-xs text-neutral-600 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded border border-neutral-300 bg-neutral-200" />
                  <span>Background Color</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded border border-neutral-300 bg-white" />
                  <span>Element Color (cards, panels)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}
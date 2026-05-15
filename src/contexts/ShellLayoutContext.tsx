import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface ShellLayoutContextValue {
  isLeftRailVisible: boolean;
  setIsLeftRailVisible: (visible: boolean) => void;
  toggleLeftRail: () => void;
}

const ShellLayoutContext = createContext<ShellLayoutContextValue | undefined>(undefined);

export function ShellLayoutProvider({ children }: { children: React.ReactNode }) {
  const [isLeftRailVisible, setIsLeftRailVisible] = useState(true);

  useEffect(() => {
    document.documentElement.style.setProperty('--left-rail-width', isLeftRailVisible ? '88px' : '0px');
  }, [isLeftRailVisible]);

  const value = useMemo(
    () => ({
      isLeftRailVisible,
      setIsLeftRailVisible,
      toggleLeftRail: () => setIsLeftRailVisible((v) => !v),
    }),
    [isLeftRailVisible]
  );

  return <ShellLayoutContext.Provider value={value}>{children}</ShellLayoutContext.Provider>;
}

export function useShellLayout() {
  const context = useContext(ShellLayoutContext);
  if (!context) {
    throw new Error('useShellLayout must be used within a ShellLayoutProvider');
  }
  return context;
}
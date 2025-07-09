import { createContext, useContext, useState, ReactNode } from 'react';

interface InteractionContextType {
  currentArea: string | null;
  setCurrentArea: (area: string | null) => void;
}

const InteractionContext = createContext<InteractionContextType | undefined>(undefined);

export function InteractionProvider({ children }: { children: ReactNode }) {
  const [currentArea, setCurrentArea] = useState<string | null>(null);
  return (
    <InteractionContext.Provider value={{ currentArea, setCurrentArea }}>
      {children}
    </InteractionContext.Provider>
  );
}

export function useInteraction() {
  const ctx = useContext(InteractionContext);
  if (!ctx) throw new Error('useInteraction must be used within InteractionProvider');
  return ctx;
} 
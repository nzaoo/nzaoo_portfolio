import { useState, useEffect } from 'react';
import { Keys } from '../data/types';

export const useKeyboardControls = (): Keys => {
  const [keys, setKeys] = useState<Keys>({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key in keys) {
        setKeys(prev => ({ ...prev, [key]: true }));
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key in keys) {
        setKeys(prev => ({ ...prev, [key]: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
}; 
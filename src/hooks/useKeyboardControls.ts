import { useEffect, useState } from 'react';

export type Direction = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

const initial: Direction = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

export default function useKeyboardControls() {
  const [direction, setDirection] = useState<Direction>(initial);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          setDirection((d) => ({ ...d, forward: true }));
          break;
        case 'KeyS':
        case 'ArrowDown':
          setDirection((d) => ({ ...d, backward: true }));
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setDirection((d) => ({ ...d, left: true }));
          break;
        case 'KeyD':
        case 'ArrowRight':
          setDirection((d) => ({ ...d, right: true }));
          break;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          setDirection((d) => ({ ...d, forward: false }));
          break;
        case 'KeyS':
        case 'ArrowDown':
          setDirection((d) => ({ ...d, backward: false }));
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setDirection((d) => ({ ...d, left: false }));
          break;
        case 'KeyD':
        case 'ArrowRight':
          setDirection((d) => ({ ...d, right: false }));
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return direction;
} 
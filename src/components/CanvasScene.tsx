import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Character from './Character';
import useKeyboardControls from '../hooks/useKeyboardControls';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Environment from './Environment';
import InteractionPrompt from './InteractionPrompt';
import UIOverlay from './UIOverlay';
import { useCharacterAnimation, CharacterAnimation } from '../hooks/useCharacterAnimation';
import { useInteraction, InteractiveObject } from '../hooks/useInteraction';

const OBJECTS: InteractiveObject[] = [
  { id: 'desk', area: 'desk', position: [2, 0.5, 0] },
  { id: 'door', area: 'door', position: [-3, 0.5, -2] },
  { id: 'bookshelf', area: 'bookshelf', position: [0, 0.5, -3] },
  { id: 'lab', area: 'lab', position: [-2, 0.5, 2] },
];

export default function CanvasScene() {
  const [position, setPosition] = useState<[number, number, number]>([0, 0.5, 0]);
  const direction = useKeyboardControls();
  const { animation, setAnimation } = useCharacterAnimation('idle');
  const { focusedObject } = useInteraction(position, OBJECTS, 1.2);
  const [showOverlay, setShowOverlay] = useState(false);

  // Tự động chuyển animation dựa trên direction
  useEffect(() => {
    if (direction.forward || direction.backward || direction.left || direction.right) {
      setAnimation('walk');
    } else {
      setAnimation('idle');
    }
  }, [direction, setAnimation]);

  // Lắng nghe phím Enter để mở overlay
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.code === 'Enter' && focusedObject) {
        setShowOverlay(true);
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [focusedObject]);

  const handleCloseOverlay = useCallback(() => setShowOverlay(false), []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7]} intensity={1} castShadow />
        <Environment />
        <Character position={position} setPosition={setPosition} direction={direction} animation={animation} />
        <OrbitControls />
      </Canvas>
      <InteractionPrompt area={focusedObject?.area || null} />
      <UIOverlay area={showOverlay ? focusedObject?.area || null : null} onClose={handleCloseOverlay} />
    </div>
  );
} 
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Character from './Character';
import useKeyboardControls from '../hooks/useKeyboardControls';
import { useState } from 'react';

export default function CanvasScene() {
  const [position, setPosition] = useState<[number, number, number]>([0, 0.5, 0]);
  const direction = useKeyboardControls();

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7]} intensity={1} />
        <Character position={position} setPosition={setPosition} direction={direction} />
        <OrbitControls />
      </Canvas>
    </div>
  );
} 
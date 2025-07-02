import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Direction } from '../hooks/useKeyboardControls';

interface CharacterProps {
  position: [number, number, number];
  setPosition: (pos: [number, number, number]) => void;
  direction: Direction;
}

export default function Character({ position, setPosition, direction }: CharacterProps) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    let [x, y, z] = position;
    const speed = 0.08;
    if (direction.forward) z -= speed;
    if (direction.backward) z += speed;
    if (direction.left) x -= speed;
    if (direction.right) x += speed;
    if (x !== position[0] || z !== position[2]) {
      setPosition([x, y, z]);
    }
  });

  return (
    <mesh ref={ref} position={position} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
} 
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CharacterProps {
  position: [number, number, number];
}

export default function Character({ position }: CharacterProps) {
  const ref = useRef<THREE.Mesh>(null!);

  // Có thể thêm animation ở đây sau này
  useFrame(() => {
    // Placeholder: không di chuyển
  });

  return (
    <mesh ref={ref} position={position} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
} 
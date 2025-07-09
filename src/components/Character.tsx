import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { Position } from '../data/types';

interface CharacterProps {
  position: Position;
  onPositionChange: (pos: Position) => void;
}

const Character: React.FC<CharacterProps> = ({ position, onPositionChange }) => {
  const meshRef = useRef<THREE.Group>(null);
  const keys = useKeyboardControls();
  const speed = 0.05;

  useFrame(() => {
    if (!meshRef.current) return;

    let newPosition = { ...position };
    
    // Xử lý movement
    if (keys.w) newPosition.z -= speed;
    if (keys.s) newPosition.z += speed;
    if (keys.a) newPosition.x -= speed;
    if (keys.d) newPosition.x += speed;

    // Giới hạn di chuyển trong phòng
    newPosition.x = Math.max(-4, Math.min(4, newPosition.x));
    newPosition.z = Math.max(-4, Math.min(4, newPosition.z));

    // Cập nhật vị trí
    meshRef.current.position.set(newPosition.x, newPosition.y, newPosition.z);
    onPositionChange(newPosition);

    // Quay nhân vật theo hướng di chuyển
    if (keys.w || keys.s || keys.a || keys.d) {
      const direction = new THREE.Vector3();
      if (keys.w) direction.z -= 1;
      if (keys.s) direction.z += 1;
      if (keys.a) direction.x -= 1;
      if (keys.d) direction.x += 1;
      
      if (direction.length() > 0) {
        const angle = Math.atan2(direction.x, direction.z);
        meshRef.current.rotation.y = angle;
      }
    }
  });

  return (
    <group ref={meshRef}>
      {/* Thân mèo */}
      <Box args={[0.4, 0.3, 0.6]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color="#ff6b6b" />
      </Box>
      
      {/* Đầu mèo */}
      <Sphere args={[0.25]} position={[0, 0.45, 0.1]}>
        <meshStandardMaterial color="#ff6b6b" />
      </Sphere>
      
      {/* Tai mèo */}
      <Box args={[0.1, 0.15, 0.05]} position={[-0.15, 0.6, 0.1]}>
        <meshStandardMaterial color="#ff5252" />
      </Box>
      <Box args={[0.1, 0.15, 0.05]} position={[0.15, 0.6, 0.1]}>
        <meshStandardMaterial color="#ff5252" />
      </Box>
      
      {/* Đuôi mèo */}
      <Box args={[0.08, 0.08, 0.4]} position={[0, 0.25, -0.4]}>
        <meshStandardMaterial color="#ff5252" />
      </Box>
    </group>
  );
};

export default Character; 
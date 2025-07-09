import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';

interface InteractiveObjectProps {
  position: [number, number, number];
  label: string;
  onInteract: () => void;
  isNear: boolean;
}

const InteractiveObject: React.FC<InteractiveObjectProps> = ({ 
  position, 
  label, 
  onInteract, 
  isNear 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <Box 
        ref={meshRef}
        args={[0.8, 0.8, 0.8]} 
        onClick={onInteract}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'default';
        }}
      >
        <meshStandardMaterial 
          color={isNear ? "#4ecdc4" : "#45b7aa"} 
          emissive={isNear ? "#1a4d4a" : "#000000"}
        />
      </Box>
      
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

export default InteractiveObject; 
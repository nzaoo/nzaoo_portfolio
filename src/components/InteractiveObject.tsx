import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

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

  // Tách icon và text từ label (icon đầu, text sau)
  const [icon, ...textArr] = label.split(' ');
  const text = textArr.join(' ');

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
          emissiveIntensity={isNear ? 0.7 : 0}
        />
      </Box>
      {/* Tooltip khi lại gần */}
      {isNear && (
        <Html
          position={[0, 1.3, 0]}
          center
          style={{ pointerEvents: 'none', zIndex: 10 }}
        >
          <div className="animate-fade-in-up px-4 py-2 rounded-xl shadow-xl bg-white/90 border-2 border-cyan-400 flex items-center gap-2 text-lg font-semibold text-gray-800 select-none" style={{ minWidth: 120 }}>
            <span className="text-2xl drop-shadow-md">{icon}</span>
            <span>{text}</span>
          </div>
        </Html>
      )}
      {/* Label 3D dưới chân object */}
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.22}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineColor="#222"
        outlineWidth={0.02}
      >
        {text}
      </Text>
    </group>
  );
};

export default InteractiveObject; 
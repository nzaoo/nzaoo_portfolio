import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Position } from '../data/types';

interface CameraControllerProps {
  characterPosition: Position;
}

const CameraController: React.FC<CameraControllerProps> = ({ characterPosition }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    const idealPosition = new THREE.Vector3(
      characterPosition.x,
      characterPosition.y + 3,
      characterPosition.z + 5
    );
    
    camera.position.lerp(idealPosition, 0.1);
    camera.lookAt(characterPosition.x, characterPosition.y + 0.5, characterPosition.z);
  });

  return null;
};

export default CameraController; 
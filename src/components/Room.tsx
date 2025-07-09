import React from 'react';
import { Box } from '@react-three/drei';

const Room: React.FC = () => {
  return (
    <group>
      {/* Sàn nhà */}
      <Box args={[10, 0.1, 10]} position={[0, -0.05, 0]}>
        <meshStandardMaterial color="#8d6e63" />
      </Box>
      
      {/* Tường */}
      <Box args={[10, 4, 0.1]} position={[0, 2, -5]}>
        <meshStandardMaterial color="#e0e0e0" />
      </Box>
      <Box args={[10, 4, 0.1]} position={[0, 2, 5]}>
        <meshStandardMaterial color="#e0e0e0" />
      </Box>
      <Box args={[0.1, 4, 10]} position={[-5, 2, 0]}>
        <meshStandardMaterial color="#e0e0e0" />
      </Box>
      <Box args={[0.1, 4, 10]} position={[5, 2, 0]}>
        <meshStandardMaterial color="#e0e0e0" />
      </Box>
      
      {/* Trần nhà */}
      <Box args={[10, 0.1, 10]} position={[0, 4, 0]}>
        <meshStandardMaterial color="#f5f5f5" />
      </Box>
    </group>
  );
};

export default Room; 
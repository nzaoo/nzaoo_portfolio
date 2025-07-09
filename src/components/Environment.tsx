import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface EnvironmentObject {
  id: string;
  name: string;
  position: [number, number, number];
  type: 'desk' | 'door' | 'bookshelf' | 'lab';
  color: string;
  hoverColor: string;
}

export default function Environment() {
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);
  
  // Vị trí các object trong phòng
  const objects: EnvironmentObject[] = [
    { 
      id: 'desk', 
      name: 'Bàn máy tính', 
      position: [2, 0.5, 0], 
      type: 'desk',
      color: '#8B4513',
      hoverColor: '#A0522D'
    },
    { 
      id: 'door', 
      name: 'Cửa ra', 
      position: [-3, 0.5, -2], 
      type: 'door',
      color: '#654321',
      hoverColor: '#8B4513'
    },
    { 
      id: 'bookshelf', 
      name: 'Giá sách', 
      position: [0, 0.5, -3], 
      type: 'bookshelf',
      color: '#228B22',
      hoverColor: '#32CD32'
    },
    { 
      id: 'lab', 
      name: 'Bàn lab', 
      position: [-2, 0.5, 2], 
      type: 'lab',
      color: '#4169E1',
      hoverColor: '#6495ED'
    },
  ];

  const handleObjectHover = (objectId: string) => {
    setHoveredObject(objectId);
  };

  const handleObjectLeave = () => {
    setHoveredObject(null);
  };

  const renderObject = (obj: EnvironmentObject) => {
    const isHovered = hoveredObject === obj.id;
    const currentColor = isHovered ? obj.hoverColor : obj.color;
    const scale = isHovered ? 1.1 : 1;

    switch (obj.type) {
      case 'desk':
        return (
          <group 
            key={obj.id} 
            position={obj.position}
            scale={scale}
            onPointerOver={() => handleObjectHover(obj.id)}
            onPointerOut={handleObjectLeave}
          >
            {/* Bàn */}
            <Box args={[2, 0.1, 1]} position={[0, 0, 0]} castShadow>
              <meshStandardMaterial color={currentColor} />
            </Box>
            {/* Chân bàn */}
            <Box args={[0.1, 0.8, 0.1]} position={[-0.8, -0.4, -0.4]} castShadow>
              <meshStandardMaterial color={currentColor} />
            </Box>
            <Box args={[0.1, 0.8, 0.1]} position={[0.8, -0.4, -0.4]} castShadow>
              <meshStandardMaterial color={currentColor} />
            </Box>
            <Box args={[0.1, 0.8, 0.1]} position={[-0.8, -0.4, 0.4]} castShadow>
              <meshStandardMaterial color={currentColor} />
            </Box>
            <Box args={[0.1, 0.8, 0.1]} position={[0.8, -0.4, 0.4]} castShadow>
              <meshStandardMaterial color={currentColor} />
            </Box>
            {/* Màn hình */}
            <Box args={[0.8, 0.6, 0.05]} position={[0, 0.35, -0.3]} castShadow>
              <meshStandardMaterial color="#000000" />
            </Box>
            {/* Bàn phím */}
            <Box args={[0.6, 0.02, 0.2]} position={[0, 0.06, 0.2]} castShadow>
              <meshStandardMaterial color="#333333" />
            </Box>
          </group>
        );

      case 'door':
        return (
          <group 
            key={obj.id} 
            position={obj.position}
            scale={scale}
            onPointerOver={() => handleObjectHover(obj.id)}
            onPointerOut={handleObjectLeave}
          >
            <Box args={[0.1, 1.5, 0.8]} castShadow>
              <meshStandardMaterial color={currentColor} />
            </Box>
            {/* Tay nắm cửa */}
            <Sphere args={[0.05, 8, 6]} position={[0.08, 0, 0]} castShadow>
              <meshStandardMaterial color="#FFD700" />
            </Sphere>
          </group>
        );

      case 'bookshelf':
        return (
          <group 
            key={obj.id} 
            position={obj.position}
            scale={scale}
            onPointerOver={() => handleObjectHover(obj.id)}
            onPointerOut={handleObjectLeave}
          >
            {/* Khung giá sách */}
            <Box args={[1.5, 1.2, 0.1]} position={[0, 0.6, 0]} castShadow>
              <meshStandardMaterial color={currentColor} />
            </Box>
            {/* Các ngăn sách */}
            {[0, 1, 2].map((shelf) => (
              <Box 
                key={shelf} 
                args={[1.4, 0.05, 0.3]} 
                position={[0, 0.2 + shelf * 0.3, 0]} 
                castShadow
              >
                <meshStandardMaterial color={currentColor} />
              </Box>
            ))}
            {/* Sách */}
            {[0, 1, 2, 3, 4].map((book) => (
              <Box 
                key={book} 
                args={[0.1, 0.25, 0.2]} 
                position={[-0.6 + book * 0.25, 0.35, 0]} 
                castShadow
              >
                <meshStandardMaterial color={`hsl(${book * 60}, 70%, 60%)`} />
              </Box>
            ))}
          </group>
        );

      case 'lab':
        return (
          <group 
            key={obj.id} 
            position={obj.position}
            scale={scale}
            onPointerOver={() => handleObjectHover(obj.id)}
            onPointerOut={handleObjectLeave}
          >
            {/* Bàn lab */}
            <Box args={[1.5, 0.1, 1]} position={[0, 0, 0]} castShadow>
              <meshStandardMaterial color={currentColor} />
            </Box>
            {/* Chân bàn */}
            <Cylinder args={[0.1, 0.1, 0.8]} position={[0, -0.4, 0]} castShadow>
              <meshStandardMaterial color={currentColor} />
            </Cylinder>
            {/* Ống nghiệm */}
            <Cylinder args={[0.02, 0.02, 0.3]} position={[-0.3, 0.2, 0]} castShadow>
              <meshStandardMaterial color="#FF6B6B" transparent opacity={0.7} />
            </Cylinder>
            <Cylinder args={[0.02, 0.02, 0.3]} position={[0.3, 0.2, 0]} castShadow>
              <meshStandardMaterial color="#4ECDC4" transparent opacity={0.7} />
            </Cylinder>
            {/* Máy tính */}
            <Box args={[0.4, 0.3, 0.05]} position={[0, 0.2, -0.3]} castShadow>
              <meshStandardMaterial color="#000000" />
            </Box>
          </group>
        );

      default:
        return null;
    }
  };

  return (
    <group>
      {/* Sàn phòng */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[10, 0.1, 10]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      {/* Tường */}
      <mesh position={[0, 1, -5]} receiveShadow>
        <boxGeometry args={[10, 2, 0.1]} />
        <meshStandardMaterial color="#e8e8e8" />
      </mesh>

      {/* Các object tương tác */}
      {objects.map(renderObject)}

      {/* Text labels cho các object */}
      {objects.map((obj) => (
        <Text
          key={`label-${obj.id}`}
          position={[obj.position[0], obj.position[1] + 1.5, obj.position[2]]}
          fontSize={0.3}
          color="#333333"
          anchorX="center"
          anchorY="middle"
          visible={hoveredObject === obj.id}
        >
          {obj.name}
        </Text>
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} />
    </group>
  );
} 
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Character from './Character';
import InteractiveObject from './InteractiveObject';
import Room from './Room';
import CameraController from './CameraController';
import UIOverlay from './UIOverlay';
import { Position, InteractiveContent, InteractiveObject as InteractiveObjectType } from '../data/types';

const Portfolio3D: React.FC = () => {
  const [characterPosition, setCharacterPosition] = useState<Position>({ x: 0, y: 0, z: 0 });
  const [activeInteraction, setActiveInteraction] = useState<InteractiveContent | null>(null);

  // Dữ liệu tương tác
  const interactiveObjects: InteractiveObjectType[] = [
    {
      id: 'about',
      position: [-2, 0.5, -2],
      label: 'Giới thiệu',
      content: {
        title: 'Về tôi',
        content: 'Xin chào! Tôi là một lập trình viên đam mê, đang trên hành trình từ beginner đến full-stack developer. Tôi thích học hỏi công nghệ mới và tạo ra những sản phẩm có ích.'
      }
    },
    {
      id: 'projects',
      position: [2, 0.5, -2],
      label: 'Dự án',
      content: {
        title: 'Dự án của tôi',
        content: 'Đây là nơi tôi trưng bày các dự án đã thực hiện, từ những website đơn giản đến các ứng dụng phức tạp. Mỗi dự án đều là một bước tiến trong hành trình học tập của tôi.'
      }
    },
    {
      id: 'skills',
      position: [0, 0.5, 2],
      label: 'Kỹ năng',
      content: {
        title: 'Kỹ năng & Công nghệ',
        content: 'React, Next.js, Three.js, TypeScript, Node.js, và nhiều công nghệ khác. Tôi luôn cập nhật và học hỏi những xu hướng mới nhất trong lập trình.'
      }
    }
  ];

  // Tính khoảng cách để hiển thị tooltip
  const getDistance = (pos1: Position, pos2: { x: number; z: number }) => {
    return Math.sqrt(
      Math.pow(pos1.x - pos2.x, 2) + 
      Math.pow(pos1.z - pos2.z, 2)
    );
  };

  const handleInteraction = (content: InteractiveContent) => {
    setActiveInteraction(content);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-900 to-purple-900 relative">
      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [0, 3, 5], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Room />
        
        <Character 
          position={characterPosition}
          onPositionChange={setCharacterPosition}
        />
        
        {interactiveObjects.map((obj) => (
          <InteractiveObject
            key={obj.id}
            position={obj.position}
            label={obj.label}
            onInteract={() => handleInteraction(obj.content)}
            isNear={getDistance(characterPosition, { x: obj.position[0], z: obj.position[2] }) < 1.5}
          />
        ))}
        
        <CameraController characterPosition={characterPosition} />
        
        <Environment preset="sunset" />
      </Canvas>

      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
        <h3 className="font-bold mb-2">Hướng dẫn:</h3>
        <p className="text-sm">• WASD: Di chuyển nhân vật</p>
        <p className="text-sm">• Click vào các object để tương tác</p>
        <p className="text-sm">• Đến gần object để xem hiệu ứng</p>
      </div>

      {/* Character status */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
        <h3 className="font-bold mb-2">Vị trí nhân vật:</h3>
        <p className="text-sm">X: {characterPosition.x.toFixed(2)}</p>
        <p className="text-sm">Z: {characterPosition.z.toFixed(2)}</p>
      </div>

      {/* UI Overlay */}
      <UIOverlay 
        activeInteraction={activeInteraction}
        onClose={() => setActiveInteraction(null)}
      />
    </div>
  );
};

export default Portfolio3D; 
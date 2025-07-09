import React from 'react';
import { Box, Cylinder } from '@react-three/drei';

const WALL_THICKNESS = 0.3;
const ROOM_SIZE = 10;
const ROOM_HEIGHT = 4;

const Room: React.FC = () => {
  return (
    <group>
      {/* Sàn */}
      <Box args={[ROOM_SIZE, 0.2, ROOM_SIZE]} position={[0, -0.1, 0]} receiveShadow>
        <meshStandardMaterial color="#e0c9a6" />
      </Box>
      {/* Trần */}
      <Box args={[ROOM_SIZE, 0.2, ROOM_SIZE]} position={[0, ROOM_HEIGHT + 0.1, 0]}>
        <meshStandardMaterial color="#f5f5f5" />
      </Box>
      {/* Tường sau */}
      <Box args={[ROOM_SIZE, ROOM_HEIGHT, WALL_THICKNESS]} position={[0, ROOM_HEIGHT / 2, -ROOM_SIZE / 2]}>
        <meshStandardMaterial color="#b3e5fc" />
      </Box>
      {/* Tường trước */}
      <Box args={[ROOM_SIZE, ROOM_HEIGHT, WALL_THICKNESS]} position={[0, ROOM_HEIGHT / 2, ROOM_SIZE / 2]}>
        <meshStandardMaterial color="#b3e5fc" />
      </Box>
      {/* Tường trái */}
      <Box args={[WALL_THICKNESS, ROOM_HEIGHT, ROOM_SIZE]} position={[-ROOM_SIZE / 2, ROOM_HEIGHT / 2, 0]}>
        <meshStandardMaterial color="#b3e5fc" />
      </Box>
      {/* Tường phải */}
      <Box args={[WALL_THICKNESS, ROOM_HEIGHT, ROOM_SIZE]} position={[ROOM_SIZE / 2, ROOM_HEIGHT / 2, 0]}>
        <meshStandardMaterial color="#b3e5fc" />
      </Box>
      {/* Viền chân tường */}
      <Box args={[ROOM_SIZE, 0.15, WALL_THICKNESS + 0.01]} position={[0, 0.075, -ROOM_SIZE / 2 + 0.01]}>
        <meshStandardMaterial color="#b0bec5" />
      </Box>
      <Box args={[ROOM_SIZE, 0.15, WALL_THICKNESS + 0.01]} position={[0, 0.075, ROOM_SIZE / 2 - 0.01]}>
        <meshStandardMaterial color="#b0bec5" />
      </Box>
      <Box args={[WALL_THICKNESS + 0.01, 0.15, ROOM_SIZE]} position={[-ROOM_SIZE / 2 + 0.01, 0.075, 0]}>
        <meshStandardMaterial color="#b0bec5" />
      </Box>
      <Box args={[WALL_THICKNESS + 0.01, 0.15, ROOM_SIZE]} position={[ROOM_SIZE / 2 - 0.01, 0.075, 0]}>
        <meshStandardMaterial color="#b0bec5" />
      </Box>

      {/* Thảm tròn ở giữa phòng */}
      <Cylinder args={[1.8, 1.8, 0.05, 32]} position={[0, 0.03, 0]}>
        <meshStandardMaterial color="#b39ddb" />
      </Cylinder>

      {/* Cửa ra vào (door) */}
      <Box args={[1.2, 2.2, 0.18]} position={[0, 1.1, ROOM_SIZE / 2 - 0.19]}>
        <meshStandardMaterial color="#ffd54f" />
      </Box>
      {/* Tay nắm cửa */}
      <Box args={[0.18, 0.18, 0.08]} position={[0.4, 1, ROOM_SIZE / 2 - 0.1]}>
        <meshStandardMaterial color="#888" />
      </Box>

      {/* Bàn máy tính (projects) */}
      {/* Mặt bàn */}
      <Box args={[1.8, 0.18, 0.7]} position={[3, 0.19, -2]}>
        <meshStandardMaterial color="#a1887f" />
      </Box>
      {/* Chân bàn */}
      <Box args={[0.12, 0.5, 0.12]} position={[2.3, -0.06, -2.3]}>
        <meshStandardMaterial color="#5d4037" />
      </Box>
      <Box args={[0.12, 0.5, 0.12]} position={[3.7, -0.06, -2.3]}>
        <meshStandardMaterial color="#5d4037" />
      </Box>
      <Box args={[0.12, 0.5, 0.12]} position={[2.3, -0.06, -1.7]}>
        <meshStandardMaterial color="#5d4037" />
      </Box>
      <Box args={[0.12, 0.5, 0.12]} position={[3.7, -0.06, -1.7]}>
        <meshStandardMaterial color="#5d4037" />
      </Box>
      {/* Màn hình máy tính */}
      <Box args={[0.5, 0.32, 0.04]} position={[3, 0.38, -2]}>
        <meshStandardMaterial color="#222" />
      </Box>

      {/* Giá sách (blog) */}
      <Box args={[0.4, 1.2, 1.2]} position={[-3, 0.7, -2]}>
        <meshStandardMaterial color="#bcaaa4" />
      </Box>
      {/* Sách nhiều màu */}
      <Box args={[0.08, 0.5, 0.28]} position={[-3.1, 1, -2.3]}>
        <meshStandardMaterial color="#f06292" />
      </Box>
      <Box args={[0.08, 0.6, 0.22]} position={[-2.9, 1.1, -1.8]}>
        <meshStandardMaterial color="#4fc3f7" />
      </Box>
      <Box args={[0.08, 0.4, 0.18]} position={[-3, 0.9, -2.1]}>
        <meshStandardMaterial color="#ffd54f" />
      </Box>

      {/* Bàn lab (lab) */}
      {/* Mặt bàn */}
      <Box args={[1.2, 0.15, 0.5]} position={[0, 0.13, -4]}>
        <meshStandardMaterial color="#cfd8dc" />
      </Box>
      {/* Chân bàn */}
      <Box args={[0.1, 0.4, 0.1]} position={[-0.45, -0.07, -4.18]}>
        <meshStandardMaterial color="#90a4ae" />
      </Box>
      <Box args={[0.1, 0.4, 0.1]} position={[0.45, -0.07, -4.18]}>
        <meshStandardMaterial color="#90a4ae" />
      </Box>
      <Box args={[0.1, 0.4, 0.1]} position={[-0.45, -0.07, -3.82]}>
        <meshStandardMaterial color="#90a4ae" />
      </Box>
      <Box args={[0.1, 0.4, 0.1]} position={[0.45, -0.07, -3.82]}>
        <meshStandardMaterial color="#90a4ae" />
      </Box>
      {/* Ống nghiệm */}
      <Box args={[0.06, 0.22, 0.06]} position={[-0.2, 0.25, -4]}>
        <meshStandardMaterial color="#81d4fa" />
      </Box>
      <Box args={[0.06, 0.18, 0.06]} position={[0, 0.22, -4]}>
        <meshStandardMaterial color="#e57373" />
      </Box>
      <Box args={[0.06, 0.16, 0.06]} position={[0.2, 0.20, -4]}>
        <meshStandardMaterial color="#fff176" />
      </Box>

      {/* Cửa sổ bên trái */}
      <Box args={[1.6, 0.7, 0.08]} position={[-3, 2.2, -ROOM_SIZE / 2 + 0.16]}>
        <meshStandardMaterial color="#90caf9" transparent opacity={0.7} />
      </Box>
      <Box args={[1.6, 0.07, 0.09]} position={[-3, 2.55, -ROOM_SIZE / 2 + 0.13]}>
        <meshStandardMaterial color="#e3f2fd" />
      </Box>
      <Box args={[0.07, 0.7, 0.09]} position={[-3.8, 2.2, -ROOM_SIZE / 2 + 0.13]}>
        <meshStandardMaterial color="#e3f2fd" />
      </Box>
      <Box args={[0.07, 0.7, 0.09]} position={[-2.2, 2.2, -ROOM_SIZE / 2 + 0.13]}>
        <meshStandardMaterial color="#e3f2fd" />
      </Box>
    </group>
  );
};

export default Room; 
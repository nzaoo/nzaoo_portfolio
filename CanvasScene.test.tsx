// src/components/CanvasScene.test.tsx

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function RoomModel() {
  const gltf = useGLTF("/models/nzaoo_desk_preview.glb");
  return <primitive object={gltf.scene} scale={1} position={[0, -1, 0]} />;
}

export default function CanvasScene() {
  return (
    <div className="w-screen h-screen">
      <Canvas
        shadows
        camera={{ position: [2, 2, 5], fov: 45 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <Suspense fallback={null}>
          <RoomModel />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

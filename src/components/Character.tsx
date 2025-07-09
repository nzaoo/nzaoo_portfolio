import React, { useRef, useEffect, Suspense, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Direction } from '../hooks/useKeyboardControls';
import { CharacterAnimation } from '../hooks/useCharacterAnimation';

interface CharacterProps {
  position: [number, number, number];
  animation: CharacterAnimation;
  setPosition: (pos: [number, number, number]) => void;
  direction: Direction;
}

const MAIN_MODEL = '/models/character_all_animations.glb';
const FALLBACK_MODEL = '/models/character_walk.glb';

function CharacterLoading() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

function CharacterError() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="#ff0000" />
    </mesh>
  );
}

function CharacterModel({ position, animation, setPosition, direction }: CharacterProps) {
  const [modelPath, setModelPath] = useState(MAIN_MODEL);
  const [error, setError] = useState(false);

  // Thử load model chính, nếu lỗi thì fallback sang walk.glb
  useEffect(() => {
    fetch(MAIN_MODEL, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) setModelPath(MAIN_MODEL);
        else setModelPath(FALLBACK_MODEL);
      })
      .catch(() => setModelPath(FALLBACK_MODEL));
  }, []);

  // Sửa lỗi: bỏ generic <THREE.Group> khỏi useGLTF
  const { scene, animations } = useGLTF(modelPath);
  const ref = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer>();
  const actionRef = useRef<THREE.AnimationAction | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(...position);
    }
  }, [position]);

  useEffect(() => {
    if (!ref.current || animations.length === 0) return;
    try {
      if (!mixer.current) {
        mixer.current = new THREE.AnimationMixer(ref.current);
      }
      // Nếu model chỉ có 1 animation (walk), luôn play animation đó
      let clip = animations[0];
      if (animations.length > 1) {
        clip = animations.find((a) => a.name.toLowerCase().includes(animation)) || animations[0];
      }
      if (clip) {
        const action = mixer.current.clipAction(clip);
        if (actionRef.current && actionRef.current !== action) {
          actionRef.current.fadeOut(0.2);
        }
        action.reset().fadeIn(0.2).play();
        actionRef.current = action;
      }
    } catch (err) {
      setError(true);
      console.error('Error setting up animation:', err);
    }
    return () => {
      if (actionRef.current) {
        actionRef.current.fadeOut(0.2);
      }
    };
  }, [animation, animations]);

  useFrame((_, delta) => {
    try {
      if (mixer.current) {
        mixer.current.update(delta);
      }
      let [x, y, z] = position;
      const speed = 0.08;
      if (direction.forward) z -= speed;
      if (direction.backward) z += speed;
      if (direction.left) x -= speed;
      if (direction.right) x += speed;
      if (x !== position[0] || z !== position[2]) {
        setPosition([x, y, z]);
      }
    } catch (err) {
      setError(true);
      console.error('Error in animation frame:', err);
    }
  });

  if (error) return <CharacterError />;
  return <primitive ref={ref} object={scene} />;
}

export default function Character(props: CharacterProps) {
  return (
    <Suspense fallback={<CharacterLoading />}>
      <CharacterModel {...props} />
    </Suspense>
  );
} 
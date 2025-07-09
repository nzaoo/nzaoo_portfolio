import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
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

const MODEL_PATH = '/models/character_all_animations.glb';

export default function Character({ position, animation, setPosition, direction }: CharacterProps) {
  const { scene, animations } = useGLTF(MODEL_PATH);
  const ref = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer>();
  const actionRef = useRef<THREE.AnimationAction | null>(null);

  // Set position
  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(...position);
    }
  }, [position]);

  // Setup mixer and play animation
  useEffect(() => {
    if (!ref.current || animations.length === 0) return;
    if (!mixer.current) {
      mixer.current = new THREE.AnimationMixer(ref.current);
    }
    // Find animation clip by name
    const clip = animations.find((a) => a.name.toLowerCase().includes(animation));
    if (clip) {
      const action = mixer.current.clipAction(clip);
      if (actionRef.current && actionRef.current !== action) {
        actionRef.current.fadeOut(0.2);
      }
      action.reset().fadeIn(0.2).play();
      actionRef.current = action;
    }
    return () => {
      if (actionRef.current) {
        actionRef.current.fadeOut(0.2);
      }
    };
  }, [animation, animations]);

  // Update mixer
  useFrame((_, delta) => {
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
  });

  return <primitive ref={ref} object={scene} />;
}

// Đảm bảo đã có file public/models/character.glb với animation "idle" và "walk". 
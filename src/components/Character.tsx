import React, { useRef, useEffect, Suspense } from 'react';
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

const MODEL_PATH = '/models/character_all_animations.glb';

// Loading fallback component
function CharacterLoading() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

// Error fallback component
function CharacterError() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial color="#ff0000" />
    </mesh>
  );
}

function CharacterModel({ position, animation, setPosition, direction }: CharacterProps) {
  const { scene, animations } = useGLTF<THREE.Group>(MODEL_PATH);
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
    
    try {
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
    } catch (error) {
      console.error('Error setting up animation:', error);
    }

    return () => {
      if (actionRef.current) {
        actionRef.current.fadeOut(0.2);
      }
    };
  }, [animation, animations]);

  // Update mixer and movement
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
    } catch (error) {
      console.error('Error in animation frame:', error);
    }
  });

  return <primitive ref={ref} object={scene} />;
}

export default function Character(props: CharacterProps) {
  return (
    <Suspense fallback={<CharacterLoading />}>
      <ErrorBoundary fallback={<CharacterError />}>
        <CharacterModel {...props} />
      </ErrorBoundary>
    </Suspense>
  );
}

// Simple Error Boundary for React Three Fiber
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Character component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
} 
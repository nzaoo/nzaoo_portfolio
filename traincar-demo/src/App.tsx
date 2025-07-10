/// <reference types="@react-three/fiber" />
import { Canvas } from '@react-three/fiber'
import TrainCar from './components/TrainCar'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#222' }}>
      <Canvas camera={{ position: [0, 5, 20], fov: 50 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <TrainCar />
      </Canvas>
    </div>
  )
}

export default App;

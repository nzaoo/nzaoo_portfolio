import CanvasScene from '../components/CanvasScene';
import { InteractionProvider } from '../context/InteractionContext';

export default function Home() {
  return (
    <InteractionProvider>
      <CanvasScene />
    </InteractionProvider>
  );
} 
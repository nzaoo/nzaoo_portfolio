import dynamic from 'next/dynamic';

const CanvasSceneTest = dynamic(() => import('../components/CanvasSceneTest'), { ssr: false });

export default function TestPage() {
  return <CanvasSceneTest />;
} 
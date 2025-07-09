import { useState, useCallback } from 'react';

export type CharacterAnimation = 'idle' | 'walk' | 'run' | 'standup';

export function useCharacterAnimation(initial: CharacterAnimation = 'idle') {
  const [animation, setAnimation] = useState<CharacterAnimation>(initial);

  // Hàm chuyển animation, có thể mở rộng logic chuyển đổi mượt mà ở đây
  const changeAnimation = useCallback((next: CharacterAnimation) => {
    setAnimation(next);
  }, []);

  return { animation, setAnimation: changeAnimation };
} 
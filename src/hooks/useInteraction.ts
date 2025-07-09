import { useState, useEffect } from 'react';

export interface InteractiveObject {
  id: string;
  position: [number, number, number];
  area: string;
  triggerDistance?: number; // khoảng cách để trigger interaction
}

export function getDistance(a: [number, number, number], b: [number, number, number]) {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 +
    (a[1] - b[1]) ** 2 +
    (a[2] - b[2]) ** 2
  );
}

export function useInteraction(
  characterPosition: [number, number, number],
  objects: InteractiveObject[],
  defaultDistance = 1.5
) {
  const [focusedObject, setFocusedObject] = useState<InteractiveObject | null>(null);

  useEffect(() => {
    let found: InteractiveObject | null = null;
    for (const obj of objects) {
      const dist = getDistance(characterPosition, obj.position);
      if (dist <= (obj.triggerDistance || defaultDistance)) {
        found = obj;
        break;
      }
    }
    setFocusedObject(found);
  }, [characterPosition, objects, defaultDistance]);

  return { focusedObject };
} 
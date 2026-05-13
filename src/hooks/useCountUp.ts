import { useEffect, useState } from 'react';

export function useCountUp(end: number, duration = 2000, start = 0, isActive = true) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isActive) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, start, isActive]);

  return count;
}

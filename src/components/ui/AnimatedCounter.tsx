'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from '@/hooks/useInView';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  prefix = '',
  duration = 2000,
}) => {
  const [ref, isInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [count, setCount] = useState(0);

  const animate = useCallback(() => {
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    if (isInView) {
      animate();
    }
  }, [isInView, animate]);

  return (
    <div ref={ref}>
      <span className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-[#c8ff00]">
        {prefix}
        {count}
        {suffix}
      </span>
    </div>
  );
};

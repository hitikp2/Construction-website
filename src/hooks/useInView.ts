'use client';

import { useRef, useState, useEffect, type RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export const useInView = (
  options: UseInViewOptions = {}
): [RefObject<HTMLDivElement | null>, boolean] => {
  const { threshold = 0.1, triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce]);

  return [ref, isInView];
};

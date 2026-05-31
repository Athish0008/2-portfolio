import { useEffect, useRef, useState } from 'react';

interface Options extends IntersectionObserverInit {
  once?: boolean;
}

export const useInView = <T extends HTMLElement>(options: Options = {}) => {
  const { once = true, root = null, rootMargin = '0px', threshold = 0.2 } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, root, rootMargin, threshold]);

  return { ref, inView };
};


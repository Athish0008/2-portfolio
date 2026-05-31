import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

declare global {
  interface Window {
    Lenis?: any;
  }
}

type LenisInstance = any;

interface LenisContextValue {
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => void;
  isReady: boolean;
}

const LenisContext = createContext<LenisContextValue>({
  scrollTo: () => {},
  isReady: false
});

interface Props {
  children: React.ReactNode;
  enabled: boolean;
}

export const LenisProvider: React.FC<Props> = ({ children, enabled }) => {
  const lenisRef = useRef<LenisInstance | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (!window.Lenis) {
      setIsReady(false);
      return;
    }

    const lenis = new window.Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false
    });

    lenisRef.current = lenis;
    setIsReady(true);

    let frameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };
    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
      setIsReady(false);
    };
  }, [enabled]);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: Record<string, unknown>) => {
      if (!lenisRef.current || !isReady) {
        if (typeof target === 'string') {
          const el = document.querySelector<HTMLElement>(target);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        } else if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'smooth' });
        } else if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
      lenisRef.current.scrollTo(target, {
        offset: 0,
        duration: 1.2,
        ...options
      });
    },
    [isReady]
  );

  return (
    <LenisContext.Provider value={{ scrollTo, isReady }}>{children}</LenisContext.Provider>
  );
};

export const useLenis = () => useContext(LenisContext);


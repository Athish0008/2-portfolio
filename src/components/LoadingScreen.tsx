import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const SESSION_KEY = 'faang-portfolio-hasSeenLoader';

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem(SESSION_KEY);
    if (hasSeen === 'true') {
      setVisible(false);
      setProgress(100);
      onComplete();
      return;
    }

    let rafId: number;

    const simulateProgress = () => {
      setProgress((prev) => {
        const next = prev + Math.random() * 10;
        return next > 90 ? 90 : next;
      });
      rafId = window.requestAnimationFrame(simulateProgress);
    };

    rafId = window.requestAnimationFrame(simulateProgress);

    const handleLoad = () => {
      window.cancelAnimationFrame(rafId);
      setProgress(100);
      sessionStorage.setItem(SESSION_KEY, 'true');
      setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 1500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad, { passive: true } as AddEventListenerOptions);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('load', handleLoad as EventListener);
    };
  }, [onComplete]);

  if (!visible) return null;

  const clamped = Math.min(100, Math.round(progress));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900">
      <div className="relative h-[400px] w-[220px] rounded-2xl bg-navy-800/80 p-6 shadow-2xl shadow-indigo-500/30 border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between text-xs text-slate-300 mb-4">
          <span className="tracking-[0.3em] uppercase text-slate-400">Loading</span>
          <span className="text-3xl font-bold text-white tabular-nums">{clamped}%</span>
        </div>
        <div className="relative flex-1 rounded-2xl bg-slate-900/60 overflow-hidden border border-white/5">
          <div
            className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-violet-500 will-change-transform"
            style={{
              transform: `translateX(${clamped - 100}%)`,
              transition: 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)'
            }}
          />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.35),_transparent_55%)]" />
        </div>
        <div className="mt-6 text-center text-sm tracking-[0.3em] text-slate-300 uppercase">
          LOADING...
        </div>
      </div>
    </div>
  );
};


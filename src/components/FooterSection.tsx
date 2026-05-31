import React from 'react';
import { useLenis } from '../lenisContext';

export const FooterSection: React.FC = () => {
  const { scrollTo } = useLenis();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy-900/90 py-6 text-xs text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-2">
          <span>© {year} Your Name. All rights reserved.</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/15 px-3 py-1 text-[11px]">
            Built with React & Tailwind
          </span>
          <button
            onClick={() => scrollTo(0)}
            className="rounded-full border border-white/15 px-3 py-1 text-[11px] hover:border-indigo-400 hover:bg-white/5"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};


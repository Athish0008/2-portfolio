import React from 'react';
import { X, CheckCircle2, ExternalLink, Github } from 'lucide-react';
import { Project } from './ProjectsSection';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onViewDetails: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onViewDetails }) => {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-indigo-400/40 bg-navy-900/95 shadow-[0_25px_80px_rgba(15,23,42,0.9)]"
        onClick={stop}
      >
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
          <h3 className="bg-gradient-to-r from-indigo-300 via-sky-300 to-violet-300 bg-clip-text text-xl font-semibold text-transparent">
            {project.name}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full border border-white/10 p-1 text-slate-300 hover:bg-white/5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid max-h-[calc(90vh-3rem)] grid-rows-[auto,1fr,auto] gap-4 overflow-y-auto p-5">
          {/* Placeholder carousel */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/80">
            <div className="flex h-56 items-center justify-center">
              <div className="h-32 w-4/5 rounded-xl border border-white/5 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.45),transparent_60%)]" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <div className="space-y-3 text-sm text-slate-200">
              <p>{project.tagline}</p>
              <p>
                This project was engineered to feel effortless even under heavy load: highly
                optimized rendering paths, predictable state management, and a resilient backend
                pipeline that can scale horizontally.
              </p>
              <p>
                From the first pixel to the final deployment, the focus was on observability,
                performance budgets, and a developer experience that makes iteration fast and safe.
              </p>

              <div className="mt-3 space-y-2">
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-300">
                  Key Features
                </div>
                <ul className="space-y-1 text-sm text-slate-200">
                  {[
                    'End-to-end type safety and strongly typed contracts.',
                    'Graceful degradation paths and offline-tolerant UX.',
                    'Robust monitoring and alerting instrumentation.',
                    'Animations tuned for 60fps with GPU acceleration.',
                    'Security-first design with least-privilege access.'
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-3 text-sm text-slate-200">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-300">
                  Tech stack
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] uppercase tracking-wide text-indigo-100">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-indigo-500/15 px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-400">
                <div>Frontend: React, Next.js, Tailwind</div>
                <div>Backend: Node.js, Express, PostgreSQL</div>
                <div>DevOps: Docker, AWS, CI/CD, monitoring</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-3 text-sm">
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-slate-100 hover:bg-white/5">
                <Github className="h-4 w-4" />
                <span>GitHub Repo</span>
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-slate-100 hover:bg-white/5">
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </button>
            </div>
            <button
              onClick={onViewDetails}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-1.5 text-sm font-semibold text-white"
            >
              <span>View Full Details</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


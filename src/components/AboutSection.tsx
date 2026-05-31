import React, { useState } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLenis } from '../lenisContext';

export const AboutSection: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { scrollTo } = useLenis();
  const [showResumeOptions, setShowResumeOptions] = useState(false);

  return (
    <section
      id="about"
      data-section
      ref={ref}
      className="relative rounded-3xl border border-white/10 bg-white/5 px-5 py-10 shadow-xl shadow-indigo-500/10 backdrop-blur-3xl md:px-10 md:py-14"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-sky-500/10" />
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] md:items-center">
        {/* Photo */}
        <div
          className={`relative h-[260px] w-full max-w-sm rounded-2xl border border-white/15 bg-slate-900/40 shadow-2xl shadow-indigo-500/40 transition-all duration-700 will-change-transform md:h-[320px] ${
            inView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}
        >
          <div className="pointer-events-none absolute -inset-10 rounded-[30px] bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.55),transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.4),transparent_55%)] blur-3xl" />
          <div className="relative flex h-full items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
            <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-indigo-400 to-violet-500 opacity-80" />
          </div>
        </div>

        {/* Content */}
        <div
          className={`space-y-5 transition-all duration-700 will-change-transform ${
            inView ? 'translate-x-0 opacity-100 delay-150' : 'translate-x-8 opacity-0'
          }`}
        >
          <div className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-300">
            About
          </div>
          <h2 className="bg-gradient-to-r from-indigo-300 via-sky-300 to-violet-300 bg-clip-text text-3xl font-semibold text-transparent md:text-4xl">
            About Me
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-slate-200 md:text-base">
            <p>
              I&apos;m a full-stack engineer focused on building resilient, scalable products that
              feel effortless to use. From microservices to meticulously crafted interfaces, I care
              deeply about every layer of the stack.
            </p>
            <p>
              My core toolkit includes React, Next.js, TypeScript, Node.js, and Python—paired with
              SQL/NoSQL databases and modern cloud platforms. I&apos;ve led projects from concept
              through production, owning architecture, implementation, and iteration.
            </p>
            <p>
              I love shaping systems that can gracefully handle real-world complexity: distributed
              workloads, observability, fault tolerance, and performance tuning that pushes web
              experiences to 60fps and beyond.
            </p>
            <p>
              I&apos;m currently exploring opportunities at FAANG-scale companies where thoughtful
              engineering, strong product sense, and craftsmanship truly matter.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div
              className="relative"
              onMouseLeave={() => setShowResumeOptions(false)}
            >
              <button
                onMouseEnter={() => setShowResumeOptions(true)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <Download className="h-4 w-4" />
                <span>Download Resume</span>
              </button>
              {showResumeOptions && (
                <div className="absolute left-0 top-[115%] w-56 rounded-2xl border border-indigo-400/40 bg-navy-900/95 p-3 text-sm text-slate-100 shadow-2xl backdrop-blur-2xl transition-all">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                    Choose format
                  </div>
                  <button className="flex w-full items-center justify-between rounded-xl bg-white/5 px-3 py-2 hover:bg-white/10">
                    <span>Resume.pdf</span>
                    <Download className="h-4 w-4 text-indigo-300" />
                  </button>
                  <button className="mt-1 flex w-full items-center justify-between rounded-xl bg-white/5 px-3 py-2 hover:bg-white/10">
                    <span>Resume.docx</span>
                    <Download className="h-4 w-4 text-indigo-300" />
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => scrollTo('#projects')}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-sm font-semibold text-slate-100 shadow-sm transition hover:border-indigo-400 hover:bg-white/5"
            >
              <span>View Projects</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


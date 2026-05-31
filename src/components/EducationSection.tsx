import React from 'react';
import { GraduationCap, Award } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export const EducationSection: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="education"
      data-section
      ref={ref}
      className="space-y-8"
    >
      <div className="text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-300">
          Foundations
        </div>
        <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
          Education & Certifications
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div
          className="rounded-2xl border border-white/10 bg-navy-800/80 p-5 shadow-lg backdrop-blur-xl"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 550ms cubic-bezier(0.4,0,0.2,1)'
          }}
        >
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="text-sm font-semibold text-white">
            B.Sc. in Computer Science
          </div>
          <div className="text-xs text-slate-400">
            Top-tier University · Focus on distributed systems & HCI
          </div>
          <div className="mt-3 text-xs text-slate-300">
            Built compilers, schedulers, and scalable web platforms as part of coursework and
            research labs.
          </div>
        </div>

        <div
          className="rounded-2xl border border-white/10 bg-navy-800/80 p-5 shadow-lg backdrop-blur-xl"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 550ms cubic-bezier(0.4,0,0.2,1)',
            transitionDelay: '120ms'
          }}
        >
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
            <Award className="h-5 w-5" />
          </div>
          <div className="text-sm font-semibold text-white">
            Cloud & Infrastructure
          </div>
          <div className="text-xs text-slate-400">
            AWS / GCP certificates & hands-on architecture
          </div>
          <div className="mt-3 text-xs text-slate-300">
            Deployed and maintained production workloads with autoscaling, observability, and
            cost-optimized infrastructure.
          </div>
        </div>

        <div
          className="rounded-2xl border border-white/10 bg-navy-800/80 p-5 shadow-lg backdrop-blur-xl"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 550ms cubic-bezier(0.4,0,0.2,1)',
            transitionDelay: '220ms'
          }}
        >
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300">
            <Award className="h-5 w-5" />
          </div>
          <div className="text-sm font-semibold text-white">
            Continuous Learning
          </div>
          <div className="text-xs text-slate-400">
            Advanced courses in system design, algorithms, and UX
          </div>
          <div className="mt-3 text-xs text-slate-300">
            Always iterating—through workshops, conferences, and deep dives into emerging tools
            shaping the modern web.
          </div>
        </div>
      </div>
    </section>
  );
};


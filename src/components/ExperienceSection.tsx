import React from 'react';
import { Briefcase } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const roles = [
  {
    title: 'Senior Full-Stack Developer',
    company: 'Tech Corp',
    duration: '2022 – Present',
    points: [
      'Led development of high-availability dashboards used daily by enterprise clients.',
      'Implemented end-to-end observability with tracing, metrics, and structured logging.',
      'Designed and rolled out a scalable micro-frontend architecture.',
      'Mentored engineers and set front-end best practices across teams.'
    ]
  },
  {
    title: 'Software Engineer',
    company: 'Innovation Labs',
    duration: '2020 – 2022',
    points: [
      'Built real-time collaboration features with WebSockets and CRDT-inspired models.',
      'Optimized critical user flows to reduce page load time by over 40%.',
      'Partnered closely with design to ship polished, accessible experiences.',
      'Helped migrate legacy services to a containerized, cloud-native stack.'
    ]
  },
  {
    title: 'Junior Developer',
    company: 'StartUp Inc',
    duration: '2019 – 2020',
    points: [
      'Shipped production features across the stack in a fast-paced environment.',
      'Introduced automated testing and CI that reduced regressions significantly.',
      'Collaborated directly with founders on roadmap and product direction.'
    ]
  }
];

export const ExperienceSection: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="experience"
      data-section
      ref={ref}
      className="space-y-8"
    >
      <div className="text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-300">
          Experience
        </div>
        <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
          Professional Experience
        </h2>
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-px bg-slate-700/60 md:left-1/2" />
        <div
          className="absolute left-4 top-0 w-px bg-gradient-to-b from-indigo-400 via-sky-400 to-violet-500 md:left-1/2"
          style={{
            height: inView ? '100%' : '0%',
            transition: 'height 900ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />

        <div className="space-y-8 pt-2">
          {roles.map((role, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={role.title}
                className={`relative flex md:items-center ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                }`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateX(0)' : isLeft ? 'translateX(-24px)' : 'translateX(24px)',
                  transition: 'all 600ms cubic-bezier(0.4,0,0.2,1)',
                  transitionDelay: `${idx * 120}ms`
                }}
              >
                <div className="absolute left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-indigo-300/60 bg-navy-900 text-indigo-200 shadow-md md:left-1/2">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div
                  className={`mt-8 w-full rounded-2xl border border-white/10 bg-navy-800/80 px-5 py-4 shadow-lg backdrop-blur-xl md:w-[calc(50%-2.5rem)] ${
                    isLeft ? 'md:mr-8' : 'md:ml-8'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold text-white">{role.title}</div>
                      <div className="text-xs text-indigo-200">{role.company}</div>
                    </div>
                    <div className="text-xs text-slate-400">{role.duration}</div>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-200">
                    {role.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-2"
                      >
                        <span className="mt-1 h-1 w-1 rounded-full bg-indigo-300" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


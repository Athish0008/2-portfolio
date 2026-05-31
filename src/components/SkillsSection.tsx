import React from 'react';
import {
  Boxes,
  Code2,
  Figma,
  LayoutTemplate,
  Layers,
  MonitorSmartphone,
  Network,
  Workflow
} from 'lucide-react';
import { useInView } from '../hooks/useInView';

const skills = [
  { name: 'React / Next.js', color: '#00d4ff', icon: Code2 },
  { name: 'TypeScript', color: '#3B82F6', icon: Layers },
  { name: 'UI / UX Design', color: '#EC4899', icon: Figma },
  { name: 'Three.js / R3F', color: '#10B981', icon: Boxes },
  { name: 'Tailwind CSS', color: '#06B6D4', icon: LayoutTemplate },
  { name: 'Node.js / Go', color: '#22C55E', icon: Network },
  { name: 'React Native', color: '#8B5CF6', icon: MonitorSmartphone },
  { name: 'System Design', color: '#F59E0B', icon: Workflow }
] as const;

export const SkillsSection: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="skills"
      data-section
      ref={ref}
      className="space-y-8"
    >
      <div className="text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.4em] bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
          Expertise
        </div>
        <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Technical Skillset</h2>
        <p className="mt-2 text-sm text-slate-300 md:text-base">
          A modern, battle-tested toolkit for building delightful, large-scale products.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.name}
              className={`group flex flex-col items-center rounded-2xl border border-white/10 bg-navy-800/60 p-6 text-center shadow-[0_18px_45px_rgba(15,23,42,0.9)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer`}
              style={{
                boxShadow: inView
                  ? `0 0 0 rgba(0,0,0,0)`
                  : '0 18px 45px rgba(15,23,42,0.9)',
                transitionDelay: inView ? `${index * 50}ms` : '0ms',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)'
              }}
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/80 shadow-lg transition-transform duration-300 group-hover:scale-105"
                style={{ boxShadow: `0 0 18px ${skill.color}55` }}
              >
                <Icon
                  className="h-6 w-6"
                  style={{ color: skill.color }}
                />
              </div>
              <div className="text-sm font-semibold text-white">{skill.name}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};


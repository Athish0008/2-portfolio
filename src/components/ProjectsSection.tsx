import React, { useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { ProjectModal } from './ProjectsSectionModal';

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  tech: string[];
  spotlightColor: string;
}

const featuredProjects: Project[] = [
  {
    slug: 'lumino-dashboard',
    name: 'Lumino Dashboard',
    tagline:
      'A futuristic data visualization dashboard with interactive 3D elements and smooth data-driven animations.',
    tech: ['React', 'Three.js', 'D3.js', 'Tailwind'],
    spotlightColor: '#A855F7'
  },
  {
    slug: 'stripe-edge-portal',
    name: 'Stripe-Edge Portal',
    tagline:
      'An enterprise-grade billing portal focused on ultra-fast load times and seamless onboarding.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'Stripe'],
    spotlightColor: '#4F46E5'
  },
  {
    slug: 'aether-engine',
    name: 'Aether Engine',
    tagline:
      'A high-performance physics engine for the web, capable of simulating millions of particles.',
    tech: ['Rust', 'WASM', 'WebGL', 'Vite'],
    spotlightColor: '#EC4899'
  }
];

interface ProjectsSectionProps {
  onProjectNavigate: (slug: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onProjectNavigate }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      data-section
      ref={ref}
      className="space-y-8"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.4em] bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Showcase
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Selected Work</h2>
        </div>
        <button
          className="hidden items-center gap-2 text-sm font-medium text-indigo-300 hover:text-indigo-200 md:inline-flex"
          onClick={() => onProjectNavigate('lumino-dashboard')}
        >
          <span>View All Projects</span>
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, idx) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={idx}
            inView={inView}
            onOpen={() => setActiveProject(project)}
          />
        ))}
      </div>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onViewDetails={() => {
            onProjectNavigate(activeProject.slug);
            setActiveProject(null);
          }}
        />
      )}
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  inView: boolean;
  onOpen: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, inView, onOpen }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setCarouselIndex((i) => (i + 1) % 3);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  const go = (dir: -1 | 1) => {
    setCarouselIndex((i) => (i + dir + 3) % 3);
  };

  return (
    <div
      className="relative cursor-pointer rounded-3xl border border-white/10 bg-navy-800/70 p-4 pt-10 shadow-xl shadow-indigo-500/20 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-400/70"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${index * 80}ms`
      }}
      onClick={onOpen}
    >
      {/* Spotlight */}
      <div className="pointer-events-none absolute -top-16 left-1/2 z-0 -translate-x-1/2">
        <div className="spotlight-sway flex flex-col items-center">
          <div className="h-7 w-7 rounded-full bg-slate-200 shadow-md shadow-slate-900/80" />
          <div className="h-10 w-px bg-slate-500/70" />
          <div
            className="mt-2 h-20 w-40 rounded-b-full bg-gradient-to-b from-white/40 via-transparent to-transparent blur-xl"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${project.spotlightColor}66, transparent)`
            }}
          />
        </div>
      </div>

      <div className="relative z-10 space-y-4">
        {/* Carousel */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex min-w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 px-8 py-16"
              >
                <div className="h-full w-full rounded-xl border border-white/5 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.35),transparent_55%)]" />
              </div>
            ))}
          </div>
          {/* Arrows */}
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/80 p-1 text-slate-100 shadow hover:bg-slate-800"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/80 p-1 text-slate-100 shadow hover:bg-slate-800"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                className={`h-1.5 w-3 rounded-full transition-all ${
                  carouselIndex === i ? 'bg-indigo-400 w-5' : 'bg-slate-500'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCarouselIndex(i);
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-indigo-200">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-indigo-500/15 px-2 py-1"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
          <p className="text-sm text-slate-300 line-clamp-3">{project.tagline}</p>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 text-xs">
          <div className="flex gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-slate-100">
              <Github className="h-3.5 w-3.5" />
              <span>Repo</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-1.5 text-white">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live Demo</span>
            </div>
          </div>
          <span className="text-slate-400">Click for full details</span>
        </div>
      </div>
    </div>
  );
};


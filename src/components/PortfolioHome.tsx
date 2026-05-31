import React, { useMemo, useState } from 'react';
import { ChevronRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { useLenis } from '../lenisContext';
import { useInView } from '../hooks/useInView';
import { ProjectsSection } from './ProjectsSection';
import { AboutSection } from './AboutSection';
import { SkillsSection } from './SkillsSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { ContactSection } from './ContactSection';
import { FooterSection } from './FooterSection';

interface PortfolioHomeProps {
  onProjectNavigate: (slug: string) => void;
}

const sections = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
] as const;

export const PortfolioHome: React.FC<PortfolioHomeProps> = ({ onProjectNavigate }) => {
  const { scrollTo } = useLenis();
  const [navSolid, setNavSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setNavSolid(y > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    scrollTo(target);
    setMobileOpen(false);
  };

  const totalProjects = 25;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-navy-900 via-navy-900 to-slate-950 text-slate-50">
      {/* Progress bar */}
      <ScrollProgress />

      {/* Faded DEVELOPER text */}
      <div className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center">
        <div className="select-none text-[18vw] font-black tracking-[0.15em] text-indigo-400/5">
          DEVELOPER
        </div>
      </div>

      {/* Hero gradient blob */}
      <div className="pointer-events-none fixed -top-40 left-1/2 -z-10 h-[750px] w-[750px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_20%,#A855F7,transparent_55%),radial-gradient(circle_at_70%_80%,#3B82F6,transparent_55%)] opacity-70 blur-3xl hero-blob" />

      {/* Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          navSolid ? 'backdrop-blur-xl bg-navy-900/80 border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/40" />
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Software Engineer
              </span>
              <span className="text-sm font-semibold">Your Name</span>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-200 md:flex">
            {sections.map((s) => (
              <button
                key={s.id}
                className="relative cursor-pointer transition-colors hover:text-white"
                onClick={() => scrollToSection(s.id)}
              >
                <span>{s.label}</span>
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <span>Start Your Project</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <button
            className="inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-slate-200 md:hidden"
            onClick={() => setMobileOpen((x) => !x)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-white/10 bg-navy-900/95 px-4 pb-4 pt-2 md:hidden">
            <div className="flex flex-col gap-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className="rounded-lg px-2 py-2 text-left text-sm text-slate-200 hover:bg-white/5"
                >
                  {s.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold shadow-lg shadow-indigo-500/40"
              >
                <span>Start Your Project</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="mx-auto flex max-w-6xl flex-col gap-32 px-4 pb-24 pt-28 md:pt-32">
        <HeroSection totalProjects={totalProjects} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection onProjectNavigate={onProjectNavigate} />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>

      <FooterSection />

      <BackToTopButton />
      <SocialDock />
    </div>
  );
};

const HeroSection: React.FC<{ totalProjects: number }> = ({ totalProjects }) => {
  const { inView, ref } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();
    const animate = (time: number) => {
      const t = Math.min(1, (time - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * totalProjects));
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, totalProjects]);

  const particleDots = useMemo(() => {
    return new Array(24).fill(0).map((_, i) => ({
      id: i,
      angle: (i / 24) * Math.PI * 2,
      radius: 200 + (i % 4) * 18
    }));
  }, []);

  return (
    <section
      id="work"
      data-section
      ref={ref}
      className="relative grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center"
    >
      {/* Particle sphere */}
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-slate-900/50 backdrop-blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[420px] -translate-x-1/2 overflow-visible">
        <div className="particle-orbit relative h-full w-full rounded-full border border-indigo-500/10">
          {particleDots.map((dot) => (
            <div
              key={dot.id}
              className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-sky-400 shadow-[0_0_12px_rgba(129,140,248,0.8)]"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate3d(${Math.cos(dot.angle) * dot.radius}px, ${
                  Math.sin(dot.angle) * dot.radius
                }px, 0)`
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="text-xs uppercase tracking-[0.35em] text-slate-400">
          The best way to predict the future is to create it.
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            <span className="block text-white">Crafting</span>
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-violet-400 bg-clip-text text-transparent italic">
              Scalable Applications
            </span>
            <span className="block text-white">That Matter</span>
          </h1>
          <p className="max-w-xl text-sm text-slate-300 md:text-base">
            Building enterprise-grade applications with modern technologies, thoughtful UX, and
            architectures designed to scale with millions of users.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <PrimaryButton onClick={() => document.getElementById('projects')?.scrollIntoView()}>
            <span>View My Work</span>
            <ChevronRight className="h-4 w-4" />
          </PrimaryButton>
        </div>
      </div>

      <div className="flex flex-col items-end gap-6 md:items-stretch">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-indigo-300">At a glance</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-200">
            <div>
              <div className="text-2xl font-semibold text-white">Full Stack</div>
              <div className="mt-1 text-xs text-slate-400">React · Node · Cloud-native</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-white">System Design</div>
              <div className="mt-1 text-xs text-slate-400">Resilient, scalable systems</div>
            </div>
          </div>
        </div>

        {/* Projects counter */}
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-sky-500/20 px-6 py-5 shadow-[0_0_40px_rgba(79,70,229,0.45)]">
          <div className="pointer-events-none absolute -inset-16 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.25),_transparent_60%)]" />
          <div className="relative flex items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-indigo-200">
                Projects delivered
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <div className="text-5xl font-semibold text-white tabular-nums drop-shadow-[0_0_20px_rgba(129,140,248,0.7)]">
                  {count}+
                </div>
              </div>
              <div className="mt-1 text-xs text-indigo-100">
                From dashboards to platforms serving thousands of users.
              </div>
            </div>
            <div className="flex flex-col items-end text-[11px] text-indigo-100">
              <span>Optimized for 60fps</span>
              <span>Lenis-smooth experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = '',
  ...rest
}) => (
  <button
    {...rest}
    className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${className}`}
  >
    {children}
  </button>
);

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-violet-500 transition-[width]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const BackToTopButton: React.FC = () => {
  const { scrollTo } = useLenis();
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setVisible((window.scrollY || window.pageYOffset) > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => scrollTo(0)}
      className="fixed bottom-6 right-4 z-40 rounded-full border border-white/15 bg-navy-800/80 px-3 py-2 text-xs font-medium text-slate-100 shadow-lg backdrop-blur-xl transition-transform hover:scale-[1.03]"
    >
      Back to top
    </button>
  );
};

const SocialDock: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-4 z-30 hidden flex-col items-center gap-3 text-slate-300 sm:flex">
      <a
        href="mailto:you@example.com"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-navy-800/80 shadow-md backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-300"
        aria-label="Email"
      >
        <Mail className="h-4 w-4" />
      </a>
      <a
        href="https://github.com/"
        target="_blank"
        rel="noreferrer"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-navy-800/80 shadow-md backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-300"
        aria-label="GitHub"
      >
        <Github className="h-4 w-4" />
      </a>
      <a
        href="https://www.linkedin.com/"
        target="_blank"
        rel="noreferrer"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-navy-800/80 shadow-md backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-300"
        aria-label="LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <div className="h-14 w-px bg-gradient-to-b from-transparent via-slate-500/60 to-transparent" />
    </div>
  );
};


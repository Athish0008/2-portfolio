import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { useLenis } from '../lenisContext';

const projectOrder = [
  'lumino-dashboard',
  'stripe-edge-portal',
  'aether-engine',
  'realtime-collab',
  'ai-content-generator',
  'ecommerce-platform',
  'devops-dashboard',
  'weather-app',
  'task-manager'
] as const;

type Slug = (typeof projectOrder)[number];

const projectMeta: Record<
  Slug,
  {
    title: string;
    tagline: string;
  }
> = {
  'lumino-dashboard': {
    title: 'Lumino Dashboard',
    tagline:
      'A futuristic data visualization dashboard for high-stakes decision making and real-time insights.'
  },
  'stripe-edge-portal': {
    title: 'Stripe-Edge Portal',
    tagline: 'An enterprise-grade billing portal optimized for performance and delightful UX.'
  },
  'aether-engine': {
    title: 'Aether Engine',
    tagline: 'A high-performance physics engine bringing large-scale simulations to the browser.'
  },
  'realtime-collab': {
    title: 'Real-Time Collaboration Hub',
    tagline:
      'Multi-user workspace with live cursors, shared documents, and integrated video rooms.'
  },
  'ai-content-generator': {
    title: 'AI Content Generator',
    tagline:
      'GPT-powered content platform for marketing teams that ship campaigns at startup speed.'
  },
  'ecommerce-platform': {
    title: 'E-Commerce Platform',
    tagline:
      'End-to-end commerce stack with payments, inventory, and a battle-tested admin experience.'
  },
  'devops-dashboard': {
    title: 'DevOps Dashboard',
    tagline: 'Unified view into deployments, metrics, and pipelines across environments.'
  },
  'weather-app': {
    title: 'Weather Forecast App',
    tagline:
      'A calm, data-rich weather experience with hourly breakdowns, alerts, and visualizations.'
  },
  'task-manager': {
    title: 'Task Management System',
    tagline:
      'A collaborative, kanban-style system for engineering teams managing complex roadmaps.'
  }
};

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: Slug }>();
  const navigate = useNavigate();
  const { scrollTo } = useLenis();

  if (!slug || !projectMeta[slug]) {
    return (
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 text-slate-100">
        <p>Project not found.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-3 rounded-full border border-white/20 px-4 py-2 text-sm hover:border-indigo-400 hover:bg-white/5"
        >
          Back to portfolio
        </button>
      </main>
    );
  }

  const idx = projectOrder.indexOf(slug);
  const prev = projectOrder[idx - 1];
  const next = projectOrder[idx + 1];

  const meta = projectMeta[slug];

  const goTo = (target?: Slug) => {
    if (!target) return;
    navigate(`/project/${target}`);
    scrollTo(0);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-navy-900 via-navy-900 to-slate-950 pb-16 pt-24 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 space-y-16">
        {/* Hero */}
        <section className="space-y-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-indigo-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to portfolio</span>
          </button>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-navy-900 to-violet-500/20 p-6 shadow-xl backdrop-blur-xl">
            <div className="max-w-xl space-y-3">
              <h1 className="text-4xl font-semibold md:text-5xl">{meta.title}</h1>
              <p className="text-sm text-slate-200 md:text-base">{meta.tagline}</p>
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-indigo-100">
                <span className="rounded-full bg-indigo-500/20 px-2 py-1">React</span>
                <span className="rounded-full bg-indigo-500/20 px-2 py-1">TypeScript</span>
                <span className="rounded-full bg-indigo-500/20 px-2 py-1">Node.js</span>
                <span className="rounded-full bg-indigo-500/20 px-2 py-1">AWS</span>
              </div>
              <div className="flex flex-wrap gap-3 pt-2 text-sm">
                <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-slate-100 hover:bg-white/15">
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Demo</span>
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-slate-100 hover:border-indigo-400 hover:bg-white/5">
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="space-y-3 text-sm text-slate-200 md:text-base">
            <h2 className="text-xl font-semibold text-white">Overview</h2>
            <p>
              This project was built to feel native-fast and trustworthy, even under heavy usage.
              From the rendering layer to the persistence model, every decision was made in service
              of clarity, resilience, and performance.
            </p>
            <p>
              Users can explore complex data structures, perform multi-step tasks, and collaborate
              with teammates while the system stays responsive and predictable. The experience is
              tuned for both power users and first-time visitors.
            </p>
            <p>
              The architecture favors clear boundaries between domains, with contracts enforced at
              compile time and observability woven in from the first line of code.
            </p>
          </div>
          <aside className="rounded-2xl border border-white/10 bg-navy-800/80 p-4 text-xs text-slate-200 shadow-lg backdrop-blur-xl">
            <h3 className="mb-3 text-sm font-semibold text-white">Project Stats</h3>
            <dl className="space-y-1.5">
              <Row label="Lines of Code">~15,000</Row>
              <Row label="Development Time">3 months</Row>
              <Row label="Team Size">Solo</Row>
              <Row label="Status">Live</Row>
              <Row label="Completion">December 2024</Row>
              <Row label="GitHub Stars">150+</Row>
              <Row label="Last Updated">January 2025</Row>
            </dl>
          </aside>
        </section>

        {/* Problem & Solution */}
        <section className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3 text-sm text-slate-200">
            <h2 className="text-lg font-semibold text-white">Problem Statement</h2>
            <p>
              Teams needed a platform that could translate raw, fragmented data and processes into
              a cohesive, trustworthy experience—without sacrificing performance or flexibility.
            </p>
            <p>
              Existing tools were often slow, visually noisy, or hard to extend. The challenge was
              to build something that felt elegant on day one and could keep evolving as needs
              changed.
            </p>
          </div>
          <div className="space-y-3 text-sm text-slate-200">
            <h2 className="text-lg font-semibold text-white">Solution Approach</h2>
            <p>
              The system is built around clear domain boundaries, event-driven flows, and a
              component library that acts as a design system. Performance budgets and UX principles
              informed every feature.
            </p>
            <p>
              From there, the work focused on shaping APIs and state models that would make it easy
              to add features without unravelling existing behavior.
            </p>
          </div>
        </section>

        {/* Features & Challenges (simplified) */}
        <section className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Key Features</h2>
            <ul className="space-y-1.5 text-sm text-slate-200">
              <li>• Real-time updates with optimistic UI for high-trust interactions.</li>
              <li>• Rich filtering, search, and navigation tailored to expert workflows.</li>
              <li>• Responsive layouts for desktop, tablet, and mobile use cases.</li>
              <li>• Deep integrations with third-party APIs where it adds real leverage.</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Challenges & Learnings</h2>
            <ul className="space-y-1.5 text-sm text-slate-200">
              <li>• Balancing animation and performance to keep everything at 60fps.</li>
              <li>• Designing data models that stayed flexible under new feature requests.</li>
              <li>• Bringing observability into the product early, not as an afterthought.</li>
            </ul>
          </div>
        </section>

        {/* CTA + Nav footer */}
        <section className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-navy-800/80 p-5 text-sm text-slate-200 shadow-lg backdrop-blur-xl">
            <h2 className="mb-2 text-lg font-semibold text-white">Ready to see more?</h2>
            <p>
              I&apos;m happy to walk through tradeoffs, implementation details, and the thinking
              behind each decision in a live conversation.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo(0)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-1.5 text-sm font-semibold text-white"
              >
                <span>Back to top</span>
              </button>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm text-slate-100 hover:border-indigo-400 hover:bg-white/5"
              >
                <span>Back to portfolio</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <button
              disabled={!prev}
              onClick={() => goTo(prev)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous Project</span>
            </button>
            <button
              disabled={!next}
              onClick={() => goTo(next)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 disabled:opacity-40"
            >
              <span>Next Project</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex justify-between gap-3">
    <dt className="text-slate-400">{label}</dt>
    <dd className="text-slate-100">{children}</dd>
  </div>
);


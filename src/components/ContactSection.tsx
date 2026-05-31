import React, { useState } from 'react';
import { Github, Linkedin, Mail, SendHorizonal } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export const ContactSection: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const isValid =
    form.name.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.message.trim().length > 5;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 2600);
    }, 1000);
  };

  return (
    <section
      id="contact"
      data-section
      ref={ref}
      className="space-y-8"
    >
      <div className="text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-300">
          Contact
        </div>
        <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
          Let&apos;s Build Something Amazing
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-navy-800/80 p-5 shadow-xl backdrop-blur-xl md:p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ada Lovelace"
            />
            <Field
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>
          <Field
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell me about the product, team, and impact you want to create."
            textarea
          />
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              I&apos;ll get back within 24 hours for serious opportunities.
            </div>
            <button
              type="submit"
              disabled={!isValid || submitting}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-transparent" />
              ) : (
                <SendHorizonal className="h-4 w-4" />
              )}
              <span>{submitting ? 'Sending...' : 'Send Message'}</span>
            </button>
          </div>
          {success && (
            <div className="mt-2 text-xs text-emerald-300">
              Message sent! Looking forward to hearing about what you&apos;re building.
            </div>
          )}
        </form>

        <div
          className="space-y-4 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-navy-900/90 to-sky-500/10 p-5 shadow-xl backdrop-blur-xl md:p-6"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 550ms cubic-bezier(0.4,0,0.2,1)'
          }}
        >
          <div className="text-sm font-semibold text-white">Direct Contact</div>
          <a
            href="mailto:you@example.com"
            className="text-sm text-indigo-200 hover:text-indigo-100"
          >
            you@example.com
          </a>
          <div className="mt-4 text-xs text-slate-300">
            Prefer async? I&apos;m active on GitHub and LinkedIn, always open to conversations about
            impactful products and teams that care about craft.
          </div>
          <div className="mt-4 flex gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate-100 hover:border-indigo-400 hover:bg-white/5"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate-100 hover:border-indigo-400 hover:bg-white/5"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:you@example.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate-100 hover:border-indigo-400 hover:bg-white/5"
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  textarea?: boolean;
}

const Field: React.FC<FieldProps> = ({ label, name, value, onChange, placeholder, textarea }) => {
  const InputTag = textarea ? 'textarea' : 'input';
  return (
    <label className="flex flex-col gap-1 text-xs text-slate-200">
      <span>{label}</span>
      <InputTag
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="min-h-[40px] rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-400/0 transition focus:ring-2 focus:ring-indigo-400/80"
        rows={textarea ? 4 : undefined}
      />
    </label>
  );
};


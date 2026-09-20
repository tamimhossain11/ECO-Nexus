'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { site } from '@/lib/site';

const subjects = ['Sponsorship', 'Field demo', 'Research', 'Press', 'Other'];

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

export default function ContactForm() {
  const [subject, setSubject] = useState(subjects[0]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<Errors>({});

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (name.length < 2) next.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = 'That email does not look right.';
    if (message.length < 12) next.message = 'A sentence or two helps us route your message.';
    return next;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('sending');
    // No backend yet — hand the message to the visitor's mail client and confirm in-page.
    const body = [
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Organisation: ${data.get('org') || '—'}`,
      `Topic: ${subject}`,
      '',
      String(data.get('message') ?? ''),
    ].join('\n');

    await new Promise((r) => setTimeout(r, 900));
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `[${subject}] Eco Nexus enquiry`,
    )}&body=${encodeURIComponent(body)}`;

    setStatus('sent');
    form.reset();
    setTimeout(() => setStatus('idle'), 6000);
  };

  return (
    <div className="glass-strong relative overflow-hidden rounded-[2rem] p-7 sm:p-9">
      <AnimatePresence>
        {status === 'sent' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-[2rem] px-8 text-center"
            style={{ background: 'rgb(var(--bg) / 0.92)' }}
          >
            <motion.span
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14 }}
            >
              <CheckCircle2 className="h-14 w-14 text-accent" />
            </motion.span>
            <h3 className="h3">Your mail client is open</h3>
            <p className="max-w-sm text-sm text-muted">
              Send the drafted message and we will reply within two working days. You can also write
              to{' '}
              <a href={`mailto:${site.email}`} className="text-accent underline">
                {site.email}
              </a>{' '}
              directly.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="h3">Send the team a message</h2>
      <p className="mt-2 text-sm text-muted">
        Tell us what you are working on. Sponsorship decks and technical documentation are available
        on request.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-7 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" error={errors.name}>
            <input name="name" className="field" placeholder="Your full name" autoComplete="name" />
          </Field>
          <Field label="Email" error={errors.email}>
            <input
              name="email"
              type="email"
              className="field"
              placeholder="you@organisation.com"
              autoComplete="email"
            />
          </Field>
        </div>

        <Field label="Organisation (optional)">
          <input name="org" className="field" placeholder="Company, lab or publication" />
        </Field>

        <div>
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Topic
          </span>
          <div className="flex flex-wrap gap-2">
            {subjects.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSubject(s)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 ${
                  subject === s ? 'scale-105' : 'glass opacity-75 hover:opacity-100'
                }`}
                style={
                  subject === s
                    ? {
                        background: 'rgb(var(--accent) / 0.16)',
                        border: '1px solid rgb(var(--accent) / 0.5)',
                        color: 'rgb(var(--accent))',
                      }
                    : undefined
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <Field label="Message" error={errors.message}>
          <textarea
            name="message"
            rows={5}
            className="field resize-none"
            placeholder="What would you like to build, fund or find out?"
          />
        </Field>

        <button type="submit" disabled={status === 'sending'} className="btn-primary w-full">
          {status === 'sending' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Preparing your message
            </>
          ) : (
            <>
              Send message
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        {label}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-1.5 block text-[12px] text-rose-400"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

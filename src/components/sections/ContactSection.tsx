'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Clock, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import ContactForm from './ContactForm';
import Reveal, { StaggerGroup, StaggerItem } from '@/components/Reveal';
import { faqs, site } from '@/lib/site';

const channels = [
  {
    icon: Mail,
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    note: 'Replies within two working days',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, '')}`,
    note: 'Sun–Thu, 10:00–18:00 (GMT+6)',
  },
  {
    icon: MapPin,
    label: 'Lab',
    value: site.address,
    href: 'https://maps.google.com/?q=Dhaka+Bangladesh',
    note: 'Visits by appointment',
  },
];

export default function ContactSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <section className="section pt-32 sm:pt-36">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">
            <MessageSquare className="h-3.5 w-3.5" />
            Contact
          </span>
          <h1 className="h1">
            Let&apos;s build the <span className="gradient-text">next flight</span> together
          </h1>
          <p className="lead mt-6 max-w-2xl">
            Whether you want to sponsor the WICE 2026 campaign, book a field demonstration over your
            own land, or write about the team — this reaches the whole team.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_minmax(0,420px)]">
          <Reveal from="right">
            <ContactForm />
          </Reveal>

          <div className="space-y-4">
            <StaggerGroup className="space-y-4">
              {channels.map((c) => (
                <StaggerItem key={c.label}>
                  <a
                    href={c.href}
                    target={c.label === 'Lab' ? '_blank' : undefined}
                    rel="noreferrer noopener"
                    className="glass-card block p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                        style={{
                          background: 'rgb(var(--accent) / 0.14)',
                          border: '1px solid rgb(var(--accent) / 0.28)',
                        }}
                      >
                        <c.icon className="h-4 w-4 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                          {c.label}
                        </p>
                        <p className="mt-1 break-words font-medium">{c.value}</p>
                        <p className="mt-1 text-[12px] text-muted">{c.note}</p>
                      </div>
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {/* radar panel */}
            <Reveal delay={0.2}>
              <div className="glass-strong relative overflow-hidden rounded-[2rem] p-7">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Demo flights · Dhaka
                  </p>
                </div>
                <div className="relative mx-auto mt-6 h-40 w-40">
                  {[1, 0.7, 0.42].map((s) => (
                    <span
                      key={s}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        width: `${s * 100}%`,
                        height: `${s * 100}%`,
                        border: '1px solid rgb(var(--accent) / 0.28)',
                      }}
                    />
                  ))}
                  <motion.span
                    className="absolute left-1/2 top-1/2 h-1/2 w-1/2 origin-bottom-left"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{
                      background:
                        'conic-gradient(from 0deg, rgb(var(--accent) / 0.45), transparent 70deg)',
                      borderRadius: '100% 0 0 0',
                    }}
                  />
                  <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent)/0.9)]" />
                </div>
                <p className="mt-6 text-center text-sm text-muted">
                  We fly monthly demos near Dhaka and travel for serious partnerships.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Before you write</span>
          <h2 className="h2">
            Common <span className="gradient-text">questions</span>
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.06}>
                <div className="glass overflow-hidden rounded-2xl">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-medium">{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="h-4 w-4 shrink-0 text-accent" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}

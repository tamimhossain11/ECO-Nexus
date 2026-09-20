'use client';

import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';
import { timeline } from '@/lib/site';

export default function Roadmap() {
  return (
    <section className="section">
      <Reveal className="max-w-2xl">
        <span className="eyebrow">Road to WICE 2026</span>
        <h2 className="h2">
          From a field interview to the <span className="gradient-text">world stage</span>
        </h2>
      </Reveal>

      <div className="relative mt-14">
        {/* spine */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="absolute left-[15px] top-2 h-full w-px origin-top md:left-1/2"
          style={{
            background:
              'linear-gradient(to bottom, rgb(var(--accent)), rgb(var(--accent-2)), transparent)',
          }}
        />

        <div className="space-y-8">
          {timeline.map((item, i) => (
            <motion.div
              key={item.period}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative pl-12 md:w-1/2 md:pl-0 ${
                i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
              }`}
            >
              {/* node */}
              <span
                className={`absolute left-[9px] top-6 grid h-3.5 w-3.5 place-items-center rounded-full md:left-auto ${
                  i % 2 === 0 ? 'md:-right-[7px]' : 'md:-left-[7px]'
                }`}
                style={{
                  background: 'rgb(var(--accent))',
                  boxShadow: '0 0 0 4px rgb(var(--accent) / 0.18)',
                }}
              >
                <span className="absolute h-3.5 w-3.5 rounded-full bg-accent animate-pulseRing" />
              </span>

              <div className="glass-card p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {item.period}
                </span>
                <h3 className="h3 mt-2">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

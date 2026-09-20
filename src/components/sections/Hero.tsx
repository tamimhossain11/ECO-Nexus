'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MousePointerClick, Radar } from 'lucide-react';
import { useRef } from 'react';
import DroneCanvas from '@/components/three/DroneCanvas';
import Counter from '@/components/Counter';
import { site } from '@/lib/site';

const headline = ['Eyes', 'in', 'the', 'sky', 'for', 'a', 'greener', 'Bangladesh'];

const heroStats = [
  { value: '52', unit: 'min', label: 'Endurance' },
  { value: '12', unit: 'km', label: 'Range' },
  { value: '40', unit: 'ha', label: 'Per flight' },
  { value: '120', unit: 'hrs', label: 'Field tested' },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32">
      {/* 3D drone sits behind the copy on mobile, beside it on desktop */}
      <div className="pointer-events-none absolute inset-0 lg:left-auto lg:w-[58%]">
        <div className="h-full w-full opacity-60 sm:opacity-80 lg:opacity-100">
          <DroneCanvas variant="hero" className="h-full w-full" />
        </div>
      </div>

      <motion.div style={{ y, opacity }} className="section relative z-10 !py-0">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="eyebrow"
          >
            <Radar className="h-3.5 w-3.5" />
            {site.competition}
          </motion.span>

          <h1 className="h1">
            {headline.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.75, delay: 0.16 + i * 0.075, ease: [0.22, 1, 0.36, 1] }}
                className={`mr-[0.28em] inline-block ${
                  word === 'greener' || word === 'Bangladesh' ? 'gradient-text' : ''
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="lead mt-6 max-w-xl"
          >
            Eco Nexus builds one autonomous aircraft that watches a perimeter, diagnoses a rice
            field and maps a flood — then streams all of it to a ground station anyone on the team
            can read.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.88 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link href="/drone" className="btn-primary">
              Explore the drone
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/team" className="btn-ghost">
              Meet the team
            </Link>
          </motion.div>

          {/* stat strip */}
          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="glass mt-12 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-3xl sm:grid-cols-4"
          >
            {heroStats.map((s) => (
              <div key={s.label} className="px-4 py-5 text-center sm:text-left">
                <dt className="font-display text-2xl font-bold tracking-tight sm:text-[28px]">
                  <Counter value={s.value} />
                  <span className="ml-0.5 text-sm font-semibold text-accent">{s.unit}</span>
                </dt>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute inset-x-0 bottom-7 z-10 flex justify-center"
      >
        <div className="chip animate-float">
          <MousePointerClick className="h-3.5 w-3.5 text-accent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
            Move your cursor — the drone follows
          </span>
        </div>
      </motion.div>
    </section>
  );
}

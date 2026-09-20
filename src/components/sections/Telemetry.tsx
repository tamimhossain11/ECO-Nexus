'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Battery, Satellite, Signal, Wind } from 'lucide-react';
import Reveal from '@/components/Reveal';

const detections = [
  { label: 'Crop stress zone', conf: 0.94, tone: 'warn' },
  { label: 'Perimeter contact', conf: 0.88, tone: 'alert' },
  { label: 'Irrigation channel', conf: 0.97, tone: 'ok' },
  { label: 'Pest cluster', conf: 0.81, tone: 'warn' },
];

// Crop-health colours are semantic, not brand: green reads as healthy
// regardless of the site's accent.
const toneColor: Record<string, string> = {
  ok: '#22c55e',
  warn: '#f0b429',
  alert: '#fb7185',
};

/** Mock ground-station panel — values drift so the page feels live. */
export default function Telemetry() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(id);
  }, []);

  const drift = (base: number, spread: number) =>
    (base + Math.sin(tick * 1.7 + base) * spread).toFixed(1);

  const readouts = [
    { icon: Battery, label: 'Battery', value: `${drift(78, 3)}%` },
    { icon: Signal, label: 'Link', value: `${drift(96, 2)}%` },
    { icon: Satellite, label: 'GNSS', value: `${14 + (tick % 3)} sats` },
    { icon: Wind, label: 'Wind', value: `${drift(6.4, 1.2)} m/s` },
  ];

  return (
    <section className="section">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal from="right">
          <span className="eyebrow">Ground station</span>
          <h2 className="h2">
            Every flight is <span className="gradient-text">legible</span>
          </h2>
          <p className="lead mt-5">
            Telemetry, detections and battery state stream to one panel. An agronomist reads it the
            same way a security officer does — no flight training required.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              'Sub-second telemetry over an encrypted 12 km link',
              'On-board inference — the aircraft decides without the cloud',
              'Every mission exports to GeoTIFF, CSV and our open REST API',
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgb(var(--accent)/0.9)]" />
                <span className="text-sm text-muted">{line}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal from="left">
          <div className="glass-strong relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
            {/* scanline */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scan"
              style={{
                background:
                  'linear-gradient(to bottom, transparent, rgb(var(--accent) / 0.14), transparent)',
              }}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
                  Mission EN-042 · Live
                </span>
              </div>
              <Activity className="h-4 w-4 text-accent" />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {readouts.map((r) => (
                <div key={r.label} className="glass rounded-2xl px-3 py-3.5">
                  <r.icon className="h-3.5 w-3.5 text-accent" />
                  <p className="mt-2 font-display text-lg font-semibold tabular-nums">{r.value}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    {r.label}
                  </p>
                </div>
              ))}
            </div>

            {/* fake NDVI field map */}
            <div className="glass mt-3 overflow-hidden rounded-2xl p-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                NDVI crop-stress map · Plot 7
              </p>
              <div className="mt-2.5 grid grid-cols-12 gap-[3px]">
                {Array.from({ length: 48 }).map((_, i) => {
                  const v = (Math.sin(i * 1.7 + tick * 0.5) + 1) / 2;
                  return (
                    <motion.span
                      key={i}
                      animate={{ opacity: 0.35 + v * 0.65 }}
                      transition={{ duration: 1.4 }}
                      className="aspect-square rounded-[3px]"
                      style={{
                        background:
                          v > 0.66
                            ? '#22c55e'
                            : v > 0.33
                              ? '#f0b429'
                              : '#fb7185',
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* detections */}
            <div className="mt-3 space-y-2">
              {detections.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 * i, duration: 0.5 }}
                  className="glass flex items-center justify-between rounded-xl px-3.5 py-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: toneColor[d.tone] }}
                    />
                    <span className="text-[13px]">{d.label}</span>
                  </div>
                  <span className="font-mono text-[11px] tabular-nums text-muted">
                    {(d.conf * 100).toFixed(0)}%
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

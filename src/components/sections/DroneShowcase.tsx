'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Camera, BatteryCharging, Wifi, Wind, SprayCan, Rotate3d } from 'lucide-react';
import DroneCanvas from '@/components/three/DroneCanvas';
import Reveal, { StaggerGroup, StaggerItem } from '@/components/Reveal';
import Counter from '@/components/Counter';
import TiltCard from '@/components/TiltCard';
import { specs } from '@/lib/site';

const subsystems = [
  {
    icon: Cpu,
    name: 'Compute',
    headline: 'Jetson-class edge module',
    detail:
      'Runs the detection and NDVI pipelines on-board at 30 FPS. If the radio link drops mid-mission, the aircraft keeps making decisions and flies its route to completion.',
    stats: ['30 FPS inference', '8 GB unified memory', 'INT8 quantised models'],
  },
  {
    icon: Camera,
    name: 'Sensors',
    headline: 'Triple-payload gimbal',
    detail:
      'A 3-axis stabilised head carrying a 48 MP RGB sensor, a 640×512 thermal core and a 5-band multispectral array for crop-health work.',
    stats: ['48 MP RGB', '640×512 thermal', '5-band multispectral'],
  },
  {
    icon: BatteryCharging,
    name: 'Power',
    headline: '6S 22 000 mAh smart pack',
    detail:
      'Hot-swappable cells with per-cell telemetry and thermal cutoff. Fifty-two minutes of loiter, or thirty-eight with the spray tank loaded.',
    stats: ['52 min loiter', 'Hot-swap in 40 s', 'Per-cell telemetry'],
  },
  {
    icon: Wifi,
    name: 'Datalink',
    headline: 'Encrypted dual-band radio',
    detail:
      'AES-256 telemetry and 1080p video over a 12 km link, with automatic failover to LTE where the network reaches and return-to-home where it does not.',
    stats: ['12 km range', 'AES-256', 'LTE failover'],
  },
  {
    icon: Wind,
    name: 'Airframe',
    headline: 'Carbon X-frame, IP54',
    detail:
      'A 980 mm carbon composite frame with folding arms and printed spare parts, tuned to hold position in 14 m/s monsoon gusts.',
    stats: ['980 mm span', '14 m/s gusts', 'Folds in 20 s'],
  },
  {
    icon: SprayCan,
    name: 'Agri payload',
    headline: '5 L variable-rate sprayer',
    detail:
      'Four nozzles metered against the live NDVI prescription map, so chemical lands only on the stressed zones the scan actually found.',
    stats: ['5 L tank', '4 nozzles', 'Prescription-driven'],
  },
];

export default function DroneShowcase() {
  const [active, setActive] = useState(0);
  const Current = subsystems[active];

  return (
    <>
      <section className="section pt-32 sm:pt-36">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">
            <Rotate3d className="h-3.5 w-3.5" />
            EN-1 Sentinel
          </span>
          <h1 className="h1">
            One aircraft.{' '}
            <span className="gradient-text">Three missions.</span>
          </h1>
          <p className="lead mt-6 max-w-2xl">
            Drag the model to inspect it from any angle. The EN-1 Sentinel is a 980 mm carbon
            quadcopter designed around the working conditions of the Bengal delta — heat, dust,
            monsoon gusts and patchy connectivity.
          </p>
        </Reveal>

        {/* interactive 3D viewer */}
        <Reveal delay={0.15}>
          <div className="glass-strong relative mt-12 overflow-hidden rounded-[2.5rem]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 60% 60% at 50% 45%, rgb(var(--accent) / 0.16), transparent 70%)',
              }}
            />
            <div className="relative h-[58vh] min-h-[420px] w-full">
              <DroneCanvas variant="inspect" className="h-full w-full" />
            </div>

            <div className="pointer-events-none absolute left-5 top-5 flex flex-col gap-2 sm:left-7 sm:top-7">
              <span className="chip font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Interactive model
              </span>
            </div>
            <div className="pointer-events-none absolute bottom-5 right-5 sm:bottom-7 sm:right-7">
              <span className="chip font-mono text-[10px] uppercase tracking-[0.2em]">
                Drag to orbit · scroll to zoom
              </span>
            </div>
          </div>
        </Reveal>

        {/* spec grid */}
        <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {specs.map((s) => (
            <StaggerItem key={s.label}>
              <div className="glass-card p-5">
                <p className="font-display text-3xl font-bold tracking-tight">
                  <Counter value={s.value} />
                  {s.unit && (
                    <span className="ml-1 text-sm font-semibold text-accent">{s.unit}</span>
                  )}
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {s.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* subsystem explorer */}
      <section className="section pt-0">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Inside the airframe</span>
          <h2 className="h2">
            Six subsystems, <span className="gradient-text">one flight computer</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {subsystems.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setActive(i)}
                className={`glass relative shrink-0 rounded-2xl px-4 py-3.5 text-left transition-all duration-300 lg:w-full ${
                  active === i ? 'scale-[1.02]' : 'opacity-70 hover:opacity-100'
                }`}
                style={
                  active === i
                    ? { borderColor: 'rgb(var(--accent) / 0.6)' }
                    : undefined
                }
              >
                <div className="flex items-center gap-3">
                  <s.icon
                    className={`h-4 w-4 ${active === i ? 'text-accent' : 'text-muted'}`}
                  />
                  <span className="whitespace-nowrap text-sm font-semibold">{s.name}</span>
                </div>
                {active === i && (
                  <motion.span
                    layoutId="subsystem-bar"
                    className="absolute inset-y-2 left-0 w-[3px] rounded-full"
                    style={{ background: 'rgb(var(--accent))' }}
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={Current.name}
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="h-full p-8" intensity={5}>
                <div
                  className="grid h-12 w-12 place-items-center rounded-2xl"
                  style={{
                    background: 'rgb(var(--accent) / 0.14)',
                    border: '1px solid rgb(var(--accent) / 0.28)',
                  }}
                >
                  <Current.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="h3 mt-5">{Current.headline}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                  {Current.detail}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {Current.stats.map((st) => (
                    <span key={st} className="chip">
                      {st}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

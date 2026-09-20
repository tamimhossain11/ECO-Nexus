'use client';

import {
  Thermometer,
  Droplets,
  Gauge,
  CloudDrizzle,
  FlaskConical,
  Wind,
  FileText,
  type LucideIcon,
} from 'lucide-react';
import Reveal, { StaggerGroup, StaggerItem } from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';
import { project, method, parameters, payload, type Parameter } from '@/lib/site';

const icons: Record<Parameter['icon'], LucideIcon> = {
  thermometer: Thermometer,
  droplets: Droplets,
  gauge: Gauge,
  cloud: CloudDrizzle,
  flask: FlaskConical,
  wind: Wind,
};

export default function ProjectBrief() {
  return (
    <section className="section pt-0">
      <Reveal className="max-w-2xl">
        <span className="eyebrow">
          <FileText className="h-3.5 w-3.5" />
          Project brief
        </span>
        <h2 className="h2">
          {project.title.split(' ')[0]}{' '}
          <span className="gradient-text">{project.title.split(' ').slice(1).join(' ')}</span>
        </h2>
      </Reveal>

      {/* introduction + method */}
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <TiltCard className="h-full p-8" intensity={4}>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Introduction
            </h3>
            {project.intro.map((para) => (
              <p key={para.slice(0, 32)} className="mt-4 text-sm leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </TiltCard>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="glass-card h-full p-8">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Method
            </h3>
            <ol className="mt-5 space-y-4">
              {method.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[10px] font-semibold"
                    style={{
                      background: 'rgb(var(--accent) / 0.14)',
                      border: '1px solid rgb(var(--accent) / 0.28)',
                      color: 'rgb(var(--accent))',
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>

      {/* measured parameters */}
      <Reveal className="mt-16 max-w-2xl">
        <span className="eyebrow">What it measures</span>
        <h3 className="h3 mt-4">
          Seven parameters, <span className="gradient-text">every flight</span>
        </h3>
      </Reveal>

      <StaggerGroup className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {parameters.map((p) => {
          const Icon = icons[p.icon];
          return (
            <StaggerItem key={p.label}>
              <div className="glass-card h-full p-5">
                <Icon className="h-4 w-4 text-accent" />
                <p className="mt-3.5 text-sm font-semibold leading-tight">{p.label}</p>
                <p className="mt-1 font-mono text-[11px] text-accent">{p.unit}</p>
                <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {p.source}
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      {/* payload */}
      <StaggerGroup className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {payload.map((item) => (
          <StaggerItem key={item.part}>
            <div className="glass-card h-full p-6">
              <p className="font-display text-lg font-semibold">{item.part}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                {item.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

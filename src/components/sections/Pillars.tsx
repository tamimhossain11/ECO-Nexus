'use client';

import { Leaf, Radar, ShieldCheck, Check } from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import Reveal, { StaggerGroup, StaggerItem } from '@/components/Reveal';
import { pillars } from '@/lib/site';

const icons = {
  shield: ShieldCheck,
  leaf: Leaf,
  radar: Radar,
};

export default function Pillars() {
  return (
    <section id="capabilities" className="section">
      <Reveal className="max-w-2xl">
        <span className="eyebrow">Three missions, one airframe</span>
        <h2 className="h2">
          Built to <span className="gradient-text">watch, grow and understand</span>
        </h2>
        <p className="lead mt-5">
          Most teams pick one problem. Bangladesh has three at once — security, food and water — so
          Eco Nexus swaps payloads, not aircraft.
        </p>
      </Reveal>

      <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
        {pillars.map((p, i) => {
          const Icon = icons[p.icon];
          return (
            <StaggerItem key={p.title}>
              <TiltCard className="h-full p-7">
                <span className="font-mono text-[11px] tracking-[0.2em] text-muted">
                  0{i + 1}
                </span>
                <div
                  className="mt-5 grid h-12 w-12 place-items-center rounded-2xl"
                  style={{
                    background: 'rgb(var(--accent) / 0.14)',
                    border: '1px solid rgb(var(--accent) / 0.28)',
                  }}
                >
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="h3 mt-5">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.desc}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-[13px]">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      <span className="text-muted">{pt}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}

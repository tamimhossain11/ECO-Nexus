'use client';

import Reveal, { StaggerGroup, StaggerItem } from '@/components/Reveal';
import { values } from '@/lib/site';

export default function ValuesGrid() {
  return (
    <section className="section">
      <Reveal className="max-w-2xl">
        <span className="eyebrow">How we build</span>
        <h2 className="h2">
          Engineering <span className="gradient-text">principles</span>
        </h2>
      </Reveal>

      <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v, i) => (
          <StaggerItem key={v.title}>
            <div className="glass-card h-full p-6">
              <span
                className="font-display text-4xl font-bold opacity-25"
                style={{ color: 'rgb(var(--accent))' }}
              >
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{v.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

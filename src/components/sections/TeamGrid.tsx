'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { GraduationCap, Users } from 'lucide-react';
import Reveal, { StaggerGroup, StaggerItem } from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';
import Counter from '@/components/Counter';
import { mentors, parameters, payload, team } from '@/lib/site';

const teamStats = [
  { value: String(team.length), unit: '', label: 'Core members' },
  { value: String(parameters.length), unit: '', label: 'Parameters tracked' },
  { value: String(payload.length), unit: '', label: 'Onboard modules' },
];

export default function TeamGrid() {
  return (
    <>
      <section className="section pt-32 sm:pt-36">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">
            <Users className="h-3.5 w-3.5" />
            The people behind EN-1
          </span>
          <h1 className="h1">
            School students, <span className="gradient-text">one flight plan</span>
          </h1>
          <p className="lead mt-6 max-w-2xl">
            Eco Nexus is a student team from Adamjee Cantonment Public School in Dhaka,
            Bangladesh, building an IoT environmental drone that measures air quality in real
            time and streams it back to the ground.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {teamStats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="glass-card p-5">
                <p className="font-display text-3xl font-bold tracking-tight">
                  <Counter value={s.value} />
                  <span className="text-accent">{s.unit}</span>
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {s.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <StaggerItem key={m.name}>
              <TiltCard className="h-full p-7" intensity={7}>
                <div className="flex items-start justify-between gap-4">
                  {/* photograph, or initials where we do not have one yet */}
                  <div className="relative">
                    {m.photo ? (
                      <Image
                        src={m.photo}
                        alt={m.name}
                        width={160}
                        height={160}
                        sizes="64px"
                        className="h-16 w-16 rounded-2xl object-cover"
                        style={{ border: '1px solid rgb(var(--accent) / 0.35)' }}
                      />
                    ) : (
                      <div
                        className="grid h-16 w-16 place-items-center rounded-2xl font-display text-xl font-bold"
                        style={{
                          background:
                            'linear-gradient(135deg, rgb(var(--accent) / 0.85), rgb(var(--accent-2) / 0.85))',
                          color: 'rgb(var(--on-accent))',
                        }}
                      >
                        {m.initials}
                      </div>
                    )}
                    <motion.span
                      aria-hidden
                      animate={{ opacity: [0.35, 0.8, 0.35] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -inset-1 -z-10 rounded-3xl blur-lg"
                      style={{ background: 'rgb(var(--accent) / 0.4)' }}
                    />
                  </div>
                  <span className="chip font-mono text-[10px] uppercase tracking-[0.14em]">
                    {m.grade}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
                  {m.name}
                </h3>
                <p className="mt-1 text-[13px] font-medium text-accent">{m.role}</p>
                <p className="mt-1.5 text-[13px] text-muted">{m.school}</p>
                {m.bio && (
                  <p className="mt-3.5 text-sm leading-relaxed text-muted">{m.bio}</p>
                )}

                {m.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {m.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]"
                        style={{
                          background: 'rgb(var(--accent) / 0.1)',
                          color: 'rgb(var(--accent))',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="section pt-0">
        <Reveal>
          <div className="glass-strong rounded-[2rem] p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-accent" />
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Mentors & advisors
              </h2>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {mentors.map((m) => (
                <div key={m.name} className="glass flex items-center gap-4 rounded-2xl p-5">
                  <div
                    className="h-11 w-11 shrink-0 rounded-full"
                    style={{
                      background:
                        'linear-gradient(135deg, rgb(var(--accent) / 0.35), rgb(var(--accent-2) / 0.35))',
                      border: '1px solid rgb(var(--accent) / 0.3)',
                    }}
                  />
                  <div>
                    <p className="font-semibold">{m.name}</p>
                    <p className="text-[13px] text-muted">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

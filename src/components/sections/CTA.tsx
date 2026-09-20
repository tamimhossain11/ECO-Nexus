'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';

export default function CTA() {
  return (
    <section className="section">
      <Reveal>
        <div className="glass-strong relative overflow-hidden rounded-[2.5rem] px-7 py-16 text-center sm:px-14">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(ellipse 60% 70% at 50% 0%, rgb(var(--accent) / 0.22), transparent 70%)',
            }}
          />
          <div
            aria-hidden
            className="absolute -bottom-32 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-[50%] blur-3xl"
            style={{ background: 'rgb(var(--accent-2) / 0.16)' }}
          />

          <span className="eyebrow">Fly with us</span>
          <h2 className="h2 mx-auto max-w-2xl">
            Back a Bangladeshi team on the <span className="gradient-text">world stage</span>
          </h2>
          <p className="lead mx-auto mt-5 max-w-xl">
            Sponsors, agri-cooperatives, research labs and journalists — we would like to hear from
            you before WICE 2026.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/drone" className="btn-ghost">
              See the specifications
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

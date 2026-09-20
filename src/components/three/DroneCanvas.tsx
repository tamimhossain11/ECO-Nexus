'use client';

import dynamic from 'next/dynamic';
import type { DroneSceneProps } from './DroneScene';

/** three.js touches window on import, so the whole scene is client-only. */
const DroneScene = dynamic(() => import('./DroneScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <span className="absolute inset-0 rounded-full border-2 border-dashed border-accent/50 animate-spin-slow" />
          <span className="absolute inset-3 rounded-full bg-accent/20 animate-ping" />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          Spinning up rotors
        </p>
      </div>
    </div>
  ),
});

export default function DroneCanvas(props: DroneSceneProps) {
  return <DroneScene {...props} />;
}

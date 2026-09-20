'use client';

const items = [
  'Autonomous waypoint flight',
  'Thermal + RGB fusion',
  'NDVI crop mapping',
  'Edge AI at 30 FPS',
  'Encrypted 12 km downlink',
  '5 L precision sprayer',
  'Flood rapid mapping',
  'Open telemetry API',
];

/** Infinite ticker of platform capabilities. */
export default function Marquee() {
  return (
    <div className="relative overflow-hidden py-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: 'linear-gradient(to right, rgb(var(--bg)), transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: 'linear-gradient(to left, rgb(var(--bg)), transparent)' }}
      />
      <div className="flex w-max animate-marquee gap-4">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="chip whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {item}
          </span>
        ))}
      </div>

    </div>
  );
}

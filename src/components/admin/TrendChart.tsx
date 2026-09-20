'use client';

import { useId, useMemo, useState } from 'react';

const W = 320;
const H = 78;
const PAD_Y = 8;

export type TrendChartProps = {
  values: number[];
  unit: string;
  decimals: number;
  /** Clock label for each point, oldest first. */
  times: string[];
  /** Accessible description — the card heading names the series. */
  label: string;
};

/**
 * Single-series trend, one small multiple of the sensor grid. Each chart keeps
 * its OWN y-scale — the channels share no unit, so they must never share an
 * axis. One series means no legend: the card heading names it.
 */
export default function TrendChart({
  values,
  unit,
  decimals,
  times,
  label,
}: TrendChartProps) {
  const gradId = useId();
  const [cursor, setCursor] = useState<number | null>(null);

  const { points, min, max, path, area } = useMemo(() => {
    const lo = Math.min(...values);
    const hi = Math.max(...values);
    // A flat series would divide by zero; give it a nominal band.
    const span = hi - lo || Math.max(Math.abs(hi) * 0.02, 0.1);
    const pad = span * 0.18;
    const top = hi + pad;
    const bottom = lo - pad;

    const pts = values.map((v, i) => {
      const x = values.length === 1 ? W / 2 : (i / (values.length - 1)) * W;
      const y = PAD_Y + (1 - (v - bottom) / (top - bottom)) * (H - PAD_Y * 2);
      return { x, y, v };
    });

    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
    return {
      points: pts,
      min: lo,
      max: hi,
      path: d,
      area: `${d} L${W},${H} L0,${H} Z`,
    };
  }, [values]);

  const last = points[points.length - 1];
  const active = cursor === null ? null : points[cursor];

  const pick = (clientX: number, rect: DOMRect) => {
    const ratio = (clientX - rect.left) / rect.width;
    const i = Math.round(ratio * (points.length - 1));
    setCursor(Math.min(points.length - 1, Math.max(0, i)));
  };

  const fmt = (v: number) => v.toFixed(decimals);

  return (
    <div className="relative mt-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height={H}
        preserveAspectRatio="none"
        role="img"
        aria-label={`${label} trend, ${fmt(min)} to ${fmt(max)} ${unit}. Full values in the readings table below.`}
        tabIndex={0}
        className="block touch-none outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
        onMouseMove={(e) => pick(e.clientX, e.currentTarget.getBoundingClientRect())}
        onMouseLeave={() => setCursor(null)}
        onTouchStart={(e) => pick(e.touches[0].clientX, e.currentTarget.getBoundingClientRect())}
        onTouchMove={(e) => pick(e.touches[0].clientX, e.currentTarget.getBoundingClientRect())}
        onTouchEnd={() => setCursor(null)}
        onFocus={() => setCursor(points.length - 1)}
        onBlur={() => setCursor(null)}
        onKeyDown={(e) => {
          if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
          e.preventDefault();
          setCursor((c) => {
            const from = c ?? points.length - 1;
            const next = e.key === 'ArrowLeft' ? from - 1 : from + 1;
            return Math.min(points.length - 1, Math.max(0, next));
          });
        }}
      >
        <defs>
          {/* area wash — the series hue at ~10%, never a saturated block */}
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--series))" stopOpacity="0.16" />
            <stop offset="100%" stopColor="rgb(var(--series))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* recessive hairline grid — solid, never dashed */}
        {[0.5].map((f) => (
          <line
            key={f}
            x1="0"
            x2={W}
            y1={PAD_Y + f * (H - PAD_Y * 2)}
            y2={PAD_Y + f * (H - PAD_Y * 2)}
            stroke="rgb(var(--grid))"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        <path d={area} fill={`url(#${gradId})`} />
        <path
          d={path}
          fill="none"
          stroke="rgb(var(--series))"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {active && (
          <line
            x1={active.x}
            x2={active.x}
            y1={PAD_Y - 4}
            y2={H}
            stroke="rgb(var(--axis))"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        )}

      </svg>

      {/* End marker and hover point ride OUTSIDE the svg: the viewBox scales
          non-uniformly to fill the card, which would squash an SVG circle into
          an ellipse. Each carries a 2px ring in the surface colour. */}
      {[last, active].map((p, i) =>
        p ? (
          <span
            key={i}
            aria-hidden
            className="pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${(p.x / W) * 100}%`,
              top: `${(p.y / H) * H}px`,
              background: 'rgb(var(--series))',
              boxShadow: '0 0 0 2px rgb(var(--glass))',
            }}
          />
        ) : null,
      )}

      {active && (
        <div
          className="glass-strong pointer-events-none absolute -top-1 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-xl px-2.5 py-1.5"
          style={{ left: `${(active.x / W) * 100}%` }}
        >
          <p className="font-mono text-[11px] font-semibold tabular-nums">
            {fmt(active.v)}
            <span className="ml-1 font-normal text-muted">{unit}</span>
          </p>
          <p className="font-mono text-[9px] text-muted">{times[cursor ?? 0]}</p>
        </div>
      )}

      <div className="mt-2 flex items-center justify-between font-mono text-[9px] tabular-nums text-muted">
        <span>{times[0]}</span>
        <span>
          {fmt(min)} – {fmt(max)} {unit}
        </span>
        <span>{times[times.length - 1]}</span>
      </div>
    </div>
  );
}

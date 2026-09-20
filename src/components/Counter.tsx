'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/** Counts a numeric string up when scrolled into view; passes non-numerics through. */
export default function Counter({
  value,
  duration = 1600,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const target = parseFloat(value);
  const numeric = !Number.isNaN(target);
  const decimals = value.includes('.') ? value.split('.')[1].length : 0;
  const [display, setDisplay] = useState(numeric ? '0' : value);

  useEffect(() => {
    if (!inView || !numeric) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay((target * eased).toFixed(decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric, target, duration, decimals]);

  return <span ref={ref}>{display}</span>;
}

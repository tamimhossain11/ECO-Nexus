'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/** Glass card that tilts toward the cursor and tracks a specular highlight. */
export default function TiltCard({
  children,
  className = '',
  intensity = 9,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const springCfg = { stiffness: 190, damping: 20, mass: 0.4 };
  const rotateX = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), springCfg);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), springCfg);
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`glass-card group perspective ${className}`}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(420px circle at ${x} ${y}, rgb(var(--accent) / 0.18), transparent 60%)`,
          ),
        }}
      />
      <div style={{ transform: 'translateZ(28px)' }} className="relative h-full">
        {children}
      </div>
    </motion.div>
  );
}

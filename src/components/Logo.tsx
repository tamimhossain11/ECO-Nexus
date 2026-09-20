'use client';

import { motion } from 'framer-motion';

/** Eco Nexus mark: a leaf-rotor hybrid inside an orbiting hex. */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 48 48"
      className={className}
      whileHover={{ rotate: 90, scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    >
      <defs>
        <linearGradient id="eco-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--accent))" />
          <stop offset="100%" stopColor="rgb(var(--accent-2))" />
        </linearGradient>
      </defs>
      <path
        d="M24 3 42 13.5v21L24 45 6 34.5v-21L24 3Z"
        fill="url(#eco-logo-grad)"
        fillOpacity="0.14"
        stroke="url(#eco-logo-grad)"
        strokeWidth="1.6"
      />
      {[0, 90, 180, 270].map((deg) => (
        <ellipse
          key={deg}
          cx="24"
          cy="13.5"
          rx="3.1"
          ry="7.4"
          fill="url(#eco-logo-grad)"
          fillOpacity="0.85"
          transform={`rotate(${deg} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="4" fill="url(#eco-logo-grad)" />
      <circle cx="24" cy="24" r="6.6" fill="none" stroke="url(#eco-logo-grad)" strokeWidth="1" strokeOpacity="0.5" />
    </motion.svg>
  );
}

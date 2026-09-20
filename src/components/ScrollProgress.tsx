'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left"
    >
      <div
        className="h-full w-full"
        style={{
          background: 'linear-gradient(90deg, rgb(var(--accent)), rgb(var(--accent-2)))',
          boxShadow: '0 0 14px rgb(var(--accent) / 0.8)',
        }}
      />
    </motion.div>
  );
}

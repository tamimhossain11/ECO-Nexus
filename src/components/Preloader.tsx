'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const FlyByScene = dynamic(() => import('./three/FlyByScene'), { ssr: false });

const WORD = 'ECO NEXUS';
const FLIGHT_SECONDS = 2.4;

export default function Preloader() {
  const pathname = usePathname();
  // The admin console is an operations tool, not a landing page — it should
  // not sit behind a 4-second brand intro.
  const skipIntro = pathname?.startsWith('/admin') ?? false;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showWord, setShowWord] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => setMounted(true), []);

  // Lock scroll while the intro plays.
  useEffect(() => {
    if (done || skipIntro) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [done, skipIntro]);

  // Fallback timeline in case the canvas never reports the fly-by.
  useEffect(() => {
    const reveal = setTimeout(() => setShowWord(true), FLIGHT_SECONDS * 1000 * 0.75);
    const finish = setTimeout(() => setDone(true), FLIGHT_SECONDS * 1000 + 1700);
    return () => {
      clearTimeout(reveal);
      clearTimeout(finish);
    };
  }, []);

  // Let visitors cut the intro short with a click or any key.
  useEffect(() => {
    if (done) return;
    const skip = () => setDone(true);
    window.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);
    return () => {
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
    };
  }, [done]);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  if (skipIntro) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(14px)' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'rgb(var(--bg))' }}
        >
          {/* ambient wash */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 50%, rgb(var(--accent) / 0.16), transparent 70%)',
            }}
          />
          <div aria-hidden className="absolute inset-0 soft-wash" />

          {/* horizon line the drone flies along */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-1/2 h-px origin-center"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgb(var(--accent) / 0.55), rgb(var(--accent-2) / 0.55), transparent)',
            }}
          />

          {/* the drone fly-by */}
          <div className="absolute inset-0">
            {mounted && (
              <FlyByScene
                isDark={isDark}
                duration={FLIGHT_SECONDS}
                onPass={() => setShowWord(true)}
              />
            )}
          </div>

          {/* wordmark, revealed after the drone crosses frame */}
          <div className="relative z-10 mt-2 flex flex-col items-center px-6 text-center">
            <div className="flex overflow-hidden">
              {WORD.split('').map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  initial={{ y: '110%', opacity: 0, filter: 'blur(10px)' }}
                  animate={
                    showWord
                      ? { y: '0%', opacity: 1, filter: 'blur(0px)' }
                      : { y: '110%', opacity: 0, filter: 'blur(10px)' }
                  }
                  transition={{
                    duration: 0.7,
                    delay: showWord ? i * 0.055 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="gradient-text font-display text-[13vw] font-bold leading-none tracking-tight sm:text-7xl md:text-8xl"
                >
                  {char === ' ' ? ' ' : char}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={showWord ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, delay: showWord ? 0.55 : 0 }}
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.42em] text-muted sm:text-xs"
            >
              Bangladesh · WICE 2026
            </motion.p>

            {/* loading bar */}
            <div className="mt-9 h-[3px] w-40 overflow-hidden rounded-full sm:w-56" style={{ background: 'rgb(var(--glass-border) / 0.25)' }}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: FLIGHT_SECONDS + 1.5, ease: [0.4, 0, 0.2, 1] }}
                className="h-full w-full origin-left rounded-full"
                style={{
                  background: 'linear-gradient(90deg, rgb(var(--accent)), rgb(var(--accent-2)))',
                  boxShadow: '0 0 16px rgb(var(--accent) / 0.8)',
                }}
              />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={showWord ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: showWord ? 1.1 : 0, duration: 0.5 }}
              className="mt-5 font-mono text-[9px] uppercase tracking-[0.3em] text-muted"
            >
              Click to skip
            </motion.span>
          </div>

          {/* curtain wipe on exit */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 origin-bottom"
            style={{ background: 'rgb(var(--bg))' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

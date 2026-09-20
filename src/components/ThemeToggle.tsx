'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`glass group relative grid h-10 w-10 place-items-center overflow-hidden rounded-full transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgb(var(--accent) / 0.35), transparent 70%)',
        }}
      />
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ y: 14, opacity: 0, rotate: -60, scale: 0.6 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: -14, opacity: 0, rotate: 60, scale: 0.6 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid place-items-center"
          >
            {isDark ? (
              <Moon className="h-[18px] w-[18px] text-accent" strokeWidth={2} />
            ) : (
              <Sun className="h-[18px] w-[18px] text-accent" strokeWidth={2} />
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

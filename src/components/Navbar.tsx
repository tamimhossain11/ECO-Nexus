'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { nav, site } from '@/lib/site';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled ? 'glass-strong' : 'glass'
          }`}
        >
          <Link href="/" className="group flex items-center gap-2.5">
            <Logo className="h-9 w-9" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[15px] font-bold tracking-tight">
                {site.name}
              </span>
              <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                WICE 2026
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-accent"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'rgb(var(--accent) / 0.14)',
                        border: '1px solid rgb(var(--accent) / 0.3)',
                      }}
                    />
                  )}
                  <span className={`relative ${active ? 'text-accent' : ''}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/contact"
              className="btn-primary hidden !px-5 !py-2 text-[13px] md:inline-flex"
            >
              Partner with us
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="glass grid h-10 w-10 place-items-center rounded-full md:hidden"
            >
              {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 backdrop-blur-xl"
              style={{ background: 'rgb(var(--bg) / 0.8)' }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong absolute inset-x-3 top-24 rounded-3xl p-3"
            >
              {nav.map((item, i) => {
                const active =
                  item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.08 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-colors ${
                        active ? 'text-accent' : ''
                      }`}
                      style={active ? { background: 'rgb(var(--accent) / 0.12)' } : undefined}
                    >
                      {item.label}
                      <span className="font-mono text-[10px] text-muted">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
              <Link href="/contact" className="btn-primary mt-2 w-full">
                Partner with us
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

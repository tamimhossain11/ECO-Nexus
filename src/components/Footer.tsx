import Link from 'next/link';
import { Globe2, Mail, MapPin, Phone } from 'lucide-react';
import { nav, site } from '@/lib/site';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="relative mt-24">
      <div className="mx-auto w-full max-w-7xl px-5 pb-10 sm:px-8">
        <div className="glass-strong rounded-[2rem] p-8 sm:p-12">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <Logo className="h-10 w-10" />
                <span className="font-display text-xl font-bold">{site.name}</span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                A Bangladeshi robotics team building an autonomous UAV platform for surveillance,
                precision farming and environmental observability — heading to {site.competition}.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="chip transition-transform duration-300 hover:-translate-y-0.5 hover:text-accent"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
                Navigate
              </h4>
              <ul className="mt-4 space-y-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-sm transition-colors hover:text-accent"
                    >
                      <span className="h-px w-3 bg-current opacity-40 transition-all duration-300 group-hover:w-6 group-hover:opacity-100" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
                Reach the team
              </h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <a href={`mailto:${site.email}`} className="hover:text-accent">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-accent">
                    {site.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-muted">{site.address}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted sm:flex-row" style={{ borderTop: '1px solid rgb(var(--glass-border) / 0.18)' }}>
            <p className="flex items-center gap-1.5">
              <Globe2 className="h-3.5 w-3.5 text-accent" />
              © {new Date().getFullYear()} {site.name}. Built in Bangladesh.
            </p>
            <p className="font-mono uppercase tracking-[0.2em]">{site.competition}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

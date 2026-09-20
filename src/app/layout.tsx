import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Aurora from '@/components/Aurora';
import ScrollProgress from '@/components/ScrollProgress';
import Preloader from '@/components/Preloader';
import PageTransition from '@/components/PageTransition';
import { site } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://econexus.bd'),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    'Eco Nexus is a Bangladeshi robotics team competing at WICE 2026 in IT & Robotics with an autonomous drone for surveillance, precision farming and environmental observability.',
  keywords: [
    'Eco Nexus',
    'WICE 2026',
    'Bangladesh robotics',
    'surveillance drone',
    'precision agriculture UAV',
    'IT and robotics competition',
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description:
      'An autonomous UAV platform for surveillance, farming and observability, built in Bangladesh for WICE 2026.',
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f5fb' },
    { media: '(prefers-color-scheme: dark)', color: '#08060f' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${grotesk.variable} ${mono.variable} noise min-h-screen`}
      >
        <ThemeProvider>
          <Preloader />
          <Aurora />
          <ScrollProgress />
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

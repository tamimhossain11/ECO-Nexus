import type { Metadata } from 'next';
import TeamGrid from '@/components/sections/TeamGrid';
import Roadmap from '@/components/sections/Roadmap';
import CTA from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'Team',
  description:
    'Meet Eco Nexus — the engineers, agronomists and designers from Bangladesh representing the country at WICE 2026 in IT & Robotics.',
};

export default function TeamPage() {
  return (
    <>
      <TeamGrid />
      <Roadmap />
      <CTA />
    </>
  );
}

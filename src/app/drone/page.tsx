import type { Metadata } from 'next';
import DroneShowcase from '@/components/sections/DroneShowcase';
import ProjectBrief from '@/components/sections/ProjectBrief';
import CTA from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'The Drone',
  description:
    'EN-1 Sentinel: an autonomous quadcopter for surveillance, precision agriculture and environmental observability, built by Eco Nexus for WICE 2026.',
};

export default function DronePage() {
  return (
    <>
      <DroneShowcase />
      <ProjectBrief />
      <CTA />
    </>
  );
}

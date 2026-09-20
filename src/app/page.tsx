import Hero from '@/components/sections/Hero';
import Pillars from '@/components/sections/Pillars';
import Telemetry from '@/components/sections/Telemetry';
import Roadmap from '@/components/sections/Roadmap';
import ValuesGrid from '@/components/sections/ValuesGrid';
import CTA from '@/components/sections/CTA';
import Marquee from '@/components/sections/Marquee';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Pillars />
      <Telemetry />
      <Roadmap />
      <ValuesGrid />
      <CTA />
    </>
  );
}

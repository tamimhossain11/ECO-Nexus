import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="section flex min-h-[80svh] flex-col items-center justify-center text-center">
      <span className="eyebrow">Signal lost</span>
      <h1 className="h1 gradient-text">404</h1>
      <p className="lead mt-5 max-w-md">
        This waypoint is not on the flight plan. Let&apos;s get you back to the ground station.
      </p>
      <Link href="/" className="btn-primary mt-8">
        <ArrowLeft className="h-4 w-4" />
        Return home
      </Link>
    </section>
  );
}

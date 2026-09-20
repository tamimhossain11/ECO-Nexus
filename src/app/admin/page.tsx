import type { Metadata } from 'next';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Drone Overview — Admin',
  description: 'Live sensor overview for the Eco Nexus environmental drone.',
  // Internal console: keep it out of search results. Note this is not access
  // control — see the README section on the admin page.
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <section className="section pt-32 sm:pt-36">
      <AdminDashboard />
    </section>
  );
}

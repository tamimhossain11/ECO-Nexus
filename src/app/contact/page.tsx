import type { Metadata } from 'next';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Eco Nexus — sponsorships, field demonstrations, research collaboration and press enquiries ahead of WICE 2026.',
};

export default function ContactPage() {
  return <ContactSection />;
}

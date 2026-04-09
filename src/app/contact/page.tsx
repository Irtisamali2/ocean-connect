import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | Ocean Connect — Get in Touch',
  description: 'Contact Ocean Connect for overseas recruitment, Microsoft MicroDegree enrollment, training programs, or employer partnerships. Lahore office.',
};

export default function ContactPage() {
  return <ContactClient />;
}

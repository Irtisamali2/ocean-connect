import type { Metadata } from 'next';
import MicrodegreeClient from './MicrodegreeClient';

export const metadata: Metadata = {
  title: 'Microsoft MicroDegree Pakistan | IT Certifications | Ocean Connect',
  description:
    'Earn globally recognized Microsoft and KAMK University certifications in AI, Cloud, Cybersecurity & Data. Pakistan\'s authorized MicroDegree partner. Enroll now.',
};

export default function MicroDegreePage() {
  return <MicrodegreeClient />;
}

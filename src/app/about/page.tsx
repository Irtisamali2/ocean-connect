import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Ocean Connect — Who We Are',
  description:
    'Learn about Ocean Connect — Pakistan\'s trusted overseas recruitment agency and Microsoft MicroDegree partner. Our story, mission, vision, and team.',
};

import AboutClient from './AboutClient';

export default function AboutPage() {
  return <AboutClient />;
}

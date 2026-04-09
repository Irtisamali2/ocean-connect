import type { Metadata } from 'next';
import IndustriesClient from './IndustriesClient';

export const metadata: Metadata = {
  title: 'Industries We Serve | Ocean Connect — Every Sector, Every Skill',
  description: 'Ocean Connect recruits and places professionals in IT, healthcare, construction, hospitality, oil & gas, finance, and many more industries globally.',
};

export default function IndustriesPage() {
  return <IndustriesClient />;
}

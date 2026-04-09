import type { Metadata } from 'next';
import TrainingClient from './TrainingClient';

export const metadata: Metadata = {
  title: 'Training Programs | Ocean Connect — Skills That Open Doors',
  description: 'Ocean Connect training programs in healthcare, IT, hospitality, construction and more. Preparing candidates for domestic and overseas employment.',
};

export default function TrainingPage() {
  return <TrainingClient />;
}

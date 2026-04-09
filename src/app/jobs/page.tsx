import type { Metadata } from 'next';
import JobsClient from './JobsClient';

export const metadata: Metadata = {
  title: 'Job Portal | Ocean Connect — Overseas Jobs in Saudi Arabia & More',
  description: 'Browse current overseas job listings. Nurses, caregivers, domestic workers, and more. Apply directly to verified international positions via Ocean Connect.',
};

export default function JobsPage() {
  return <JobsClient />;
}

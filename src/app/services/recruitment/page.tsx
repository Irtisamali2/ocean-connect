import type { Metadata } from 'next';
import RecruitmentClient from './RecruitmentClient';

export const metadata: Metadata = {
  title: 'Overseas Recruitment Services Pakistan | Ocean Connect',
  description:
    'Ocean Connect is a BEOE-licensed overseas recruitment agency offering job placement in UAE, Saudi Arabia, Qatar, UK, Europe and more. Start your global career today.',
};

export default function RecruitmentPage() {
  return <RecruitmentClient />;
}

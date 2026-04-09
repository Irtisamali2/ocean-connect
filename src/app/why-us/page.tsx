import type { Metadata } from 'next';
import WhyUsClient from './WhyUsClient';

export const metadata: Metadata = {
  title: 'Why Us | Ocean Connect — Why Pakistan Trusts Us',
  description: 'Discover why thousands trust Ocean Connect for overseas recruitment and Microsoft MicroDegree certifications. Licensed, ethical, and globally connected.',
};

export default function WhyUsPage() {
  return <WhyUsClient />;
}

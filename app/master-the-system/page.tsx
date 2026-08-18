import type { Metadata } from 'next';
import MasterTheSystemClient from './MasterTheSystemClient';

export const metadata: Metadata = {
  title: 'Master the System',
  description: 'A weekly letter with one precise idea for building a company that can think, sell, and move without waiting for the founder.',
  alternates: { canonical: '/master-the-system' },
  openGraph: {
    title: 'Master the System — A weekly letter for founders',
    description: 'Five minutes. One operating constraint. One practical move.',
    type: 'website',
  },
};

export default function MasterTheSystemPage() {
  return <MasterTheSystemClient />;
}

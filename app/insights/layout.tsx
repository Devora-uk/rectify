import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rectifyinternational.com';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Market intelligence on energy, engineering and data-centre hiring across Germany and the United States. Evidence on skills shortages, commissioning talent and the roles that decide whether a site goes live.',
  keywords: [
    'data centre recruitment insights',
    'German data centre talent',
    'engineering hiring intelligence',
    'commissioning engineers Germany',
    'energy recruitment market intelligence',
  ],
  openGraph: {
    title: 'Rectify Insights | German Market Intelligence',
    description:
      'Evidence-led notes on data-centre, energy and engineering talent. Start with Germany’s 12,000 MW build-out and the engineers who barely exist.',
    url: `${baseUrl}/insights`,
    type: 'website',
  },
  twitter: {
    title: 'Rectify Insights | German Market Intelligence',
    description:
      'Evidence-led notes on data-centre, energy and engineering talent across Germany and the United States.',
  },
  alternates: {
    canonical: `${baseUrl}/insights`,
  },
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

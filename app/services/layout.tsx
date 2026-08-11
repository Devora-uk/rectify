import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rectifyinternational.com';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Specialist talent partnerships for energy, engineering, infrastructure and mission-critical projects. Strategic talent partnerships, specialist search, market mapping and executive search with Rectify International.',
  keywords: [
    'strategic talent partnerships',
    'specialist recruitment',
    'executive search',
    'talent intelligence',
    'market mapping',
    'energy recruitment',
    'infrastructure recruitment',
    'data centre recruitment',
    'engineering talent',
    'mission critical hiring',
    'US energy recruitment',
    'Germany engineering recruitment',
  ],
  openGraph: {
    title: 'Our Services | Rectify International',
    description: 'Specialist talent partnerships for energy, engineering, infrastructure and mission-critical projects. Companies apply to partner with Rectify.',
    url: `${baseUrl}/services`,
    type: 'website',
  },
  twitter: {
    title: 'Our Services | Rectify International',
    description: 'Specialist talent partnerships for energy, engineering, infrastructure and mission-critical projects.',
  },
  alternates: {
    canonical: `${baseUrl}/services`,
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rectifyinternational.com';

export const metadata: Metadata = {
  title: 'About Rectify',
  description: 'Meet Rectify International — specialist recruitment for energy, engineering, infrastructure and mission-critical markets, guided by expertise, integrity, impact and trust.',
  keywords: [
    'about Rectify International',
    'energy recruitment consultancy',
    'engineering recruitment values',
    'specialist recruitment Germany',
    'specialist recruitment UK',
    'infrastructure talent',
    'mission critical recruitment',
  ],
  openGraph: {
    title: 'About Rectify International',
    description: 'Specialist recruitment built on deep market knowledge, honest communication and long-term relationships across Germany, the UK and beyond.',
    url: `${baseUrl}/about`,
    type: 'website',
  },
  twitter: {
    title: 'About Rectify International',
    description: 'Specialist recruitment built on deep market knowledge, honest communication and long-term relationships.',
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

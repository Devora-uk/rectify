import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rectifyinternational.com';

export const metadata: Metadata = {
  title: 'Partner with Rectify',
  description:
    'Apply to partner with Rectify International. We work with a small number of businesses on hard-to-fill technical hiring across energy, engineering, infrastructure and mission-critical markets.',
  keywords: [
    'talent partnership',
    'recruitment partner',
    'technical hiring partnership',
    'energy recruitment partner',
    'engineering recruitment USA',
    'engineering recruitment Germany',
    'infrastructure talent partner',
    'apply to work with Rectify',
  ],
  openGraph: {
    title: 'Partner with Rectify | Rectify International',
    description:
      'Apply to work with Rectify. Tell us what has broken down in hiring and we will assess the fit before arranging a call.',
    url: `${baseUrl}/partner`,
    type: 'website',
  },
  twitter: {
    title: 'Partner with Rectify | Rectify International',
    description: 'Apply to work with Rectify on hard-to-fill technical hiring.',
  },
  alternates: {
    canonical: `${baseUrl}/partner`,
  },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}

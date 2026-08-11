import './globals.css';
import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import { Toaster } from 'sonner';
import CookieBanner from '@/components/CookieBanner';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rectifyinternational.com';
const siteName = 'Rectify';
const defaultTitle = 'Rectify International | Energy & Engineering Recruitment';
const defaultDescription = 'Specialist energy, engineering, infrastructure and data-centre recruitment. Primary focus on the United States, with deep market expertise in Germany.';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    'renewable energy recruitment',
    'energy recruitment consultancy',
    'solar PV recruitment',
    'wind energy recruitment',
    'battery storage recruitment',
    'ESG recruitment',
    'engineering recruitment',
    'technology recruitment',
    'energy talent acquisition',
    'recruitment USA',
    'US energy recruitment',
    'recruitment Germany',
    'German energy recruitment',
    'executive search',
    'permanent placement',
    'contract recruitment',
    'talent consulting',
  ],
  authors: [{ name: 'Rectify' }],
  creator: 'Rectify',
  publisher: 'Rectify',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/rectify-logo.png',
    shortcut: '/rectify-logo.png',
    apple: '/rectify-logo.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['de_DE'],
    url: baseUrl,
    siteName: siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${baseUrl}/rectify-brand-banner.png`,
        width: 2508,
        height: 627,
        alt: 'Rectify International — Your problem, we solved it.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [`${baseUrl}/rectify-brand-banner.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  category: 'Recruitment & Consultancy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <body className={`${sourceSans.className} ${sourceSans.variable}`}>
        {children}
        <Toaster position="top-right" richColors />
        <CookieBanner />
      </body>
    </html>
  );
}

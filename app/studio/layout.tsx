import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insights desk',
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07133f] text-white">
      {children}
    </div>
  );
}

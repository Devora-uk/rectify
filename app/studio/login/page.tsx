import { Suspense } from 'react';
import StudioLoginForm from '@/components/studio/StudioLoginForm';

export default function StudioLoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-16 sm:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{
        backgroundImage: 'linear-gradient(rgba(125,216,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(125,216,255,.08) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />
      <div className="relative mx-auto grid min-h-[80vh] max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.28em] text-[#19ddd3]">Rectify · Insights desk</p>
          <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-[.95] tracking-[-.05em] sm:text-6xl">
            Write the briefing.
            <span className="block text-[#7dd8ff]">Publish to the site.</span>
          </h1>
          <p className="mt-8 max-w-md text-base leading-7 text-blue-100/75">
            This is the working desk for Rectify insights. Drafts are backed up to GitHub. Publishing updates the repository and rebuilds the live site on Vercel.
          </p>
        </div>
        <div className="border border-white/15 bg-[#0a1b52]/80 p-8 backdrop-blur-md sm:p-10">
          <p className="text-sm text-blue-100/70">For the content team only. The public insights pages are unchanged until you press publish.</p>
          <Suspense fallback={<p className="mt-8 text-blue-100/70">Loading sign-in…</p>}>
            <StudioLoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

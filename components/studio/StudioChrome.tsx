'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function StudioChrome({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  const router = useRouter();

  async function signOut() {
    await fetch('/api/studio/logout', { method: 'POST' });
    router.replace('/studio/login');
    router.refresh();
  }

  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <div>
          <Link href="/studio" className="text-[11px] font-bold uppercase tracking-[.28em] text-[#19ddd3]">
            Rectify insights desk
          </Link>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-.03em] text-white">{title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {action}
          <a
            href="/insights"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10"
          >
            View live insights
          </a>
          <button
            type="button"
            onClick={signOut}
            className="rounded-full px-4 py-2 text-sm font-semibold text-[#9ec9ff] hover:text-white"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}

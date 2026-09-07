'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import StudioChrome from '@/components/studio/StudioChrome';
import type { InsightArticle } from '@/lib/insight-types';

type Status = {
  githubConfigured: boolean;
  vercelHookConfigured: boolean;
  localWrites: boolean;
  github: { owner: string; repo: string; branch: string } | null;
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${iso}T00:00:00`));
}

export default function StudioDesk() {
  const [posts, setPosts] = useState<InsightArticle[]>([]);
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch('/api/studio/posts').then((response) => response.json()),
      fetch('/api/studio/status').then((response) => response.json()),
    ])
      .then(([postPayload, statusPayload]) => {
        if (cancelled) return;
        if (postPayload.error) setError(postPayload.error);
        else setPosts(postPayload.posts || []);
        setStatus(statusPayload);
      })
      .catch(() => {
        if (!cancelled) setError('The desk could not load briefings.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <StudioChrome
        title="All briefings"
        action={(
          <Link href="/studio/new" className="rounded-full bg-[#19ddd3] px-5 py-2.5 text-sm font-bold text-[#03104b] hover:bg-white">
            New briefing
          </Link>
        )}
      />
      <main className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8">
        {status ? (
          <p className="max-w-3xl text-sm leading-6 text-blue-100/70">
            {status.githubConfigured
              ? `Backed up to GitHub as ${status.github?.owner}/${status.github?.repo} on ${status.github?.branch}.`
              : 'GitHub is not connected yet. Drafts will stay on this computer until a token is added.'}
            {' '}
            {status.vercelHookConfigured
              ? 'Publishing also triggers a Vercel rebuild.'
              : 'If Vercel is connected to GitHub, a publish commit still rebuilds the live site.'}
          </p>
        ) : null}

        {error ? (
          <p className="mt-8 border-l-2 border-[#ff8a8a] pl-4 text-[#ffd4d4]" role="alert">{error}</p>
        ) : null}

        {loading ? (
          <p className="mt-16 text-blue-100/70">Loading the rundown…</p>
        ) : (
          <div className="mt-10">
            <div className="grid grid-cols-[7rem_7rem_1fr_8rem] gap-4 border-b border-white/20 pb-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#7dd8ff]">
              <span>Status</span>
              <span>Date</span>
              <span>Briefing</span>
              <span className="text-right">Action</span>
            </div>
            {posts.length === 0 ? (
              <p className="mt-10 max-w-lg text-blue-100/75">
                No briefings yet. Start a draft, keep it on GitHub, then publish when the argument is ready.
              </p>
            ) : (
              posts.map((post) => (
                <div key={post.slug} className="grid grid-cols-1 gap-3 border-b border-white/10 py-6 md:grid-cols-[7rem_7rem_1fr_8rem] md:items-center md:gap-4">
                  <p className={post.status === 'published' ? 'text-[#19ddd3]' : 'text-[#ffd27a]'}>
                    {post.status === 'published' ? 'Live' : 'Draft'}
                  </p>
                  <p className="text-sm text-blue-100/70">{formatDate(post.publishedAt)}</p>
                  <div>
                    <p className="text-lg font-semibold tracking-[-.02em]">{post.title}</p>
                    <p className="mt-1 text-sm text-blue-100/60">{post.category}</p>
                  </div>
                  <div className="md:text-right">
                    <Link href={`/studio/edit/${post.slug}`} className="text-sm font-bold text-[#7dd8ff] hover:text-white">
                      Open
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

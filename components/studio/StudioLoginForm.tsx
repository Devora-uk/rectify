'use client';

import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function StudioLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const response = await fetch('/api/studio/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const payload = await response.json().catch(() => ({}));
    setBusy(false);
    if (!response.ok) {
      setError(payload.error || 'Could not sign in.');
      return;
    }
    router.replace(searchParams.get('next') || '/studio');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-6">
      <div>
        <label htmlFor="studio-password" className="text-[11px] font-bold uppercase tracking-[.2em] text-[#7dd8ff]">
          Desk password
        </label>
        <input
          id="studio-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-3 w-full rounded-none border-0 border-b border-white/35 bg-transparent px-0 py-3 text-lg text-white outline-none ring-0 placeholder:text-white/35 focus:border-[#19ddd3]"
          placeholder="Enter the shared password"
          required
        />
      </div>
      {error ? (
        <p className="border-l-2 border-[#ff8a8a] pl-4 text-sm text-[#ffd4d4]" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={busy}
        className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#19ddd3] px-7 text-sm font-bold text-[#03104b] transition hover:bg-white disabled:opacity-60"
      >
        {busy ? 'Opening desk…' : 'Open the insights desk'}
      </button>
    </form>
  );
}

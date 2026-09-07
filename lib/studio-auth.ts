import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { STUDIO_COOKIE, verifyStudioSession } from '@/lib/studio-session';

export {
  STUDIO_COOKIE,
  createStudioSession,
  githubBranch,
  githubConfigured,
  githubOwner,
  githubRepo,
  isSameOrigin,
  passwordsMatch,
  studioAuthConfigured,
  studioCookieOptions,
  verifyStudioSession,
  vercelHookConfigured,
} from '@/lib/studio-session';

export async function getStudioSessionFromCookies() {
  return verifyStudioSession(cookies().get(STUDIO_COOKIE)?.value);
}

export function unauthorized() {
  return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
}

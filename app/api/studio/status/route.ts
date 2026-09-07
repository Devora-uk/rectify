import { NextResponse } from 'next/server';
import {
  getStudioSessionFromCookies,
  githubBranch,
  githubConfigured,
  githubOwner,
  githubRepo,
  studioAuthConfigured,
  unauthorized,
  vercelHookConfigured,
} from '@/lib/studio-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!await getStudioSessionFromCookies()) return unauthorized();

  return NextResponse.json({
    authConfigured: studioAuthConfigured(),
    githubConfigured: githubConfigured(),
    github: githubConfigured()
      ? {
          owner: githubOwner(),
          repo: githubRepo(),
          branch: githubBranch(),
        }
      : null,
    vercelHookConfigured: vercelHookConfigured(),
    localWrites: !process.env.VERCEL,
  });
}

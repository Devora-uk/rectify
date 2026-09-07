export const STUDIO_COOKIE = 'rectify_studio';
export const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

function secret() {
  return process.env.INSIGHTS_STUDIO_SECRET || '';
}

export function studioAuthConfigured() {
  return Boolean(process.env.INSIGHTS_STUDIO_PASSWORD && process.env.INSIGHTS_STUDIO_SECRET);
}

export function githubConfigured() {
  return Boolean(process.env.GITHUB_TOKEN && githubOwner() && githubRepo());
}

export function githubOwner() {
  return process.env.GITHUB_OWNER || 'Devora-uk';
}

export function githubRepo() {
  return process.env.GITHUB_REPO || 'rectify';
}

export function githubBranch() {
  return process.env.GITHUB_BRANCH || 'main';
}

export function vercelHookConfigured() {
  return Boolean(process.env.VERCEL_DEPLOY_HOOK_URL);
}

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return mismatch === 0;
}

async function sign(payload: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return toHex(signature);
}

export async function createStudioSession() {
  const payload = String(Date.now() + SESSION_MS);
  return `${payload}.${await sign(payload)}`;
}

export async function verifyStudioSession(token?: string | null) {
  if (!token || !secret()) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = await sign(payload);
  if (!safeEqual(signature, expected)) return false;
  const expires = Number(payload);
  return Number.isFinite(expires) && Date.now() < expires;
}

export function passwordsMatch(input: string) {
  const expected = process.env.INSIGHTS_STUDIO_PASSWORD || '';
  if (!expected || !input || input.length !== expected.length) return false;
  return safeEqual(input, expected);
}

export function studioCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MS / 1000,
  };
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  const host = request.headers.get('host');
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

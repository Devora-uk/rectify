import { githubBranch, githubOwner, githubRepo } from '@/lib/studio-session';

type GitHubFile = {
  name: string;
  path: string;
  sha: string;
  type: 'file' | 'dir';
  content?: string;
  encoding?: string;
};

function token() {
  const value = process.env.GITHUB_TOKEN;
  if (!value) throw new Error('GITHUB_TOKEN is not set');
  return value;
}

async function githubFetch(path: string, init?: RequestInit) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token()}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'rectify-insights-studio',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });
  return response;
}

export async function githubGetFile(filePath: string): Promise<GitHubFile | null> {
  const response = await githubFetch(
    `/repos/${githubOwner()}/${githubRepo()}/contents/${filePath}?ref=${encodeURIComponent(githubBranch())}`
  );
  if (response.status === 404) return null;
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GitHub could not read ${filePath}: ${response.status} ${detail}`);
  }
  return response.json() as Promise<GitHubFile>;
}

export async function githubListDirectory(dirPath: string): Promise<GitHubFile[]> {
  const response = await githubFetch(
    `/repos/${githubOwner()}/${githubRepo()}/contents/${dirPath}?ref=${encodeURIComponent(githubBranch())}`
  );
  if (response.status === 404) return [];
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GitHub could not list ${dirPath}: ${response.status} ${detail}`);
  }
  const payload = await response.json();
  return Array.isArray(payload) ? payload : [];
}

export async function githubPutFile(options: {
  filePath: string;
  content: Buffer | string;
  message: string;
  sha?: string;
}) {
  const content = Buffer.isBuffer(options.content)
    ? options.content.toString('base64')
    : Buffer.from(options.content, 'utf8').toString('base64');

  const response = await githubFetch(`/repos/${githubOwner()}/${githubRepo()}/contents/${options.filePath}`, {
    method: 'PUT',
    body: JSON.stringify({
      message: options.message,
      content,
      branch: githubBranch(),
      sha: options.sha,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GitHub could not save ${options.filePath}: ${response.status} ${detail}`);
  }

  return response.json();
}

export async function githubDeleteFile(options: { filePath: string; sha: string; message: string }) {
  const response = await githubFetch(`/repos/${githubOwner()}/${githubRepo()}/contents/${options.filePath}`, {
    method: 'DELETE',
    body: JSON.stringify({
      message: options.message,
      sha: options.sha,
      branch: githubBranch(),
    }),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GitHub could not delete ${options.filePath}: ${response.status} ${detail}`);
  }
}

export async function triggerVercelDeploy() {
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!hook) {
    return { triggered: false, note: 'No Vercel deploy hook set. A GitHub commit still rebuilds the site if the project is connected to this repository.' };
  }

  const response = await fetch(hook, { method: 'POST' });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Vercel deploy hook failed: ${response.status} ${detail}`);
  }

  return { triggered: true, note: 'Vercel has been asked to rebuild the live site.' };
}


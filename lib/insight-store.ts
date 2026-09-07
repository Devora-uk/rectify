import fs from 'fs';
import path from 'path';
import {
  githubDeleteFile,
  githubGetFile,
  githubListDirectory,
  githubPutFile,
  triggerVercelDeploy,
} from '@/lib/github-content';
import { INSIGHTS_CONTENT_DIR, INSIGHTS_IMAGE_DIR, insightFilePath, parseInsightMarkdown, serializeInsight } from '@/lib/insight-format';
import type { InsightArticle, InsightInput } from '@/lib/insight-types';
import { githubConfigured } from '@/lib/studio-session';

function localRoot() {
  return process.cwd();
}

function canWriteLocally() {
  return !process.env.VERCEL;
}

function writeLocalFile(relativePath: string, content: string | Buffer) {
  if (!canWriteLocally()) return;
  const absolute = path.join(localRoot(), relativePath);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, content);
}

function deleteLocalFile(relativePath: string) {
  if (!canWriteLocally()) return;
  const absolute = path.join(localRoot(), relativePath);
  if (fs.existsSync(absolute)) fs.unlinkSync(absolute);
}

function decodeGitHubFile(content?: string, encoding?: string) {
  if (!content) return '';
  if (encoding === 'base64') return Buffer.from(content, 'base64').toString('utf8');
  return content;
}

export async function listManagedInsights(): Promise<InsightArticle[]> {
  if (githubConfigured()) {
    const files = await githubListDirectory(INSIGHTS_CONTENT_DIR);
    const markdown = files.filter((file) => file.type === 'file' && file.name.endsWith('.md'));
    const articles = await Promise.all(
      markdown.map(async (file) => {
        const remote = await githubGetFile(file.path);
        const slug = file.name.replace(/\.md$/, '');
        return parseInsightMarkdown(decodeGitHubFile(remote?.content, remote?.encoding), slug);
      })
    );
    return articles.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.title.localeCompare(b.title));
  }

  const directory = path.join(localRoot(), INSIGHTS_CONTENT_DIR);
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(directory, file), 'utf8');
      return parseInsightMarkdown(raw, slug);
    })
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.title.localeCompare(b.title));
}

export async function readManagedInsight(slug: string) {
  const filePath = insightFilePath(slug);
  if (githubConfigured()) {
    const remote = await githubGetFile(filePath);
    if (!remote) return null;
    return parseInsightMarkdown(decodeGitHubFile(remote.content, remote.encoding), slug);
  }

  const absolute = path.join(localRoot(), filePath);
  if (!fs.existsSync(absolute)) return null;
  return parseInsightMarkdown(fs.readFileSync(absolute, 'utf8'), slug);
}

export async function saveManagedInsight(input: InsightInput, options: { deploy: boolean }) {
  const markdown = serializeInsight({
    ...input,
    updatedAt: new Date().toISOString().slice(0, 10),
  });
  const filePath = insightFilePath(input.slug);
  writeLocalFile(filePath, markdown);

  let githubUpdated = false;
  if (githubConfigured()) {
    const existing = await githubGetFile(filePath);
    const verb = input.status === 'published' ? 'Publish' : 'Save draft';
    await githubPutFile({
      filePath,
      content: markdown,
      sha: existing?.sha,
      message: `${verb} insight: ${input.slug}`,
    });
    githubUpdated = true;
  } else if (process.env.VERCEL) {
    throw new Error('GITHUB_TOKEN is missing, so the briefing cannot be saved on the live site.');
  }

  let deploy = { triggered: false, note: 'Draft saved. The live site is unchanged until you publish.' };
  if (options.deploy) {
    if (githubUpdated) {
      deploy = await triggerVercelDeploy();
      if (!deploy.triggered) {
        deploy = {
          triggered: false,
          note: 'Saved to GitHub. Vercel will rebuild from that commit if this project is connected to the repository.',
        };
      }
    } else {
      deploy = {
        triggered: false,
        note: 'Saved on this computer only. Add a GitHub token to back the briefing up and rebuild the live site.',
      };
    }
  }

  return {
    article: parseInsightMarkdown(markdown, input.slug),
    githubUpdated,
    deploy,
  };
}

export async function deleteManagedInsight(slug: string, options: { deploy: boolean }) {
  const filePath = insightFilePath(slug);
  deleteLocalFile(filePath);

  let githubUpdated = false;
  if (githubConfigured()) {
    const existing = await githubGetFile(filePath);
    if (existing?.sha) {
      await githubDeleteFile({
        filePath,
        sha: existing.sha,
        message: `Remove insight: ${slug}`,
      });
      githubUpdated = true;
    }
  } else if (process.env.VERCEL) {
    throw new Error('GITHUB_TOKEN is missing, so the briefing cannot be removed on the live site.');
  }

  const deploy = options.deploy && githubUpdated
    ? await triggerVercelDeploy()
    : { triggered: false, note: githubUpdated ? 'Removed from GitHub.' : 'Removed on this computer.' };

  return { githubUpdated, deploy };
}

export function safeImageName(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
  if (!allowed.includes(ext)) {
    throw new Error('Use a JPG, PNG, WEBP, GIF or SVG image.');
  }
  const base = path
    .basename(filename, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'image';
  return `${base}${ext}`;
}

export async function saveManagedImage(slug: string, filename: string, bytes: Buffer) {
  const safeName = safeImageName(filename);
  const relativePath = `${INSIGHTS_IMAGE_DIR}/${slug}/${safeName}`;
  writeLocalFile(relativePath, bytes);

  let githubUpdated = false;
  if (githubConfigured()) {
    const existing = await githubGetFile(relativePath);
    await githubPutFile({
      filePath: relativePath,
      content: bytes,
      sha: existing?.sha,
      message: `Upload insight image: ${slug}/${safeName}`,
    });
    githubUpdated = true;
  } else if (process.env.VERCEL) {
    throw new Error('GITHUB_TOKEN is missing, so the image cannot be stored on the live site.');
  }

  return {
    src: `/insights/${slug}/${safeName}`,
    githubUpdated,
  };
}

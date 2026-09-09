import Link from 'next/link';
import { Children, isValidElement, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { InsightArticle } from '@/lib/insight-types';

function nodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join('\n');
  if (isValidElement(node)) return nodeText(node.props.children);
  return '';
}

const linkClass = 'font-semibold text-[#0b4ee8] underline decoration-[#0b4ee8]/35 underline-offset-4 hover:decoration-[#0b4ee8]';

export function InsightLink({ href, children }: { href?: string; children: ReactNode }) {
  if (href?.startsWith('/')) {
    return (
      <Link href={href} className={linkClass}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={linkClass} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function headingId(children: ReactNode) {
  return nodeText(children)
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function InsightWorkforceTable({ article }: { article: InsightArticle }) {
  if (!article.workforce.length) return null;

  const tableSource = parseSourceLinks(article.sources).links[0];

  return (
    <figure className="my-10">
      <figcaption className="mb-4 text-sm font-semibold text-[#03104b]">
        Workforce by role
        {tableSource ? (
          <>
            .{' '}
            <InsightLink href={tableSource.url}>Source: {tableSource.name}</InsightLink>
          </>
        ) : article.sources ? (
          '. Source noted at the end of this briefing.'
        ) : (
          '.'
        )}
      </figcaption>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[20rem] border-collapse text-left text-sm sm:min-w-[32rem]">
          <thead>
            <tr className="border-b border-[#0b4ee8] text-[10px] font-bold uppercase tracking-[.16em] text-[#0b4ee8]">
              <th scope="col" className="py-3 pr-4 font-bold">Role group</th>
              <th scope="col" className="py-3 pr-4 font-bold">Share</th>
              <th scope="col" className="py-3 font-bold">Approx. FTE</th>
            </tr>
          </thead>
          <tbody>
            {article.workforce.map((row) => (
              <tr key={row.role} className="border-b border-[#dbe8f8]">
                <th scope="row" className="py-4 pr-4 font-semibold text-[#03104b]">{row.role}</th>
                <td className="py-4 pr-4 tabular-nums text-slate-600">{row.share}</td>
                <td className="py-4 tabular-nums text-slate-600">{row.fte}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

function MarkdownChunk({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 id={headingId(children)} className="mt-16 scroll-mt-28 break-words text-2xl font-semibold tracking-[-.03em] sm:text-3xl sm:tracking-[-.035em] lg:text-4xl lg:tracking-[-.04em]">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 id={headingId(children)} className="mt-12 scroll-mt-28 break-words text-xl font-semibold tracking-[-.02em] sm:text-2xl sm:tracking-[-.03em]">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mt-6 break-words text-base leading-7 text-slate-600 first:mt-0 sm:text-[1.05rem] sm:leading-8">{children}</p>
        ),
        a: ({ href, children }) => <InsightLink href={href}>{children}</InsightLink>,
        ul: ({ children }) => <ul className="mt-6 list-disc space-y-2 pl-6 text-[1.05rem] leading-8 text-slate-600">{children}</ul>,
        ol: ({ children }) => <ol className="mt-6 list-decimal space-y-2 pl-6 text-[1.05rem] leading-8 text-slate-600">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-[#03104b]">{children}</strong>,
        blockquote: ({ children }) => {
          const nodes = Children.toArray(children);
          const sourceNode = nodes.find((node) => /^source:/i.test(nodeText(node).trim()));
          const contentNodes = nodes.filter((node) => node !== sourceNode);
          const parts = nodeText(contentNodes).trim().split('\n').map((line) => line.trim()).filter(Boolean);
          const [stat, ...rest] = parts;
          const copy = rest.join(' ');
          if (stat && /^[\d,.\s%€$£+~-]+$/.test(stat) && copy) {
            return (
              <aside className="my-12 border-y border-[#bdcee4] py-10">
                <p className="break-words text-4xl font-semibold tracking-[-.03em] text-[#0b4ee8] sm:text-6xl sm:tracking-[-.05em] lg:text-7xl lg:tracking-[-.06em]">{stat}</p>
                <p className="mt-4 max-w-xl text-lg leading-8 text-[#03104b]">{copy}</p>
                {sourceNode ? (
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[.16em] text-slate-500">
                    {isValidElement(sourceNode) ? sourceNode.props.children : sourceNode}
                  </p>
                ) : null}
              </aside>
            );
          }
          return (
            <blockquote className="my-10 break-words border-l-2 border-[#19ddd3] pl-6 text-lg leading-8 text-[#03104b] sm:text-xl sm:leading-9">
              {children}
            </blockquote>
          );
        },
        table: ({ children }) => (
          <div className="my-10 overflow-x-auto">
            <table className="w-full min-w-[20rem] border-collapse text-left text-sm sm:min-w-[32rem]">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead>{children}</thead>,
        th: ({ children }) => (
          <th className="border-b border-[#0b4ee8] py-3 pr-4 text-[10px] font-bold uppercase tracking-[.16em] text-[#0b4ee8]">
            {children}
          </th>
        ),
        td: ({ children }) => <td className="border-b border-[#dbe8f8] py-4 pr-4 text-slate-600">{children}</td>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export function InsightBody({ article }: { article: InsightArticle }) {
  const chunks = article.body.split('{{workforce}}');
  const hasMarker = chunks.length > 1;

  return (
    <div className="min-w-0">
      {chunks.map((chunk, index) => (
        <div key={index}>
          {chunk.trim() ? <MarkdownChunk content={chunk} /> : null}
          {hasMarker && index < chunks.length - 1 ? <InsightWorkforceTable article={article} /> : null}
        </div>
      ))}
      {!hasMarker ? <InsightWorkforceTable article={article} /> : null}
    </div>
  );
}

export function parseSourceLinks(sources: string) {
  const links = Array.from(sources.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)).map((match) => ({
    name: match[1],
    url: match[2].replace(/&amp;/g, '&'),
  }));
  const notes = sources
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '')
    .replace(/^[.;\s,]+|[.;\s,]+$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return { links, notes };
}

export function InsightSources({ sources }: { sources: string }) {
  if (!sources.trim()) return null;

  const { links, notes } = parseSourceLinks(sources);
  if (!links.length) {
    return <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-500">{sources}</p>;
  }

  return (
    <div className="mt-5 max-w-4xl">
      <ul className="space-y-3 text-sm leading-7">
        {links.map((link) => (
          <li key={link.url}>
            <InsightLink href={link.url}>{link.name}</InsightLink>
          </li>
        ))}
      </ul>
      {notes ? <p className="mt-5 text-sm leading-7 text-slate-500">{notes}</p> : null}
    </div>
  );
}

export function insightCitationUrls(article: InsightArticle) {
  const fromSources = parseSourceLinks(article.sources).links.map((link) => link.url);
  const fromBody = Array.from(article.body.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)).map((match) => match[1]);
  return Array.from(new Set(fromSources.concat(fromBody)));
}

export function insightHeadings(body: string) {
  return Array.from(body.matchAll(/^##\s+(.+)$/gm)).map((match) => ({
    id: headingId(match[1]),
    label: match[1].trim(),
  }));
}

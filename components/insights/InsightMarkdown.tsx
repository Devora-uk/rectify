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

function headingId(children: ReactNode) {
  return nodeText(children)
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function blockquoteParts(children: ReactNode) {
  const text = nodeText(children).trim();
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
  return lines;
}

export function InsightWorkforceTable({ article }: { article: InsightArticle }) {
  if (!article.workforce.length) return null;

  return (
    <figure className="my-10">
      <figcaption className="mb-4 text-sm font-semibold text-[#03104b]">
        Workforce by role{article.sources ? '. Source noted at the end of this briefing.' : '.'}
      </figcaption>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
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
          <h2 id={headingId(children)} className="mt-16 scroll-mt-28 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 id={headingId(children)} className="mt-12 scroll-mt-28 text-2xl font-semibold tracking-[-.03em]">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mt-6 text-[1.05rem] leading-8 text-slate-600 first:mt-0">{children}</p>
        ),
        a: ({ href, children }) => {
          if (href?.startsWith('/')) {
            return (
              <Link href={href} className="font-semibold text-[#0b4ee8] underline-offset-4 hover:underline">
                {children}
              </Link>
            );
          }
          return (
            <a href={href} className="font-semibold text-[#0b4ee8] underline-offset-4 hover:underline" rel="noreferrer">
              {children}
            </a>
          );
        },
        ul: ({ children }) => <ul className="mt-6 list-disc space-y-2 pl-6 text-[1.05rem] leading-8 text-slate-600">{children}</ul>,
        ol: ({ children }) => <ol className="mt-6 list-decimal space-y-2 pl-6 text-[1.05rem] leading-8 text-slate-600">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-[#03104b]">{children}</strong>,
        blockquote: ({ children }) => {
          const parts = blockquoteParts(children);
          const [stat, ...rest] = parts;
          const source = rest.find((line) => /^source:/i.test(line));
          const copy = rest.filter((line) => line !== source).join(' ');
          if (stat && /^[\d,.\s%€$£+~-]+$/.test(stat) && copy) {
            return (
              <aside className="my-12 border-y border-[#bdcee4] py-10">
                <p className="text-7xl font-semibold tracking-[-.06em] text-[#0b4ee8]">{stat}</p>
                <p className="mt-4 max-w-xl text-lg leading-8 text-[#03104b]">{copy}</p>
                {source ? (
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[.16em] text-slate-500">{source}</p>
                ) : null}
              </aside>
            );
          }
          return (
            <blockquote className="my-10 border-l-2 border-[#19ddd3] pl-6 text-xl leading-9 text-[#03104b]">
              {children}
            </blockquote>
          );
        },
        table: ({ children }) => (
          <div className="my-10 overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-left text-sm">{children}</table>
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
    <div>
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

export function insightHeadings(body: string) {
  return Array.from(body.matchAll(/^##\s+(.+)$/gm)).map((match) => ({
    id: headingId(match[1]),
    label: match[1].trim(),
  }));
}

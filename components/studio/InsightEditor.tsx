'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import StudioChrome from '@/components/studio/StudioChrome';
import { InsightBody } from '@/components/insights/InsightMarkdown';
import { insightAuthors } from '@/lib/insight-authors';
import { slugifyInsightTitle } from '@/lib/insight-slug';
import type { InsightArticle, InsightInput } from '@/lib/insight-types';

const fieldClass = 'mt-2 w-full rounded-md border border-[#c9daee] bg-white px-3 py-2.5 text-[#03104b] outline-none focus:border-[#0b4ee8] focus:ring-2 focus:ring-[#0b4ee8]/20';
const labelClass = 'text-[11px] font-bold uppercase tracking-[.16em] text-[#0b4ee8]';

type Props = {
  mode: 'create' | 'edit';
  initial: InsightInput;
};

export default function InsightEditor({ mode, initial }: Props) {
  const router = useRouter();
  const [article, setArticle] = useState<InsightInput>(initial);
  const [keywords, setKeywords] = useState(initial.keywords.join(', '));
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  const preview = useMemo(() => ({
    ...article,
    keywords: keywords.split(',').map((item) => item.trim()).filter(Boolean),
    readingMinutes: article.readingMinutes || 1,
    updatedAt: article.updatedAt || article.publishedAt,
  }) as InsightArticle, [article, keywords]);

  function update<K extends keyof InsightInput>(key: K, value: InsightInput[K]) {
    setArticle((current) => {
      const next = { ...current, [key]: value };
      if (key === 'title' && mode === 'create') {
        next.slug = slugifyInsightTitle(String(value)) || current.slug;
      }
      return next;
    });
  }

  async function persist(status: InsightInput['status'], deploy: boolean) {
    setBusy(true);
    const payload = {
      ...article,
      status,
      keywords: keywords.split(',').map((item) => item.trim()).filter(Boolean),
      seoTitle: article.seoTitle || article.title,
      description: article.description || article.dek,
    };

    const isCreate = mode === 'create';
    const response = await fetch(isCreate ? '/api/studio/posts' : `/api/studio/posts/${article.slug}`, {
      method: isCreate ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isCreate ? { article: payload } : { article: payload, deploy }),
    });
    const result = await response.json().catch(() => ({}));
    setBusy(false);

    if (!response.ok) {
      toast.error(result.error || 'Could not save the briefing.');
      return;
    }

    const note = result.deploy?.note || (status === 'published' ? 'Published.' : 'Draft saved.');
    toast.success(note);
    setArticle((current) => ({ ...current, status }));
    if (isCreate) router.replace(`/studio/edit/${payload.slug}`);
  }

  async function remove() {
    if (!window.confirm('Remove this briefing from GitHub and the live site?')) return;
    setBusy(true);
    const response = await fetch(`/api/studio/posts/${article.slug}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deploy: true }),
    });
    const result = await response.json().catch(() => ({}));
    setBusy(false);
    if (!response.ok) {
      toast.error(result.error || 'Could not delete the briefing.');
      return;
    }
    toast.success(result.deploy?.note || 'Briefing removed.');
    router.replace('/studio');
  }

  async function uploadHero(file: File) {
    const data = new FormData();
    data.set('file', file);
    data.set('slug', article.slug || 'shared');
    const response = await fetch('/api/studio/upload', { method: 'POST', body: data });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      toast.error(result.error || 'Could not upload the image.');
      return;
    }
    update('heroImage', { ...article.heroImage, src: result.src });
    toast.success(result.githubUpdated ? 'Image stored on GitHub.' : 'Image saved on this computer.');
  }

  return (
    <div>
      <StudioChrome
        title={mode === 'create' ? 'New briefing' : 'Edit briefing'}
        action={(
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => persist('draft', article.status === 'published')}
              className="rounded-full border border-white/25 px-4 py-2 text-sm font-bold text-white hover:bg-white/10 disabled:opacity-50"
            >
              Save draft
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => persist('published', true)}
              className="rounded-full bg-[#19ddd3] px-4 py-2 text-sm font-bold text-[#03104b] hover:bg-white disabled:opacity-50"
            >
              Publish to live site
            </button>
          </div>
        )}
      />

      <main className="mx-auto grid max-w-[1280px] gap-8 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_300px] sm:px-8">
        <div className="bg-[#f4f8ff] p-5 text-[#03104b] sm:p-8">
          <div className="grid gap-6">
            <label className="block">
              <span className={labelClass}>Title</span>
              <input className={fieldClass} value={article.title} onChange={(event) => update('title', event.target.value)} />
            </label>
            <label className="block">
              <span className={labelClass}>Accent line</span>
              <input className={fieldClass} value={article.titleHighlight} onChange={(event) => update('titleHighlight', event.target.value)} placeholder="Optional second line in blue" />
            </label>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className={labelClass}>Slug</span>
                <input
                  className={fieldClass}
                  value={article.slug}
                  disabled={mode === 'edit'}
                  onChange={(event) => update('slug', slugifyInsightTitle(event.target.value))}
                />
              </label>
              <label className="block">
                <span className={labelClass}>Category</span>
                <input className={fieldClass} value={article.category} onChange={(event) => update('category', event.target.value)} />
              </label>
            </div>
            <label className="block">
              <span className={labelClass}>Short version</span>
              <textarea className={`${fieldClass} min-h-[120px]`} value={article.dek} onChange={(event) => update('dek', event.target.value)} />
            </label>
            <label className="block">
              <span className={labelClass}>Hero quote</span>
              <textarea className={`${fieldClass} min-h-[80px]`} value={article.heroQuote} onChange={(event) => update('heroQuote', event.target.value)} />
            </label>
            <label className="block">
              <span className={labelClass}>SEO description</span>
              <textarea className={`${fieldClass} min-h-[80px]`} value={article.description} onChange={(event) => update('description', event.target.value)} />
            </label>
            <label className="block">
              <span className={labelClass}>SEO title</span>
              <input className={fieldClass} value={article.seoTitle} onChange={(event) => update('seoTitle', event.target.value)} />
            </label>
            <label className="block">
              <span className={labelClass}>Keywords</span>
              <input className={fieldClass} value={keywords} onChange={(event) => setKeywords(event.target.value)} placeholder="Comma separated" />
            </label>
          </div>

          <div className="mt-10 flex gap-4 border-b border-[#c9daee]">
            <button type="button" onClick={() => setTab('write')} className={`pb-3 text-sm font-bold ${tab === 'write' ? 'border-b-2 border-[#0b4ee8] text-[#03104b]' : 'text-slate-500'}`}>
              Write
            </button>
            <button type="button" onClick={() => setTab('preview')} className={`pb-3 text-sm font-bold ${tab === 'preview' ? 'border-b-2 border-[#0b4ee8] text-[#03104b]' : 'text-slate-500'}`}>
              Preview
            </button>
          </div>

          {tab === 'write' ? (
            <label className="mt-6 block">
              <span className={labelClass}>Body</span>
              <p className="mt-2 text-sm text-slate-600">
                Use markdown. `## Heading` makes a section. Put `{'{{workforce}}'}` where the workforce table should appear. A pull-quote starts with a figure on the first line of a blockquote.
              </p>
              <textarea
                className={`${fieldClass} min-h-[420px] font-mono text-sm leading-7`}
                value={article.body}
                onChange={(event) => update('body', event.target.value)}
              />
            </label>
          ) : (
            <div className="mt-6 bg-white p-6">
              <InsightBody article={preview} />
            </div>
          )}

          <Repeater
            title="Headline figures"
            rows={article.capacity}
            onChange={(capacity) => update('capacity', capacity)}
            blank={{ label: '', value: '', note: '' }}
            fields={['value', 'label', 'note']}
          />
          <Repeater
            title="Workforce rows"
            rows={article.workforce}
            onChange={(workforce) => update('workforce', workforce)}
            blank={{ role: '', share: '', fte: '' }}
            fields={['role', 'share', 'fte']}
          />
          <Repeater
            title="FAQs"
            rows={article.faqs}
            onChange={(faqs) => update('faqs', faqs)}
            blank={{ question: '', answer: '' }}
            fields={['question', 'answer']}
            wide="answer"
          />

          <label className="mt-10 block">
            <span className={labelClass}>Sources</span>
            <textarea className={`${fieldClass} min-h-[100px]`} value={article.sources} onChange={(event) => update('sources', event.target.value)} />
          </label>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-8 lg:self-start">
          <section className="border border-white/15 p-5">
            <p className={labelClass}>Byline</p>
            <select
              className="mt-3 w-full rounded-md border border-white/20 bg-[#0a1b52] px-3 py-2 text-white"
              value={article.author.name}
              onChange={(event) => {
                const author = insightAuthors.find((item) => item.name === event.target.value);
                if (author) update('author', author);
              }}
            >
              {insightAuthors.map((author) => (
                <option key={author.name} value={author.name}>{author.name}</option>
              ))}
            </select>
            <label className="mt-4 block">
              <span className="text-xs text-blue-100/70">Published date</span>
              <input
                type="date"
                className="mt-2 w-full rounded-md border border-white/20 bg-[#0a1b52] px-3 py-2 text-white"
                value={article.publishedAt}
                onChange={(event) => update('publishedAt', event.target.value)}
              />
            </label>
            <label className="mt-4 block">
              <span className="text-xs text-blue-100/70">Breadcrumb</span>
              <input className="mt-2 w-full rounded-md border border-white/20 bg-[#0a1b52] px-3 py-2 text-white" value={article.breadcrumb} onChange={(event) => update('breadcrumb', event.target.value)} />
            </label>
          </section>

          <section className="border border-white/15 p-5">
            <p className={labelClass}>Hero image</p>
            {article.heroImage.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={article.heroImage.src} alt={article.heroImage.alt} className="mt-3 h-32 w-full object-cover" />
            ) : null}
            <input
              className="mt-3 w-full rounded-md border border-white/20 bg-[#0a1b52] px-3 py-2 text-sm text-white"
              value={article.heroImage.src}
              onChange={(event) => update('heroImage', { ...article.heroImage, src: event.target.value })}
            />
            <input
              className="mt-3 w-full rounded-md border border-white/20 bg-[#0a1b52] px-3 py-2 text-sm text-white"
              value={article.heroImage.alt}
              onChange={(event) => update('heroImage', { ...article.heroImage, alt: event.target.value })}
              placeholder="Alt text"
            />
            <input
              type="file"
              accept="image/*"
              className="mt-3 block w-full text-sm text-blue-100"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) uploadHero(file);
              }}
            />
          </section>

          {mode === 'edit' ? (
            <button
              type="button"
              disabled={busy}
              onClick={remove}
              className="w-full rounded-full border border-[#ff8a8a]/40 px-4 py-3 text-sm font-bold text-[#ffd4d4] hover:bg-red-500/10"
            >
              Delete briefing
            </button>
          ) : null}
        </aside>
      </main>
    </div>
  );
}

function Repeater<T extends Record<string, string>>({
  title,
  rows,
  onChange,
  blank,
  fields,
  wide,
}: {
  title: string;
  rows: T[];
  onChange: (rows: T[]) => void;
  blank: T;
  fields: (keyof T & string)[];
  wide?: keyof T & string;
}) {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button type="button" className="text-sm font-bold text-[#0b4ee8]" onClick={() => onChange([...rows, { ...blank }])}>
          Add row
        </button>
      </div>
      <div className="mt-4 space-y-4">
        {rows.map((row, index) => (
          <div key={index} className="grid gap-3 border border-[#c9daee] bg-white p-4 sm:grid-cols-3">
            {fields.map((field) => (
              <label key={field} className={`block ${wide === field ? 'sm:col-span-3' : ''}`}>
                <span className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-500">{field}</span>
                {wide === field ? (
                  <textarea
                    className={`${fieldClass} min-h-[90px]`}
                    value={row[field]}
                    onChange={(event) => {
                      const next = [...rows];
                      next[index] = { ...row, [field]: event.target.value };
                      onChange(next);
                    }}
                  />
                ) : (
                  <input
                    className={fieldClass}
                    value={row[field]}
                    onChange={(event) => {
                      const next = [...rows];
                      next[index] = { ...row, [field]: event.target.value };
                      onChange(next);
                    }}
                  />
                )}
              </label>
            ))}
            <button
              type="button"
              className="text-left text-xs font-semibold text-slate-500 hover:text-[#03104b]"
              onClick={() => onChange(rows.filter((_, rowIndex) => rowIndex !== index))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

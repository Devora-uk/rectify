import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import { InsightBody, InsightSources, insightCitationUrls, insightHeadings } from '@/components/insights/InsightMarkdown';
import { getPublishedInsight, getPublishedInsights, insightPath } from '@/lib/insights';

type Props = { params: { slug: string } };

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rectifyinternational.com';

export function generateStaticParams() {
  return getPublishedInsights().map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getPublishedInsight(params.slug);
  if (!article) return {};

  const url = `${baseUrl}${insightPath(article.slug)}`;
  const title = article.seoTitle || article.title;
  return {
    title,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      locale: 'en_GB',
      images: [
        {
          url: `${baseUrl}${article.heroImage.src}`,
          alt: article.heroImage.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: article.description,
      images: [`${baseUrl}${article.heroImage.src}`],
    },
    alternates: {
      canonical: url,
    },
  };
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00`));
}

export default function InsightArticlePage({ params }: Props) {
  const article = getPublishedInsight(params.slug);
  if (!article) notFound();

  const url = `${baseUrl}${insightPath(article.slug)}`;
  const headings = insightHeadings(article.body);
  const citations = insightCitationUrls(article);
  const fullTitle = article.titleHighlight
    ? `${article.title.replace(/\s+$/, '')} ${article.titleHighlight}`
    : article.title;

  return (
    <main className="bg-white text-[#03104b]">
      <Navigation activePage="insights" />

      <article>
        <header className="watercolor relative pb-16 pt-36 lg:pb-20 lg:pt-44">
          <div className="brand-grid absolute inset-0 opacity-35" />
          <div className="section-shell relative">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link href="/insights" className="hover:text-[#0b4ee8]">Insights</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="font-semibold text-[#03104b]">{article.breadcrumb}</span>
            </nav>

            <p className="eyebrow mt-12">{article.category}</p>
            <h1 className="mt-7 max-w-5xl break-words text-[2rem] font-semibold leading-[1.06] tracking-[-.03em] sm:text-[2.35rem] sm:tracking-[-.045em] sm:leading-[1.02] lg:text-6xl lg:tracking-[-.055em] xl:text-7xl">
              {article.titleHighlight ? (
                <>
                  {article.title}{' '}
                  <span className="display-serif text-[#0b4ee8]">{article.titleHighlight}</span>
                </>
              ) : (
                article.title
              )}
            </h1>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Image
                src={article.author.image}
                alt={article.author.imageAlt}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover object-top"
              />
              <div>
                <p className="font-semibold">{article.author.name}</p>
                <p className="text-sm text-slate-500">
                  {article.author.role} · <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time> · {article.readingMinutes} min read
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="px-3 sm:px-5">
          <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[2rem] bg-[#06165b] lg:rounded-[2.75rem]">
            <div className="relative h-[320px] sm:h-[420px] lg:h-[520px]">
              <Image
                src={article.heroImage.src}
                alt={article.heroImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1500px"
                className="object-cover object-[center_25%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020d3b]/88 via-[#020d3b]/45 to-transparent" />
              {article.heroQuote ? (
                <div className="absolute inset-0 flex items-end p-8 sm:p-12">
                  <p className="max-w-xl break-words text-xl font-semibold leading-snug tracking-[-.02em] text-white sm:text-2xl sm:leading-tight sm:tracking-[-.03em] lg:text-3xl">
                    {article.heroQuote}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {article.capacity.length ? (
          <section className="border-b border-[#dbe8f8] py-16 lg:py-20" aria-labelledby="capacity-heading">
            <div className="section-shell">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="eyebrow">Figures in view</p>
                <h2 id="capacity-heading" className="mt-4 scroll-mt-28 break-words text-2xl font-semibold tracking-[-.03em] sm:text-3xl sm:tracking-[-.035em] lg:text-4xl lg:tracking-[-.04em]">
                    The numbers behind this briefing
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-slate-600">
                  The headline figures this piece hangs on, so the argument can start from evidence rather than atmosphere.
                </p>
              </div>
              <ol className="mt-12 grid gap-0 border-t border-[#0b4ee8] sm:grid-cols-3">
                {article.capacity.map((point, index) => (
                  <li key={`${point.label}-${index}`} className="relative border-b border-[#dbe8f8] py-8 sm:border-b-0 sm:px-8 sm:first:pl-0 sm:last:pr-0">
                    <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-[#19ddd3] sm:left-8 sm:first:left-0" />
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#0b4ee8]">
                      {String(index + 1).padStart(2, '0')} · {point.note}
                    </p>
                    <p className="mt-4 break-words text-3xl font-semibold tracking-[-.03em] sm:text-4xl sm:tracking-[-.04em] lg:text-5xl lg:tracking-[-.05em]">{point.value}</p>
                    <p className="mt-2 text-sm text-slate-600">{point.label}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        <div className="section-shell grid min-w-0 gap-14 py-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-20 lg:py-24">
          <div className="min-w-0 max-w-[720px]">
            {article.dek ? (
              <>
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#0b4ee8]">The short version</p>
                <p className="mt-5 break-words border-l-2 border-[#19ddd3] pl-6 text-lg leading-8 text-[#03104b] sm:text-xl sm:leading-9">
                  {article.dek}
                  {article.heroQuote ? ` ${article.heroQuote}` : ''}
                </p>
              </>
            ) : null}

            <div className={article.dek ? 'mt-12' : undefined}>
              <InsightBody article={article} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            {headings.length ? (
              <>
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#0b4ee8]">In this briefing</p>
                <nav aria-label="Article sections" className="mt-5 space-y-3 text-sm font-semibold text-slate-600">
                  {article.capacity.length ? (
                    <a className="block hover:text-[#0b4ee8]" href="#capacity-heading">Headline figures</a>
                  ) : null}
                  {headings.map((heading) => (
                    <a key={heading.id} className="block hover:text-[#0b4ee8]" href={`#${heading.id}`}>
                      {heading.label}
                    </a>
                  ))}
                </nav>
              </>
            ) : null}
            <div className={`${headings.length ? 'mt-10 border-t border-[#dbe8f8] pt-8' : ''}`}>
              <p className="text-sm leading-6 text-slate-600">
                If this market is sitting on your commissioning date, it is worth a conversation about who can actually sign the plant off.
              </p>
              <Link href="/contact" className="button-primary mt-6 w-full">
                Speak to Rectify <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>

        <section className="relative overflow-hidden bg-[#06165b] py-20 text-white lg:py-28">
          <div className="brand-grid absolute inset-0 opacity-20" />
          <div className="section-shell relative grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <div>
              <p className="eyebrow !text-[#42e5dd]">If this is your problem</p>
              <h2 className="mt-6 max-w-3xl break-words text-3xl font-semibold leading-[1.08] tracking-[-.03em] sm:text-4xl sm:leading-[1.05] sm:tracking-[-.045em] lg:text-5xl">
                If you are hiring against a date, it is worth a conversation.
              </h2>
              <p className="mt-6 max-w-xl leading-8 text-blue-100/70">
                Where the people who can actually do the work sit, and what it takes to move them, is the work Rectify does.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/contact" className="button-light">
                Speak to Rectify <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/insights" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">
                More insights <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {article.faqs.length ? (
          <section className="bg-[#f2f8ff] py-20 lg:py-28" aria-labelledby="faq-heading">
            <div className="section-shell grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
              <div>
                <p className="eyebrow">Questions operators ask</p>
                <h2 id="faq-heading" className="mt-6 break-words text-3xl font-semibold tracking-[-.03em] sm:text-4xl sm:tracking-[-.035em] lg:text-5xl lg:tracking-[-.04em]">
                  Frequently asked questions
                </h2>
              </div>
              <div className="divide-y divide-[#c9daee] border-y border-[#c9daee]">
                {article.faqs.map((faq) => (
                  <details key={faq.question} className="group py-6">
                    <summary className="cursor-pointer list-none text-lg font-semibold tracking-[-.02em] marker:content-none [&::-webkit-details-marker]:hidden">
                      <span className="flex items-start justify-between gap-4 sm:gap-6">
                        <span className="min-w-0 break-words">{faq.question}</span>
                        <span className="mt-1 font-mono text-xs text-[#0b4ee8] group-open:hidden">+</span>
                        <span className="mt-1 hidden font-mono text-xs text-[#0b4ee8] group-open:inline">–</span>
                      </span>
                    </summary>
                    <p className="mt-4 max-w-2xl leading-7 text-slate-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {article.sources ? (
          <footer className="section-shell py-16">
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#0b4ee8]">Sources</p>
            <InsightSources sources={article.sources} />
          </footer>
        ) : null}
      </article>

      <Footer />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
                { '@type': 'ListItem', position: 2, name: 'Insights', item: `${baseUrl}/insights` },
                { '@type': 'ListItem', position: 3, name: fullTitle, item: url },
              ],
            },
            {
              '@type': 'BlogPosting',
              headline: fullTitle,
              description: article.description,
              image: `${baseUrl}${article.heroImage.src}`,
              datePublished: article.publishedAt,
              dateModified: article.updatedAt,
              author: {
                '@type': 'Person',
                name: article.author.name,
                jobTitle: article.author.role,
                worksFor: { '@type': 'Organization', name: 'Rectify International' },
              },
              publisher: {
                '@type': 'Organization',
                name: 'Rectify International',
                url: baseUrl,
                logo: { '@type': 'ImageObject', url: `${baseUrl}/rectify-logo.png` },
              },
              mainEntityOfPage: { '@type': 'WebPage', '@id': url },
              inLanguage: 'en-GB',
              articleSection: article.category,
              keywords: article.keywords.join(', '),
              ...(citations.length
                ? { citation: citations.map((citationUrl) => ({ '@type': 'CreativeWork', url: citationUrl })) }
                : {}),
            },
            ...(article.faqs.length
              ? [{
                  '@type': 'FAQPage',
                  mainEntity: article.faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
                  })),
                }]
              : []),
          ],
        }}
      />
    </main>
  );
}

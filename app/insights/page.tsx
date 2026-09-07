import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import { insightPath, getPublishedInsights } from '@/lib/insights';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rectifyinternational.com';

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00`));
}

export default function InsightsPage() {
  const insights = getPublishedInsights();
  const featured = insights[0];
  const rest = insights.slice(1);

  return (
    <main className="bg-white text-[#03104b]">
      <Navigation activePage="insights" />

      <section className="watercolor relative pb-20 pt-36 lg:pb-28 lg:pt-44">
        <div className="brand-grid absolute inset-0 opacity-35" />
        <div className="section-shell relative grid gap-12 lg:grid-cols-[1fr_.42fr] lg:items-end">
          <div>
            <p className="eyebrow">Insights</p>
            <h1 className="mt-8 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-.04em] sm:text-6xl sm:leading-[.94] sm:tracking-[-.055em] lg:text-8xl lg:leading-[.91] lg:tracking-[-.065em]">
              Market intelligence
              <br />
              <span className="display-serif text-[#0b4ee8]">before the search.</span>
            </h1>
          </div>
          <p className="border-l border-[#b8ccec] pl-6 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Notes on the hiring constraints that actually move a commissioning date: skills, titles, regions and the people operators cannot replace with megawatts.
          </p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="section-shell">
          {featured ? (
            <article className="grid overflow-hidden rounded-[2rem] border border-[#dbe8f8] bg-white shadow-[0_24px_70px_rgba(3,31,105,.06)] lg:grid-cols-[1.05fr_.95fr] lg:rounded-[2.5rem]">
              <Link href={insightPath(featured.slug)} className="relative min-h-[320px] lg:min-h-[560px]">
                <Image
                  src={featured.heroImage.src}
                  alt={featured.heroImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-[center_28%]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020d3b]/70 via-transparent to-transparent" />
                <p className="absolute bottom-6 left-6 max-w-sm text-[10px] font-bold uppercase tracking-[.18em] text-[#42e5dd]">
                  {featured.category}
                </p>
              </Link>
              <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-[#0b4ee8]">
                    {formatDate(featured.publishedAt)} · {featured.readingMinutes} min read
                  </p>
                  <h2 className="mt-5 break-words text-2xl font-semibold leading-[1.08] tracking-[-.03em] sm:text-3xl sm:leading-[1.05] sm:tracking-[-.04em] lg:text-4xl">
                    <Link href={insightPath(featured.slug)} className="transition hover:text-[#0b4ee8]">
                      {featured.title}
                      {featured.titleHighlight ? ` ${featured.titleHighlight}` : ''}
                    </Link>
                  </h2>
                  <p className="mt-6 text-base leading-8 text-slate-600">{featured.dek}</p>
                </div>
                <div className="mt-10 flex flex-col gap-4 border-t border-[#e3edf9] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <Image
                      src={featured.author.image}
                      alt={featured.author.imageAlt}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover object-top"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{featured.author.name}</p>
                      <p className="text-xs text-slate-500">{featured.author.role}</p>
                    </div>
                  </div>
                  <Link href={insightPath(featured.slug)} className="magnetic-link shrink-0 self-start sm:self-auto">
                    Read the briefing <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[#b8ccec] bg-[#f8fbff] px-8 py-16 text-center">
              <p className="eyebrow justify-center">Coming through</p>
              <h2 className="mt-6 text-3xl font-semibold tracking-[-.04em]">The first briefings are being prepared.</h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-600">
                Market notes will land here as they are published. In the meantime, talk to us about the hire sitting on your date.
              </p>
              <Link href="/contact" className="button-primary mt-8">
                Speak to Rectify <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {rest.length ? (
            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              {rest.map((article) => (
                <article key={article.slug} className="flex flex-col border-t border-[#bdcee4] pt-8">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-[#0b4ee8]">
                    {formatDate(article.publishedAt)} · {article.readingMinutes} min
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-[-.03em]">
                    <Link href={insightPath(article.slug)} className="hover:text-[#0b4ee8]">
                      {article.title}
                      {article.titleHighlight ? ` ${article.titleHighlight}` : ''}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600 sm:line-clamp-3">{article.dek}</p>
                  <Link href={insightPath(article.slug)} className="magnetic-link mt-6">
                    Read the briefing <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          ) : null}

          <div className="mt-16 grid gap-8 border-t border-[#bdcee4] pt-12 lg:grid-cols-3">
            {[
              {
                href: '/areas/germany',
                title: 'Germany, market by market',
                copy: 'Hiring context across Frankfurt, Berlin, the Rhineland and every cluster we cover.',
              },
              {
                href: '/services',
                title: 'How we search',
                copy: 'Mapping, outreach and shortlists for commissioning, MEP and building-services roles.',
              },
              {
                href: '/contact',
                title: 'Talk to Rectify',
                copy: 'If a hall is waiting on people who can sign the plant off, start here.',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start justify-between gap-4 py-2"
              >
                <div>
                  <h3 className="text-xl font-semibold tracking-[-.02em]">{item.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">{item.copy}</p>
                </div>
                <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-[#0b4ee8] transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="watercolor px-5 py-20 lg:py-24">
        <div className="section-shell flex flex-col justify-between gap-9 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Hiring against a date</p>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-.03em] sm:text-5xl sm:tracking-[-.045em] lg:text-6xl lg:tracking-[-.05em]">
              Power is a plan.
              <span className="display-serif text-[#0b4ee8]"> People are the constraint.</span>
            </h2>
          </div>
          <Link href="/contact" className="button-primary shrink-0">
            Speak to Rectify <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Rectify Insights',
          url: `${baseUrl}/insights`,
          description:
            'Market intelligence on energy, engineering and data-centre hiring across Germany and the United States.',
          publisher: {
            '@type': 'Organization',
            name: 'Rectify International',
            url: baseUrl,
          },
          hasPart: insights.map((article) => ({
            '@type': 'BlogPosting',
            headline: article.title,
            url: `${baseUrl}${insightPath(article.slug)}`,
            datePublished: article.publishedAt,
          })),
        }}
      />
    </main>
  );
}

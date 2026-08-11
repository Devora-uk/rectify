import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { countryInfo, getLocations } from '@/lib/locations';

export const metadata: Metadata = {
  title: 'Recruitment Locations | United States & Germany',
  description:
    'Explore Rectify International recruitment coverage. The United States is our primary market, with deep specialist expertise across Germany.',
  alternates: { canonical: '/areas' },
};

export default function AreasPage() {
  return (
    <main className="overflow-hidden bg-white text-[#03104b]">
      <Navigation activePage="areas" />
      <section className="watercolor relative pb-24 pt-36 lg:pb-32 lg:pt-44">
        <div className="brand-grid absolute inset-0 opacity-35" />
        <div className="section-shell relative">
          <p className="eyebrow">Our coverage</p>
          <h1 className="mt-8 max-w-5xl text-6xl font-semibold leading-[.92] tracking-[-.06em] sm:text-8xl">
            Two markets.
            <br />
            <span className="display-serif text-[#0b4ee8]">Local intelligence.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
            We deliver specialist search in the United States and Germany — our only markets — with deep networks and market intelligence in both.
          </p>
        </div>
      </section>
      <section className="-mt-8 px-3 sm:px-5 lg:-mt-12">
        <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[2rem] bg-[#06165b] lg:rounded-[2.75rem]">
          <div className="relative h-[280px] sm:h-[360px] lg:h-[420px]">
            <Image
              src="/infrastructure-site-leader.webp"
              alt="Black woman infrastructure leader on a technical project site"
              fill
              sizes="(max-width: 1024px) 100vw, 1500px"
              className="object-cover object-[center_20%]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020d3b]/90 via-[#020d3b]/45 to-transparent" />
            <div className="absolute inset-0 flex items-end p-8 sm:p-12">
              <p className="max-w-xl text-2xl font-semibold leading-tight tracking-[-.03em] text-white sm:text-3xl">
                Local networks for the specialists who deliver complex projects.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-shell py-24 lg:py-32">
        <div className="grid gap-5 lg:grid-cols-2">
          {(['united-states', 'germany'] as const).map((key, index) => {
            const info = countryInfo[key];
            const list = getLocations(key);
            return (
              <article
                key={key}
                className={`relative overflow-hidden rounded-[2rem] p-8 sm:p-10 ${index === 0 ? 'bg-[#06165b] text-white' : 'brand-card'}`}
              >
                <div className="brand-grid absolute inset-0 opacity-[.16]" />
                <div className="relative flex items-start justify-between">
                  <div
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${index === 0 ? 'bg-white/10 text-[#42e5dd]' : 'bg-[#e5f1ff] text-[#0b4ee8]'}`}
                  >
                    <MapPin />
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] ${index === 0 ? 'border border-white/15 text-[#42e5dd]' : 'bg-[#edf5ff] text-[#0b4ee8]'}`}
                  >
                    {info.label}
                  </span>
                </div>
                <div className="relative">
                  <h2 className="mt-14 text-5xl font-semibold tracking-[-.05em]">{info.name}</h2>
                  <p className={`mt-4 max-w-lg leading-7 ${index === 0 ? 'text-blue-100/70' : 'text-slate-600'}`}>
                    {info.summary}
                  </p>
                  <p className={`mt-8 font-mono text-xs ${index === 0 ? 'text-[#42e5dd]' : 'text-[#0b4ee8]'}`}>
                    /{list.length} key talent markets
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {list.slice(0, 8).map((place) => (
                      <Link
                        key={place.slug}
                        href={`/areas/${key}/${place.slug}`}
                        className={`rounded-full border px-3 py-1.5 text-sm transition ${index === 0 ? 'border-white/15 text-blue-100/75 hover:border-[#42e5dd] hover:text-white' : 'border-[#d8e5f6] text-slate-600 hover:border-[#0b4ee8] hover:text-[#0b4ee8]'}`}
                      >
                        {place.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/areas/${key}`}
                    className={`magnetic-link mt-9 ${index === 0 ? '!text-[#42e5dd]' : ''}`}
                  >
                    Explore {info.name}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <div className="watercolor mt-5 flex flex-col justify-between gap-6 rounded-[2rem] border border-[#dbe8f8] p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-semibold">Hiring in the US or Germany?</h2>
            <p className="mt-2 text-slate-600">
              Tell us about the role and market — we will respond with a clear point of view.
            </p>
          </div>
          <Link href="/contact" className="button-primary shrink-0">
            Discuss a search <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}

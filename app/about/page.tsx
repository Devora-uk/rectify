import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Globe2,
  Handshake,
  Heart,
  Lightbulb,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Wind,
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import { values } from '@/lib/values';

const valueIcons = {
  Expertise: Lightbulb,
  Integrity: ShieldCheck,
  Impact: Target,
  Trust: Handshake,
  Culture: Heart,
  Play: Sparkles,
} as const;

const marketExperience = [
  {
    icon: Wind,
    title: 'Renewable energy',
    copy: 'From wind and solar to storage, hydrogen and grid delivery — we understand the project cycles, technical interfaces and leadership profiles that keep the transition moving.',
  },
  {
    icon: Building2,
    title: 'Engineering & infrastructure',
    copy: 'We recruit across built environment, utilities, transport and major programmes, where delivery pressure, stakeholder complexity and technical depth all matter.',
  },
  {
    icon: Server,
    title: 'Mission critical',
    copy: 'Data centres, commissioning, controls and resilient power demand people who can operate under scrutiny. We know where that talent sits and how to reach it.',
  },
  {
    icon: Globe2,
    title: 'Germany, the UK and beyond',
    copy: 'Our networks are deepest in Germany and the UK, with the reach to search internationally when the brief demands it.',
  },
];

export default function AboutPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rectifyinternational.com';

  return (
    <main className="overflow-hidden bg-white text-[#03104b]">
      <Navigation activePage="about" />

      <section className="watercolor relative pb-24 pt-36 lg:pb-32 lg:pt-44">
        <div className="brand-grid absolute inset-0 opacity-35" />
        <div className="section-shell relative grid gap-12 lg:grid-cols-[1fr_.46fr] lg:items-end">
          <div>
            <p className="eyebrow">About Rectify</p>
            <h1 className="mt-8 max-w-5xl text-6xl font-semibold leading-[.91] tracking-[-.065em] sm:text-8xl">
              People who understand
              <br />
              <span className="display-serif text-[#0b4ee8]">specialist markets.</span>
            </h1>
          </div>
          <div className="border-l border-[#b8ccec] pl-6">
            <p className="text-lg leading-8 text-slate-600">
              Rectify is a specialist recruitment partner for energy, engineering, infrastructure and mission-critical environments — built on market knowledge, honest communication and relationships that last.
            </p>
            <Link href="/contact" className="magnetic-link mt-7">
              Work with us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="-mt-8 px-3 sm:px-5 lg:-mt-12">
        <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[2rem] bg-[#06165b] lg:rounded-[2.75rem]">
          <div className="relative h-[380px] lg:h-[520px]">
            <Image
              src="/rectify-enterprise-hero.webp"
              alt="Rectify consultants working with energy and infrastructure leaders"
              fill
              sizes="(max-width: 1024px) 100vw, 1500px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020d3b]/90 via-[#020d3b]/55 to-transparent" />
            <div className="absolute inset-0 flex items-end p-8 sm:p-12">
              <div className="max-w-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#42e5dd]">Built for complexity</p>
                <p className="mt-4 text-2xl font-semibold leading-tight tracking-[-.03em] text-white sm:text-4xl">
                  We recruit where technical depth, delivery pressure and market scarcity collide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="section-shell grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div>
            <p className="eyebrow">Our experience</p>
            <h2 className="mt-6 text-5xl font-semibold tracking-[-.05em] sm:text-6xl">
              Depth across the markets that
              <span className="display-serif text-[#0b4ee8]"> matter.</span>
            </h2>
            <p className="mt-6 max-w-md leading-7 text-slate-600">
              We are not generalists trying to cover every sector. We focus on environments where the hire is business-critical, the talent is scarce and the search needs real market intelligence.
            </p>
            <p className="mt-5 max-w-md leading-7 text-slate-600">
              That means understanding project delivery, technical language, regional hiring dynamics and the difference between a good CV and the right person for the role.
            </p>
          </div>

          <div className="space-y-3">
            {marketExperience.map(({ icon: Icon, title, copy }, index) => (
              <article key={title} className="brand-card grid gap-5 p-6 sm:grid-cols-[60px_1fr] sm:items-start">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e5f1ff] text-[#0b4ee8]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#7182a1]">0{index + 1}</span>
                  <h3 className="mt-2 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f2f8ff] py-24 lg:py-32">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Our values</p>
            <h2 className="mt-6 text-5xl font-semibold tracking-[-.05em] sm:text-6xl">
              How we work, and what we
              <span className="display-serif text-[#0b4ee8]"> stand for.</span>
            </h2>
            <p className="mt-6 leading-7 text-slate-600">
              These principles shape how we advise clients, support candidates and show up as a team — in every market we serve.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {values.map((value) => {
              const Icon = valueIcons[value.title];

              return (
                <article
                  key={value.title}
                  className="group rounded-[1.75rem] border border-[#dbe8f8] bg-white p-7 transition hover:-translate-y-1 hover:border-[#b9ccec] hover:shadow-[0_20px_50px_rgba(11,78,232,.08)] sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs text-[#0b4ee8]">/{value.number}</span>
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e7f2ff] text-[#0b4ee8] transition group-hover:bg-[#0b4ee8] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-10 text-2xl font-semibold tracking-[-.03em]">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{value.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06165b] py-24 text-white lg:py-32">
        <div className="brand-grid absolute inset-0 opacity-20" />
        <div className="section-shell relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow !text-[#42e5dd]">Why it matters</p>
            <h2 className="mt-6 text-5xl font-semibold leading-none tracking-[-.05em] sm:text-6xl">
              Search is personal.
              <br />
              <span className="display-serif text-[#42e5dd]">Delivery is everything.</span>
            </h2>
            <p className="mt-7 max-w-lg leading-7 text-blue-100/70">
              Behind every brief is a team under pressure, a project at risk or a leader trying to build something important. We take that seriously — and we stay close until the outcome is right.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['Market knowledge', 'We understand the sectors, roles and hiring dynamics behind the search.'],
              ['Clear communication', 'No black box. You always know where things stand and what comes next.'],
              ['Long-term thinking', 'We build relationships that outlast a single placement.'],
              ['Human approach', 'Ambitious work should still feel collaborative, respectful and enjoyable.'],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-white/15 bg-white/[.06] p-6">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-blue-100/65">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="watercolor px-5 py-20 lg:py-24">
        <div className="section-shell flex flex-col justify-between gap-9 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Ready to talk?</p>
            <h2 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-.05em] sm:text-6xl">
              Let&apos;s solve what is
              <span className="display-serif text-[#0b4ee8]"> hard to hire.</span>
            </h2>
          </div>
          <Link href="/contact" className="button-primary shrink-0">
            Start a conversation <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Rectify International',
          url: `${baseUrl}/about`,
          description: 'Specialist recruitment for energy, engineering, infrastructure and mission-critical markets.',
          mainEntity: {
            '@type': 'Organization',
            name: 'Rectify International',
            url: baseUrl,
            description: 'Specialist talent for energy, engineering, infrastructure and mission-critical environments.',
          },
        }}
      />
    </main>
  );
}

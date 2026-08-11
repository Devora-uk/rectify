import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PartnerApplicationForm from '@/components/PartnerApplicationForm';
import StructuredData from '@/components/StructuredData';

const nextSteps = [
  {
    title: 'You apply',
    copy: 'Answer the questions honestly. Specific detail helps us decide whether we can actually help.',
  },
  {
    title: 'We assess',
    copy: 'We review every application ourselves. If the brief is outside what we do well, we will say so.',
  },
  {
    title: 'Fit call',
    copy: 'If there is a match, we arrange a phone call with the hiring decision-maker to discuss how we would work together.',
  },
];

export default function PartnerPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rectifyinternational.com';

  return (
    <main className="overflow-x-hidden bg-white text-[#03104b]">
      <Navigation activePage="partner" />

      <section className="watercolor relative pb-20 pt-36 lg:pb-28 lg:pt-44">
        <div className="brand-grid absolute inset-0 opacity-35" />
        <div className="section-shell relative">
          <p className="eyebrow">Talent partnership</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:items-end">
            <h1 className="max-w-5xl text-6xl font-semibold leading-[.91] tracking-[-.065em] sm:text-8xl">
              Apply to partner
              <br />
              <span className="display-serif text-[#0b4ee8]">with Rectify.</span>
            </h1>
            <p className="max-w-xl border-l border-[#b8ccec] pl-6 text-lg leading-8 text-slate-600">
              We work with a small number of businesses on the hiring problems that actually matter. This is not a general enquiry form. It is an application.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#application" className="button-primary">
              Start your application <ArrowDown className="h-4 w-4" />
            </a>
            <Link href="/services" className="button-outline">
              See how we work <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[#dbe8f8] py-20 lg:py-28">
        <div className="section-shell grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Who this is for</p>
            <h2 className="mt-6 max-w-xl text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
              Built for businesses with a real technical hiring problem.
            </h2>
          </div>
          <div className="max-w-2xl space-y-6 text-lg leading-8 text-slate-600">
            <p>
              Rectify partners with companies in energy, engineering, infrastructure and mission-critical environments — especially where roles are scarce, searches have stalled, or the next twelve months will demand more than an ad hoc agency brief.
            </p>
            <p>
              If you need a long-term talent partner rather than another CV drop, this is the right place to start. If you have a single role to discuss first, you can still{' '}
              <Link href="/contact" className="font-semibold text-[#0b4ee8] underline-offset-4 hover:underline">
                open a conversation
              </Link>
              .
            </p>
            <p>
              We are strongest in the United States and Germany — the only markets we serve.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[#06165b] py-20 text-white lg:py-24">
        <div className="brand-grid absolute inset-0 opacity-20" />
        <div className="section-shell relative grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
          <div>
            <p className="eyebrow !text-[#42e5dd]">What happens next</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
              Apply.
              <br />
              <span className="display-serif text-[#42e5dd]">We assess. Then we call.</span>
            </h2>
          </div>
          <ol className="grid gap-8 sm:grid-cols-3">
            {nextSteps.map((step, index) => (
              <li key={step.title}>
                <p className="font-mono text-xs text-[#42e5dd]">0{index + 1}</p>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-blue-100/70">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative mt-14 px-3 sm:mt-16 sm:px-5">
          <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[2rem] lg:rounded-[2.75rem]">
            <div className="relative aspect-[16/7] min-h-64 sm:min-h-80">
              <Image
                src="/diverse-talent-collaboration.webp"
                alt="Diverse hiring leaders reviewing market intelligence together"
                fill
                sizes="100vw"
                className="object-cover object-[center_35%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020d3b]/80 via-[#020d3b]/20 to-transparent" />
              <p className="absolute bottom-6 left-6 max-w-lg text-sm font-semibold text-white sm:bottom-8 sm:left-8 sm:text-lg">
                A partnership only works if both sides are clear about what needs to change.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="application" className="scroll-mt-28 py-20 lg:py-28">
        <div className="section-shell grid gap-12 lg:grid-cols-[minmax(0,.34fr)_minmax(0,.66fr)] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <p className="eyebrow">Partnership application</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-.045em] sm:text-5xl">
              Eight questions. Then a conversation.
            </h2>
            <p className="mt-5 max-w-sm leading-7 text-slate-600">
              This takes about eight minutes. Honest answers make a better fit call — and a clearer decision on both sides.
            </p>
            <p className="mt-8 font-mono text-xs uppercase tracking-[.16em] text-[#0b4ee8]">
              Confidential · Assessed personally
            </p>
          </aside>
          <div>
            <PartnerApplicationForm />
          </div>
        </div>
      </section>

      <Footer />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Partner with Rectify',
          url: `${baseUrl}/partner`,
          description:
            'Apply to partner with Rectify International on technical hiring across energy, engineering, infrastructure and mission-critical markets.',
          mainEntity: {
            '@type': 'Organization',
            name: 'Rectify International',
            url: baseUrl,
            email: 'info@rectifyinternational.com',
            telephone: '+17865791193',
          },
        }}
      />
    </main>
  );
}

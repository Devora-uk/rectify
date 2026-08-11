import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, BarChart3, BatteryCharging, Building2, MapPin, Search, Server, Users, Wind } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';

const CubeAnimation = dynamic(
  () => import('@/components/CubeAnimation'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-transparent" aria-hidden="true" />
    ),
  },
);

const markets = [
  { icon: Wind, number: '01', title: 'Renewable energy', copy: 'Wind, solar, storage, hydrogen, grid and power delivery.' },
  { icon: Building2, number: '02', title: 'Engineering & infrastructure', copy: 'Built environment, utilities, transport and major projects.' },
  { icon: Server, number: '03', title: 'Mission critical', copy: 'Data centres, commissioning, controls and resilient power.' },
  { icon: BatteryCharging, number: '04', title: 'Energy technology', copy: 'Electrification, automation, climate tech and energy software.' },
];
const services = [
  { icon: Search, title: 'Specialist search & shortlist', copy: 'Targeted outreach for hard-to-reach technical and project talent.' },
  { icon: BarChart3, title: 'Market mapping & intelligence', copy: 'Evidence on skills, salaries, availability and competition.' },
  { icon: Users, title: 'Executive leadership search', copy: 'Discreet search for leaders responsible for growth and delivery.' },
];

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rectifyinternational.com';
  return <main className="overflow-hidden bg-white text-[#03104b]">
    <Navigation activePage="home" overlay />

    <section className="relative min-h-[900px] overflow-hidden bg-[#020d3b] pt-[78px] text-white lg:min-h-screen">
      <Image src="/rectify-enterprise-hero.webp" alt="Diverse energy and infrastructure leaders agreeing a partnership around the table" fill sizes="100vw" className="hidden object-cover object-center md:block" priority />
      <Image src="/enterprise-talent-strategy.webp" alt="Black, Asian and white leaders collaborating on an energy and infrastructure plan" fill sizes="100vw" className="object-cover object-center md:hidden" priority />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,13,59,.15),rgba(2,13,59,.45)_42%,rgba(2,13,59,.9))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(2,13,59,.15),rgba(2,13,59,.75)_68%)] lg:bg-[radial-gradient(circle_at_28%_50%,rgba(2,13,59,.1),rgba(2,13,59,.82)_72%)]" />
      <div className="pointer-events-none absolute inset-x-5 bottom-8 top-24 hidden border border-white/20 lg:block" />

      <div className="section-shell relative z-10 grid min-h-[822px] items-center gap-10 py-16 lg:min-h-[calc(100vh-78px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="rounded-full border border-white/20 bg-[#020d3b]/35 px-4 py-2 text-[10px] font-bold uppercase tracking-[.22em] text-[#60eee7] backdrop-blur-md">Specialist search · United States · Germany</div>
          <h1 className="mt-8 max-w-[1100px] text-[3.7rem] font-semibold leading-[.88] tracking-[-.07em] sm:text-[6rem] lg:max-w-none lg:text-[5.5rem] xl:text-[7rem]">Your talent problem.<br/><span className="display-serif text-[#5af0e7]">We solve it.</span></h1>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-blue-50/80 sm:text-xl lg:mx-0 lg:max-w-xl">We find the energy, engineering and infrastructure specialists who make critical progress possible.</p>
          <div className="mt-9 flex w-full max-w-xl flex-col justify-center gap-3 sm:flex-row lg:justify-start"><Link href="/contact" className="button-light flex-1 sm:flex-none">Hire exceptional talent <ArrowUpRight className="h-4 w-4" /></Link><Link href="/services" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 sm:flex-none">See how we solve it <ArrowRight className="h-4 w-4" /></Link></div>
          <div className="mt-10 grid w-full max-w-3xl gap-2 sm:grid-cols-3 lg:max-w-2xl">{['Hard-to-fill roles','Market intelligence','Leadership search'].map((item,i)=><Link href={i===0?'/contact':'/services'} key={item} className="group flex items-center justify-between rounded-xl border border-white/15 bg-[#020d3b]/35 px-4 py-3 text-left text-xs font-semibold text-blue-50/80 backdrop-blur-md transition hover:border-[#5af0e7]/60 hover:bg-[#020d3b]/60 hover:text-white"><span><span className="mr-2 font-mono text-[9px] text-[#5af0e7]">0{i+1}</span>{item}</span><ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/></Link>)}</div>
        </div>

        <div className="relative mx-auto h-[min(58vw,22rem)] w-full max-w-md sm:h-[min(52vw,26rem)] lg:mx-0 lg:h-[min(68vh,38rem)] lg:max-w-none">
          <CubeAnimation className="h-full" />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap text-[9px] font-bold uppercase tracking-[.2em] text-blue-100/55"><ArrowDown className="h-4 w-4 text-[#5af0e7]"/> Explore Rectify</div>
    </section>

    <section className="border-b border-[#dbe8f8] py-24 lg:py-36">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">The Rectify approach</p><h2 className="mt-7 text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl">A shortlist should feel like <span className="display-serif text-[#0b4ee8]">the answer.</span></h2></div><div className="lg:pt-16"><p className="max-w-2xl text-xl leading-9 text-slate-600">The hardest roles do not need more CVs. They need better market intelligence, sharper outreach and a consultant who understands why the hire matters.</p></div></div>
        <div className="mt-16 grid border-y border-[#bdcee4] md:grid-cols-3">{[['Map','Build the evidence-led view of the real market.'],['Engage','Reach the right people with a compelling story.'],['Deliver','Present a qualified shortlist with total clarity.']].map(([item,copy],i)=><div key={item} className="group min-h-60 border-b border-[#bdcee4] py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"><span className="font-mono text-xs text-[#0b4ee8]">/0{i+1}</span><h3 className="mt-12 text-2xl font-semibold">{item}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">{copy}</p></div>)}</div>
      </div>
    </section>

    <section className="bg-[#f2f8ff] py-24 lg:py-32"><div className="section-shell grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-start"><div><p className="eyebrow">Specialist ecosystems</p><h2 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-.05em] sm:text-6xl">Expertise for systems that cannot stand still.</h2><div className="mt-12 border-t border-[#bdcee4]">{markets.map(({icon:Icon,number,title,copy})=><Link href="/services" key={title} className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 border-b border-[#bdcee4] py-6"><span className="font-mono text-[10px] text-[#0b4ee8]">/{number}</span><div><h3 className="text-xl font-semibold tracking-[-.02em]">{title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-slate-600">{copy}</p></div><ArrowUpRight className="mt-1 h-5 w-5 text-[#0b4ee8] transition group-hover:-translate-y-1 group-hover:translate-x-1"/></Link>)}</div><Link href="/services" className="magnetic-link mt-8">Explore all expertise <ArrowRight className="h-4 w-4" /></Link></div>
      <div className="grid min-h-[720px] grid-rows-[1.2fr_.8fr] gap-3 lg:sticky lg:top-28"><div className="group relative overflow-hidden"><Image src="/renewable-energy-leaders.webp" alt="Woman engineer of colour directing a major energy infrastructure project on site" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover transition duration-700 group-hover:scale-[1.025]"/><div className="absolute inset-0 bg-gradient-to-t from-[#020d3b]/80 via-transparent to-transparent"/><p className="absolute bottom-6 left-6 text-xs font-bold uppercase tracking-[.18em] text-white">Renewable energy leadership</p></div><div className="group relative overflow-hidden"><Image src="/mission-critical-leaders.webp" alt="Black specialist carrying out precision work on mission-critical systems" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover object-[center_38%] transition duration-700 group-hover:scale-[1.025]"/><div className="absolute inset-0 bg-gradient-to-t from-[#020d3b]/80 via-transparent to-transparent"/><p className="absolute bottom-6 left-6 text-xs font-bold uppercase tracking-[.18em] text-white">Mission-critical expertise</p></div></div>
    </div></section>

    <section className="relative overflow-hidden py-24 lg:py-32"><div className="section-shell grid gap-14 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow">What we deliver</p><h2 className="mt-6 text-5xl font-semibold tracking-[-.05em]">Search built around your problem.</h2><p className="mt-6 leading-7 text-slate-600">A precise, transparent approach for businesses whose hiring challenge cannot be solved by database search alone.</p></div><div className="border-t border-[#aebfd8]">{services.map(({icon:Icon,title,copy},i)=><Link href="/services" key={title} className="group grid gap-5 border-b border-[#aebfd8] py-7 sm:grid-cols-[60px_1fr_auto] sm:items-center"><div className="grid h-11 w-11 place-items-center border border-[#b9ccec] text-[#0b4ee8]"><Icon className="h-5 w-5"/></div><div><p className="font-mono text-[10px] text-[#7182a1]">/0{i+1}</p><h3 className="mt-1 text-xl font-semibold sm:text-2xl">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p></div><ArrowUpRight className="h-5 w-5 text-[#0b4ee8] transition group-hover:-translate-y-1 group-hover:translate-x-1"/></Link>)}</div></div></section>

    <section className="relative bg-[#06165b] py-24 text-white lg:py-32"><div className="brand-grid absolute inset-0 opacity-20"/><div className="section-shell relative grid gap-14 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow !text-[#42e5dd]">Where we are strongest</p><h2 className="mt-6 text-5xl font-semibold leading-none tracking-[-.05em] sm:text-6xl">Local depth.<br/><span className="display-serif text-[#42e5dd]">Two markets.</span></h2><p className="mt-7 max-w-md leading-7 text-blue-100/70">Our network is deepest in the United States and Germany, the only markets we serve.</p></div><div className="grid border border-white/20 sm:grid-cols-2"><LocationCard href="/areas/united-states" count="14" title="United States" label="Primary market" copy="Energy, engineering and mission-critical talent across every key US hub."/><LocationCard href="/areas/germany" count="16" title="Germany" label="Secondary market" copy="Energy, engineering and mission-critical talent across every key German cluster."/></div></div></section>

    <section className="watercolor relative overflow-hidden border-y border-[#c9daee] px-5 py-24 lg:py-32"><div className="brand-grid absolute inset-0 opacity-30"/><div className="section-shell relative flex flex-col justify-between gap-10 lg:flex-row lg:items-end"><div><p className="eyebrow">A pivotal hire starts here</p><h2 className="mt-6 max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-7xl">Tell us what needs to <span className="display-serif text-[#0b4ee8]">change.</span></h2></div><Link href="/contact" className="button-primary shrink-0">Start a search <ArrowUpRight className="h-4 w-4" /></Link></div></section>
    <Footer />
    <StructuredData data={{'@context':'https://schema.org','@type':'ProfessionalService',name:'Rectify International',url:baseUrl,email:'info@rectifyinternational.com',telephone:'+17865791193',areaServed:['US','DE'],serviceType:['Energy recruitment','Engineering recruitment','Infrastructure recruitment','Executive search']}} />
  </main>;
}

function LocationCard({href,count,title,label,copy}:{href:string;count:string;title:string;label:string;copy:string}) {
  return <Link href={href} className="group flex min-h-[360px] flex-col justify-between border-b border-white/20 p-7 transition hover:bg-white/[.07] sm:border-b-0 sm:border-r sm:p-9 sm:last:border-r-0"><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#42e5dd]">{label}</span><MapPin className="h-5 w-5"/></div><div><p className="text-6xl font-semibold">{count}</p><h3 className="mt-2 text-2xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-blue-100/65">{copy}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#42e5dd]">Explore market <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></span></div></Link>;
}

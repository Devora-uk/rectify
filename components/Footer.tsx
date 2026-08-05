import Link from 'next/link';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return <footer className="relative overflow-hidden bg-[#020d3b] text-white">
    <div className="brand-grid absolute inset-0 opacity-25" />
    <div className="absolute -right-40 -top-44 h-[520px] w-[520px] rounded-full bg-[#0749e8]/30 blur-[100px]" />
    <div className="section-shell relative py-16 lg:py-20">
      <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.5fr_.8fr_.8fr_1.2fr]">
        <div><Logo noLink size="large" inverse /><p className="mt-6 max-w-sm text-sm leading-7 text-blue-100/65">Specialist talent for energy, engineering, infrastructure and mission-critical environments. Global reach, with deep expertise in Germany and the UK.</p><p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-[#24ddd5]">Your problem, we solved it.</p></div>
        <div><h3 className="footer-title">Explore</h3><div className="footer-links"><Link href="/about">About</Link><Link href="/services">Expertise</Link><Link href="/areas">Locations</Link><Link href="/partner">Partner with us</Link><Link href="/areas/germany">Germany</Link><Link href="/areas/united-kingdom">United Kingdom</Link></div></div>
        <div><h3 className="footer-title">Markets</h3><div className="footer-links"><Link href="/areas/germany/berlin">Berlin</Link><Link href="/areas/germany/hamburg">Hamburg</Link><Link href="/areas/germany/munich">Munich</Link><Link href="/areas/germany/frankfurt">Frankfurt</Link></div></div>
        <div><h3 className="footer-title">Talk to us</h3><div className="footer-links"><a className="flex items-start gap-2" href="mailto:info@rectifyinternational.com"><Mail className="mt-0.5 h-4 w-4 shrink-0" />info@rectifyinternational.com</a><a className="flex items-center gap-2" href="tel:+447399836007"><Phone className="h-4 w-4" />+44 7399 836 007</a><Link href="/partner" className="!text-[#24ddd5]">Apply to partner <ArrowUpRight className="inline h-4 w-4" /></Link><Link href="/contact">Contact Rectify <ArrowUpRight className="inline h-4 w-4" /></Link></div></div>
      </div>
      <div className="flex flex-col gap-5 pt-8 text-xs text-blue-100/45 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Rectify International. All rights reserved.</p><div className="flex gap-5"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookies">Cookies</Link></div></div>
    </div>
  </footer>;
}

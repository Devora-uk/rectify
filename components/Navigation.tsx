'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Logo from './Logo';

interface NavigationProps { activePage?: 'home' | 'about' | 'services' | 'areas' | 'contact'; overlay?: boolean }
const links = [
  { href: '/', label: 'Home', key: 'home' },
  { href: '/about', label: 'About', key: 'about' },
  { href: '/services', label: 'Expertise', key: 'services' },
  { href: '/areas', label: 'Locations', key: 'areas' },
  { href: '/contact', label: 'Contact', key: 'contact' },
] as const;

export default function Navigation({ activePage = 'home', overlay = false }: NavigationProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      frameRef.current = null;
      setScrolled(window.scrollY > 16);
    };
    const onScroll = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnDesktop, { passive: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, [open]);

  const resolvedActivePage = pathname === '/'
    ? 'home'
    : pathname.startsWith('/about')
      ? 'about'
      : pathname.startsWith('/services')
        ? 'services'
        : pathname.startsWith('/areas')
          ? 'areas'
          : pathname.startsWith('/contact')
            ? 'contact'
            : activePage;
  const floating = overlay && !scrolled && !open;
  return <header className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200 ${scrolled || open ? 'border-[#dce8fa] bg-white/95 shadow-[0_10px_40px_rgba(2,20,91,.06)] backdrop-blur-xl' : overlay ? 'border-transparent bg-transparent' : 'border-[#e5edf9] bg-white/95 backdrop-blur-md'}`}>
    <div className="section-shell flex h-[78px] items-center justify-between">
      <Logo size="small" inverse={floating} />
      <nav className={`hidden items-center md:flex ${floating ? 'gap-2 rounded-full border border-white/20 bg-[#020d3b]/30 p-1.5 backdrop-blur-md' : 'gap-7'}`} aria-label="Main navigation">
        {links.map(link => <Link key={link.href} href={link.href} aria-current={resolvedActivePage === link.key ? 'page' : undefined} className={floating ? `rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${resolvedActivePage===link.key?'bg-white text-[#03104b]':'text-white/75 hover:text-white'}` : `nav-link ${resolvedActivePage === link.key ? 'nav-link-active' : ''}`}>{link.label}</Link>)}
        <Link href="/contact" className={floating ? 'inline-flex items-center gap-2 rounded-full bg-[#53eee6] px-5 py-2.5 text-[13px] font-bold text-[#03104b] transition hover:bg-white' : 'button-primary !px-5 !py-3'}>Start a search <ArrowUpRight className="h-4 w-4" /></Link>
      </nav>
      <button type="button" className={`grid h-11 w-11 place-items-center rounded-full border transition-colors md:hidden ${floating?'border-white/25 bg-[#020d3b]/25 text-white backdrop-blur':'border-[#cddbf2] bg-white/80 text-[#041353]'}`} onClick={() => setOpen(current => !current)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
    </div>
    {open && <nav id="mobile-navigation" className="max-h-[calc(100dvh-78px)] overflow-y-auto border-t border-[#e1eafb] bg-white px-5 pb-8 pt-2 shadow-[0_24px_60px_rgba(2,20,91,.12)] md:hidden" aria-label="Mobile navigation">
      {links.map(link => <Link key={link.href} href={link.href} aria-current={resolvedActivePage === link.key ? 'page' : undefined} className={`flex min-h-16 items-center justify-between border-b border-[#e8effb] py-4 text-lg font-semibold transition-colors ${resolvedActivePage === link.key ? 'text-[#0b4ee8]' : 'text-[#07165b] hover:text-[#0b4ee8]'}`}>{link.label}<ArrowUpRight className="h-4 w-4 text-[#0b57ee]" /></Link>)}
      <Link href="/contact" className="button-primary mt-6 w-full">Start a search <ArrowUpRight className="h-4 w-4" /></Link>
    </nav>}
  </header>;
}

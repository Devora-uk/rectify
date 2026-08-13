import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const ARCADIS_KUA_DC_URL = 'https://www.kuadc.com/en/';

export default function PartnerLogos() {
  return (
    <section className="border-b border-[#dbe8f8] bg-white py-10 lg:py-12" aria-label="Partners">
      <div className="section-shell flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
        <p className="shrink-0 text-lg font-semibold uppercase tracking-[.12em] text-[#03104b] sm:text-xl lg:text-2xl">
          Partners
        </p>

        <div className="flex flex-1 flex-col gap-8 sm:flex-row sm:items-center sm:justify-between lg:gap-12">
          <Link
            href={ARCADIS_KUA_DC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex max-w-2xl flex-col gap-3 rounded-2xl outline-none transition focus-visible:ring-2 focus-visible:ring-[#0b4ee8] focus-visible:ring-offset-2"
            aria-label="Visit Arcadis KUA DC — global data centre design and engineering"
          >
            <Image
              src="/partners/arcadis-kua-dc.png"
              alt="Arcadis KUA DC"
              width={480}
              height={96}
              className="h-14 w-auto max-w-[320px] object-contain transition duration-300 group-hover:scale-[1.02] sm:h-16 sm:max-w-[380px] lg:h-[4.5rem] lg:max-w-[440px]"
              priority
            />
            <span className="flex items-center gap-2 text-sm text-slate-500 transition group-hover:text-[#0b4ee8]">
              Global data centre design &amp; engineering
              <ArrowUpRight className="h-4 w-4 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:pl-4" aria-label="Additional partners">
            <span className="hidden h-10 w-px shrink-0 bg-[#dbe8f8] sm:block" aria-hidden />
            <span className="h-2.5 w-2.5 rounded-full bg-[#b9ccec]" aria-hidden />
            <span className="h-2.5 w-2.5 rounded-full bg-[#c9daee]" aria-hidden />
            <span className="h-2.5 w-2.5 rounded-full bg-[#dbe8f8]" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

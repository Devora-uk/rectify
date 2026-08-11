'use client';

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { Check, Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import {
  hireVolumeOptions,
  hiringApproachOptions,
  type PartnerApplicationPayload,
} from '@/lib/partner-application';

const emptyForm: PartnerApplicationPayload = {
  name: '',
  email: '',
  phone: '',
  website: '',
  companyName: '',
  sector: '',
  geography: '',
  hireVolume: '',
  hardRoles: '',
  processBreakdown: '',
  hiringApproaches: [],
  successLook: '',
  decisionMakerName: '',
  decisionMakerTitle: '',
  whyNow: '',
};

const fieldClass =
  'mt-2 w-full rounded-xl border border-[#cfdef2] bg-[#f8fbff] px-4 py-3.5 text-[#03104b] outline-none transition placeholder:text-slate-400 focus:border-[#0b4ee8] focus:bg-white focus:ring-4 focus:ring-[#dceaff]';
const choiceClass =
  'flex cursor-pointer items-start gap-3 rounded-xl border border-[#cfdef2] bg-[#f8fbff] px-4 py-3.5 text-sm text-[#03104b] transition hover:border-[#0b4ee8]/50 has-[:checked]:border-[#0b4ee8] has-[:checked]:bg-[#eef4ff] has-[:checked]:shadow-[inset_0_0_0_1px_#0b4ee8]';

export default function PartnerApplicationForm() {
  const [data, setData] = useState<PartnerApplicationPayload>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const toggleApproach = (approach: string) => {
    setData((current) => ({
      ...current,
      hiringApproaches: current.hiringApproaches.includes(approach)
        ? current.hiringApproaches.filter((item) => item !== approach)
        : [...current.hiringApproaches, approach],
    }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    if (!data.hireVolume) {
      toast.error('Please choose how many technical hires you are planning.');
      return;
    }

    if (data.hiringApproaches.length === 0) {
      toast.error('Please select at least one current hiring approach.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/partner-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send application');
      }

      setSubmitted(true);
      setData(emptyForm);
      toast.success('Application received', {
        description: 'We will assess the fit and arrange a phone call if we take it forward.',
      });
    } catch (error) {
      toast.error('Application not sent', {
        description: error instanceof Error ? error.message : 'Please email us directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="border-t border-[#dbe8f8] pt-10" role="status">
        <p className="font-mono text-xs text-[#0b4ee8]">Application received</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-.035em] sm:text-4xl">
          Thank you. We will read this properly.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
          Your application is with the Rectify team. We assess every submission before arranging a phone call. If there is a fit, we will be in touch to book that conversation.
        </p>
        <button
          type="button"
          className="magnetic-link mt-8"
          onClick={() => setSubmitted(false)}
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-12" noValidate={false}>
      <fieldset className="space-y-5">
        <legend className="text-xl font-semibold tracking-[-.02em] sm:text-2xl">Your details</legend>
        <p className="text-sm leading-6 text-slate-600">We need these to assess the application and arrange the fit call.</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            Your name *
            <input className={fieldClass} name="name" value={data.name} onChange={update} required autoComplete="name" placeholder="The person submitting this" />
          </label>
          <label className="text-sm font-semibold">
            Work email *
            <input className={fieldClass} type="email" name="email" value={data.email} onChange={update} required autoComplete="email" placeholder="you@company.com" />
          </label>
          <label className="text-sm font-semibold">
            Phone *
            <input className={fieldClass} type="tel" name="phone" value={data.phone} onChange={update} required autoComplete="tel" placeholder="For the fit call" />
          </label>
          <label className="text-sm font-semibold">
            Company website
            <input className={fieldClass} type="text" name="website" value={data.website} onChange={update} autoComplete="url" placeholder="https://" />
          </label>
        </div>
      </fieldset>

      <Question number="01" title="What is your company name, sector and primary geography of operations?">
        <div className="grid gap-5 sm:grid-cols-3">
          <label className="text-sm font-semibold">
            Company name *
            <input className={fieldClass} name="companyName" value={data.companyName} onChange={update} required placeholder="Registered or trading name" />
          </label>
          <label className="text-sm font-semibold">
            Sector *
            <input className={fieldClass} name="sector" value={data.sector} onChange={update} required placeholder="e.g. offshore wind, data centres" />
          </label>
          <label className="text-sm font-semibold">
            Primary geography *
            <input className={fieldClass} name="geography" value={data.geography} onChange={update} required placeholder="e.g. United States, Germany" />
          </label>
        </div>
      </Question>

      <Question number="02" title="How many technical hires are you planning in the next 12 months?">
        <fieldset>
          <legend className="sr-only">Number of technical hires planned</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {hireVolumeOptions.map((option) => (
              <label key={option} className={choiceClass}>
                <input
                  type="radio"
                  name="hireVolume"
                  value={option}
                  checked={data.hireVolume === option}
                  onChange={update}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#0b4ee8]"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </Question>

      <Question
        number="03"
        title="Which roles have historically been hardest for you to fill — and why?"
        hint="Role title, geography, what broke down. The more honest you are, the more useful the fit call will be."
      >
        <label className="sr-only" htmlFor="hardRoles">Hardest roles to fill</label>
        <textarea
          id="hardRoles"
          className={`${fieldClass} min-h-36 resize-y`}
          name="hardRoles"
          value={data.hardRoles}
          onChange={update}
          required
          maxLength={4000}
          placeholder="Commissioning engineers in Germany — salary band was wrong and the agency shortlist never matched the technical brief."
        />
      </Question>

      <Question
        number="04"
        title="What has broken down in your hiring process in the last 12 months?"
        hint="Slow process, wrong salary band, poor agency performance, no candidates — whatever it actually was."
      >
        <label className="sr-only" htmlFor="processBreakdown">What has broken down in hiring</label>
        <textarea
          id="processBreakdown"
          className={`${fieldClass} min-h-36 resize-y`}
          name="processBreakdown"
          value={data.processBreakdown}
          onChange={update}
          required
          maxLength={4000}
          placeholder="Tell us what actually stalled the search, not the polished version."
        />
      </Question>

      <Question number="05" title="What is your current approach to hiring technical talent?" hint="Select all that apply.">
        <fieldset>
          <legend className="sr-only">Current hiring approaches</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {hiringApproachOptions.map((option) => (
              <label key={option} className={choiceClass}>
                <input
                  type="checkbox"
                  checked={data.hiringApproaches.includes(option)}
                  onChange={() => toggleApproach(option)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#0b4ee8]"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </Question>

      <Question
        number="06"
        title="What would a successful talent partnership look like for your business in 12 months?"
        hint="Specific beats vague. Three commissioning engineers placed in Germany by Q3 beats “improved hiring”."
      >
        <label className="sr-only" htmlFor="successLook">What success looks like</label>
        <textarea
          id="successLook"
          className={`${fieldClass} min-h-36 resize-y`}
          name="successLook"
          value={data.successLook}
          onChange={update}
          required
          maxLength={4000}
          placeholder="Be specific about roles, markets, timing and what would make this partnership worth it."
        />
      </Question>

      <Question
        number="07"
        title="Who is the primary decision-maker on hiring strategy?"
        hint="This should be the person on the fit call. If it is not you, make sure they know this has been submitted."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            Name *
            <input className={fieldClass} name="decisionMakerName" value={data.decisionMakerName} onChange={update} required placeholder="Full name" />
          </label>
          <label className="text-sm font-semibold">
            Title *
            <input className={fieldClass} name="decisionMakerTitle" value={data.decisionMakerTitle} onChange={update} required placeholder="e.g. Head of Talent, COO" />
          </label>
        </div>
      </Question>

      <Question
        number="08"
        title="Why now? What has changed that makes this the right moment to bring in a specialist?"
        hint="New project pipeline, failed searches, growth phase, new market. This question matters more than any other."
      >
        <label className="sr-only" htmlFor="whyNow">Why now</label>
        <textarea
          id="whyNow"
          className={`${fieldClass} min-h-40 resize-y`}
          name="whyNow"
          value={data.whyNow}
          onChange={update}
          required
          maxLength={4000}
          placeholder="What has shifted — and why a specialist partnership is the right move now."
        />
      </Question>

      <div className="flex flex-col gap-5 border-t border-[#dbe8f8] pt-8 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-xl text-sm leading-6 text-slate-600">
          Once your application is in, we will assess it and arrange a phone call to discuss further. Your information is handled confidentially.
        </p>
        <button type="submit" disabled={loading} className="button-primary shrink-0 disabled:opacity-60">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending application
            </>
          ) : (
            <>
              Submit application
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      <p className="flex items-center gap-2 text-xs text-slate-500">
        <Check className="h-4 w-4 text-[#08a9a4]" />
        We only take on work we believe we can deliver.
      </p>
    </form>
  );
}

function Question({
  number,
  title,
  hint,
  children,
}: {
  number: string;
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-[#e2ecf8] pt-8">
      <div className="flex gap-4 sm:gap-6">
        <span className="mt-1 font-mono text-xs text-[#0b4ee8]" aria-hidden="true">
          /{number}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-semibold tracking-[-.02em] sm:text-2xl">{title}</h3>
          {hint ? <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{hint}</p> : null}
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const interests = [
  { value: 'great-britain', label: 'Great Britain' },
  { value: 'commonwealth', label: 'Commonwealth' },
  { value: 'numismatics', label: 'Numismatics' },
  { value: 'trading-cards', label: 'Trading cards' },
  { value: 'undecided', label: 'Not yet decided' },
];

const budgets = [
  { value: 'from-2500', label: 'From £2,500' },
  { value: 'from-50k', label: 'From £50,000' },
  { value: 'from-250k', label: 'From £250,000' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
];

export function EnquiryForm() {
  const searchParams = useSearchParams();
  const presetType = searchParams.get('enquiry_type') === 'adviser' ? 'adviser' : 'collector';

  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [enquiryType, setEnquiryType] = useState(presetType);

  const toggleInterest = (value: string) =>
    setSelected((current) =>
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    const form = new FormData(event.currentTarget);
    const payload = {
      enquiry_type: enquiryType,
      full_name: String(form.get('full_name') ?? ''),
      email: String(form.get('email') ?? ''),
      phone: String(form.get('phone') ?? ''),
      company: String(form.get('company') ?? ''),
      country: String(form.get('country') ?? ''),
      interests: selected,
      budget_band: String(form.get('budget_band') ?? ''),
      message: String(form.get('message') ?? ''),
      // Honeypot — bots fill this, people never see it.
      website: String(form.get('website') ?? ''),
      source_path: window.location.pathname + window.location.search,
    };

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error ?? 'That did not send. Try again, or email us directly.');
        setStatus('error');
        return;
      }

      setStatus('sent');
    } catch {
      setMessage('That did not send. Check your connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-gold/50 p-10 md:p-14">
        <p className="eyebrow">Enquiry received</p>
        <h2 className="display-md mt-6 text-ivory">Thank you. We will be in touch.</h2>
        <p className="lede mt-6 text-mist">
          A specialist will read this personally and reply within two working days. If it is
          urgent, call us on +44 (0)20 7836 8444.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* Enquiry type */}
      <fieldset>
        <legend className="label">I am enquiring as</legend>
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            { value: 'collector', label: 'A collector' },
            { value: 'adviser', label: 'A wealth manager or family office' },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setEnquiryType(option.value)}
              aria-pressed={enquiryType === option.value}
              className={`border px-5 py-3 font-ledger text-[10px] uppercase tracking-[0.14em] transition-colors ${
                enquiryType === option.value
                  ? 'border-gold bg-gold text-vault'
                  : 'border-champagne/25 text-mist hover:border-champagne'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Identity */}
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="full_name">
            Full name
          </label>
          <input id="full_name" name="full_name" required autoComplete="name" className="field" />
        </div>
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
        <div>
          <label className="label" htmlFor="phone">
            Telephone <span className="normal-case tracking-normal text-mist/40">optional</span>
          </label>
          <input id="phone" name="phone" autoComplete="tel" className="field" />
        </div>
        <div>
          <label className="label" htmlFor="country">
            Country
          </label>
          <input id="country" name="country" autoComplete="country-name" className="field" />
        </div>
        {enquiryType === 'adviser' ? (
          <div className="sm:col-span-2">
            <label className="label" htmlFor="company">
              Firm
            </label>
            <input id="company" name="company" autoComplete="organization" className="field" />
          </div>
        ) : null}
      </div>

      {/* Interests */}
      <fieldset>
        <legend className="label">Areas of interest</legend>
        <div className="mt-4 flex flex-wrap gap-3">
          {interests.map((interest) => {
            const active = selected.includes(interest.value);
            return (
              <button
                key={interest.value}
                type="button"
                onClick={() => toggleInterest(interest.value)}
                aria-pressed={active}
                className={`border px-4 py-2.5 font-ledger text-[10px] uppercase tracking-[0.14em] transition-colors ${
                  active
                    ? 'border-champagne bg-champagne/10 text-champagne'
                    : 'border-champagne/25 text-mist hover:border-champagne'
                }`}
              >
                {interest.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label className="label" htmlFor="budget_band">
          Where you would like to start
        </label>
        <select id="budget_band" name="budget_band" className="field appearance-none">
          {budgets.map((budget) => (
            <option key={budget.value} value={budget.value} className="bg-ink text-ivory">
              {budget.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label" htmlFor="message">
          Anything you would like us to know
        </label>
        <textarea id="message" name="message" rows={5} className="field resize-none" />
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' ? (
        <p className="border border-gold/50 px-5 py-4 font-ledger text-[11px] uppercase tracking-[0.1em] text-champagne">
          {message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-6 border-t border-champagne/15 pt-8">
        <button type="submit" disabled={status === 'sending'} className="btn btn-gold disabled:opacity-60">
          {status === 'sending' ? 'Sending' : 'Send enquiry'}
        </button>
        <p className="max-w-[38ch] text-[11px] leading-relaxed text-mist/50">
          We use your details to respond to this enquiry and nothing else. No marketing without
          your say-so.
        </p>
      </div>
    </form>
  );
}

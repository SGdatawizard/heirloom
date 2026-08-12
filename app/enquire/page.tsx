import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SiteShell } from '@/components/site/SiteShell';
import { Reveal } from '@/components/ui/Reveal';
import { Ledger, LedgerRow } from '@/components/ui/Ledger';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Enquire',
  description:
    'Tell us what you collect, or what you would like to. A specialist will arrange a private conversation.',
};

export default function EnquirePage() {
  return (
    <SiteShell>
      <section className="bg-ivory pb-24 pt-40 md:pt-52">
        <div className="shell grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="eyebrow-light">Enquire</p>
              <h1 className="display-lg mt-6 max-w-[16ch] text-ink">
                Start with a conversation, not a catalogue.
              </h1>
              <p className="lede mt-8 text-slate">
                Tell us what you collect or what you would like to begin. A specialist reads every
                enquiry personally and replies within two working days.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-16">
                <Suspense fallback={<p className="text-slate/60">Loading the form…</p>}>
                  <EnquiryForm />
                </Suspense>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <aside className="border border-ink/15 bg-paper p-8 md:p-10">
              <p className="eyebrow-light">What happens next</p>
              <ol className="mt-6">
                {[
                  'We read your enquiry and match you to the right specialist.',
                  'A private conversation, in person, by video or by telephone.',
                  'A written proposal with candidate pieces and their full price records.',
                  'You decide. There is no obligation at any point before you sign.',
                ].map((step, i) => (
                  <li
                    key={step}
                    className="grid gap-3 border-b border-ink/10 py-4 sm:grid-cols-[1.5rem_1fr]"
                  >
                    <span className="font-ledger text-[10px] text-bronze">{`0${i + 1}`}</span>
                    <span className="text-[14px] leading-relaxed text-slate">{step}</span>
                  </li>
                ))}
              </ol>

              <p className="mt-10 font-ledger text-[10px] uppercase tracking-eyebrow text-bronze">
                Direct
              </p>
              <Ledger className="mt-4">
                <LedgerRow tone="light" label="Telephone" value={site.phone} />
                <LedgerRow tone="light" label="London" value="399 Strand, WC2R" />
                <LedgerRow tone="light" label="Singapore" value="By appointment" />
              </Ledger>
              
                href={`mailto:${site.email}`}
                className="mt-6 block font-ledger text-[11px] uppercase tracking-[0.12em] text-bronze hover:text-ink"
              >
                {site.email}
              </a>
            </aside>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}

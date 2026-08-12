import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '@/components/site/SiteShell';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Ledger, LedgerRow } from '@/components/ui/Ledger';
import { pillars, sampleRecord } from '@/content/heirloom';

export const metadata: Metadata = {
  title: 'The record',
  description:
    'Provenance proven by the record, rarity by the SG Catalogue, value by auction and retail realisations. How Stanley Gibbons evidences a piece.',
};

const provenanceChain = [
  { stage: 'Struck or printed', detail: 'Issue date, printer, plate and state recorded from the catalogue.' },
  { stage: 'Early ownership', detail: 'Named collections, where documented, with sale references.' },
  { stage: 'Passages at auction', detail: 'House, sale, date and lot number for every appearance we can verify.' },
  { stage: 'Condition history', detail: 'Certificates, expertising opinions and any recorded restoration.' },
  { stage: 'Current ownership', detail: 'Held in your name, recorded in the Heirloom register.' },
];

const say = [
  'Track value',
  'Market data',
  'Realisations',
  'Long-term trends',
  'Historically appreciated',
  'Alternative holding',
  'Tangible asset',
  'Provenance',
  'Rarity',
  'Portfolio',
];

const neverSay = ['Guaranteed', 'Assured returns', 'Fund', 'Scheme', 'Advice', 'Forecast'];

export default function TheRecordPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Proven, not promised"
        title="Every claim on this page has a source behind it."
        lede="An heirloom is defined by what it has already done — survived, been kept, been handed down. That is backward-looking evidence, not a projection. What follows is exactly how we evidence a piece before it reaches a client."
        meta={[
          { label: 'Records held since', value: '1856' },
          { label: 'Coin records since', value: '1872' },
          { label: 'Benchmark', value: 'The SG Catalogue' },
        ]}
      />

      {/* Pillars */}
      <section className="band bg-ink">
        <div className="shell grid gap-px bg-champagne/15 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.id} delay={i * 80} className="bg-ink p-9 md:p-11">
              <p className="eyebrow">{`0${i + 1}`}</p>
              <h2 className="mt-6 font-display text-2xl font-light text-ivory">{pillar.title}</h2>
              <p className="mt-5 text-[14px] leading-[1.85] text-mist">{pillar.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Worked example */}
      <section className="band bg-ivory">
        <div className="shell">
          <Reveal>
            <p className="eyebrow-light">A worked example</p>
            <h2 className="display-lg mt-6 max-w-[20ch] text-ink">
              What a documented piece actually looks like
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <ImageSlot
                tone="light"
                label="The example piece, photographed front and reverse with its certificate"
                ratio="4 / 5"
              />
            </Reveal>

            <Reveal delay={100}>
              <div className="border border-ink/15 bg-paper p-8 md:p-10">
                <p className="font-ledger text-[10px] uppercase tracking-eyebrow text-bronze">
                  {sampleRecord.reference}
                </p>
                <h3 className="mt-3 font-display text-3xl font-light leading-tight text-ink">
                  {sampleRecord.title}
                </h3>
                <p className="mt-2 font-ledger text-[11px] uppercase tracking-[0.1em] text-slate">
                  {sampleRecord.detail}
                </p>

                <p className="mt-10 font-ledger text-[10px] uppercase tracking-eyebrow text-bronze">
                  The price record
                </p>
                <Ledger className="mt-4">
                  {sampleRecord.rows.map((row) => (
                    <LedgerRow key={row.label} tone="light" label={row.label} value={row.value} />
                  ))}
                </Ledger>

                <p className="mt-10 font-ledger text-[10px] uppercase tracking-eyebrow text-bronze">
                  The chain of ownership
                </p>
                <ol className="mt-4">
                  {provenanceChain.map((link, i) => (
                    <li
                      key={link.stage}
                      className="grid gap-2 border-b border-ink/10 py-4 sm:grid-cols-[1.5rem_1fr]"
                    >
                      <span className="font-ledger text-[10px] text-bronze">{`0${i + 1}`}</span>
                      <span>
                        <span className="block font-ledger text-[11px] uppercase tracking-[0.1em] text-ink">
                          {link.stage}
                        </span>
                        <span className="mt-1 block text-[13px] leading-relaxed text-slate">
                          {link.detail}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>

                <p className="mt-6 text-[12px] leading-relaxed text-slate/70">
                  {sampleRecord.footnote}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Language discipline */}
      <section className="band bg-vault">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">How we talk about value</p>
            <h2 className="display-lg mt-6 max-w-[24ch] text-ivory">
              We will not pretend values do not move. We will not turn movement into a promise.
            </h2>
            <p className="lede mt-8 text-mist">
              Catalogue prices and resale values for the right material have climbed steadily over
              many years, and we are happy to put that data in front of you. What we will not do is
              dress it up as a guarantee. We show the history of a piece and its area, explain what
              tends to drive movement, and leave the conclusion where it belongs.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-px bg-champagne/15 md:grid-cols-2">
            <Reveal className="bg-vault p-9 md:p-11">
              <p className="font-ledger text-[10px] uppercase tracking-eyebrow text-champagne">
                What we say
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-3">
                {say.map((word) => (
                  <li
                    key={word}
                    className="border border-champagne/25 px-3 py-1.5 font-ledger text-[10px] uppercase tracking-[0.12em] text-mist"
                  >
                    {word}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80} className="bg-vault p-9 md:p-11">
              <p className="font-ledger text-[10px] uppercase tracking-eyebrow text-gold">
                What we never say
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-3">
                {neverSay.map((word) => (
                  <li
                    key={word}
                    className="border border-gold/25 px-3 py-1.5 font-ledger text-[10px] uppercase tracking-[0.12em] text-mist/50 line-through decoration-gold/60"
                  >
                    {word}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[13px] leading-relaxed text-mist/70">
                No guaranteed returns. No buy-back promises. Nothing that looks or behaves like a
                fund or a managed scheme. We give you information, tools and access, including the
                historic price record. We do not give financial advice and we do not forecast.
              </p>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <p className="mt-14 max-w-prose text-[14px] leading-[1.85] text-mist/60">
              Value is not linear. Individual pieces can fall as well as rise, or sit still for
              long periods. Any account of this market that leaves that out is selling something.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SG Collect */}
      <section className="band bg-ink">
        <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <p className="eyebrow">SG Collect · From Q2 2027</p>
            <h2 className="display-lg mt-6 text-ivory">Discover and value. Then decide and hold.</h2>
            <p className="lede mt-8 text-mist">
              SG Collect is where the data sits — catalogue values, historic prices, what pieces
              have sold for and what they are worth now. It is where a collector gets to know us
              and where the discovery begins.
            </p>
            <p className="lede mt-5 text-mist/70">
              Heirloom is the step after: the point at which choices made from data become a
              curated portfolio, held with guidance. One is the evidence. The other is what you
              do with it.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="border border-champagne/20 p-8 md:p-10">
              <Ledger>
                <LedgerRow label="SG Collect" value="Discover & value" />
                <LedgerRow label="SG Heirloom" value="Decide, curate & hold" />
                <LedgerRow label="SG Auctions" value="Trade out" />
                <LedgerRow label="Stanley Gibbons" value="Since 1856" />
              </Ledger>
              <Link href="/enquire" className="btn btn-gold mt-10 w-full">
                Register your interest
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}

import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/site/SiteShell';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Ledger, LedgerRow } from '@/components/ui/Ledger';
import { tiers } from '@/content/heirloom';

export const metadata: Metadata = {
  title: 'The offering',
  description:
    'A curated, outright-owned portfolio from £2,500 a piece. Annual valuations, zero commission on trade-outs through SG, insured storage and continuing specialist guidance.',
};

const included = [
  {
    title: 'Outright ownership',
    body: 'Real, tangible pieces held in your name. Not a fund, not a fractional share, not a certificate representing something held elsewhere.',
  },
  {
    title: 'Only the finest material',
    body: 'To the standard the SG Catalogue sets for the market, and the bar the coin team sets for numismatics. If it does not meet it, we do not offer it.',
  },
  {
    title: 'Freedom to trade',
    body: 'Move pieces in and out as the years pass, with a specialist timing entries and exits and routing sales through SG Auctions where that serves you best.',
  },
  {
    title: 'Full transparency',
    body: 'Historic prices, realisations and comparables, put in front of you in full. The conclusions are left to you.',
  },
  {
    title: 'Heirloom presentation',
    body: 'Secure custody plus a premium pack carrying every certificate and the documented provenance — the thing that actually gets handed down.',
  },
  {
    title: 'White-glove service',
    body: 'A named relationship manager and a dedicated specialist who know the material inside out, shaping the portfolio to your intent, in complete confidence.',
  },
];

export default function OfferingPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="The offering"
        title="A portfolio you own, curated by people who wrote the catalogue."
        lede="Heirloom begins at £2,500 a piece and scales to trophy material. Around the pieces sits a contracted service: annual written valuations, no commission on anything you sell or trade out through Stanley Gibbons, insured storage at no charge and continuing specialist guidance."
        meta={[
          { label: 'Entry point', value: 'From £2,500' },
          { label: 'Minimum term', value: '3 years' },
          { label: 'Trade-out commission', value: '0%' },
        ]}
      />

      {/* What the client gets */}
      <section className="band bg-ink">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">What is included</p>
            <h2 className="display-lg mt-6 max-w-[18ch] text-ivory">
              Six things every client receives
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px bg-champagne/15 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item, i) => (
              <Reveal key={item.title} delay={i * 60} className="bg-ink p-8 md:p-9">
                <h3 className="font-display text-xl font-light text-ivory">{item.title}</h3>
                <p className="mt-4 text-[14px] leading-[1.8] text-mist">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section id="tiers" className="band scroll-mt-24 bg-ivory">
        <div className="shell">
          <Reveal>
            <p className="eyebrow-light">The ladder</p>
            <h2 className="display-lg mt-6 max-w-[20ch] text-ink">
              Three tiers, one standard of material
            </h2>
            <p className="lede mt-8 text-slate">
              The difference between tiers is the depth of service and the level of access — never
              the quality of what we will put in front of you.
            </p>
          </Reveal>

          <div className="mt-16 space-y-6">
            {tiers.map((tier, i) => (
              <Reveal
                key={tier.id}
                delay={i * 80}
                className={`grid gap-8 border p-8 md:grid-cols-[1fr_1.4fr] md:gap-14 md:p-12 ${
                  tier.featured ? 'border-gold bg-ink' : 'border-ink/15 bg-paper'
                }`}
              >
                <div>
                  <p
                    className={`font-ledger text-[10px] uppercase tracking-eyebrow ${
                      tier.featured ? 'text-champagne' : 'text-bronze'
                    }`}
                  >
                    {tier.entry}
                  </p>
                  <h3
                    className={`mt-5 font-display text-3xl font-light leading-tight ${
                      tier.featured ? 'text-ivory' : 'text-ink'
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={`mt-5 text-[14px] leading-[1.8] ${
                      tier.featured ? 'text-mist' : 'text-slate'
                    }`}
                  >
                    {tier.summary}
                  </p>
                  <p
                    className={`mt-8 font-ledger text-[10px] uppercase tracking-[0.12em] ${
                      tier.featured ? 'text-champagne' : 'text-slate'
                    }`}
                  >
                    {tier.term}
                  </p>
                </div>

                <ul className="space-y-0">
                  {tier.includes.map((line) => (
                    <li
                      key={line}
                      className={`flex gap-4 border-b py-4 text-[14px] leading-relaxed ${
                        tier.featured
                          ? 'border-champagne/20 text-mist'
                          : 'border-ink/10 text-slate'
                      }`}
                    >
                      <span className={tier.featured ? 'text-gold' : 'text-bronze'}>—</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The agreement */}
      <section id="agreement" className="band scroll-mt-24 bg-ink">
        <div className="shell grid items-start gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">The Heirloom agreement</p>
            <h2 className="display-lg mt-6 text-ivory">A service relationship, not a transaction</h2>
            <p className="lede mt-8 text-mist">
              Every client signs an Heirloom agreement with a minimum initial term of three years,
              rolling annually thereafter. In return for that commitment you receive the full
              service — valuations, storage, guidance and zero commission on trade-outs.
            </p>
            <p className="lede mt-5 text-mist/70">
              Our revenue is the buying margin on the material itself, earned once at the point of
              acquisition. That keeps the incentive on the quality of what we source, rather than
              on churning your portfolio.
            </p>

            <Ledger className="mt-12">
              <LedgerRow label="Initial term" value="3 years minimum" />
              <LedgerRow label="Thereafter" value="Rolling, annual" />
              <LedgerRow label="Annual written valuation" value="Every piece held" />
              <LedgerRow label="Selling or trading out through SG" value="0% commission" />
              <LedgerRow label="Storage and insurance" value="No charge" />
              <LedgerRow label="Early exit" value="Standard commission applies" />
            </Ledger>

            <p className="mt-6 text-[12px] leading-relaxed text-mist/45">
              No penalty fee applies on early exit. Where a client sells out before the minimum
              term, standard selling commission is charged in place of the 0% rate.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ImageSlot
              label="The signed agreement and folio on a desk — hands, pen, no faces"
              ratio="3 / 4"
              caption="The Heirloom agreement"
            />
          </Reveal>
        </div>
      </section>

      {/* Entry point rationale */}
      <section className="band bg-ivory">
        <div className="shell grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <p className="eyebrow-light">Why £2,500</p>
            <h2 className="display-lg mt-6 text-ink">The entry point is deliberate</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-[15px] leading-[1.85] text-slate">
              £2,500 opens Heirloom to collectors who are wealthy enough to buy properly but
              priced out of trophy pieces — a group this market has served badly for years. The
              curation, the service and the provenance stay exactly the same at that level.
            </p>
            <p className="mt-5 text-[15px] leading-[1.85] text-slate">
              It also means a collection can begin modestly and grow. Most clients who start here
              buy again within two years, and the portfolio they end up with is one they built
              themselves rather than one that arrived complete.
            </p>
            <Link href="/enquire" className="btn btn-ink mt-10">
              Start a conversation
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '@/components/site/SiteShell';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Ledger, LedgerRow } from '@/components/ui/Ledger';

export const metadata: Metadata = {
  title: 'For advisers',
  description:
    'The specialist passion-asset partner for wealth managers, private banks and family offices. Independent valuation, market data, curation and secure custody.',
};

const forAdvisers = [
  {
    title: 'Independent valuation',
    body: 'Written annual valuations on client holdings, suitable for insurance schedules and estate planning, prepared by the specialists who set the market benchmark.',
  },
  {
    title: 'Market data others cannot source',
    body: 'Decades of catalogue movement and verified realisations. Through SG Collect, an evidence base with no equivalent elsewhere in this category.',
  },
  {
    title: 'Access to trophy material',
    body: 'First sight of significant pieces before they reach auction, sourced to a written brief for your client.',
  },
  {
    title: 'Curation and custody',
    body: 'Portfolio construction, insured storage and the presentation pack — handled end to end, in your client\'s name.',
  },
];

export default function AdvisersPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Wealth managers · Private banks · Family offices"
        title="The passion-asset specialist your clients cannot find elsewhere."
        lede="Your clients already hold art, watches and wine. Stamps and coins belong in the same conversation — and until now nobody has offered them with the valuation discipline, the data and the custody that category demands."
        meta={[
          { label: 'Framed as', value: 'Curation & data service' },
          { label: 'Never framed as', value: 'An investment product' },
          { label: 'Markets', value: 'London · Singapore' },
        ]}
      />

      <section className="band bg-ink">
        <div className="shell grid items-start gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">The proposition</p>
            <h2 className="display-lg mt-6 text-ivory">
              Introduce it as a service, not a security
            </h2>
            <p className="lede mt-8 text-mist">
              Heirloom is deliberately structured so that an adviser can put it in front of a
              client without regulatory discomfort. It is curation, valuation, custody and market
              data. There is no fund, no scheme, no pooled vehicle and no promise of return. The
              client owns objects, outright, in their own name.
            </p>
            <p className="lede mt-5 text-mist/70">
              What you gain is a credible answer in a category your clients keep raising, backed by
              a name that has been the reference point in this field since 1856.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link href="/enquire?enquiry_type=adviser" className="btn btn-gold">
                Arrange a partner briefing
              </Link>
              <Link href="/the-record" className="btn btn-ghost">
                See the evidence base
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ImageSlot
              label="A private client meeting — table, folio and material, shot from above, no faces"
              ratio="4 / 5"
            />
          </Reveal>
        </div>
      </section>

      <section className="band bg-ivory">
        <div className="shell">
          <Reveal>
            <p className="eyebrow-light">What we bring to the relationship</p>
            <h2 className="display-lg mt-6 max-w-[18ch] text-ink">Four things you can offer tomorrow</h2>
          </Reveal>

          <div className="mt-16 grid gap-px bg-ink/10 sm:grid-cols-2">
            {forAdvisers.map((item, i) => (
              <Reveal key={item.title} delay={i * 70} className="bg-ivory p-9 md:p-11">
                <p className="font-ledger text-[10px] uppercase tracking-eyebrow text-bronze">
                  {`0${i + 1}`}
                </p>
                <h3 className="mt-6 font-display text-2xl font-light text-ink">{item.title}</h3>
                <p className="mt-4 text-[14px] leading-[1.85] text-slate">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band bg-vault">
        <div className="shell grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <p className="eyebrow">How an introduction works</p>
            <h2 className="display-lg mt-6 text-ivory">Four steps, no obligation on your client</h2>
            <ol className="mt-12">
              {[
                { s: 'Briefing', d: 'A private session for your team on the material, the record and how we evidence it.' },
                { s: 'Introduction', d: 'You introduce the client. We meet them with you, or alone, whichever you prefer.' },
                { s: 'Proposal', d: 'A written brief with candidate pieces, full price records and comparables.' },
                { s: 'Reporting', d: 'Annual written valuations sent to the client and, with their consent, to you.' },
              ].map((step, i) => (
                <li key={step.s} className="grid gap-3 border-b border-champagne/15 py-6 sm:grid-cols-[3rem_1fr]">
                  <span className="font-display text-xl font-light text-gold/70">{`0${i + 1}`}</span>
                  <span>
                    <span className="block font-display text-xl font-light text-ivory">{step.s}</span>
                    <span className="mt-2 block text-[14px] leading-relaxed text-mist">{step.d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={100}>
            <div className="border border-champagne/20 p-8 md:p-10">
              <p className="eyebrow">At a glance</p>
              <Ledger className="mt-6">
                <LedgerRow label="Client ownership" value="Outright, in their name" />
                <LedgerRow label="Pooled vehicle" value="None" />
                <LedgerRow label="Return promised" value="None" />
                <LedgerRow label="Valuation" value="Annual, written" />
                <LedgerRow label="Custody" value="Insured, included" />
                <LedgerRow label="Reporting to adviser" value="With client consent" />
              </Ledger>
              <p className="mt-8 text-[12px] leading-relaxed text-mist/50">
                SG Heirloom is not authorised to give financial advice and does not do so. Nothing
                provided to you or your client constitutes a recommendation or a forecast.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '@/components/site/SiteShell';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Ledger, LedgerRow } from '@/components/ui/Ledger';

export const metadata: Metadata = {
  title: 'Singapore & Asia',
  description:
    'Singapore is the family office capital of Asia and one of two Heirloom launch markets alongside London.',
};

export default function SingaporePage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Launch market"
        title="Singapore, alongside London."
        lede="Heirloom launches in two markets. London because it is where Stanley Gibbons has stood since 1856. Singapore because it is now where the wealth that collects this material is being managed."
        meta={[
          { label: 'Single family offices, 2019', value: '~200' },
          { label: 'Single family offices, 2024', value: '2,000+' },
          { label: 'Asia family office assets', value: '$3.6tn+' },
        ]}
      />

      <section className="band bg-ink">
        <div className="shell grid items-start gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">Why Singapore</p>
            <h2 className="display-lg mt-6 text-ivory">
              The family office capital of Asia, and the gateway to the region
            </h2>
            <p className="lede mt-8 text-mist">
              Single family offices in Singapore grew from roughly 200 in 2019 to more than 2,000
              by the end of 2024, managing an estimated $66.8 billion and around 59% of the
              region&rsquo;s family office assets. Across Asia, family offices control over $3.6
              trillion and are growing at 12&ndash;15% a year.
            </p>
            <p className="lede mt-5 text-mist/70">
              It is English-speaking, it is the gateway to the rest of Southeast Asia, and its
              advisers already place art, watches and wine for their clients. Stamps and coins
              are the obvious gap, and the one nobody has filled properly.
            </p>

            <Ledger className="mt-12">
              <LedgerRow label="Single family offices, 2019" value="~200" />
              <LedgerRow label="Single family offices, end 2024" value="2,000+" />
              <LedgerRow label="Estimated assets managed" value="$66.8bn" />
              <LedgerRow label="Share of regional FO assets" value="59%" />
              <LedgerRow label="Asia family office assets" value="$3.6tn+" />
              <LedgerRow label="Annual growth" value="12–15%" />
            </Ledger>

            <p className="mt-5 text-[11px] leading-relaxed text-mist/40">
              Figures cited from published family office market research. Sources are listed in
              full in any material we send to advisers.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ImageSlot
              label="Singapore — a restrained architectural or skyline frame, shot at dusk"
              ratio="3 / 4"
              caption="Singapore · Correspondence office, by appointment"
            />
          </Reveal>
        </div>
      </section>

      <section className="band bg-ivory">
        <div className="shell">
          <Reveal>
            <p className="eyebrow-light">How we work in the region</p>
            <h2 className="display-lg mt-6 max-w-[20ch] text-ink">
              Through advisers first, and in person
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px bg-ink/10 md:grid-cols-3">
            {[
              {
                t: 'Family office partnerships',
                d: 'Briefings for family offices and private banks on provenance, valuation and custody — framed as a data and curation service, never as a product.',
              },
              {
                t: 'Two flagship events a year',
                d: 'One in London, one in Singapore. Private previews of significant material, with the specialists who catalogued it in the room.',
              },
              {
                t: 'Cross-border custody',
                d: 'Insured storage in the UK with full documentation, or delivery to the client\'s own arrangements. Ownership sits with the client either way.',
              },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 80} className="bg-ivory p-9 md:p-10">
                <h3 className="font-display text-xl font-light text-ink">{item.t}</h3>
                <p className="mt-4 text-[14px] leading-[1.85] text-slate">{item.d}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <div className="mt-16 border-t border-ink/10 pt-10">
              <p className="max-w-prose text-[15px] leading-[1.85] text-slate">
                Our target is that 25% of Heirloom sales by value are transacted outside the UK by
                the end of 2027, rising to 40% by 2029, with Singapore and the wider Asian family
                office market the primary contributor.
              </p>
              <Link href="/enquire?enquiry_type=adviser" className="btn btn-ink mt-10">
                Speak to us in Singapore
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}

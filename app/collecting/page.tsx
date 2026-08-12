import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '@/components/site/SiteShell';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { verticals } from '@/content/heirloom';

export const metadata: Metadata = {
  title: 'Collecting',
  description:
    'Great Britain and Commonwealth stamps and numismatics anchor the launch. Trading cards follow once the operating blueprint is proven.',
};

export default function CollectingPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="What we curate"
        title="Four fields. Two that carry the launch."
        lede="Great Britain, Commonwealth and numismatics anchor Heirloom and carry the model. Trading cards follow as the fourth vertical once the operating blueprint is proven — the same expansion path platforms in this space have used to scale."
        meta={[
          { label: 'At launch', value: 'GB · Commonwealth · Coins' },
          { label: 'To follow', value: 'Trading cards' },
          { label: 'Standard', value: 'SG Catalogue bar' },
        ]}
      />

      {verticals.map((vertical, i) => {
        const light = i % 2 === 1;
        return (
          <section
            key={vertical.id}
            id={vertical.id}
            className={`band scroll-mt-24 ${light ? 'bg-ivory' : 'bg-ink'}`}
          >
            <div
              className={`shell grid items-center gap-14 lg:gap-24 ${
                light ? 'lg:grid-cols-[0.9fr_1.1fr]' : 'lg:grid-cols-[1.1fr_0.9fr]'
              }`}
            >
              <Reveal className={light ? 'lg:order-2' : ''}>
                <div className="flex items-baseline gap-5">
                  <span
                    className={`font-display text-3xl font-light ${
                      light ? 'text-bronze/80' : 'text-gold/70'
                    }`}
                  >
                    {vertical.number}
                  </span>
                  <p className={light ? 'eyebrow-light' : 'eyebrow'}>
                    {vertical.kind}
                    {vertical.forthcoming ? ' · To follow' : ' · At launch'}
                  </p>
                </div>

                <h2
                  className={`display-lg mt-6 ${light ? 'text-ink' : 'text-ivory'}`}
                >
                  {vertical.name}
                </h2>
                <p
                  className={`mt-6 font-display text-2xl font-light leading-snug ${
                    light ? 'text-slate' : 'text-champagne'
                  }`}
                >
                  {vertical.lead}
                </p>
                <p
                  className={`mt-6 max-w-prose text-[15px] leading-[1.85] ${
                    light ? 'text-slate' : 'text-mist'
                  }`}
                >
                  {vertical.body}
                </p>
                <p
                  className={`mt-10 border-t pt-5 font-ledger text-[10px] uppercase leading-relaxed tracking-[0.12em] ${
                    light ? 'border-ink/10 text-ink/70' : 'border-champagne/20 text-champagne'
                  }`}
                >
                  {vertical.marker}
                </p>
              </Reveal>

              <Reveal delay={100} className={light ? 'lg:order-1' : ''}>
                <ImageSlot
                  tone={light ? 'light' : 'dark'}
                  label={`${vertical.name} — representative material, shot square with a shallow depth of field`}
                  ratio="1 / 1"
                  caption={`${vertical.kind} · ${vertical.name}`}
                />
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="band bg-vault">
        <div className="shell text-center">
          <Reveal>
            <p className="eyebrow">Sourcing</p>
            <h2 className="display-lg mx-auto mt-6 max-w-[20ch] text-ivory">
              Bought well, or not bought at all
            </h2>
            <p className="lede mx-auto mt-8 text-mist">
              Material is sourced through the Stanley Gibbons network, the auction pipeline and,
              increasingly, from Heirloom clients trading out. Condition and evidence decide
              everything. Where a piece cannot be properly documented, we say so and pass.
            </p>
            <Link href="/the-record" className="btn btn-ghost mt-12">
              How we evidence a piece
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}

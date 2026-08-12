import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '@/components/site/SiteShell';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { ImageSlot } from '@/components/ui/ImageSlot';

export const metadata: Metadata = {
  title: 'Heritage',
  description:
    '170 years of Stanley Gibbons. The catalogue the market runs on, the records behind it, and why Heirloom could only come from here.',
};

const timeline = [
  {
    year: '1856',
    title: 'A counter in Plymouth',
    body: 'Edward Stanley Gibbons begins dealing stamps from a corner of his father\'s pharmacy. The record-keeping starts almost immediately, and has never stopped.',
  },
  {
    year: '1865',
    title: 'The first catalogue',
    body: 'The Stanley Gibbons catalogue is published for the first time. Within a generation it becomes the reference the market itself runs on — and it still is.',
  },
  {
    year: '1872',
    title: 'Baldwin\'s established',
    body: 'The numismatic house whose records and standards now sit behind every coin we place in an Heirloom portfolio.',
  },
  {
    year: '1914',
    title: 'By appointment',
    body: 'Royal warrants and the great collections of the era pass across the counter, leaving their traces in the ledgers we still consult.',
  },
  {
    year: '2026',
    title: 'A new mark',
    body: 'A modern identity for Stanley Gibbons, and the return to a quality, luxury brand carrying the hallmarks that made us the leader in this field.',
  },
  {
    year: '2027',
    title: 'SG Collect and SG Heirloom',
    body: 'The data platform and the private curation service that sits above it. Discover and value; then decide, curate and hold.',
  },
];

export default function HeritagePage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Stanley Gibbons · Established 1856"
        title="Nobody else can show you a hundred and seventy years of receipts."
        lede="Heirloom rests on something that cannot be bought or built quickly: an unbroken record of what this material is, what it has been worth, and whose hands it has passed through. That record is the moat, and it is the product."
      />

      <section className="band bg-ink">
        <div className="shell grid items-start gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <Reveal>
            <ImageSlot
              label="Archive material — bound catalogues and ledgers on a dark shelf"
              ratio="3 / 4"
              caption="The Stanley Gibbons archive"
            />
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow">Why it matters now</p>
            <h2 className="display-lg mt-6 text-ivory">The catalogue is the benchmark</h2>
            <p className="lede mt-8 text-mist">
              Rarity in this field is not a matter of opinion. It is measured against the SG
              Catalogue, and the SG Catalogue is ours. When we tell a client a piece is scarce, we
              are quoting the standard the rest of the market quotes back at us.
            </p>
            <p className="lede mt-5 text-mist/70">
              Behind the catalogue sit the ledgers: sales, consignments, valuations and
              correspondence going back generations. That is what allows Heirloom to say
              &ldquo;proven&rdquo; and mean it, rather than reaching for the word
              &ldquo;promised&rdquo;.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="band bg-ivory">
        <div className="shell">
          <Reveal>
            <p className="eyebrow-light">The line</p>
            <h2 className="display-lg mt-6 max-w-[16ch] text-ink">
              A sequence, because the order is the point
            </h2>
          </Reveal>

          <ol className="mt-16 border-t border-ink/15">
            {timeline.map((item, i) => (
              <Reveal as="li" key={item.year} delay={i * 60}>
                <div className="grid gap-4 border-b border-ink/15 py-9 md:grid-cols-[7rem_1fr_1.4fr] md:gap-10">
                  <span className="font-ledger text-[12px] tracking-[0.14em] text-bronze">
                    {item.year}
                  </span>
                  <h3 className="font-display text-2xl font-light leading-snug text-ink">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-[1.85] text-slate">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="band bg-vault">
        <div className="shell max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow">The name</p>
            <h2 className="display-lg mx-auto mt-8 text-ivory">
              An heirloom is defined by what it has already done
            </h2>
            <p className="lede mx-auto mt-8 text-mist">
              Survived. Been kept. Been handed down. That is backward-looking evidence, not a
              number in a projection. It is why the name and the discipline fit each other: the
              client buys the record, not the forecast.
            </p>
            <Link href="/enquire" className="btn btn-gold mt-12">
              Begin a collection
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}

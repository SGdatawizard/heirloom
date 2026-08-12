import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '@/components/site/SiteShell';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { journal } from '@/content/journal';
import { longDate } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Notes on the record, provenance and the market from the Stanley Gibbons specialists behind SG Heirloom.',
};

export default function JournalPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Journal"
        title="Notes from the people who keep the record."
        lede="Short pieces on provenance, the price record and how this market actually behaves. No forecasts, no house view on where prices go next."
      />

      <section className="band bg-ink">
        <div className="shell">
          <ul className="border-t border-champagne/15">
            {journal.map((entry, i) => (
              <Reveal as="li" key={entry.slug} delay={i * 70}>
                <Link
                  href={`/journal/${entry.slug}`}
                  className="group grid gap-5 border-b border-champagne/15 py-10 transition-colors duration-500 hover:bg-champagne/[0.03] md:grid-cols-[10rem_1fr] md:gap-12"
                >
                  <div>
                    <p className="font-ledger text-[10px] uppercase tracking-eyebrow text-gold">
                      {entry.category}
                    </p>
                    <p className="mt-2 font-ledger text-[10px] uppercase tracking-[0.12em] text-mist/45">
                      {longDate(entry.date)}
                    </p>
                  </div>
                  <div>
                    <h2 className="max-w-[24ch] font-display text-3xl font-light leading-snug text-ivory transition-colors group-hover:text-champagne">
                      {entry.title}
                    </h2>
                    <p className="mt-4 max-w-prose text-[15px] leading-[1.8] text-mist">
                      {entry.standfirst}
                    </p>
                    <p className="mt-6 font-ledger text-[10px] uppercase tracking-[0.12em] text-mist/45">
                      {entry.readingTime} · Read
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}

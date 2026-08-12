import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/site/SiteShell';
import { Reveal } from '@/components/ui/Reveal';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { getEntry, journal } from '@/content/journal';
import { longDate } from '@/lib/format';

export function generateStaticParams() {
  return journal.map((entry) => ({ slug: entry.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = getEntry(params.slug);
  if (!entry) return { title: 'Journal' };
  return { title: entry.title, description: entry.standfirst };
}

export default function JournalEntryPage({ params }: { params: { slug: string } }) {
  const entry = getEntry(params.slug);
  if (!entry) notFound();

  const others = journal.filter((item) => item.slug !== entry.slug).slice(0, 2);

  return (
    <SiteShell>
      <article>
        <header className="bg-ivory pb-16 pt-40 md:pb-20 md:pt-52">
          <div className="shell max-w-3xl">
            <Reveal>
              <p className="eyebrow-light">{entry.category}</p>
              <h1 className="display-lg mt-6 text-ink">{entry.title}</h1>
              <p className="lede mt-8 text-slate">{entry.standfirst}</p>
              <p className="mt-10 border-t border-ink/15 pt-5 font-ledger text-[10px] uppercase tracking-[0.12em] text-slate/80">
                {entry.author} · {longDate(entry.date)} · {entry.readingTime}
              </p>
            </Reveal>
          </div>
        </header>

        <div className="bg-ink py-16 md:py-24">
          <div className="shell max-w-3xl">
            <Reveal>
              <ImageSlot
                label="Article image — the piece or archive material under discussion"
                ratio="16 / 9"
              />
            </Reveal>

            <div className="mt-14 space-y-7">
              {entry.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 40}>
                  <p className="text-[17px] leading-[1.9] text-mist">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            {entry.pullQuote ? (
              <Reveal>
                <blockquote className="my-16 border-l border-gold pl-8">
                  <p className="font-display text-[1.75rem] font-light leading-snug text-champagne">
                    {entry.pullQuote}
                  </p>
                </blockquote>
              </Reveal>
            ) : null}

            <Reveal>
              <div className="mt-16 border-t border-champagne/15 pt-10">
                <p className="text-[13px] leading-relaxed text-mist/50">
                  Nothing in the SG Heirloom journal is financial advice, a recommendation or a
                  forecast. Collectable values can fall as well as rise.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      <section className="band bg-vault">
        <div className="shell">
          <p className="eyebrow">Also in the journal</p>
          <div className="mt-10 grid gap-px bg-champagne/15 md:grid-cols-2">
            {others.map((item) => (
              <Link key={item.slug} href={`/journal/${item.slug}`} className="group bg-vault p-9">
                <p className="font-ledger text-[10px] uppercase tracking-eyebrow text-gold">
                  {item.category}
                </p>
                <h2 className="mt-5 font-display text-2xl font-light text-ivory transition-colors group-hover:text-champagne">
                  {item.title}
                </h2>
                <p className="mt-4 text-[14px] leading-relaxed text-mist">{item.standfirst}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

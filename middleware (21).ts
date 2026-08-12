import Link from 'next/link';
import { SiteShell } from '@/components/site/SiteShell';
import { Reveal } from '@/components/ui/Reveal';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Ledger, LedgerRow } from '@/components/ui/Ledger';
import { pillars, sampleRecord, tiers, verticals } from '@/content/heirloom';
import { journal } from '@/content/journal';

export default function HomePage() {
  return (
    <SiteShell>
      {/* ── Hero: the thesis is a catalogue entry, not a claim ─────────── */}
      <section className="relative overflow-hidden bg-vault pb-24 pt-36 md:pb-32 md:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-gold/[0.06] blur-3xl"
        />
        <div className="shell relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Stanley Gibbons · Private curation</p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display-xl mt-8 text-ivory">
                Proven,
                <br />
                not promised.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-10 h-px w-full max-w-md origin-left bg-gradient-to-r from-gold via-gold/30 to-transparent" />
            </Reveal>

            <Reveal delay={200}>
              <p className="lede mt-10 text-mist">
                A private curation service for the finest stamps, coins and cards. Your pieces
                are held in your name, chosen with a specialist alongside you, and evidenced by
                records Stanley Gibbons has been keeping since 1856.
              </p>
              <p className="lede mt-5 text-mist/70">
                Provenance proven by the record. Rarity measured against the catalogue the market
                runs on. Value shown in realisations you can check yourself.
              </p>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-12 flex flex-wrap gap-4">
                <Link href="/enquire" className="btn btn-gold">
                  Request an introduction
                </Link>
                <Link href="/the-record" className="btn btn-ghost">
                  See the record
                </Link>
              </div>
            </Reveal>
          </div>

          {/* The signature: one piece, mounted and evidenced. */}
          <Reveal delay={240}>
            <div className="border border-champagne/20 bg-midnight/30 p-6 md:p-8">
              <ImageSlot
                label="Hero piece — a single significant stamp, shot square on black, tight crop"
                ratio="4 / 3"
                priority
              />

              <div className="mt-7">
                <p className="font-ledger text-[10px] uppercase tracking-eyebrow text-gold">
                  {sampleRecord.reference}
                </p>
                <h2 className="mt-2 font-display text-2xl font-light leading-snug text-ivory">
                  {sampleRecord.title}
                </h2>
                <p className="mt-1 font-ledger text-[11px] uppercase tracking-[0.1em] text-mist/60">
                  {sampleRecord.detail}
                </p>
              </div>

              <Ledger className="mt-6">
                {sampleRecord.rows.map((row) => (
                  <LedgerRow key={row.label} label={row.label} value={row.value} />
                ))}
              </Ledger>

              <p className="mt-5 text-[11px] leading-relaxed text-mist/45">
                {sampleRecord.footnote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Two directions of evidence ─────────────────────────────────── */}
      <section className="band border-t border-champagne/10 bg-ink">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">The evidence runs two ways</p>
          </Reveal>

          <div className="mt-12 grid gap-x-16 gap-y-12 md:grid-cols-2">
            <Reveal>
              <h2 className="display-md text-ivory">Historical value</h2>
              <p className="mt-5 text-[15px] leading-[1.8] text-mist">
                The price record. What comparable and identical pieces have realised at auction
                and at retail, and how catalogue values have moved across decades. It is the
                discipline that keeps the conversation honest, and it is the part most of this
                market would rather not show you.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="display-md text-ivory">Historical importance</h2>
              <p className="mt-5 text-[15px] leading-[1.8] text-mist">
                The story. The issue, the monarch, the empire, the event, the engraver — and the
                collections a piece has passed through on its way to you. For many owners this is
                the reason to hold it at all. Set the two side by side and the case becomes far
                stronger than either alone.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Three pillars, on paper ────────────────────────────────────── */}
      <section className="band bg-ivory">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">What we stand behind</p>
            <h2 className="display-lg mt-6 max-w-[16ch] text-ink">
              Three claims. Each one you can hold in your hand.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px bg-ink/10 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.id} delay={i * 90} className="bg-ivory p-8 md:p-10">
                <p className="font-ledger text-[10px] uppercase tracking-eyebrow text-gold">
                  {pillar.title}
                </p>
                <p className="mt-6 text-[15px] leading-[1.8] text-slate">{pillar.body}</p>
                <p className="mt-8 border-t border-ink/10 pt-5 font-ledger text-[10px] uppercase leading-relaxed tracking-[0.1em] text-ink/70">
                  {pillar.receipt}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What the client gets ───────────────────────────────────────── */}
      <section className="band bg-ink">
        <div className="shell grid items-start gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <ImageSlot
              label="A client's presentation pack — folio, certificate and provenance sheet on a dark surface"
              ratio="4 / 5"
              caption="The heirloom presentation, included at every tier"
            />
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow">The service</p>
            <h2 className="display-lg mt-6 text-ivory">Owned outright. Never a share of a fund.</h2>
            <p className="lede mt-8 text-mist">
              Everything you buy through Heirloom is a real, tangible object held in your name.
              You can take it home or leave it in insured storage with us at no charge. You can
              hold it for thirty years or trade out next season, with a specialist timing the
              entry and the exit.
            </p>

            <Ledger className="mt-12">
              <LedgerRow label="Ownership" value="Outright, in your name" />
              <LedgerRow label="Standard of material" value="The finest, to catalogue bar" />
              <LedgerRow label="Commission on trade-out through SG" value="0%" />
              <LedgerRow label="Insured storage" value="Included" />
              <LedgerRow label="Written valuation" value="Annual" />
              <LedgerRow label="Your team" value="Named manager + specialist" />
            </Ledger>

            <Link href="/offering" className="btn btn-ghost mt-12">
              The full offering
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Verticals — the order is real, so the numbering is too ─────── */}
      <section className="band border-t border-champagne/10 bg-vault">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">What we curate</p>
            <h2 className="display-lg mt-6 max-w-[20ch] text-ivory">
              Three verticals at launch. A fourth when the blueprint is proven.
            </h2>
          </Reveal>

          <ul className="mt-16 border-t border-champagne/15">
            {verticals.map((vertical, i) => (
              <Reveal as="li" key={vertical.id} delay={i * 70}>
                <Link
                  href={`/collecting#${vertical.id}`}
                  className="group grid gap-4 border-b border-champagne/15 py-8 transition-colors duration-500 hover:bg-champagne/[0.03] md:grid-cols-[4rem_1fr_1.2fr] md:items-baseline md:gap-8"
                >
                  <span className="font-display text-2xl font-light text-gold/70">
                    {vertical.number}
                  </span>
                  <span>
                    <span className="block font-display text-3xl font-light text-ivory transition-colors group-hover:text-champagne">
                      {vertical.name}
                    </span>
                    <span className="mt-1 block font-ledger text-[10px] uppercase tracking-eyebrow text-mist/50">
                      {vertical.kind}
                      {vertical.forthcoming ? ' · To follow' : ''}
                    </span>
                  </span>
                  <span className="text-[15px] leading-[1.75] text-mist">{vertical.lead}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Tiers ──────────────────────────────────────────────────────── */}
      <section className="band bg-ivory">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Three ways in</p>
            <h2 className="display-lg mt-6 max-w-[20ch] text-ink">
              Begin with one piece, or with a portfolio.
            </h2>
            <p className="lede mt-8 text-slate">
              Heirloom is a ladder rather than a set of boxes. Clients start where it suits them
              and move up as the collection grows.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {tiers.map((tier, i) => (
              <Reveal
                key={tier.id}
                delay={i * 90}
                className={`flex flex-col border p-8 md:p-9 ${
                  tier.featured ? 'border-gold bg-ink text-mist' : 'border-ink/15 bg-paper'
                }`}
              >
                <p
                  className={`font-ledger text-[10px] uppercase tracking-eyebrow ${
                    tier.featured ? 'text-champagne' : 'text-gold'
                  }`}
                >
                  {tier.entry}
                </p>
                <h3
                  className={`mt-5 font-display text-[1.7rem] font-light leading-tight ${
                    tier.featured ? 'text-ivory' : 'text-ink'
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`mt-5 flex-1 text-[14px] leading-[1.8] ${
                    tier.featured ? 'text-mist' : 'text-slate'
                  }`}
                >
                  {tier.summary}
                </p>
                <p
                  className={`mt-8 border-t pt-5 font-ledger text-[10px] uppercase tracking-[0.12em] ${
                    tier.featured ? 'border-champagne/25 text-champagne' : 'border-ink/10 text-slate'
                  }`}
                >
                  {tier.term}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <Link href="/offering#tiers" className="btn btn-ink mt-12">
              Compare the tiers
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Advisers + Singapore ───────────────────────────────────────── */}
      <section className="band bg-ink">
        <div className="shell grid gap-px bg-champagne/15 md:grid-cols-2">
          <Reveal className="bg-ink p-9 md:p-12">
            <p className="eyebrow">For advisers</p>
            <h2 className="display-md mt-6 text-ivory">
              The passion-asset partner your clients cannot source elsewhere
            </h2>
            <p className="mt-6 text-[15px] leading-[1.8] text-mist">
              Independent valuation, market data and access to trophy material — framed as a
              curation and data service, not an investment product. It puts stamps and coins
              squarely beside art, watches and wine.
            </p>
            <Link href="/advisers" className="btn btn-ghost mt-10">
              Partner with us
            </Link>
          </Reveal>

          <Reveal delay={100} className="bg-ink p-9 md:p-12">
            <p className="eyebrow">Singapore & Asia</p>
            <h2 className="display-md mt-6 text-ivory">
              Where the family offices are
            </h2>
            <p className="mt-6 text-[15px] leading-[1.8] text-mist">
              Singapore is now the family office capital of Asia — from roughly 200 single family
              offices in 2019 to more than 2,000 by the end of 2024. It is our second launch
              market alongside London.
            </p>
            <Link href="/singapore" className="btn btn-ghost mt-10">
              Our Asia focus
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Journal ────────────────────────────────────────────────────── */}
      <section className="band border-t border-champagne/10 bg-vault">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Journal</p>
                <h2 className="display-lg mt-6 max-w-[18ch] text-ivory">
                  Writing that shows its working
                </h2>
              </div>
              <Link href="/journal" className="btn btn-ghost">
                All entries
              </Link>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px bg-champagne/15 md:grid-cols-3">
            {journal.map((entry, i) => (
              <Reveal key={entry.slug} delay={i * 80} className="bg-vault">
                <Link href={`/journal/${entry.slug}`} className="group block h-full p-8">
                  <p className="font-ledger text-[10px] uppercase tracking-eyebrow text-gold">
                    {entry.category}
                  </p>
                  <h3 className="mt-6 font-display text-2xl font-light leading-snug text-ivory transition-colors group-hover:text-champagne">
                    {entry.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.8] text-mist">{entry.standfirst}</p>
                  <p className="mt-8 font-ledger text-[10px] uppercase tracking-[0.12em] text-mist/45">
                    {entry.readingTime}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Close ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink py-28 md:py-36">
        <div className="shell text-center">
          <Reveal>
            <p className="eyebrow">Enquire</p>
            <h2 className="display-lg mx-auto mt-8 max-w-[16ch] text-ivory">
              History you can hold. Bought to be handed on.
            </h2>
            <p className="lede mx-auto mt-8 text-mist">
              Heirloom is taken on by introduction and by enquiry. Tell us what you collect, or
              what you would like to, and we will arrange a conversation with a specialist.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link href="/enquire" className="btn btn-gold">
                Make an enquiry
              </Link>
              <Link href="/heritage" className="btn btn-ghost">
                Why Stanley Gibbons
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}

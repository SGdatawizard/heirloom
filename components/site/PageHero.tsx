import { Reveal } from '@/components/ui/Reveal';

/**
 * Every interior page opens on the same cream surface as the masthead, so the
 * header never sits on a hard colour join. Navy arrives in the band below.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  meta,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-ivory pb-16 pt-40 md:pb-24 md:pt-52">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-gold/[0.07] blur-3xl"
      />
      <div className="shell relative">
        <Reveal>
          <p className="eyebrow-light">{eyebrow}</p>
          <h1 className="display-lg mt-6 max-w-[18ch] text-ink">{title}</h1>
          {lede ? <p className="lede mt-8 text-slate">{lede}</p> : null}
        </Reveal>

        {meta?.length ? (
          <Reveal delay={120}>
            <dl className="ledger mt-14 grid gap-x-12 border-t border-ink/15 pt-6 sm:grid-cols-2 lg:grid-cols-3">
              {meta.map((item) => (
                <div key={item.label} className="ledger-row ledger-row-light">
                  <dt className="text-slate">{item.label}</dt>
                  <dd className="text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

import { Reveal } from '@/components/ui/Reveal';

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
    <section className="relative overflow-hidden bg-vault pb-16 pt-40 md:pb-24 md:pt-52">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <div className="shell">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-lg mt-6 max-w-[18ch] text-ivory">{title}</h1>
          {lede ? <p className="lede mt-8 text-mist">{lede}</p> : null}
        </Reveal>

        {meta?.length ? (
          <Reveal delay={120}>
            <dl className="ledger mt-14 grid gap-x-12 border-t border-champagne/15 pt-6 sm:grid-cols-2 lg:grid-cols-3">
              {meta.map((item) => (
                <div key={item.label} className="ledger-row">
                  <dt className="text-mist/70">{item.label}</dt>
                  <dd className="text-champagne">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

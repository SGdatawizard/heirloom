import { createClient } from '@/lib/supabase/server';
import { EmptyState } from '@/components/portal/EmptyState';
import { Ledger, LedgerRow } from '@/components/ui/Ledger';
import { gbp, longDate } from '@/lib/format';
import type { Valuation } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function ValuationsPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from('valuations')
    .select('*, holdings(title, reference)')
    .order('valued_on', { ascending: false });

  const valuations = (data ?? []) as Valuation[];

  // Group by the year they were issued — the annual valuation is the rhythm of the service.
  const byYear = valuations.reduce<Record<string, Valuation[]>>((acc, valuation) => {
    const year = new Date(valuation.valued_on).getFullYear().toString();
    acc[year] = acc[year] ? [...acc[year], valuation] : [valuation];
    return acc;
  }, {});

  const years = Object.keys(byYear).sort().reverse();

  return (
    <>
      <header>
        <p className="eyebrow">Valuations</p>
        <h1 className="display-lg mt-5 text-ivory">Written every year, within 30 days</h1>
        <p className="lede mt-6 text-mist">
          Every piece you hold is valued annually in writing, against catalogue values and
          verified realisations, and issued within 30 days of your contract anniversary.
        </p>
      </header>

      {valuations.length === 0 ? (
        <div className="mt-14">
          <EmptyState
            title="No valuations issued yet"
            body="Your first written valuation is prepared within 30 days of your first contract anniversary, and every year after that."
          />
        </div>
      ) : (
        <div className="mt-16 space-y-16">
          {years.map((year) => {
            const rows = byYear[year];
            const total = rows.reduce((sum, row) => sum + row.value, 0);
            return (
              <section key={year}>
                <div className="flex items-baseline justify-between border-b border-champagne/25 pb-4">
                  <h2 className="font-display text-3xl font-light text-ivory">{year}</h2>
                  <p className="font-ledger text-[12px] tabular-nums text-champagne">
                    {gbp(total)}
                  </p>
                </div>
                <Ledger className="mt-6">
                  {rows.map((valuation) => (
                    <LedgerRow
                      key={valuation.id}
                      label={valuation.holdings?.title ?? 'Portfolio valuation'}
                      note={longDate(valuation.valued_on)}
                      value={gbp(valuation.value)}
                    />
                  ))}
                </Ledger>
              </section>
            );
          })}
        </div>
      )}

      <p className="mt-14 max-w-prose text-[12px] leading-relaxed text-mist/45">
        A valuation is our written opinion as at the date shown. It is not an offer to buy, not a
        forecast, and not a guarantee of what a piece will realise. Collectable values can fall as
        well as rise.
      </p>
    </>
  );
}

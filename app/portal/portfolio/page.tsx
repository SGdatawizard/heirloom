import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { EmptyState } from '@/components/portal/EmptyState';
import { gbp, movement, shortDate } from '@/lib/format';
import type { Holding } from '@/lib/types';

export const dynamic = 'force-dynamic';

const verticalLabels: Record<string, string> = {
  'great-britain': 'Great Britain',
  commonwealth: 'Commonwealth',
  numismatics: 'Numismatics',
  'trading-cards': 'Trading cards',
};

export default async function PortfolioPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from('holdings')
    .select('*')
    .order('acquired_on', { ascending: false });

  const holdings = (data ?? []) as Holding[];

  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Holdings</p>
          <h1 className="display-lg mt-5 text-ivory">Every piece, in your name</h1>
        </div>
        <p className="font-ledger text-[10px] uppercase tracking-[0.12em] text-mist/50">
          {holdings.length} {holdings.length === 1 ? 'piece' : 'pieces'}
        </p>
      </header>

      {holdings.length === 0 ? (
        <div className="mt-14">
          <EmptyState
            title="Nothing recorded yet"
            body="Pieces appear here once an acquisition is confirmed and registered against your agreement."
            action={{ href: '/collecting', label: 'See what we curate' }}
          />
        </div>
      ) : (
        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[52rem] border-collapse">
            <thead>
              <tr className="border-b border-champagne/25">
                {['Reference', 'Piece', 'Field', 'Acquired', 'Acquisition', 'Valuation', 'Movement'].map(
                  (heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="py-4 text-left font-ledger text-[10px] uppercase tracking-eyebrow text-gold"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => {
                const change = movement(holding.acquisition_price, holding.current_valuation);
                return (
                  <tr
                    key={holding.id}
                    className="border-b border-champagne/15 transition-colors hover:bg-champagne/[0.03]"
                  >
                    <td className="py-5 pr-6 font-ledger text-[11px] text-mist/60">
                      {holding.reference ?? '—'}
                    </td>
                    <td className="py-5 pr-6">
                      <Link
                        href={`/portal/portfolio/${holding.id}`}
                        className="font-display text-lg font-light text-ivory hover:text-champagne"
                      >
                        {holding.title}
                      </Link>
                      {holding.detail ? (
                        <span className="mt-1 block text-[12px] text-mist/50">{holding.detail}</span>
                      ) : null}
                    </td>
                    <td className="py-5 pr-6 font-ledger text-[11px] uppercase tracking-[0.08em] text-mist/70">
                      {verticalLabels[holding.vertical] ?? holding.vertical}
                    </td>
                    <td className="py-5 pr-6 font-ledger text-[11px] text-mist/70">
                      {shortDate(holding.acquired_on)}
                    </td>
                    <td className="py-5 pr-6 font-ledger text-[12px] tabular-nums text-mist/70">
                      {gbp(holding.acquisition_price)}
                    </td>
                    <td className="py-5 pr-6 font-ledger text-[12px] tabular-nums text-champagne">
                      {gbp(holding.current_valuation)}
                    </td>
                    <td
                      className={`py-5 font-ledger text-[12px] tabular-nums ${
                        change.direction === 'down' ? 'text-mist/60' : 'text-gold'
                      }`}
                    >
                      {change.label}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-8 max-w-prose text-[12px] leading-relaxed text-mist/45">
        Movement compares our latest written valuation with what you paid. It is a record of two
        dated figures, not a projection, and it is not an offer to buy.
      </p>
    </>
  );
}

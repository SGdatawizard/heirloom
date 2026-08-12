import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { StatBlock } from '@/components/portal/StatBlock';
import { EmptyState } from '@/components/portal/EmptyState';
import { Ledger, LedgerRow } from '@/components/ui/Ledger';
import { gbp, longDate, movement, shortDate } from '@/lib/format';
import type { Holding, Profile, Valuation } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function PortalOverview() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: profileData }, { data: holdingsData }, { data: valuationsData }] =
    await Promise.all([
      supabase.from('profiles').select('*').eq('id', user!.id).maybeSingle(),
      supabase.from('holdings').select('*').order('acquired_on', { ascending: false }),
      supabase
        .from('valuations')
        .select('*, holdings(title, reference)')
        .order('valued_on', { ascending: false })
        .limit(5),
    ]);

  const profile = (profileData ?? null) as Profile | null;
  const holdings = (holdingsData ?? []) as Holding[];
  const valuations = (valuationsData ?? []) as Valuation[];

  const held = holdings.filter((h) => h.status !== 'sold');
  const acquisitionTotal = held.reduce((sum, h) => sum + (h.acquisition_price ?? 0), 0);
  const valuationTotal = held.reduce(
    (sum, h) => sum + (h.current_valuation ?? h.acquisition_price ?? 0),
    0,
  );
  const change = movement(acquisitionTotal, valuationTotal);
  const lastValued = held
    .map((h) => h.valued_on)
    .filter(Boolean)
    .sort()
    .reverse()[0];

  const firstName = (profile?.full_name ?? '').split(' ')[0] || 'there';

  return (
    <>
      <header>
        <p className="eyebrow">Overview</p>
        <h1 className="display-lg mt-5 text-ivory">Good to see you, {firstName}.</h1>
        {profile?.relationship_manager ? (
          <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-mist">
            Your relationship manager is {profile.relationship_manager}
            {profile.specialist ? `, working with ${profile.specialist} on the material.` : '.'}
          </p>
        ) : null}
      </header>

      {held.length === 0 ? (
        <div className="mt-14">
          <EmptyState
            title="No pieces recorded yet"
            body="Your holdings appear here as soon as the first acquisition is registered. Your relationship manager will confirm each one in writing before it is added."
            action={{ href: '/enquire', label: 'Speak to your specialist' }}
          />
        </div>
      ) : (
        <>
          <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatBlock label="Pieces held" value={String(held.length)} />
            <StatBlock label="Acquisition total" value={gbp(acquisitionTotal)} />
            <StatBlock
              label="Latest valuation"
              value={gbp(valuationTotal)}
              note={lastValued ? `As at ${shortDate(lastValued)}` : undefined}
            />
            <StatBlock
              label="Movement since acquisition"
              value={change.label}
              note="Not a forecast"
            />
          </section>

          <p className="mt-6 max-w-prose text-[12px] leading-relaxed text-mist/45">
            Valuations are our written opinion as at the date shown, prepared against catalogue
            values and verified realisations. They are not offers to buy, and collectable values
            can fall as well as rise.
          </p>

          <section className="mt-16 grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <div>
              <div className="flex items-end justify-between gap-6">
                <h2 className="font-display text-2xl font-light text-ivory">Recent holdings</h2>
                <Link
                  href="/portal/portfolio"
                  className="font-ledger text-[10px] uppercase tracking-[0.14em] text-mist hover:text-champagne"
                >
                  All holdings
                </Link>
              </div>

              <ul className="mt-8 border-t border-champagne/15">
                {held.slice(0, 5).map((holding) => (
                  <li key={holding.id}>
                    <Link
                      href={`/portal/portfolio/${holding.id}`}
                      className="group grid gap-2 border-b border-champagne/15 py-5 transition-colors hover:bg-champagne/[0.03] sm:grid-cols-[1fr_auto] sm:items-baseline"
                    >
                      <span>
                        <span className="block font-display text-xl font-light text-ivory group-hover:text-champagne">
                          {holding.title}
                        </span>
                        <span className="mt-1 block font-ledger text-[10px] uppercase tracking-[0.1em] text-mist/50">
                          {holding.reference ?? '—'} · Acquired {shortDate(holding.acquired_on)}
                        </span>
                      </span>
                      <span className="font-ledger text-[12px] tabular-nums text-champagne">
                        {gbp(holding.current_valuation ?? holding.acquisition_price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <aside>
              <h2 className="font-display text-2xl font-light text-ivory">Latest valuations</h2>
              {valuations.length === 0 ? (
                <p className="mt-6 text-[14px] leading-relaxed text-mist/60">
                  Your first written valuation is issued within 30 days of your contract
                  anniversary.
                </p>
              ) : (
                <Ledger className="mt-8">
                  {valuations.map((valuation) => (
                    <LedgerRow
                      key={valuation.id}
                      label={valuation.holdings?.title ?? 'Portfolio'}
                      note={shortDate(valuation.valued_on)}
                      value={gbp(valuation.value)}
                    />
                  ))}
                </Ledger>
              )}

              <div className="mt-12 border border-champagne/20 p-7">
                <p className="eyebrow">Your agreement</p>
                <Ledger className="mt-5">
                  <LedgerRow label="Tier" value={profile?.tier ?? '—'} />
                  <LedgerRow label="Client since" value={longDate(profile?.client_since)} />
                  <LedgerRow label="Trade-out commission" value="0%" />
                  <LedgerRow label="Storage" value="Insured, included" />
                </Ledger>
              </div>
            </aside>
          </section>
        </>
      )}
    </>
  );
}

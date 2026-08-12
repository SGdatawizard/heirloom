import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Ledger, LedgerRow } from '@/components/ui/Ledger';
import { gbp, longDate, movement, shortDate } from '@/lib/format';
import type { ClientDocument, Holding, Valuation } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function HoldingPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: holdingData } = await supabase
    .from('holdings')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (!holdingData) notFound();
  const holding = holdingData as Holding;

  const [{ data: valuationData }, { data: documentData }] = await Promise.all([
    supabase
      .from('valuations')
      .select('*')
      .eq('holding_id', holding.id)
      .order('valued_on', { ascending: false }),
    supabase.from('documents').select('*').eq('holding_id', holding.id),
  ]);

  const valuations = (valuationData ?? []) as Valuation[];
  const documents = (documentData ?? []) as ClientDocument[];
  const change = movement(holding.acquisition_price, holding.current_valuation);

  return (
    <>
      <Link
        href="/portal/portfolio"
        className="font-ledger text-[10px] uppercase tracking-[0.14em] text-mist/60 hover:text-champagne"
      >
        ← All holdings
      </Link>

      <div className="mt-10 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <ImageSlot
            src={holding.image_path ?? undefined}
            label={`${holding.title} — catalogue photograph`}
            ratio="4 / 5"
            caption={holding.reference ?? undefined}
          />
        </div>

        <div>
          <p className="eyebrow">{holding.reference ?? 'Heirloom holding'}</p>
          <h1 className="display-lg mt-5 text-ivory">{holding.title}</h1>
          {holding.detail ? (
            <p className="mt-3 font-ledger text-[11px] uppercase tracking-[0.1em] text-mist/60">
              {holding.detail}
            </p>
          ) : null}

          <Ledger className="mt-12">
            <LedgerRow label="Status" value={holding.status ?? '—'} />
            <LedgerRow label="Held" value={holding.storage ?? 'Insured storage, London'} />
            <LedgerRow label="Acquired" value={longDate(holding.acquired_on)} />
            <LedgerRow label="Acquisition price" value={gbp(holding.acquisition_price)} />
            <LedgerRow
              label="Latest valuation"
              note={holding.valued_on ? shortDate(holding.valued_on) : undefined}
              value={gbp(holding.current_valuation)}
            />
            <LedgerRow label="Movement" value={change.label} />
            <LedgerRow label="Certificate" value={holding.certificate ?? 'On file'} />
          </Ledger>

          {holding.provenance?.length ? (
            <>
              <p className="mt-14 eyebrow">Chain of ownership</p>
              <ol className="mt-5">
                {holding.provenance.map((link, i) => (
                  <li
                    key={`${link.stage}-${i}`}
                    className="grid gap-2 border-b border-champagne/15 py-4 sm:grid-cols-[2rem_1fr]"
                  >
                    <span className="font-ledger text-[10px] text-gold">{`0${i + 1}`}</span>
                    <span>
                      <span className="block font-ledger text-[11px] uppercase tracking-[0.1em] text-ivory">
                        {link.stage}
                      </span>
                      <span className="mt-1 block text-[13px] leading-relaxed text-mist">
                        {link.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </>
          ) : null}

          {valuations.length > 0 ? (
            <>
              <p className="mt-14 eyebrow">Valuation history</p>
              <Ledger className="mt-5">
                {valuations.map((valuation) => (
                  <LedgerRow
                    key={valuation.id}
                    label={longDate(valuation.valued_on)}
                    note={valuation.method ?? undefined}
                    value={gbp(valuation.value)}
                  />
                ))}
              </Ledger>
            </>
          ) : null}

          {documents.length > 0 ? (
            <>
              <p className="mt-14 eyebrow">Documents</p>
              <ul className="mt-5">
                {documents.map((document) => (
                  <li
                    key={document.id}
                    className="flex items-baseline justify-between gap-6 border-b border-champagne/15 py-4"
                  >
                    <span className="text-[14px] text-mist">{document.title}</span>
                    <span className="font-ledger text-[10px] uppercase tracking-[0.1em] text-mist/50">
                      {shortDate(document.issued_on)}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <div className="mt-14 border border-champagne/20 p-7">
            <p className="font-display text-xl font-light text-ivory">
              Thinking about trading this piece out?
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-mist">
              Your specialist will advise on timing and route it through SG Auctions or a private
              sale. No commission applies on anything sold through Stanley Gibbons.
            </p>
            <a href="mailto:heirloom@stanleygibbons.com" className="btn btn-ghost mt-7">
              Contact your specialist
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

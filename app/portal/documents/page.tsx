import { createClient } from '@/lib/supabase/server';
import { EmptyState } from '@/components/portal/EmptyState';
import { shortDate } from '@/lib/format';
import type { ClientDocument } from '@/lib/types';

export const dynamic = 'force-dynamic';

const kindLabels: Record<string, string> = {
  valuation: 'Valuation',
  agreement: 'Agreement',
  certificate: 'Certificate',
  provenance: 'Provenance',
  invoice: 'Invoice',
};

export default async function DocumentsPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from('documents')
    .select('*')
    .order('issued_on', { ascending: false });

  const documents = (data ?? []) as ClientDocument[];

  // Signed URLs are minted per request so files are never publicly addressable.
  const withLinks = await Promise.all(
    documents.map(async (document) => {
      if (!document.storage_path) return { ...document, url: null as string | null };
      const { data: signed } = await supabase.storage
        .from('client-documents')
        .createSignedUrl(document.storage_path, 60 * 10);
      return { ...document, url: signed?.signedUrl ?? null };
    }),
  );

  return (
    <>
      <header>
        <p className="eyebrow">Documents</p>
        <h1 className="display-lg mt-5 text-ivory">Everything on file, in one place</h1>
        <p className="lede mt-6 text-mist">
          Your agreement, annual valuations, certificates and provenance records. Links expire
          after ten minutes, so open them when you need them.
        </p>
      </header>

      {withLinks.length === 0 ? (
        <div className="mt-14">
          <EmptyState
            title="No documents yet"
            body="Your Heirloom agreement appears here once it is countersigned, followed by certificates and valuations as they are issued."
          />
        </div>
      ) : (
        <ul className="mt-14 border-t border-champagne/25">
          {withLinks.map((document) => (
            <li
              key={document.id}
              className="grid gap-3 border-b border-champagne/15 py-6 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-8"
            >
              <span className="font-ledger text-[10px] uppercase tracking-eyebrow text-gold">
                {kindLabels[document.kind] ?? document.kind}
              </span>
              <span className="font-display text-xl font-light text-ivory">{document.title}</span>
              <span className="flex items-baseline gap-6">
                <span className="font-ledger text-[10px] uppercase tracking-[0.1em] text-mist/50">
                  {shortDate(document.issued_on)}
                </span>
                {document.url ? (
                  <a
                    href={document.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-ledger text-[10px] uppercase tracking-[0.14em] text-champagne hover:text-gold"
                  >
                    Open
                  </a>
                ) : (
                  <span className="font-ledger text-[10px] uppercase tracking-[0.14em] text-mist/35">
                    Preparing
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

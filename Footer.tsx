/**
 * The Ledger — the signature device of the Heirloom identity.
 *
 * Every claim on this site is set as a catalogue entry: a label on the left, a
 * verifiable figure on the right, a hairline between them. It is the visual
 * form of "proven, not promised", and it is reused for realisations, tier
 * terms, measures and portal holdings so the marketing site and the client
 * portal read as one document.
 */

export function Ledger({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <dl className={`ledger ${className}`}>{children}</dl>;
}

export function LedgerRow({
  label,
  value,
  note,
  tone = 'dark',
}: {
  label: string;
  value: string;
  note?: string;
  tone?: 'dark' | 'light';
}) {
  return (
    <div className={`ledger-row ${tone === 'light' ? 'ledger-row-light' : ''}`}>
      <dt className={tone === 'light' ? 'text-slate' : 'text-mist/80'}>
        {label}
        {note ? (
          <span className="ml-2 normal-case tracking-normal text-gold/70">{note}</span>
        ) : null}
      </dt>
      <dd
        className={`tabular-nums ${tone === 'light' ? 'text-ink' : 'text-champagne'}`}
      >
        {value}
      </dd>
    </div>
  );
}

export function Eyebrow({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

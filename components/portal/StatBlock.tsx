export function StatBlock({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="border border-champagne/20 p-7">
      <p className="font-ledger text-[10px] uppercase tracking-eyebrow text-gold">{label}</p>
      <p className="mt-5 font-display text-[2.25rem] font-light leading-none text-ivory tabular-nums">
        {value}
      </p>
      {note ? (
        <p className="mt-3 font-ledger text-[10px] uppercase tracking-[0.1em] text-mist/50">
          {note}
        </p>
      ) : null}
    </div>
  );
}

import Link from 'next/link';

/** An empty screen is an invitation to act, not an apology. */
export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="border border-champagne/20 px-8 py-16 text-center">
      <h2 className="font-display text-2xl font-light text-ivory">{title}</h2>
      <p className="mx-auto mt-4 max-w-[46ch] text-[14px] leading-relaxed text-mist">{body}</p>
      {action ? (
        <Link href={action.href} className="btn btn-ghost mt-8">
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}

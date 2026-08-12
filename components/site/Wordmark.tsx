import Link from 'next/link';

/**
 * The lockup. Set in the display face with wide tracking to sit against the
 * printed Stanley Gibbons mark. Swap the text block for the supplied SVG logo
 * when artwork lands — keep the "Heirloom" line and the rule beneath it.
 *
 * Drop the master logo at /public/brand/stanley-gibbons.svg and replace the
 * <span> pair with <Image src="/brand/stanley-gibbons.svg" ... />.
 */
export function Wordmark({
  tone = 'light',
  compact = false,
}: {
  tone?: 'light' | 'dark';
  compact?: boolean;
}) {
  const primary = tone === 'light' ? 'text-ivory' : 'text-ink';
  const secondary = tone === 'light' ? 'text-champagne' : 'text-gold';

  return (
    <Link href="/" className="group inline-block" aria-label="SG Heirloom — home">
      <span
        className={`block font-display ${compact ? 'text-[13px]' : 'text-[15px]'} font-normal uppercase leading-[1.35] tracking-wordmark ${primary}`}
      >
        Stanley
        <br />
        Gibbons
      </span>
      <span className="mt-2 flex items-center gap-2.5">
        <span className="h-px w-6 bg-gold transition-all duration-500 group-hover:w-10" />
        <span className={`font-ledger text-[9px] uppercase tracking-eyebrow ${secondary}`}>
          Heirloom
        </span>
      </span>
    </Link>
  );
}

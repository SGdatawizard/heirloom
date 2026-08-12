/**
 * A reserved space for photography. Renders a mounted "specimen" frame with the
 * intended crop and a note on what belongs there, so layouts hold their shape
 * before artwork arrives.
 *
 * When the image is ready:
 *   1. drop the file in /public/images/
 *   2. pass `src="/images/your-file.jpg"`
 * The placeholder disappears and next/image takes over.
 */
import Image from 'next/image';

export function ImageSlot({
  label,
  ratio = '4 / 5',
  caption,
  src,
  tone = 'dark',
  priority = false,
}: {
  label: string;
  ratio?: string;
  caption?: string;
  src?: string;
  tone?: 'dark' | 'light';
  priority?: boolean;
}) {
  const isDark = tone === 'dark';

  return (
    <figure className="w-full">
      <div className={`specimen ${isDark ? '' : 'border-ink/15'}`}>
        <div
          className={`relative w-full overflow-hidden ${isDark ? 'bg-midnight/50' : 'bg-ink/[0.04]'}`}
          style={{ aspectRatio: ratio }}
        >
          {src ? (
            <Image
              src={src}
              alt={label}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <span
                className={`font-ledger text-[9px] uppercase tracking-eyebrow ${isDark ? 'text-gold/70' : 'text-gold'}`}
              >
                Image
              </span>
              <span
                className={`max-w-[24ch] font-display text-[15px] leading-snug ${isDark ? 'text-mist/70' : 'text-slate'}`}
              >
                {label}
              </span>
              <span
                className={`font-ledger text-[9px] tracking-[0.08em] ${isDark ? 'text-mist/35' : 'text-slate/50'}`}
              >
                {ratio.replace(/\s/g, '')}
              </span>
            </div>
          )}
        </div>
      </div>
      {caption ? (
        <figcaption
          className={`mt-3 font-ledger text-[10px] uppercase tracking-[0.12em] ${isDark ? 'text-mist/50' : 'text-slate/70'}`}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

import Link from 'next/link';
import { Wordmark } from './Wordmark';
import { footerNav, site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="border-t border-champagne/15 bg-vault">
      <div className="shell py-20">
        <div className="grid gap-14 md:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <Wordmark />
            <p className="mt-6 max-w-[26ch] font-display text-xl font-light leading-snug text-ivory">
              Collections of enduring value.
            </p>
            <p className="mt-4 font-ledger text-[10px] uppercase tracking-eyebrow text-gold">
              {site.strapline}
            </p>
          </div>

          {footerNav.map((column) => (
            <div key={column.heading}>
              <h2 className="font-ledger text-[10px] uppercase tracking-eyebrow text-gold">
                {column.heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-mist transition-colors hover:text-champagne"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-champagne/15 pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-1">
              {site.offices.map((office) => (
                <p key={office.city} className="font-ledger text-[10px] uppercase tracking-[0.12em] text-mist/60">
                  <span className="text-champagne">{office.city}</span> — {office.line}
                </p>
              ))}
              <p className="pt-2 font-ledger text-[10px] uppercase tracking-[0.12em] text-mist/60">
                <a href={`mailto:${site.email}`} className="hover:text-champagne">
                  {site.email}
                </a>
              </p>
            </div>

            <p className="max-w-[46ch] text-[11px] leading-relaxed text-mist/50">
              SG Heirloom provides curation, valuation and custody services for collectable
              material. It is not a fund, a scheme or a managed investment, and nothing on this
              site is financial advice, a forecast or a guarantee of return. Collectable values
              can fall as well as rise.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="font-ledger text-[10px] uppercase tracking-[0.12em] text-mist/40">
              © {new Date().getFullYear()} Stanley Gibbons Limited · Established 1856
            </p>
            <div className="flex gap-6">
              <Link href="/legal/privacy" className="font-ledger text-[10px] uppercase tracking-[0.12em] text-mist/40 hover:text-champagne">
                Privacy
              </Link>
              <Link href="/legal/terms" className="font-ledger text-[10px] uppercase tracking-[0.12em] text-mist/40 hover:text-champagne">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

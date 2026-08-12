'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wordmark } from '@/components/site/Wordmark';

const links = [
  { href: '/portal', label: 'Overview' },
  { href: '/portal/portfolio', label: 'Holdings' },
  { href: '/portal/valuations', label: 'Valuations' },
  { href: '/portal/documents', label: 'Documents' },
];

export function PortalNav({ name, tier }: { name: string; tier: string | null }) {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-champagne/15 bg-vault/95 backdrop-blur-md">
      <div className="shell flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-10">
          <Wordmark compact />
          <nav className="hidden items-center gap-7 md:flex" aria-label="Portal">
            {links.map((link) => {
              const active =
                link.href === '/portal' ? pathname === '/portal' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`font-ledger text-[10px] uppercase tracking-[0.16em] transition-colors ${
                    active ? 'text-champagne' : 'text-mist hover:text-champagne'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="font-ledger text-[10px] uppercase tracking-[0.12em] text-champagne">
              {name}
            </p>
            {tier ? (
              <p className="font-ledger text-[9px] uppercase tracking-[0.12em] text-mist/50">
                {tier}
              </p>
            ) : null}
          </div>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="font-ledger text-[10px] uppercase tracking-[0.14em] text-mist/60 transition-colors hover:text-champagne"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      <nav className="shell flex gap-6 overflow-x-auto border-t border-champagne/10 py-3 md:hidden" aria-label="Portal, mobile">
        {links.map((link) => {
          const active =
            link.href === '/portal' ? pathname === '/portal' : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap font-ledger text-[10px] uppercase tracking-[0.14em] ${
                active ? 'text-champagne' : 'text-mist/70'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

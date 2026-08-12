'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Wordmark } from './Wordmark';
import { primaryNav } from '@/lib/site';

/**
 * The masthead sits on cream across the whole site. Every page opens on the
 * same light surface, so the header never has to change character mid-scroll —
 * navy is used lower down the page as the depth band, not as the chrome.
 */
export function Header({ signedIn = false }: { signedIn?: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-ivory transition-all duration-500 ${
        scrolled || open ? 'border-b border-ink/12 bg-ivory/95 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="shell flex items-center justify-between py-5">
        <Wordmark tone="dark" compact />

        <nav className="hidden items-center gap-8 xl:flex" aria-label="Primary">
          {primaryNav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-ledger text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                  active ? 'text-ink' : 'text-slate hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 xl:flex">
          <Link
            href={signedIn ? '/portal' : '/login'}
            className="font-ledger text-[10px] uppercase tracking-[0.16em] text-slate transition-colors hover:text-ink"
          >
            {signedIn ? 'Your portfolio' : 'Client login'}
          </Link>
          <Link href="/enquire" className="btn btn-ink !px-5 !py-2.5">
            Enquire
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex flex-col gap-[5px] p-2 xl:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${open ? 'translate-y-[6px] rotate-45' : ''}`}
          />
          <span className={`h-px w-6 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${open ? '-translate-y-[6px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="shell border-t border-ink/10 bg-ivory pb-10 pt-8 xl:hidden">
          <nav className="flex flex-col" aria-label="Primary, mobile">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-ink/10 py-4 font-display text-2xl font-light text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/enquire" className="btn btn-gold w-full">
              Enquire
            </Link>
            <Link href={signedIn ? '/portal' : '/login'} className="btn btn-ink w-full">
              {signedIn ? 'Your portfolio' : 'Client login'}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

import type { Metadata } from 'next';
import { Cormorant_Garamond, Karla, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-display',
  display: 'swap',
});

const body = Karla({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
});

const ledger = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ledger',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'SG Heirloom — Collections of enduring value | Stanley Gibbons',
    template: '%s — SG Heirloom',
  },
  description:
    'A private curation service for the finest stamps, coins and cards. Owned outright, evidenced by 170 years of records. Proven, not promised.',
  openGraph: {
    title: 'SG Heirloom — Collections of enduring value',
    description:
      'A private curation service for the finest stamps, coins and cards. Proven, not promised.',
    siteName: 'SG Heirloom',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable} ${ledger.variable}`}>
      <body className="min-h-screen bg-ink antialiased">{children}</body>
    </html>
  );
}

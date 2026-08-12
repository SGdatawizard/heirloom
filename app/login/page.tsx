import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Wordmark } from '@/components/site/Wordmark';
import { LoginForm } from '@/components/forms/LoginForm';
import { ImageSlot } from '@/components/ui/ImageSlot';

export const metadata: Metadata = {
  title: 'Client login',
  description: 'Sign in to view your Heirloom portfolio, valuations and documents.',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-between bg-ivory px-6 py-10 md:px-14 md:py-14">
        <Wordmark tone="dark" />

        <div className="mx-auto w-full max-w-sm py-16">
          <p className="eyebrow-light">Client access</p>
          <h1 className="display-md mt-5 text-ink">Your portfolio</h1>
          <p className="mt-5 text-[14px] leading-relaxed text-slate">
            Holdings, annual valuations and the documents behind every piece you own.
          </p>

          <div className="mt-12">
            <Suspense fallback={<p className="text-slate/60">Loading…</p>}>
              <LoginForm />
            </Suspense>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <Link href="/" className="font-ledger text-[10px] uppercase tracking-[0.14em] text-slate hover:text-ink">
            Back to site
          </Link>
          <Link href="/enquire" className="font-ledger text-[10px] uppercase tracking-[0.14em] text-slate hover:text-ink">
            Make an enquiry
          </Link>
        </div>
      </div>

      <div className="relative hidden bg-ink p-10 lg:block">
        <div className="flex h-full items-center">
          <ImageSlot
            label="Full-bleed portrait image — archive material or a single significant piece"
            ratio="3 / 4"
          />
        </div>
      </div>
    </main>
  );
}

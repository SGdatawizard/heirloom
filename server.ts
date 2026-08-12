import Link from 'next/link';
import { Wordmark } from '@/components/site/Wordmark';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-vault px-6 py-10 md:px-14">
      <Wordmark />
      <div className="mx-auto max-w-xl py-24 text-center">
        <p className="eyebrow">Not found</p>
        <h1 className="display-lg mt-6 text-ivory">This page is not in the catalogue.</h1>
        <p className="mt-6 text-[15px] leading-relaxed text-mist">
          The link may be old, or the page may have moved. Everything else is where you left it.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-gold">
            Back to the beginning
          </Link>
          <Link href="/enquire" className="btn btn-ghost">
            Make an enquiry
          </Link>
        </div>
      </div>
      <div />
    </main>
  );
}

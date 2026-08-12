'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Passwordless sign-in. Clients receive a one-time link — no password to lose,
 * and access can be revoked from Supabase without a support call.
 */
export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/portal';

  const [status, setStatus] = useState<Status>('idle');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError('');

    const supabase = createClient();
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;

    const { error: signInError } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
        // Only existing clients can sign in. Accounts are created by SG.
        shouldCreateUser: false,
      },
    });

    if (signInError) {
      setError(
        signInError.message.toLowerCase().includes('signups not allowed')
          ? 'That address is not on the Heirloom register. Contact your relationship manager and we will add it.'
          : 'That did not send. Check the address and try again.',
      );
      setStatus('error');
      return;
    }

    setStatus('sent');
  }

  if (status === 'sent') {
    return (
      <div className="border border-gold bg-paper p-8 md:p-10">
        <p className="eyebrow-light">Link sent</p>
        <h2 className="mt-5 font-display text-2xl font-light text-ink">
          Check {email}
        </h2>
        <p className="mt-4 text-[14px] leading-relaxed text-slate">
          The link signs you in once and expires in an hour. If it has not arrived in a few
          minutes, look in your spam folder or call your relationship manager.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="label-light" htmlFor="email">
          Email on your Heirloom account
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field field-light"
          placeholder="you@example.com"
        />
      </div>

      {status === 'error' ? (
        <p className="border border-gold px-5 py-4 text-[13px] leading-relaxed text-bronze">
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={status === 'sending'} className="btn btn-gold w-full disabled:opacity-60">
        {status === 'sending' ? 'Sending link' : 'Email me a sign-in link'}
      </button>

      <p className="text-[12px] leading-relaxed text-slate/70">
        Accounts are opened by Stanley Gibbons when an Heirloom agreement begins. If you are not
        yet a client, make an enquiry and we will arrange a conversation first.
      </p>
    </form>
  );
}

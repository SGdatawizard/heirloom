import { createClient } from '@/lib/supabase/server';
import { Header } from './Header';
import { Footer } from './Footer';

/** Wraps every public page. Reads the session so the header can offer the
 *  portfolio instead of a login when a client is already signed in. */
export async function SiteShell({ children }: { children: React.ReactNode }) {
  let signedIn = false;

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    signedIn = Boolean(user);
  } catch {
    // Supabase not configured yet — the public site still renders.
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:bg-gold focus:px-4 focus:py-2 focus:font-ledger focus:text-[11px] focus:uppercase focus:tracking-[0.18em] focus:text-vault"
      >
        Skip to content
      </a>
      <Header signedIn={signedIn} />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

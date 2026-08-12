import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { PortalNav } from '@/components/portal/PortalNav';

export const metadata = {
  title: 'Your portfolio',
  robots: { index: false, follow: false },
};

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login?next=/portal');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, tier, relationship_manager, specialist')
    .eq('id', user.id)
    .maybeSingle();

  return (
    <div className="min-h-screen bg-ink">
      <PortalNav
        name={profile?.full_name ?? user.email ?? 'Client'}
        tier={profile?.tier ?? null}
      />
      <main className="shell pb-28 pt-32 md:pt-36">{children}</main>
    </div>
  );
}

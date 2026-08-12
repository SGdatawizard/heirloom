import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Send the enquiry as JSON.' }, { status: 400 });
  }

  // Honeypot: silently accept so bots do not learn anything.
  if (typeof payload.website === 'string' && payload.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const fullName = String(payload.full_name ?? '').trim();
  const email = String(payload.email ?? '').trim().toLowerCase();

  if (fullName.length < 2) {
    return NextResponse.json({ error: 'Add your name so we know who we are replying to.' }, { status: 400 });
  }

  if (!EMAIL.test(email)) {
    return NextResponse.json({ error: 'Check the email address — we could not read that one.' }, { status: 400 });
  }

  const row = {
    enquiry_type: payload.enquiry_type === 'adviser' ? 'adviser' : 'collector',
    full_name: fullName.slice(0, 120),
    email: email.slice(0, 160),
    phone: String(payload.phone ?? '').slice(0, 40) || null,
    company: String(payload.company ?? '').slice(0, 160) || null,
    country: String(payload.country ?? '').slice(0, 80) || null,
    interests: Array.isArray(payload.interests) ? payload.interests.slice(0, 6).map(String) : [],
    budget_band: String(payload.budget_band ?? '').slice(0, 40) || null,
    message: String(payload.message ?? '').slice(0, 4000) || null,
    source_path: String(payload.source_path ?? '').slice(0, 300) || null,
    status: 'new',
  };

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from('enquiries').insert(row);

    if (error) {
      console.error('Enquiry insert failed:', error.message);
      return NextResponse.json(
        { error: 'That did not save. Email heirloom@stanleygibbons.com and we will pick it up.' },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Enquiry insert threw:', error);
    return NextResponse.json(
      { error: 'That did not save. Email heirloom@stanleygibbons.com and we will pick it up.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

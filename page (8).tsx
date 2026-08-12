-- ============================================================
-- SG HEIRLOOM — database schema
-- Run in the Supabase SQL editor. Safe to re-run.
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- PROFILES — one row per authenticated client
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  tier text check (tier in ('Heirloom Founding Pieces','The Heirloom Portfolio','Heirloom Private')),
  relationship_manager text,
  specialist text,
  client_since date,
  country text,
  role text not null default 'client' check (role in ('client','adviser','staff')),
  created_at timestamptz not null default now()
);

-- Create a profile automatically whenever a user is added in Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ------------------------------------------------------------
-- HOLDINGS — the pieces a client owns outright
-- ------------------------------------------------------------
create table if not exists public.holdings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  reference text,                       -- e.g. 'SG 1'
  title text not null,
  detail text,                          -- plate, margins, cancellation, grade
  vertical text not null default 'great-britain'
    check (vertical in ('great-britain','commonwealth','numismatics','trading-cards')),
  acquired_on date,
  acquisition_price numeric(12,2),
  current_valuation numeric(12,2),
  valued_on date,
  status text not null default 'held'
    check (status in ('held','in-storage','with-client','consigned','sold')),
  storage text,
  certificate text,
  image_path text,                      -- public path or Supabase Storage key
  provenance jsonb default '[]'::jsonb, -- [{ "stage": "...", "detail": "..." }]
  created_at timestamptz not null default now()
);

create index if not exists holdings_owner_idx on public.holdings(owner_id);

-- ------------------------------------------------------------
-- VALUATIONS — the annual written valuation, per piece
-- ------------------------------------------------------------
create table if not exists public.valuations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  holding_id uuid references public.holdings(id) on delete cascade,
  valued_on date not null,
  value numeric(12,2) not null,
  method text,                          -- 'Catalogue + realisations', 'Comparables'
  note text,
  created_at timestamptz not null default now()
);

create index if not exists valuations_owner_idx on public.valuations(owner_id);
create index if not exists valuations_holding_idx on public.valuations(holding_id);

-- ------------------------------------------------------------
-- DOCUMENTS — agreements, certificates, valuation reports
-- ------------------------------------------------------------
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  holding_id uuid references public.holdings(id) on delete set null,
  title text not null,
  kind text not null default 'valuation'
    check (kind in ('valuation','agreement','certificate','provenance','invoice')),
  storage_path text,                    -- key inside the 'client-documents' bucket
  issued_on date,
  created_at timestamptz not null default now()
);

create index if not exists documents_owner_idx on public.documents(owner_id);

-- ------------------------------------------------------------
-- ENQUIRIES — public form submissions
-- ------------------------------------------------------------
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  enquiry_type text not null default 'collector' check (enquiry_type in ('collector','adviser')),
  full_name text not null,
  email text not null,
  phone text,
  company text,
  country text,
  interests text[] default '{}',
  budget_band text,
  message text,
  source_path text,
  status text not null default 'new' check (status in ('new','contacted','qualified','client','closed')),
  created_at timestamptz not null default now()
);

create index if not exists enquiries_created_idx on public.enquiries(created_at desc);

-- ------------------------------------------------------------
-- ADVISER ↔ CLIENT — lets an introducer see consenting clients
-- ------------------------------------------------------------
create table if not exists public.adviser_clients (
  adviser_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid not null references auth.users(id) on delete cascade,
  consented boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (adviser_id, client_id)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Default posture: a client sees their own rows and nothing else.
-- ============================================================

alter table public.profiles        enable row level security;
alter table public.holdings        enable row level security;
alter table public.valuations      enable row level security;
alter table public.documents       enable row level security;
alter table public.enquiries       enable row level security;
alter table public.adviser_clients enable row level security;

-- Helper: is the current user an adviser with consent for this client?
create or replace function public.has_adviser_access(target uuid)
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.adviser_clients ac
    where ac.adviser_id = auth.uid()
      and ac.client_id = target
      and ac.consented
  );
$$;

-- PROFILES
drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles
  for select using (auth.uid() = id or public.has_adviser_access(id));

drop policy if exists "update own profile" on public.profiles;
create policy "update own profile" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- HOLDINGS
drop policy if exists "read own holdings" on public.holdings;
create policy "read own holdings" on public.holdings
  for select using (auth.uid() = owner_id or public.has_adviser_access(owner_id));

-- VALUATIONS
drop policy if exists "read own valuations" on public.valuations;
create policy "read own valuations" on public.valuations
  for select using (auth.uid() = owner_id or public.has_adviser_access(owner_id));

-- DOCUMENTS
drop policy if exists "read own documents" on public.documents;
create policy "read own documents" on public.documents
  for select using (auth.uid() = owner_id or public.has_adviser_access(owner_id));

-- ADVISER LINKS
drop policy if exists "read own adviser links" on public.adviser_clients;
create policy "read own adviser links" on public.adviser_clients
  for select using (auth.uid() = adviser_id or auth.uid() = client_id);

-- ENQUIRIES: no client-side access at all. Writes go through the API route
-- using the service role key, which bypasses RLS. Staff read them in the
-- Supabase dashboard.
drop policy if exists "no public read of enquiries" on public.enquiries;

-- Inserts, updates and deletes on holdings/valuations/documents are performed
-- by SG staff via the Supabase dashboard or the service role key. No client
-- write policies exist, which means clients cannot alter their own records.

-- ============================================================
-- STORAGE — private bucket for client documents
-- ============================================================
insert into storage.buckets (id, name, public)
values ('client-documents', 'client-documents', false)
on conflict (id) do nothing;

-- Files are stored under <owner_id>/<filename> so the folder is the owner.
drop policy if exists "read own document files" on storage.objects;
create policy "read own document files" on storage.objects
  for select using (
    bucket_id = 'client-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

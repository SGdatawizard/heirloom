-- ============================================================
-- SG HEIRLOOM — demo data for the client portal
--
-- 1. Create a user first: Supabase dashboard > Authentication > Users >
--    "Add user" (send an invite, or set a password).
-- 2. Copy their UUID and paste it below.
-- 3. Run this file in the SQL editor.
-- ============================================================

do $$
declare
  client_id uuid := '00000000-0000-0000-0000-000000000000'; -- ← replace
  h1 uuid := gen_random_uuid();
  h2 uuid := gen_random_uuid();
  h3 uuid := gen_random_uuid();
begin

update public.profiles set
  full_name = 'Eleanor Vance',
  tier = 'The Heirloom Portfolio',
  relationship_manager = 'Brett Pitcher',
  specialist = 'Head of Great Britain',
  client_since = date '2027-03-14',
  country = 'United Kingdom'
where id = client_id;

insert into public.holdings
  (id, owner_id, reference, title, detail, vertical, acquired_on, acquisition_price,
   current_valuation, valued_on, status, storage, certificate, provenance)
values
  (h1, client_id, 'SG 1', 'Great Britain, 1840 One Penny Black',
   'Plate 1b · four margins · lightly cancelled', 'great-britain',
   date '2027-04-02', 4850.00, 5600.00, date '2028-04-02', 'in-storage',
   'Insured storage, London', 'RPS certificate, 2019',
   '[{"stage":"Printed","detail":"Perkins Bacon, plate 1b, May 1840."},
     {"stage":"Bourne collection","detail":"Acquired privately, recorded 1911."},
     {"stage":"Auction, 2019","detail":"Sold as lot 214, realised £4,100."},
     {"stage":"Acquired for client","detail":"Stanley Gibbons, April 2027."}]'::jsonb),

  (h2, client_id, 'SG 45', 'Cape of Good Hope, 1861 Woodblock 4d',
   'Blued paper · fine used example', 'commonwealth',
   date '2027-09-18', 18500.00, 21200.00, date '2028-09-18', 'in-storage',
   'Insured storage, London', 'BPA certificate, 2015',
   '[{"stage":"Issued","detail":"Cape of Good Hope, provisional issue, 1861."},
     {"stage":"Ferrary collection","detail":"Recorded in the sale catalogues of the 1920s."},
     {"stage":"Acquired for client","detail":"Stanley Gibbons, September 2027."}]'::jsonb),

  (h3, client_id, 'S.3021', 'Charles II, 1663 Gold Guinea',
   'First bust · elephant below · good very fine', 'numismatics',
   date '2028-02-06', 9750.00, 10400.00, date '2029-02-06', 'with-client',
   'Held by client', 'Baldwin''s attribution, 2028',
   '[{"stage":"Struck","detail":"Royal Mint, London, 1663."},
     {"stage":"Private collection","detail":"UK cabinet, held since the 1970s."},
     {"stage":"Acquired for client","detail":"Baldwin''s for Stanley Gibbons, February 2028."}]'::jsonb);

insert into public.valuations (owner_id, holding_id, valued_on, value, method, note) values
  (client_id, h1, date '2028-04-02', 5600.00, 'Catalogue + realisations', 'Two comparable examples realised at auction in the period.'),
  (client_id, h2, date '2028-09-18', 21200.00, 'Catalogue + realisations', 'Thin market; valuation weighted to the 2026 realisation.'),
  (client_id, h3, date '2029-02-06', 10400.00, 'Comparables', 'Graded comparables from two houses.');

insert into public.documents (owner_id, holding_id, title, kind, issued_on) values
  (client_id, null, 'Heirloom agreement — countersigned', 'agreement', date '2027-03-14'),
  (client_id, h1, 'RPS certificate — 1840 One Penny Black', 'certificate', date '2019-06-11'),
  (client_id, null, 'Annual valuation report 2028', 'valuation', date '2028-04-02');

end $$;

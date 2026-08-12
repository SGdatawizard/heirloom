[README.md](https://github.com/user-attachments/files/30983907/README.md)
# SG Heirloom

The website for SG Heirloom — Stanley Gibbons' private curation service for stamps,
coins and cards. Public marketing site plus a gated client portal.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS and Supabase.
Deploys to Vercel.

---

## Getting it running

```bash
git clone <your-repo-url> sg-heirloom
cd sg-heirloom
npm install
cp .env.example .env.local     # then fill in the Supabase values
npm run dev                    # http://localhost:3000
```

The public site works without Supabase configured. The portal and the enquiry
form need it.

---

## Setting up Supabase

1. Create a project at supabase.com.
2. Open **SQL Editor** and run `supabase/schema.sql`. It creates every table,
   turns on row-level security, writes the policies and creates the private
   `client-documents` storage bucket. It is safe to run more than once.
3. Copy your keys from **Project Settings → API** into `.env.local`:

   | Variable | Where it comes from | Exposed to browser |
   |---|---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Project URL | yes |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` `public` key | yes |
   | `SUPABASE_SERVICE_ROLE_KEY` | `service_role` key | **no — server only** |
   | `NEXT_PUBLIC_SITE_URL` | your deployed URL | yes |

4. Under **Authentication → URL Configuration**, add your site URL and
   `https://your-domain.com/auth/callback` as a redirect URL. Do the same for
   `http://localhost:3000/auth/callback` while developing.
5. Optional: to see the portal with data, create a user under
   **Authentication → Users**, paste their UUID into `supabase/seed.sql`, and
   run it.

### How access works

Sign-in is passwordless. A client enters the email address on their Heirloom
account and receives a one-time link. `shouldCreateUser` is set to `false`, so
**a person can only sign in if Stanley Gibbons has already created their user**.
Nobody can self-register.

Row-level security means a signed-in client can read their own rows and nothing
else. There are no client write policies at all — holdings, valuations and
documents are created by SG staff through the Supabase dashboard or the service
role key, so a client cannot alter their own record. An adviser can be given
read access to a specific client by adding a row to `adviser_clients` with
`consented = true`.

---

## Deploying to Vercel

1. Push to GitHub.
2. Import the repo at vercel.com. It detects Next.js; no build settings needed.
3. Add the four environment variables above under **Settings → Environment
   Variables**. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
4. Deploy, then add the production `/auth/callback` URL to Supabase.

---

## Adding images

Every image position on the site is a `<ImageSlot>` — it holds its aspect ratio
and states what belongs there, so layouts keep their shape while artwork is
outstanding.

To fill one:

1. Drop the file in `public/images/`.
2. Add `src="/images/your-file.jpg"` to that `ImageSlot`.

The placeholder disappears and `next/image` takes over. Slots to fill, in
rough order of visibility:

| Page | Slot | Crop |
|---|---|---|
| Home | Hero piece | 4:3 |
| Home | Presentation pack | 4:5 |
| Collecting | One per vertical (×4) | 1:1 |
| The record | Worked example | 4:5 |
| Offering | Signed agreement | 3:4 |
| Advisers | Client meeting | 4:5 |
| Singapore | Skyline or architecture | 3:4 |
| Heritage | Archive material | 3:4 |
| Login | Full-height portrait | 3:4 |
| Journal | Per article | 16:9 |

### The logo

Drop the master artwork at `public/brand/stanley-gibbons.svg`, then swap the
text lockup in `components/site/Wordmark.tsx` for `next/image`. The comment in
that file marks the exact spot. Keep the gold rule and the "Heirloom" line
beneath it — that is the sub-brand lockup.

---

## Editing copy

Almost all body copy lives in two files so it can be changed without touching
components:

- `content/heirloom.ts` — tiers, verticals, message pillars, the sample record
- `content/journal.ts` — journal articles

Navigation, contact details and the footer columns are in `lib/site.ts`.

---

## Design system

Defined once in `tailwind.config.ts` and `app/globals.css`.

**Colour**

| Token | Hex | Use |
|---|---|---|
| `vault` | `#050E1C` | Hero and footer, deepest surface |
| `ink` | `#0A1A2F` | Primary dark surface |
| `midnight` | `#112741` | Raised cards on dark |
| `gold` | `#B08D4C` | Accent — muted, never bright |
| `champagne` | `#E3CFA4` | Hairlines, small caps, emphasis |
| `ivory` | `#F6F3EC` | Light sections |
| `mist` / `slate` | `#9FB0C4` / `#5D6E85` | Secondary text, dark / light |

**Type** — Cormorant Garamond (display), Karla (body), IBM Plex Mono (figures,
references, dates). The mono face is doing real work: every catalogue
reference, price and date on the site is set in it, which is what makes the
evidence read as evidence rather than as marketing.

**The ledger** — `components/ui/Ledger.tsx`. Label left, verifiable figure
right, hairline between. It is the visual form of "proven, not promised" and it
is reused for realisations, tier terms, regional data and portal holdings so
the marketing site and the client area read as one document. If you add a
section that states a number, state it as a ledger row.

---

## Compliance notes

The brief names regulatory perception as the single biggest risk, so the
language discipline is built into the structure rather than left to whoever
writes the next page:

- `/the-record` carries an explicit "what we say / what we never say" panel.
- Every page showing a figure carries a note that it is a record, not a
  forecast, and not an offer to buy.
- The footer disclaimer — not a fund, not a scheme, not advice, values can fall
  — appears site-wide.
- The portal repeats it wherever a valuation or a movement percentage appears.

**Before launch, two things need a decision and a legal read.** First, fees:
the brief leaves the management fee open in three places, and the site is
currently built margin-only with no fee mentioned anywhere. If the flat
£150–500 charge goes ahead it needs adding to the tier tables in
`content/heirloom.ts` and a sentence on `/offering#agreement`. Second, the
movement percentage in the portal is the closest this site comes to the line;
it is worth having compliance read `app/portal/page.tsx` and
`app/portal/portfolio/page.tsx` specifically.

All figures in `content/heirloom.ts` marked illustrative — the sample record in
particular — must be replaced with sourced, dated realisations before launch.

---

## Routes

| Route | What it is |
|---|---|
| `/` | Home |
| `/offering` | Tiers, the agreement, why £2,500 |
| `/collecting` | The four verticals |
| `/the-record` | Provenance, data, language discipline |
| `/advisers` | B2B2C — wealth managers and family offices |
| `/singapore` | Asia launch market |
| `/heritage` | 170 years of Stanley Gibbons |
| `/journal`, `/journal/[slug]` | Editorial |
| `/enquire` | Enquiry form → Supabase |
| `/login` | Passwordless client sign-in |
| `/portal` | Overview — totals, recent holdings, valuations |
| `/portal/portfolio`, `/portal/portfolio/[id]` | Holdings and piece detail |
| `/portal/valuations` | Annual valuations by year |
| `/portal/documents` | Signed, expiring document links |

---

## Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

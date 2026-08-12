/**
 * Editable content for the marketing site. Everything a non-developer is likely
 * to want to change lives here rather than inside the page components.
 */

export const tiers = [
  {
    id: 'founding-pieces',
    name: 'Heirloom Founding Pieces',
    entry: 'From £2,500 a piece',
    term: 'Minimum term 5 years',
    summary:
      'For a collection at its beginning. A small number of properly chosen pieces, bought well, with a specialist alongside as it grows.',
    includes: [
      'Annual written valuation of every piece held',
      'No commission on anything sold or traded out through Stanley Gibbons',
      'Insured storage, at no charge, for as long as you hold',
      'An annual review with your specialist',
    ],
  },
  {
    id: 'the-heirloom-portfolio',
    name: 'The Heirloom Portfolio',
    entry: 'From £50,000',
    term: 'Minimum term 10 years',
    summary:
      'The core service. A bespoke portfolio shaped to your intent and actively curated — pieces timed in and out on your behalf, or simply held.',
    includes: [
      'Everything in Founding Pieces',
      'Full written annual valuation with realisations and comparables',
      'A named relationship manager and a dedicated specialist',
      'Proactive acquisition proposals against your brief',
      'First sight of key material before it reaches auction',
    ],
    featured: true,
  },
  {
    id: 'heirloom-private',
    name: 'Heirloom Private',
    entry: 'From £250,000',
    term: 'Minimum term 10 years +',
    summary:
      'For the most significant collections. Trophy material sourced to brief, with reporting suited to insurance and estate planning.',
    includes: [
      'Everything in The Heirloom Portfolio',
      'Trophy-piece sourcing to a written brief',
      'Private previews ahead of the market',
      'Valuation reporting for insurance and estate planning',
      'Concierge access to the Stanley Gibbons network',
    ],
  },
];

export const verticals = [
  {
    id: 'great-britain',
    number: 'I',
    name: 'Great Britain',
    kind: 'Stamps',
    lead: 'The classic issues at the heart of the SG Catalogue.',
    body:
      'The Penny Black through the line-engraved and surface-printed issues of the nineteenth century — the material the catalogue was written around. We are candid about volatility here: the historical importance is unmatched, and the price record is shown in full, movement in both directions included.',
    marker: 'Historical importance, with total transparency on market movement',
  },
  {
    id: 'commonwealth',
    number: 'II',
    name: 'Commonwealth',
    kind: 'Stamps',
    lead: 'The finest Commonwealth material, where prices have moved most.',
    body:
      'Key issues and rarities across the former Empire, from the great classics to modern errors and varieties. For the finest Commonwealth material the direction of price movement has, over decades, more often been upward and consistent than in any other area we cover. We show the record and let it speak.',
    marker: 'The area with the longest run of consistent movement',
  },
  {
    id: 'numismatics',
    number: 'III',
    name: 'Numismatics',
    kind: 'Coins',
    lead: 'Historically important coins, from milled to modern rarities.',
    body:
      'Curated with Baldwin\'s standards and Baldwin\'s records behind them — hammered and milled British coinage, significant world coins and modern rarities. Graded, catalogued and evidenced to the same bar we set for stamps.',
    marker: 'Selected against the high bar set by the coin team',
  },
  {
    id: 'trading-cards',
    number: 'IV',
    name: 'Trading cards',
    kind: 'Cards',
    lead: 'Iconic Pokémon and Magic: The Gathering, when the blueprint is proven.',
    body:
      'A fast-growing global market with rapidly changing values, and a natural fit for a younger, growth-minded collector. It follows the launch verticals rather than leading them: we open it once the operating model is proven on stamps and coins.',
    marker: 'Follows launch — the fourth vertical, not the first',
    forthcoming: true,
  },
];

export const pillars = [
  {
    id: 'provenance',
    title: 'Proven provenance',
    body:
      'A documented chain of ownership, backed by more than a hundred years of Stanley Gibbons and Baldwin\'s records. Not an attribution. A record.',
    receipt: 'You receive: the chain of ownership, in writing, in your pack.',
  },
  {
    id: 'rarity',
    title: 'Proven rarity',
    body:
      'Measured against the SG Catalogue — the reference the market itself runs on, and the standard we have set since 1865.',
    receipt: 'You receive: the catalogue reference and condition, stated plainly.',
  },
  {
    id: 'value',
    title: 'Proven value',
    body:
      'Auction and retail realisations that are public and verifiable, alongside how catalogue values have moved across decades.',
    receipt: 'You receive: the realisations, dated and sourced, every year.',
  },
];

/**
 * Placeholder realisations for the hero ledger and The Record page.
 * Replace with verified figures drawn from SG Collect before launch —
 * every line on this site must be sourced.
 */
export const sampleRecord = {
  reference: 'SG 1',
  title: 'Great Britain, 1840 One Penny Black',
  detail: 'Plate 1b · four margins · lightly cancelled',
  rows: [
    { label: 'Catalogue value 1995', value: '£2,750' },
    { label: 'Catalogue value 2010', value: '£3,900' },
    { label: 'Catalogue value 2025', value: '£5,250' },
    { label: 'Auction realisation, 2019', value: '£4,100' },
    { label: 'Auction realisation, 2024', value: '£5,600' },
  ],
  footnote: 'Illustrative. Every figure shown to a client is sourced and dated.',
};

export const measures = [
  { label: 'Verticals at launch', value: 'Three' },
  { label: 'Entry point', value: 'From £2,500' },
  { label: 'Commission on trade-out through SG', value: '0%' },
  { label: 'Insured storage', value: 'Included' },
  { label: 'Written valuations', value: 'Annual' },
  { label: 'Records behind the service', value: '170 years' },
];

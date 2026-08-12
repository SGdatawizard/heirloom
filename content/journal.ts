export type JournalEntry = {
  slug: string;
  title: string;
  standfirst: string;
  category: 'The record' | 'Provenance' | 'The market' | 'Curation';
  date: string;
  readingTime: string;
  author: string;
  /** Paragraphs. Keep the register understated — short, declarative sentences. */
  body: string[];
  pullQuote?: string;
};

export const journal: JournalEntry[] = [
  {
    slug: 'what-a-price-record-actually-shows',
    title: 'What a price record actually shows',
    standfirst:
      'Thirty years of catalogue values and a run of auction realisations tell you two different things. Read together, they are the most honest document in this market.',
    category: 'The record',
    date: '2026-07-02',
    readingTime: '6 min',
    author: 'SG Heirloom',
    pullQuote:
      'A catalogue value is a considered opinion. A realisation is what somebody paid. Both matter; only one is a fact.',
    body: [
      'A catalogue value is a considered opinion, revised annually by specialists who handle the material. A realisation is what somebody actually paid on a particular day, in a particular room, with a particular under-bidder. Both matter. Only one of them is a fact.',
      'Set side by side over three decades, they describe the shape of a market rather than a moment in it. Where the two lines travel together, the catalogue is doing its job. Where they diverge, something is happening — a change in taste, a change in supply, or a single collection coming to market and briefly flooding it.',
      'This is the discipline we hold ourselves to. We put both records in front of a client, dated and sourced, and we explain what tends to drive movement in that area. We do not forecast. Individual pieces can fall as well as rise, or sit still for years, and any account of this market that omits that is selling something.',
      'What the record does give you is a basis for a decision that is yours rather than ours. That is the whole point of showing it.',
    ],
  },
  {
    slug: 'the-chain-of-ownership',
    title: 'The chain of ownership',
    standfirst:
      'Provenance is not a story attached to a piece. It is a sequence of names, dates and sale references that can be checked — and occasionally, one that cannot.',
    category: 'Provenance',
    date: '2026-06-18',
    readingTime: '5 min',
    author: 'SG Heirloom',
    body: [
      'Ask where a piece has been and you will usually be told a story. Ask for the chain of ownership and you should be handed a list: a collector, a date, a sale, a lot number, a buyer. Each link either checks out against the record or it does not.',
      'Stanley Gibbons has been writing that record down since 1856. Baldwin\'s has been doing the same for coins since 1872. Between them they cover most of the significant British and Commonwealth material to have changed hands in the last century and a half, and much of it passed across our own counter.',
      'Where a link is missing, we say so. An honest gap in a provenance is worth more than a confident guess, because the gap can be closed later and the guess cannot be unsaid.',
    ],
  },
  {
    slug: 'why-commonwealth',
    title: 'Why Commonwealth material rewards patience',
    standfirst:
      'Of the areas we cover, Commonwealth has the longest run of consistent movement behind it. The reasons are structural, and worth understanding before you buy.',
    category: 'The market',
    date: '2026-05-29',
    readingTime: '7 min',
    author: 'SG Heirloom',
    body: [
      'Supply is finite and the census is largely known. For the finest Commonwealth issues, the number of surviving examples in collectable condition was settled a century ago and has only fallen since. Demand, meanwhile, has broadened geographically — a shift that shows up clearly in the realisations of the last twenty years.',
      'That combination has produced a price record that has more often moved upward, and more consistently, than in any other area we cover. It is not a guarantee and we will never present it as one. It is a pattern with reasons behind it, and the reasons are the part worth studying.',
      'What matters most is condition. Two examples of the same issue, one sound and one repaired, can be separated by an order of magnitude. This is where a specialist earns their place in the conversation.',
    ],
  },
];

export function getEntry(slug: string) {
  return journal.find((entry) => entry.slug === slug);
}

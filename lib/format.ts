export const gbp = (value: number | null | undefined, opts?: { compact?: boolean }) => {
  if (value === null || value === undefined) return '—';
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
    notation: opts?.compact ? 'compact' : 'standard',
  }).format(value);
};

export const longDate = (value: string | null | undefined) => {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
};

export const shortDate = (value: string | null | undefined) => {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
};

/** Movement between acquisition and latest valuation, shown without commentary. */
export const movement = (from: number | null, to: number | null) => {
  if (!from || !to) return { label: '—', direction: 'flat' as const };
  const delta = ((to - from) / from) * 100;
  const direction = delta > 0.5 ? 'up' : delta < -0.5 ? 'down' : 'flat';
  const sign = delta > 0 ? '+' : '';
  return { label: `${sign}${delta.toFixed(1)}%`, direction };
};

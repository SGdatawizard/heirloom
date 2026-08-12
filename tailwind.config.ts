import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        vault: '#050E1C',   // deepest navy — hero, footer
        ink: '#0A1A2F',     // SG navy — primary dark surface
        midnight: '#112741',// raised navy — cards on dark
        slate: '#5D6E85',   // secondary text on light
        mist: '#9FB0C4',    // secondary text on dark
        gold: '#B08D4C',    // antique gold — accent, never bright
        champagne: '#E3CFA4',// pale gold — hairlines, small caps
        ivory: '#F6F3EC',   // primary light surface
        paper: '#FCFBF8',   // lightest surface
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        ledger: ['var(--font-ledger)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        wordmark: '0.34em',
        eyebrow: '0.22em',
      },
      maxWidth: {
        shell: '78rem',
        prose: '38rem',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drawRule: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        rise: 'rise 900ms cubic-bezier(0.16, 1, 0.3, 1) both',
        drawRule: 'drawRule 1200ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;

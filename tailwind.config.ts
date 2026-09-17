import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0b0c0e',
        carbon: '#121417',
        raised: '#181b20',
        gold: '#d4af37',
        amber: '#e5b842',
        ink: '#f5f5f7',
        muted: '#a1a1aa',
      },
      fontFamily: {
        cairo: ['var(--font-cairo)'],
        arabic: ['var(--font-cairo)'],
      },
    },
  },
  plugins: [],
};
export default config;

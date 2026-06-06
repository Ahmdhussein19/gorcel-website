import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0D0D0D',
        onyx: '#1E1E1E',
        volt: '#C8F000',
        paper: '#F5F5F2',
        bone: '#E8E8E4',
        'ink-60': 'rgba(13,13,13,.60)',
        'ink-40': 'rgba(13,13,13,.40)',
        'ink-30': 'rgba(13,13,13,.30)',
        'ink-12': 'rgba(13,13,13,.12)',
        'ink-08': 'rgba(13,13,13,.08)',
        'paper-70': 'rgba(245,245,242,.70)',
        'paper-55': 'rgba(245,245,242,.55)',
        'paper-45': 'rgba(245,245,242,.45)',
        'paper-30': 'rgba(245,245,242,.30)',
        'paper-20': 'rgba(245,245,242,.20)',
        'line-dark': 'rgba(245,245,242,.10)',
        'line-dark-soft': 'rgba(245,245,242,.06)',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'DM Mono', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'slot-pattern': 'repeating-linear-gradient(135deg,rgba(13,13,13,.08) 0 1px,transparent 1px 11px)',
        'slot-pattern-dark': 'repeating-linear-gradient(135deg,rgba(245,245,242,.06) 0 1px,transparent 1px 11px)',
      },
      animation: {
        marquee: 'marq var(--mq-dur, 32s) linear infinite',
      },
      keyframes: {
        marq: {
          to: { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

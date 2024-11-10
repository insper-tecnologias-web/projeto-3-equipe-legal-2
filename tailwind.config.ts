import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },

      keyframes: {
        fadeUp: {
          '0%': { transform: 'translateY(-100px)', opacity: '1' },
          '100%': { transform: 'translateY(-140px)', opacity: '0' },
        },
      },
      animation: {
        'slide-linear': 'fadeUp 1s ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;

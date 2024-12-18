import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#95C901',
        dark: '#111111',
        secondary: '#191A1F',
        lightGrayTransparent: '#D9D9D980',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        ibmMono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
} satisfies Config;

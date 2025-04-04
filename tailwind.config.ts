import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Cores principais do sistema
      colors: {
        'system': {
          'primary': '#2563eb',    // equivalente ao blue-600
          'secondary': '#1d4ed8',  // equivalente ao blue-700
          'hover': '#1e40af',      // equivalente ao blue-800
        },
        'background': {
          'light': '#f3f4f6',      // gray-100 para fundos claros
          'white': '#ffffff',      // branco para cards
        },
        'text': {
          'primary': '#111827',    // gray-900 para texto principal
          'secondary': '#4b5563',  // gray-600 para texto secundário
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}

export default config 
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['DM Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        primary: {
          50: '#faf8f5',
          100: '#f0ebe0',
          200: '#e2d5c1',
          300: '#d1bb9a',
          400: '#c0a073',
          500: '#b5915a',
          600: '#a8834f',
          700: '#8b6d42',
          800: '#71583a',
          900: '#5c4830',
          950: '#312518',
        },
        accent: {
          50: '#f7f6f4',
          100: '#ede9e3',
          200: '#ddd4c7',
          300: '#c7b8a3',
          400: '#b09882',
          500: '#9f826b',
          600: '#91715f',
          700: '#795d50',
          800: '#634c43',
          900: '#523f39',
          950: '#2b201d',
        },
        neutral: {
          25: '#fefdfb',
          50: '#faf9f7',
          100: '#f2f0ec',
          200: '#e8e4dd',
          300: '#d6d0c4',
          400: '#c0b7a7',
          500: '#ada089',
          600: '#988a71',
          700: '#7f735f',
          800: '#695f50',
          900: '#564d42',
          925: '#443c33',
          950: '#2b2419',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gentleman': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'paper-texture': 'linear-gradient(45deg, transparent 49%, rgba(0,0,0,0.02) 50%, transparent 51%)',
      },
    },
  },
  plugins: [],
};
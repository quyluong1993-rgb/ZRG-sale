/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003366',
        'primary-dark': '#002244',
        'primary-light': '#004488',
        'on-primary': '#ffffff',
        surface: '#ffffff',
        'surface-container': '#f8fafc',
        'surface-container-lowest': '#ffffff',
        'on-surface-variant': '#64748b',
        'primary-container': '#002d5d',
        'on-primary-container': '#a1bbff',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#526772',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#ffa781',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',
        'on-surface': '#1b1c1c',
        'on-surface-variant': '#434652',
        outline: '#737783',
        'outline-variant': '#c3c6d4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        headline: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-sm': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-bold': ['14px', { lineHeight: '20px', fontWeight: '700' }],
        'label-md': ['14px', { lineHeight: '20px', fontWeight: '500' }],
      },
      spacing: {
        'margin-edge': '20px',
        'touch-target-min': '48px',
        'gutter': '16px',
        'section-gap': '32px',
        'card-padding': '16px',
        'base': '8px',
      },
      borderRadius: {
        'DEFAULT': '0.125rem',
        'lg': '0.25rem',
        'xl': '0.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 10px -2px rgba(0, 0, 0, 0.03)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      }
    },
  },
  plugins: [],
}

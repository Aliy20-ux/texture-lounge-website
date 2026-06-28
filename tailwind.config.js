/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        geist:   ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        terracotta: '#B6543C',
        rust:       '#C85428',
        amber:      '#D4852A',
        sage:       '#7BAE8E',
        clay:       '#8A3B2E',
        cream:      '#F4EDE4',
        ivory:      '#F5EDE0',
        charcoal:   '#1A1413',
        ink:        '#120A06',
      },
      transitionTimingFunction: {
        'expo':     'cubic-bezier(0.19,1,0.22,1)',
        'smooth':   'cubic-bezier(0.76,0,0.24,1)',
      },
    },
  },
  plugins: [],
}


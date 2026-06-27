/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        geist:   ['Raleway', 'system-ui', 'sans-serif'],
      },
      colors: {
        terracotta: '#B04030',
        rust:       '#C85428',
        amber:      '#D4852A',
        sage:       '#72B07E',
        cream:      '#EDE0CC',
        ivory:      '#F5EDE0',
        charcoal:   '#1C1008',
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


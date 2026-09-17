/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0b1d3a',
          navyLight: '#142c52',
          blue: '#1d4ed8',
          blueHover: '#1e40af',
          red: '#d9232d',
          redHover: '#b91c1c',
          accent: '#e11d48',
          gold: '#f59e0b',
          dark: '#0a0f1d',
          gray: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(11, 29, 58, 0.08), 0 8px 10px -6px rgba(11, 29, 58, 0.04)',
        'card': '0 20px 35px -10px rgba(11, 29, 58, 0.12)',
        'glow-red': '0 0 25px -5px rgba(217, 35, 45, 0.35)',
        'glow-blue': '0 0 25px -5px rgba(29, 78, 216, 0.35)',
      }
    },
  },
  plugins: [],
}

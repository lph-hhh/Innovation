/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#f59e0b',
        neutral: '#374151',
        'base-100': '#ffffff',
        'base-200': '#f8fafc',
        'base-300': '#e2e8f0'
      }
    }
  },
  plugins: []
}
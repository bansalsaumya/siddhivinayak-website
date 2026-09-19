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
          bg: '#FAFBFC',
          'bg-secondary': '#F3F6FA',
          card: '#FFFFFF',
          primary: '#2F5D8C',
          'primary-hover': '#244A70',
          'soft-blue': '#DCEAF7',
          'soft-blue-hover': '#C8DDF2',
          accent: '#E8B84B',
          'accent-hover': '#D4A336',
          dark: '#1F2937',
          muted: '#667085',
          border: '#E6EAF0',
          light: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px rgba(47, 93, 140, 0.04)',
        'soft-md': '0 6px 20px rgba(47, 93, 140, 0.06)',
        'soft-lg': '0 12px 32px rgba(47, 93, 140, 0.08)',
        'soft-3d': '0 15px 35px -10px rgba(47, 93, 140, 0.1), 0 0 1px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(47, 93, 140, 0.05)'
      }
    },
  },
  plugins: [],
}

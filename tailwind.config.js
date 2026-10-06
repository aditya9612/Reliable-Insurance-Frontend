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
          primary: '#2563EB',
          navy: '#102A4C',
          navydark: '#0B203C',
          lightbg: '#EAF2FF',
          mainbg: '#F4F8FC',
          border: '#DCE6F0',
          text: '#102A4C',
          muted: '#66809F',
          success: '#16B364',
          warning: '#F59E0B',
          error: '#DC2626'
        },
        primary: {
          50: '#f0f5ff',
          100: '#dce8ff',
          200: '#bed4ff',
          300: '#90b7ff',
          400: '#5e8eff',
          500: '#3563fc',
          600: '#254ce8',
          700: '#1e38cc',
          800: '#1b32a4',
          900: '#192e81',
          950: '#131e4e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

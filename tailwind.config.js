/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050816',
        surface: '#0B1120',
        brand: '#4ADE80',
        brandDark: '#14532D',
        accent: '#00FF9C',
        text: '#ECFDF5',
        textMuted: '#86EFAC',
        border: '#1F2937',
      }
    }
  }
}

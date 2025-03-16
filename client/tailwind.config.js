/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#ffffff',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'terminal-flicker': 'flicker 0.5s infinite alternate',
      },
      keyframes: {
        flicker: {
          '0%': { opacity: 0.9 },
          '100%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}

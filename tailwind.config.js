/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'spacemono': ['\'Space Mono\'', '\'monospace\''],
        'cursive': ['cursive', '\'arial\'']
      }
    },
  },
  plugins: []
}


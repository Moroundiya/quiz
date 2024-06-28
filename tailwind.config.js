/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'quiz-bg': "url('/background.png')"
      },
      fontFamily: {
        'jost': ["Jost", 'sans-serif'],
        'paci': ["Pacifico", 'cursive']
      }
    },
  },
  plugins: [
     require('flowbite/plugin')
  ],
}


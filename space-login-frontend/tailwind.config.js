/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // ← this line must be exact
  ],
  theme: {
    extend: {
      // your animations...
    },
  },
  plugins: [],
}
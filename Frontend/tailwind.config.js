/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        BG : "rgba(var(--bg))",
        BG_sec : "rgba(var(--bg-sec))",
        BG_Card : "rgba(var(--bg-card))",
        BG_Black : "rgba(var(--black))",
        Text : "rgba(var(--text))",
        Button : "rgba(var(--button))",
        Highlight : "rgba(var(--highlight-text))"
      },
    },
  },
  plugins: [],
}
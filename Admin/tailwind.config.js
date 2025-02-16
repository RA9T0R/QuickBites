/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '17': 'repeat(17, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '17': 'repeat(17, minmax(0, 1fr))',
      },
      colors: {
        Main_BG : "rgba(var(--main-bg))",
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
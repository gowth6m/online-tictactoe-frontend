/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "dracula", {
      "spruce": {
        "primary": "#79db8e",
        "secondary": "#f6f5f4",
        "accent": "#F1FA8C",
        "neutral": "#3d4451",
        "base-100": "#103930",
      }
    }],
  },
  plugins: [
    require('daisyui'),
  ],
}
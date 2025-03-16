import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(10px)',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["forest", "dracula"],
    darkTheme: "dracula",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
  },
  darkMode: 'class',
}


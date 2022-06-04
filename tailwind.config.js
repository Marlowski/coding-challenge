module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c70039',
        primaryHover: '#cd5173',
        secondary: '#151515',
        tertiary: '#34e6de',
      },
    },
  },
  plugins: [],
  mode: 'jit',
}

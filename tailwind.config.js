/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mont: ['mont', 'sans-serif'],
        tilt : ['tilt' ,'sans-serif' ],
        poppins: ['poppins', 'sans-serif'],
        marker: ['marker', 'sans-serif']
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms'),
  ],
}
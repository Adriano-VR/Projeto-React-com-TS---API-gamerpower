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
      },colors : {
        'blue': {
          '50': '#e8f1ff',
          '100': '#d5e5ff',
          '200': '#b3ceff',
          '300': '#85acff',
          '400': '#567bff',
          '500': '#2f4bff',
          '600': '#0c16ff',
          '700': '#0008ff',
          '800': '#060fcd',
          '900': '#101a9f',
          '950': '#0a0e5c',
      },
      
      
      
      }
    
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms'),
  ],
}
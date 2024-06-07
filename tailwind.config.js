/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'purple': '#4C3957',
      'yellow': '#e1d1ed',
      'white': '#fff',
      'grey': '#b5b5b5',
      'gray': '#808080',
      'darkgray': '#434343',
      'lightGray': '#f5f5f5',
      'black': '#000000',
      'submitBtn': '#4169E1',
      'darkgrey': '#757575',
      'blue': '#5959fe',
      'biochem': '#4169E1',
      'anatomy': '#DF5C5C',
      'physiology': '#008C6B',
      'pharmacology': '#AF6207',
      'startBtn': '#4169E1',
      'wrong': '#B60000',
      'correct': '#4BB543',
      'drkbiochem': '#204bce'
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui',],
      'serif': ['ui-serif', 'Georgia',],
      'mono': ['ui-monospace', 'SFMono-Regular',],
      'archivo': ['Archivo Black'],
      'Raleway': ['Raleway']
    },
    extend: {},
  },
  plugins: [],
}


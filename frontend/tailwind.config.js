/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '325px',   // Custom breakpoint for 325px
        'rm': '425px',   // Custom breakpoint for 425px
      },
      transitionTimingFunction: {
        'custom-ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
    
  },
  plugins: [],
};

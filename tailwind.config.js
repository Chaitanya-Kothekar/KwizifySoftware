/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // theme: {
  //   extend: {},
  // },
  theme: {
    extend: {
      colors: {
        purple: {
          800: '#4B0082', // Custom dark purple
          700: '#6A0DAD', // Custom medium purple
          600: '#7B1FA2' // Custom light purple
        },
        yellow: {
          300: '#FFEB3B' // Custom yellow
        }
      }
    }
  },
  plugins: [],
}

// module.exports = {
//   purge: ['./src/*/.{js,jsx,ts,tsx}', './public/index.html'],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {
//       colors: {
//         purple: {
//           800: '#4B0082', // Custom dark purple
//           700: '#6A0DAD', // Custom medium purple
//           600: '#7B1FA2' // Custom light purple
//         },
//         yellow: {
//           300: '#FFEB3B' // Custom yellow
//         }
//       }
//     }
//   },
//   variants: {
//     extend: {}
//   },
//   plugins: []
// };

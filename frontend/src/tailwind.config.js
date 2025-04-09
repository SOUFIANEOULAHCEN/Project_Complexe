/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
       "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroicons/react/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#fef5f0',
            100: '#fde6d9',
            200: '#fbccb3',
            300: '#f8ab82',
            400: '#f4814f',
            500: '#f15c22', // Couleur principale
            600: '#e23f18',
            700: '#bc2d16',
            800: '#952619',
            900: '#782218',
          },
        },
        animation: {
          'fade-in': 'fadeIn 0.3s ease-in',
          'slide-up': 'slideUp 0.3s ease-out'
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' }
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
          }
        }
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio')
    ],
  }
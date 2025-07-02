/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors:{
        primary:'#18273E',
        background:'#1f324e',
        'unicoop':{
          DEFAULT: "#f9f9f9",
          'blue': '#4da9c5',
          'green': '#8db844',
          'white': '#fff',
          'yellow': '#ccd443',
          'black': '#18273e',
          'slate-blue': '#385075'
        },
        'buttons':{
          DEFAULT:'#fff',
          'warning-yellow': '#ffd518',
          'closing-red': '#FF4E4E',
          'list-blue': '#628dce',
          'login': '#404142',
          'update-green': '#28a745',
          'update-green-h': '#218838',
          'delete-red': '#dc3545',
          'delete-red-h': '#c82333',
        },
      },
      keyframes:{
        'spin-once': {to: {transform: 'rotate(90deg)'}},
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideFromTop: {
          '0%': { transform: 'translateY(-50px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideFromBottom: {
          '0%': { transform: 'translateY(50px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation:{
        'spin-once': 'spin-once 0.2s linear',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-from-top': 'slideFromTop 0.5s ease-out',
        'slide-from-bottom': 'slideFromBottom 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
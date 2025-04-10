/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'shimmer-diagonal': {
          '0%': { backgroundPosition: '100% 100%' },
          '100%': { backgroundPosition: '0 0' },
        },
      },
      animation: {
        'shimmer-diagonal': 'shimmer-diagonal 1.2s infinite ease-in-out',
      },
      backgroundImage: {
        'skeleton-gradient': 'linear-gradient(135deg, #1e1b4b, #7c3aed, #1e1b4b)', // Indigo-950 to Violet
      },
      backgroundSize: {
        'skeleton': '400% 400%',
      },
      colors: {
        primary: '#000000',
        secondary: '#111111',
        accent: '#222222',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      boxShadow: {
        neon: '0 0 10px rgb(45, 0, 77), 0 0 20px rgba(43, 0, 86, 0.8), 0 0 30px rgba(49, 0, 50, 0.8)',
      },
    },
  },  
  plugins: [],
} 

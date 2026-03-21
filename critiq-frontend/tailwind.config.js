/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'critiq-dark': '#0a0a0f',
        'critiq-card': '#16161f',
        'critiq-primary': '#e50914',
        'critiq-secondary': '#b20710',
      },
      fontFamily: {
        'display': ['Inter', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(229, 9, 20, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(229, 9, 20, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

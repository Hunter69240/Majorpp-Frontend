/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(90deg, rgba(213, 242, 251, 1) 0%, rgba(247, 248, 255, 1) 100%)',
      },

      keyframes: {
        'spin-smooth': {
          '100%': { transform: 'rotate(360deg)' },
        },
        'fade-pulse': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'spin-smooth': 'spin-smooth 1.5s linear infinite',
        'fade-pulse': 'fade-pulse 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

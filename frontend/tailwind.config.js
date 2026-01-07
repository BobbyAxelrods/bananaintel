/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF4500', // Electric Orange
        secondary: '#1A1A1A', // Dark Gray/Black
        accent: '#FF4500',
        bg: '#FFFFFF', // Clean White
        surface: '#F4F4F5', // Light Gray
        terminal: '#09090B', // Deep Black
        text: '#000000',
        gray: {
          DEFAULT: '#71717A',
          light: '#E4E4E7',
          dark: '#27272A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

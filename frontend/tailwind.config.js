/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A1A2F', // Deep Navy Blue
        secondary: '#D4AF37', // Metallic Gold
        accent: '#FFFFFF',
        dark: '#0F172A', // Richer Dark
        light: '#F5F7FA', // Soft Grey
        gold: {
          400: '#EBCB6B',
          500: '#D4AF37',
          600: '#B59226',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
        heading: ['Poppins', 'Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 20px 40px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 15px rgba(212, 175, 55, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop')",
      }
    },
  },
  plugins: [],
}

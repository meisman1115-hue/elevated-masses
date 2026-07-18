/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#080A0C',
        surface: '#10131A',
        surface2: '#171B24',
        // Neon green (primary brand)
        green: {
          DEFAULT: '#8BFF3C',
          soft: '#A3E635',
          deep: '#5FBF2A',
        },
        // Ultraviolet purple (accent)
        purple: {
          DEFAULT: '#A855F7',
          soft: '#C77DFF',
          deep: '#7C3AED',
        },
        fg: '#EAF3E4',
        muted: '#B9C7B4',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        600: '600',
        700: '700',
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.08)',
      },
      boxShadow: {
        'glow-green': '0 0 40px -8px rgba(139,255,60,0.45)',
        'glow-purple': '0 0 40px -8px rgba(168,85,247,0.5)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'smoke-drift': {
          '0%, 100%': { transform: 'scale(1.25) rotate(0deg) translate(0, 0)' },
          '50%': { transform: 'scale(1.32) rotate(2.5deg) translate(1.5%, -1.5%)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'smoke-drift': 'smoke-drift 32s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        brand: { 50: '#f0f5ff', 100: '#e0ebff', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca' },
        analyst: '#8b5cf6', diplomat: '#10b981', sentinel: '#0ea5e9', explorer: '#f59e0b',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
};

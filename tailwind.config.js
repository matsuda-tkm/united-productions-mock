/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-hover': '#4f46e5',
        'base-line': '#e5e7eb',
        warmGray: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        // ゴールドテーマ
        gold: {
          DEFAULT: '#C8B273',
          50: '#FAF8F0',
          100: '#F5F0E0',
          200: '#EBE1C2',
          300: '#DED0A3',
          400: '#D3C18B',
          500: '#C8B273',
          600: '#B39A5A',
          700: '#8F7B48',
          800: '#6B5C36',
          900: '#473D24',
        },
        // Mステ カラフルテーマ
        mste: {
          // Base / Ink
          'bg-light': '#FFFFFF',
          'bg-dark': '#0B1020',
          'text-dark': '#0E1116',
          'text-sub': '#6B7280',
          // Neon Core（主役）
          'electric-cyan': '#00E5FF',
          'royal-blue': '#3B82F6',
          'grape-purple': '#7C3AED',
          'hot-magenta': '#FF2DAA',
          // Support
          'panel-gray': '#F5F7FA',
          'highlight': '#E5F9FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'mste-glow': '0 0 20px rgba(0, 229, 255, 0.35)',
        'mste-glow-magenta': '0 0 20px rgba(255, 45, 170, 0.35)',
        'mste-glow-blue': '0 0 20px rgba(59, 130, 246, 0.35)',
        'gold-sharp': '0 2px 8px rgba(200, 178, 115, 0.15), 0 1px 2px rgba(200, 178, 115, 0.1)',
        'gold-luxury': '0 4px 12px rgba(200, 178, 115, 0.2), 0 1px 3px rgba(200, 178, 115, 0.15)',
        'gold-premium': '0 6px 16px rgba(200, 178, 115, 0.25), 0 2px 4px rgba(200, 178, 115, 0.2)',
      },
      backgroundImage: {
        'mste-gradient': 'linear-gradient(90deg, #00E5FF 0%, #3B82F6 32%, #7C3AED 66%, #FF2DAA 100%)',
        'mste-aurora': 'linear-gradient(135deg, #00E5FF 0%, #3B82F6 25%, #7C3AED 60%, #FF2DAA 100%)',
        'mste-cyan-magenta': 'linear-gradient(90deg, #00E5FF 0%, #FF2DAA 100%)',
        'mste-blue-purple': 'linear-gradient(90deg, #3B82F6 0%, #7C3AED 100%)',
        'gold-luxury': 'linear-gradient(135deg, #C8B273 0%, #B39A5A 50%, #8F7B48 100%)',
        'gold-premium': 'linear-gradient(45deg, #D3C18B 0%, #C8B273 25%, #B39A5A 75%, #8F7B48 100%)',
        'gold-elegant': 'linear-gradient(180deg, #FAF8F0 0%, #F5F0E0 50%, #EBE1C2 100%)',
      },
      animation: {
        'mste-pulse': 'mste-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'mste-glow': 'mste-glow 3s ease-in-out infinite alternate',
        'mste-shimmer': 'mste-shimmer 2s linear infinite',
      },
      keyframes: {
        'mste-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.35)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(0, 229, 255, 0.6)',
            transform: 'scale(1.02)',
          },
        },
        'mste-glow': {
          '0%': { 
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.35)',
          },
          '100%': { 
            boxShadow: '0 0 30px rgba(255, 45, 170, 0.5)',
          },
        },
        'mste-shimmer': {
          '0%': { 
            backgroundPosition: '-200% 0',
          },
          '100%': { 
            backgroundPosition: '200% 0',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

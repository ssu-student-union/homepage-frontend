import { Config } from 'tailwindcss/types/config';
import animate from 'tailwindcss-animate';
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    screens: {
      sm: '390px',
      md: '720px',
      lg: '1080px',
      xl: '1440px',
      xxl: '1920px',
    },
    container: {
      center: true,
      padding: '2rem',
    },
    aspectRatio: {
      instagram: '4 / 5',
    },
    extend: {
      scrollbar: {
        hide: {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        ghost: {
          DEFAULT: 'hsl(var(--ghost))',
          foreground: 'hsl(var(--ghost-foreground))',
        },
        paginationText: { DEFAULT: 'hsl(var(--paginationText))' },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xs: 'calc(var(--radius) - 6px)',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        sparkle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
        },
        slideDown: {
          from: { height: '0', opacity: '0', transform: 'translateY(-20px)' },
          to: { height: 'auto', opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { height: 'auto', opacity: '1', transform: 'translateY(0)' },
          to: { height: '0', opacity: '0', transform: 'translateY(-20px)' },
        },
        fadein: {
          '0%': {
            opacity: '0.3',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeout: {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        sparkle: 'sparkle 0.5s ease-in-out',
        slideDown: 'slideDown 0.3s ease-out',
        slideUp: 'slideUp 0.3s ease-out',
        fadein: 'fadein 1s',
        fadeout: 'fadeout 1s',
      },
    },
  },
  plugins: [animate, scrollbarHide],
} satisfies Config;

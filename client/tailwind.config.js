/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B1E36',
          'navy-dark': '#020E23',
          'navy-light': '#1A2E47',
          terracotta: '#C84B31',
          'terracotta-dark': '#A93100',
          'terracotta-light': '#E05D41',
          orange: '#FF4F00',
          bg: '#F8FAFC',
          surface: '#F7F9FC',
          border: '#E2E8F0',
        },
        // Stitch export tokens
        primary: '#C84B31',
        'primary-container': '#D34000',
        'primary-fixed-dim': '#FFB59E',
        secondary: '#525F77',
        'secondary-container': '#D3E0FD',
        'secondary-fixed-dim': '#BAC7E3',
        tertiary: '#4F5D71',
        'tertiary-container': '#67758B',
        'tertiary-fixed': '#D5E3FC',
        surface: '#F7F9FC',
        'surface-variant': '#E0E3E6',
        'surface-container': '#ECEEF1',
        'surface-container-low': '#F2F4F7',
        'surface-container-high': '#E6E8EB',
        'surface-container-lowest': '#FFFFFF',
        'on-primary': '#FFFFFF',
        'on-surface': '#191C1E',
        'on-secondary-fixed-variant': '#3B475E',
        // RBAC Role Colors
        role: {
          citizen: '#10B981',
          'citizen-light': '#D1FAE5',
          university: '#6366F1',
          'university-light': '#E0E7FF',
          industry: '#F59E0B',
          'industry-light': '#FEF3C7',
          admin: '#8B5CF6',
          'admin-light': '#EDE9FE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        geist: ['Geist', 'Inter', 'sans-serif'],
        display: ['Geist', 'Inter', 'sans-serif'],
      },
      maxWidth: {
        'max-width': '1440px',
      },
      spacing: {
        'margin-desktop': '48px',
        'margin-mobile': '16px',
        gutter: '24px',
      },
    },
  },
  plugins: [],
}

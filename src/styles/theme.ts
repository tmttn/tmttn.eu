export const darkTheme = {
  colors: {
    primary: '#60a5fa',
    primaryHighlight: '#a5b4fc',
    secondary: '#f472b6',
    accent: '#34d399',
    background: 'rgba(15, 15, 35, 0.95)',
    backgroundAlt: 'rgba(26, 26, 46, 0.95)',
    surface: 'rgba(255, 255, 255, 0.05)',
    surfaceHover: 'rgba(255, 255, 255, 0.1)',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    textMuted: 'rgba(255, 255, 255, 0.6)',
    border: 'rgba(255, 255, 255, 0.1)',
    borderHover: 'rgba(255, 255, 255, 0.2)',
    glass: {
      surface: 'rgba(255, 255, 255, 0.08)',
      surfaceHover: 'rgba(255, 255, 255, 0.12)',
      border: 'rgba(255, 255, 255, 0.15)',
      borderHover: 'rgba(255, 255, 255, 0.25)',
      borderTop: 'rgba(255, 255, 255, 0.2)',
      borderBottom: 'rgba(255, 255, 255, 0.08)',
    },
  },
  breakpoints: {
    mobile: '600px',
  },
  transitions: {
    default: '0.3s ease',
    transform: '0.5s',
  },
  isDark: true,
}

export const lightTheme = {
  colors: {
    primary: '#3b82f6',
    primaryHighlight: '#1d4ed8',
    secondary: '#e11d48',
    accent: '#059669',
    background: 'rgba(255, 255, 255, 0.95)',
    backgroundAlt: 'rgba(248, 250, 252, 0.95)',
    surface: 'rgba(0, 0, 0, 0.03)',
    surfaceHover: 'rgba(0, 0, 0, 0.08)',
    text: '#1f2937',
    textSecondary: 'rgba(31, 41, 55, 0.8)',
    textMuted: 'rgba(31, 41, 55, 0.6)',
    border: 'rgba(0, 0, 0, 0.1)',
    borderHover: 'rgba(0, 0, 0, 0.2)',
    glass: {
      surface: 'rgba(255, 255, 255, 0.25)',
      surfaceHover: 'rgba(255, 255, 255, 0.35)',
      border: 'rgba(255, 255, 255, 0.3)',
      borderHover: 'rgba(255, 255, 255, 0.5)',
      borderTop: 'rgba(255, 255, 255, 0.4)',
      borderBottom: 'rgba(255, 255, 255, 0.1)',
    },
  },
  breakpoints: {
    mobile: '600px',
  },
  transitions: {
    default: '0.3s ease',
    transform: '0.5s',
  },
  isDark: false,
}

export const theme = darkTheme // Default to dark theme
export type Theme = typeof darkTheme
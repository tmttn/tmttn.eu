export const theme = {
  colors: {
    primary: '#1c6e8c',
    primaryHighlight: '#a7acd9',
    secondary: '#d62246',
    black: '#3e363f',
    white: '#fffce8',
  },
  breakpoints: {
    mobile: '600px',
  },
  transitions: {
    default: '0.3s ease',
    transform: '0.5s',
  },
}

export type Theme = typeof theme
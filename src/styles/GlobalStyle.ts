import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
    overscroll-behavior-y: none;

    @media screen and (prefers-reduced-motion: reduce) {
      scroll-behavior: auto;
    }
  }

  body {
    margin: 0;
    padding: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(120, 255, 198, 0.2) 0%, transparent 50%),
      linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
    background-attachment: fixed;
    font-family: 'Inter', 'Roboto', 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, system-ui, sans-serif;
    font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
    font-variation-settings: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Floating background elements */
  body::before,
  body::after {
    content: '';
    position: fixed;
    pointer-events: none;
    z-index: -1;
  }

  body::before {
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: 
      radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 25%),
      radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 25%);
    animation: float 20s ease-in-out infinite;
  }

  body::after {
    top: -25%;
    right: -25%;
    width: 150%;
    height: 150%;
    background: 
      radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.08) 0%, transparent 30%);
    animation: float 15s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(1deg); }
    66% { transform: translate(-20px, 20px) rotate(-1deg); }
  }

  .emoji {
    padding-left: 1vw;
    font-size: 170px;
    align-self: center;
  }

  h1 {
    font-family: 'Geist', 'Inter', system-ui, sans-serif;
    font-size: 10vw;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
    
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding-top: 0 !important;
      font-size: 12vw;
    }
  }

  h2 {
    font-family: 'Geist', 'Inter', system-ui, sans-serif;
    font-weight: 500;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }

  h3 {
    font-family: 'Geist', 'Inter', system-ui, sans-serif;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.4;
  }

  h1,
  h2,
  h3 {
    padding-left: 7vw;
    margin-top: 0;
  }

  p {
    max-width: 800px;
    text-align: justify;
    font-family: 'Inter', system-ui, sans-serif;
    font-weight: 400;
    line-height: 1.6;
    letter-spacing: -0.005em;
    font-size: 1.1rem;
    
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 1rem;
      text-align: left;
    }
  }

  a,
  a:visited,
  a:hover,
  a:active,
  a:focus {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: none;
  }

  a {
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 1px,
      ${({ theme }) => theme.colors.primary} 1px,
      ${({ theme }) => theme.colors.primary} 2px,
      rgba(0, 0, 0, 0) 2px
    );
  }
`
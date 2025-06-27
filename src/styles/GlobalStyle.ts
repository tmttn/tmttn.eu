import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
    overscroll-behavior-y: none;

    @media screen and (prefers-reduced-motion: reduce) {
      scroll-behavior: auto;
    }
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.black};
    font-family: 'Inter', 'Roboto', 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, system-ui, sans-serif;
    font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
    font-variation-settings: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
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
import React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../src/contexts/ThemeContext'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import '../src/utils/fontawesome'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
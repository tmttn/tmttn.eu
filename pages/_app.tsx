import React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@contexts'
import { GlobalStyle } from '@styles'
import '@utils/fontawesome'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
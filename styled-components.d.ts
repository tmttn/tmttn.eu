import 'styled-components'
import { Theme } from './src/styles/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
import 'styled-components'
import { AppTheme } from 'src/styles/Theme'

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}

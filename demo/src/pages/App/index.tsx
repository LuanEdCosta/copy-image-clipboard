import { ThemeProvider } from 'styled-components'

import { GlobalStyles, LIGHT_THEME } from 'src/styles'
import Home from 'src/pages/Home'

import '@fontsource/open-sans'
import 'src/locales'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={LIGHT_THEME}>
      <GlobalStyles />
      <Home />
    </ThemeProvider>
  )
}

export default App

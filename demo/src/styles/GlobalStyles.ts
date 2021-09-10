import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    overflow-x: hidden;
  }

  html, body, #root {
    height: 100%;
    overflow-x: hidden;

    margin: 0;
    padding: 0;
    outline: 0;

    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.primaryText};
  }

  body, #root {
    font-size: 1.4rem;
  }

  button {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.primaryText};
  }

  svg {
    overflow: initial;
  }
`
